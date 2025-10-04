
require('dotenv').config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

const app = express();
const port = process.env.PORT || 5000;

// Security + middlewares
app.use(helmet());
app.use(limiter);
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple request logger for debugging incoming frontend calls
app.use((req, res, next) => {
    console.log(`[HTTP] ${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
    next();
});

// Static files
app.use("/Images", express.static(path.join(__dirname, "Images")));
app.use("/static", express.static(path.join(__dirname, "public")));

// MySQL pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "project",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
const promisePool = pool.promise();

// Test DB connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1);
    }
    console.log(`Connected to MySQL database: ${process.env.DB_NAME || "project"}`);
    connection.release();
});

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        console.warn(`[auth] No Authorization header for ${req.method} ${req.originalUrl}`);
        return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        console.warn(`[auth] Authorization header present but no token for ${req.method} ${req.originalUrl}`);
        return res.status(401).json({ error: "Invalid token format" });
    }

    // Log decoded payload (non-verified) to help debug token structure
    try {
        const decodedPayload = jwt.decode(token);
        console.log(`[auth] Decoded token payload (not verified) for ${req.originalUrl}:`, decodedPayload);
    } catch (e) {
        console.warn(`[auth] Failed to decode token for ${req.originalUrl}:`, e.message);
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.warn(`[auth] Token verification failed for ${req.method} ${req.originalUrl}:`, err.message);
            return res.status(403).json({ error: "Invalid or expired token" });
        }
        req.user = decoded;
        next();
    });
};

// Helper function to calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
}

////////////////////////////////////////////////////
// 🔹 AUTH ROUTES
////////////////////////////////////////////////////

// REGISTER
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const [existing] = await promisePool.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existing.length > 0) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await promisePool.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);

        res.json({ success: true, message: "Registration successful" });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await promisePool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(400).json({ success: false, message: "No account found with that email." });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ success: false, message: "Incorrect password." });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email }, // Ensure user is returned
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
});

// GET PROFILE
app.get("/profile", verifyToken, async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT id, name, email FROM users WHERE id = ?",
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user: rows[0] });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ NEW: UPDATE PROFILE
app.patch("/profile", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, password } = req.body;

    let query = "UPDATE users SET name = ?, email = ? WHERE id = ?";
    let params = [name, email, userId];

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query = "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
      params = [name, email, hashedPassword, userId];
    }

    await promisePool.query(query, params);

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



////////////////////////////////////////////////////
// 🔹 PLACES ROUTES
////////////////////////////////////////////////////

// All places (public - no auth required for browsing)
app.get("/places", async (req, res) => {
    try {
        const [places] = await promisePool.query("SELECT * FROM places ORDER BY name");
        const processed = places.map(p => ({
            ...p,
            highlights: p.highlights ? JSON.parse(p.highlights) : [],
            rating: parseFloat(p.rating) || 0,
            latitude: parseFloat(p.latitude) || 0,
            longitude: parseFloat(p.longitude) || 0,
            created_at: p.created_at ? new Date(p.created_at).toISOString() : null
        }));
        res.json(processed);
    } catch (error) {
        console.error("Error fetching places:", error.message);
        res.status(500).json({ error: "Failed to fetch places" });
    }
});

// Nearby places endpoint (public) - placed before /places/:id so 'nearby' isn't treated as an :id param
app.get("/places/nearby", async (req, res) => {
    try {
        const { latitude, longitude, radius = 150 } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({ error: "Latitude and longitude are required" });
        }

        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);
        const radiusKm = parseFloat(radius);

        if (isNaN(lat) || isNaN(lon) || isNaN(radiusKm)) {
            return res.status(400).json({ error: "Invalid latitude, longitude, or radius values" });
        }

        const [places] = await promisePool.query(
            `SELECT * FROM places WHERE latitude IS NOT NULL AND longitude IS NOT NULL AND latitude != 0 AND longitude != 0`
        );

        const nearbyPlaces = places
            .map(place => {
                const distance = calculateDistance(
                    lat,
                    lon,
                    parseFloat(place.latitude),
                    parseFloat(place.longitude)
                );

                return {
                    ...place,
                    distance: parseFloat(distance.toFixed(2)),
                    highlights: place.highlights ? JSON.parse(place.highlights) : [],
                    rating: parseFloat(place.rating) || 0,
                    latitude: parseFloat(place.latitude),
                    longitude: parseFloat(place.longitude),
                    created_at: place.created_at ? new Date(place.created_at).toISOString() : null
                };
            })
            .filter(place => place.distance <= radiusKm && place.distance > 0)
            .sort((a, b) => a.distance - b.distance);

        res.json(nearbyPlaces);
    } catch (error) {
        console.error("Nearby places error:", error.message);
        res.status(500).json({ error: "Failed to fetch nearby places" });
    }
});

// Single place with images + videos (public)
app.get("/places/:id", async (req, res) => {
    try {
        const [place] = await promisePool.query("SELECT * FROM places WHERE id = ?", [req.params.id]);
        if (place.length === 0) return res.status(404).json({ error: "Place not found" });

        const p = place[0];

        // fetch related images
        const [images] = await promisePool.query("SELECT * FROM place_images WHERE place_id = ?", [req.params.id]);

        // fetch related videos
        const [videos] = await promisePool.query("SELECT * FROM place_videos WHERE place_id = ?", [req.params.id]);

        res.json({
            ...p,
            highlights: p.highlights ? JSON.parse(p.highlights) : [],
            rating: parseFloat(p.rating) || 0,
            latitude: parseFloat(p.latitude) || 0,
            longitude: parseFloat(p.longitude) || 0,
            created_at: p.created_at ? new Date(p.created_at).toISOString() : null,
            images: images || [],
            videos: videos || []
        });
    } catch (error) {
        console.error("Single place error:", error.message);
        res.status(500).json({ error: "Failed to fetch place details" });
    }
});

// Test route
app.get("/test", (req, res) => {
    res.json({
        message: "API is working",
        timestamp: new Date().toISOString(),
        routes: [
            "POST /register",
            "POST /login",
            "GET /places (protected)",
            "GET /places/:id (protected)"
        ]
    });
});

// Lightweight ping route for connectivity checks
app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

// Error handler
app.use((err, req, res, next) => {
    console.error("Server error:", err.stack);
    res.status(500).json({ error: "Internal server error" });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
    console.log(`🔗 Test API: http://localhost:${port}/test`);
});
