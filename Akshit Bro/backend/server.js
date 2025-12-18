require('dotenv').config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "http://localhost:3000", "http://localhost:5000"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'", "http://localhost:3000", "http://localhost:5000"]
    }
  },
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(limiter);
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`[HTTP] ${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
    next();
});

app.use("/images", express.static(path.join(__dirname, "Images")));
app.use("/Images", express.static(path.join(__dirname, "Images")));
app.use("/static", express.static(path.join(__dirname, "public")));

// PostgreSQL pool
const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5444,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "Ramana@2k3",
    database: process.env.DB_NAME || "project",
    max: 20,
    idleTimeoutMillis: 300000,
    connectionTimeoutMillis: 150000,
    statement_timeout: 30000,
    query_timeout: 30000,
});

pool.connect((err, client, release) => {
    if (err) {
        console.error("Database connection failed:", err.stack);
        process.exit(1);
    }
    console.log(`✅ Connected to PostgreSQL database: ${process.env.DB_NAME || "project"}`);
    release();
});

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

const emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'your-app-password'
    }
});

emailTransporter.verify((error, success) => {
    if (error) {
        console.warn('⚠️ Email service not configured. Password reset emails will not be sent.');
        console.warn('Please set EMAIL_USER and EMAIL_PASSWORD in .env file');
    } else {
        console.log('✅ Email service is ready');
    }
});

const sendPasswordResetEmail = async (email, resetToken, frontendUrl = 'http://localhost:3000') => {
    try {
        const resetLink = `${frontendUrl}/reset-password/${resetToken}`;
        
        const mailOptions = {
            from: process.env.EMAIL_USER || 'noreply@akshittraveldiaries.com',
            to: email,
            subject: '🔐 Password Reset Request - Akshit Travel Diaries',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #F28C28 0%, #D4A017 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                        .button { display: inline-block; background: linear-gradient(135deg, #F28C28 0%, #D4A017 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
                        .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px; }
                        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
                        .logo { font-size: 24px; font-weight: bold; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <div class="logo">🌍 Akshit Travel Diaries</div>
                            <h1>Password Reset Request</h1>
                        </div>
                        
                        <div class="content">
                            <p>Hello,</p>
                            <p>We received a request to reset your password. Click the button below to set a new password:</p>
                            
                            <div style="text-align: center;">
                                <a href="${resetLink}" class="button">Reset Your Password</a>
                            </div>
                            
                            <p>Or copy this link in your browser:</p>
                            <p style="word-break: break-all; background: white; padding: 10px; border-radius: 4px; border: 1px solid #ddd;">
                                ${resetLink}
                            </p>
                            
                            <div class="warning">
                                <strong>⏱️ Important:</strong> This password reset link expires in <strong>1 hour</strong>. If you didn't request a password reset, please ignore this email or contact us immediately.
                            </div>
                            
                            <p><strong>For security:</strong></p>
                            <ul>
                                <li>Never share your password with anyone</li>
                                <li>We will never ask for your password via email</li>
                                <li>Always use the official website or app</li>
                            </ul>
                            
                            <p>If you have any questions, feel free to contact our support team.</p>
                            
                            <p>Best regards,<br><strong>Akshit Travel Diaries Team</strong></p>
                        </div>
                        
                        <div class="footer">
                            <p>© 2025 Akshit Travel Diaries. All rights reserved.</p>
                            <p>This is an automated email. Please do not reply to this address.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };
        
        await emailTransporter.sendMail(mailOptions);
        console.log(`✅ Password reset email sent to ${email}`);
        return true;
    } catch (error) {
        console.error('❌ Failed to send password reset email:', error.message);
        return false;
    }
};

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

// Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}


app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existing = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existing.rows.length > 0) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, hashedPassword]);

        res.json({ success: true, message: "Registration successful" });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ success: false, message: "No account found with that email." });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ success: false, message: "Incorrect password." });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
});

app.get("/profile", verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.patch("/profile", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, password } = req.body;

    let query = "UPDATE users SET name = $1, email = $2 WHERE id = $3";
    let params = [name, email, userId];

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query = "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4";
      params = [name, email, hashedPassword, userId];
    }

    await pool.query(query, params);

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



app.get("/places", async (req, res) => {
    try {
        const placesResult = await pool.query("SELECT * FROM places ORDER BY rating DESC, name");
        
        const imagesResult = await pool.query("SELECT * FROM place_images ORDER BY place_id, id");
        
        const videosResult = await pool.query("SELECT * FROM place_videos ORDER BY place_id, id");
        
        const imagesByPlace = {};
        imagesResult.rows.forEach(img => {
            if (!imagesByPlace[img.place_id]) imagesByPlace[img.place_id] = [];
            imagesByPlace[img.place_id].push(img);
        });
        
        const videosByPlace = {};
        videosResult.rows.forEach(vid => {
            if (!videosByPlace[vid.place_id]) videosByPlace[vid.place_id] = [];
            videosByPlace[vid.place_id].push(vid);
        });
        
        const processed = placesResult.rows.map(p => ({
            ...p,
            highlights: p.highlights || [],
            rating: parseFloat(p.rating) || 0,
            latitude: parseFloat(p.latitude) || 0,
            longitude: parseFloat(p.longitude) || 0,
            created_at: p.created_at ? new Date(p.created_at).toISOString() : null,
            images: imagesByPlace[p.id] || [],
            videos: videosByPlace[p.id] || []
        }));
        
        res.json(processed);
    } catch (error) {
        console.error("Error fetching places:", error.message);
        res.status(500).json({ error: "Failed to fetch places" });
    }
});

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

        const placesResult = await pool.query(
            `SELECT * FROM places WHERE latitude IS NOT NULL AND longitude IS NOT NULL AND latitude != 0 AND longitude != 0`
        );
        
        const imagesResult = await pool.query("SELECT * FROM place_images ORDER BY place_id, id");
        const imagesByPlace = {};
        imagesResult.rows.forEach(img => {
            if (!imagesByPlace[img.place_id]) imagesByPlace[img.place_id] = [];
            imagesByPlace[img.place_id].push(img);
        });

        const nearbyPlaces = placesResult.rows
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
                    highlights: place.highlights || [],
                    rating: parseFloat(place.rating) || 0,
                    latitude: parseFloat(place.latitude),
                    longitude: parseFloat(place.longitude),
                    created_at: place.created_at ? new Date(place.created_at).toISOString() : null,
                    images: imagesByPlace[place.id] || []
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

app.get("/places/:id", async (req, res) => {
    try {
        const placeResult = await pool.query("SELECT * FROM places WHERE id = $1", [req.params.id]);
        if (placeResult.rows.length === 0) return res.status(404).json({ error: "Place not found" });

        const p = placeResult.rows[0];

        const imagesResult = await pool.query("SELECT * FROM place_images WHERE place_id = $1", [req.params.id]);

        const videosResult = await pool.query("SELECT * FROM place_videos WHERE place_id = $1", [req.params.id]);

        res.json({
            ...p,
            highlights: p.highlights || [],
            rating: parseFloat(p.rating) || 0,
            latitude: parseFloat(p.latitude) || 0,
            longitude: parseFloat(p.longitude) || 0,
            created_at: p.created_at ? new Date(p.created_at).toISOString() : null,
            images: imagesResult.rows || [],
            videos: videosResult.rows || []
        });
    } catch (error) {
        console.error("Single place error:", error.message);
        res.status(500).json({ error: "Failed to fetch place details" });
    }
});

app.get("/search", async (req, res) => {
    try {
        const { q } = req.query;
        
        if (!q || q.trim().length === 0) {
            return res.json({ places: [] });
        }

        const searchTerm = q.trim().toLowerCase();
        const query = `
            SELECT 
                id,
                name,
                category,
                image_url,
                location,
                city,
                district,
                rating,
                description,
                highlights,
                latitude,
                longitude,
                CASE 
                    WHEN LOWER(name) = $2 THEN 1
                    WHEN LOWER(name) LIKE $2 || '%' THEN 2
                    WHEN LOWER(city) = $2 THEN 3
                    WHEN LOWER(district) = $2 THEN 4
                    ELSE 5
                END as relevance
            FROM places
            WHERE 
                LOWER(name) LIKE $1 OR
                LOWER(location) LIKE $1 OR
                LOWER(city) LIKE $1 OR
                LOWER(district) LIKE $1 OR
                LOWER(category) LIKE $1 OR
                LOWER(description) LIKE $1
            ORDER BY 
                relevance ASC,
                rating DESC,
                name ASC
            LIMIT 10
        `;
        
        const result = await pool.query(query, [`%${searchTerm}%`, searchTerm]);
        
        const places = result.rows.map(p => ({
            id: p.id,
            name: p.name,
            category: p.category,
            image_url: p.image_url,
            location: p.location,
            city: p.city || p.district,
            description: p.description ? p.description.substring(0, 150) + '...' : '',
            rating: parseFloat(p.rating) || 0,
            highlights: p.highlights || [],
            latitude: parseFloat(p.latitude) || 0,
            longitude: parseFloat(p.longitude) || 0
        }));
        
        res.json({ places, count: places.length });
    } catch (error) {
        console.error("Search error:", error.message);
        res.status(500).json({ error: "Failed to search places", places: [] });
    }
});

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

app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

app.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: "Email is required" 
      });
    }
    const result = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.json({ 
        success: true, 
        message: "If an account with that email exists, a reset link has been sent." 
      });
    }
    const resetToken = jwt.sign(
      { email, type: 'password-reset' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const emailSent = await sendPasswordResetEmail(
      email, 
      resetToken,
      process.env.FRONTEND_URL || 'http://localhost:3000'
    );

    if (emailSent) {
      console.log(`✅ Password reset email sent to ${email}`);
    } else {
      console.warn(`⚠️ Failed to send email to ${email}, but reset token generated`);
    }

    res.json({ 
      success: true, 
      message: "If an account with that email exists, a reset link has been sent." 
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
});

app.get('/verify-reset-token/:token', (req, res) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, JWT_SECRET);
    
    if (decoded.type !== 'password-reset') {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid token type" 
      });
    }

    res.json({ 
      success: true, 
      email: decoded.email,
      message: "Token is valid" 
    });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: "Password reset link has expired. Please request a new one." 
      });
    }
    res.status(400).json({ 
      success: false, 
      message: "Invalid reset link" 
    });
  }
});

app.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Token and password are required" 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: "Password must be at least 6 characters" 
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          success: false, 
          message: "Password reset link has expired" 
        });
      }
      return res.status(400).json({ 
        success: false, 
        message: "Invalid reset link" 
      });
    }

    if (decoded.type !== 'password-reset') {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid token" 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "UPDATE users SET password = $1 WHERE email = $2 RETURNING id",
      [hashedPassword, decoded.email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    res.json({ 
      success: true, 
      message: "Password has been reset successfully" 
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
});

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ 
                success: false, 
                message: "All fields are required" 
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid email format" 
            });
        }

        console.log(`📧 New Contact Form Submission:`);
        console.log(`   Name: ${name}`);
        console.log(`   Email: ${email}`);
        console.log(`   Subject: ${subject}`);
        console.log(`   Message: ${message}`);

        res.json({ 
            success: true, 
            message: "Thank you for reaching out! We'll get back to you soon." 
        });
    } catch (error) {
        console.error("Contact form error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error submitting contact form" 
        });
    }
});

app.use((err, req, res, next) => {
    console.error("Server error:", err.stack);
    res.status(500).json({ error: "Internal server error" });
});

app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
    console.log(`🔗 Test API: http://localhost:${port}/test`);
});
