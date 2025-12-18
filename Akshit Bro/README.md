# 🏞️ Andhra Pradesh Tourism - Full Stack Application

![Status](https://img.shields.io/badge/status-production%20ready-success.svg)
![Database](https://img.shields.io/badge/database-PostgreSQL-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)

A modern full-stack travel and tourism application showcasing **32 tourist destinations** across Andhra Pradesh and Telangana with images, videos, and interactive features.

## ✨ Features

- 🏛️ **32 Tourist Places** with detailed information
- 📸 **30+ Images** across multiple destinations
- 🎥 **57 Videos** for virtual tours
- 🔐 **JWT Authentication** with secure login/register
- 📍 **Nearby Places** using geolocation
- ⭐ **Ratings & Reviews** system
- 💾 **PostgreSQL Database** with optimized queries
- 🎨 **Modern React UI** with Framer Motion animations
- 🛡️ **Security Features**: Helmet, CORS, Rate Limiting

---

## 🚀 Quick Start

### 1. Setup Database
```bash
cd backend
import_all.bat
```

### 2. Start Backend
```bash
cd backend
npm install
npm start
```
Server runs on: `http://localhost:5000`

### 3. Start Frontend
```bash
cd frontend
npm install
npm start
```
Frontend runs on: `http://localhost:3000`

---

## 🛠️ Tech Stack

### Frontend
- **React** 18.2.0
- **React Router** v6
- **Axios** - API requests
- **Framer Motion** - Animations
- **React Slick** - Image carousels

### Backend
- **Node.js** + **Express**
- **PostgreSQL** with JSONB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Helmet** - Security
- **Rate Limiting** - API protection

---

## 📁 Project Structure

```
Akshit Bro/
├── backend/
│   ├── Images/              # Tourist place images
│   ├── places.sql           # Database schema
│   ├── Data.sql            # 32 places data
│   ├── add_images.sql      # All images
│   ├── add_videos.sql      # All videos
│   ├── import_all.bat      # One-click setup
│   ├── server.js           # Express API
│   ├── .env                # Config (create from .env.example)
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── Components/
    │   │   ├── Navbar.js
    │   │   └── Pages/
    │   │       ├── Home.js
    │   │       ├── Places.js
    │   │       ├── PlaceDetail.js
    │   │       └── LoginRegister.js
    │   └── App.js
    └── package.json
```

---

## 💾 Database Setup

### Quick Setup (Windows)
```bash
cd backend
import_all.bat
```

This runs 4 SQL files:
1. `places.sql` - Creates 6 tables with indexes
2. `Data.sql` - Inserts 32 tourist places
3. `add_images.sql` - Adds all images
4. `add_videos.sql` - Adds 57 videos

### Manual Setup
```bash
psql -U postgres -d project -p 5444 -f places.sql
psql -U postgres -d project -p 5444 -f Data.sql
psql -U postgres -d project -p 5444 -f add_images.sql
psql -U postgres -d project -p 5444 -f add_videos.sql
```

---

## 🔧 Configuration

### Backend (.env)
```env
DB_HOST=localhost
DB_PORT=5444
DB_USER=postgres
DB_PASS=your_password
DB_NAME=project
JWT_SECRET=your_secret_key
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Installation

#### 1. Clone Repository
```bash
git clone https://github.com/Ramana372/Akshit-bro.git
cd "Akshit Bro"
```

#### 2. Backend Setup
```bash
cd backend
npm install
# Edit .env with your database credentials
cp .env.example .env
# Edit .env with your PostgreSQL credentials
npm start
```

#### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

---

## 📡 API Endpoints

### Public (No Auth)
```javascript
GET  /places              // All 32 places with images & videos
GET  /places/:id          // Single place details
GET  /places/nearby       // Nearby places by coordinates
GET  /test               // API health check
```

### Protected (Requires JWT Token)
```javascript
POST  /register          // Create account
POST  /login            // Login
GET   /profile          // Get user profile
PATCH /profile          // Update profile
```

### Example Response (`GET /places`)
```json
[
  {
    "id": 1,
    "name": "Borra Caves",
    "category": "Nature",
    "rating": 4.5,
    "location": "Visakhapatnam",
    "description": "Natural limestone caves...",
    "highlights": ["Stalactites", "Stalagmites"],
    "latitude": 18.2813,
    "longitude": 83.0488,
    "images": [
      {
        "id": 1,
        "image_url": "/images/borra_1.jpg",
        "caption": "Cave entrance"
      }
    ],
    "videos": [
      {
        "id": 1,
        "video_url": "/videos/borra_tour.mp4",
        "caption": "Virtual cave tour"
      }
    ]
  }
]
```

---

## 🗄️ Database Schema

### 6 Tables:
1. **users** - User accounts
2. **places** - 32 tourist destinations
3. **place_images** - Multiple images per place
4. **place_videos** - Multiple videos per place
5. **user_favorites** - Saved favorites
6. **reviews** - User reviews & ratings

### Key Features:
- ✅ JSONB for flexible data
- ✅ 10 indexes for performance
- ✅ Foreign key constraints
- ✅ Auto-updating timestamps

---

## 🚀 Deployment

### Backend (Heroku/Railway/Render)
1. Create PostgreSQL database
2. Set environment variables
3. Run all 4 SQL files on production DB
4. Deploy backend

### Frontend (Vercel/Netlify)
1. Update API URL in code
2. Run `npm run build`
3. Deploy build folder

---

## 📊 Database Stats
- **32 Places** across AP & Telangana
- **30+ Images** 
- **57 Videos**
- **6 Tables** with relationships
- **10 Indexes** for speed

---

## 🔐 Security
- JWT tokens (1-hour expiry)
- bcrypt password hashing
- Helmet security headers
- Rate limiting (100 req/15min)
- CORS protection

---

## 🛠️ Development

### Backend
```bash
npm start          # Start server
npm run dev        # Development with nodemon
```

### Frontend
```bash
npm start          # Start React app
npm run build      # Production build
```

---

## 📞 Contact
- **GitHub**: [@Ramana372](https://github.com/Ramana372)
- **Repository**: [Akshit-bro](https://github.com/Ramana372/Akshit-bro)

---

**Made with ❤️ for Andhra Pradesh Tourism**


### Utility Endpoints

#### Test API
```http
GET /test
```

#### Ping
```http
GET /ping
```

---

## 🗄️ Database Schema

### Tables

#### users
```sql
id          SERIAL PRIMARY KEY
name        VARCHAR(255) NOT NULL
email       VARCHAR(255) UNIQUE NOT NULL
password    VARCHAR(255) NOT NULL
created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

#### places
```sql
id                  SERIAL PRIMARY KEY
name                VARCHAR(255) NOT NULL
category            VARCHAR(100)
image_url           VARCHAR(255)
location            VARCHAR(255)
rating              DECIMAL(2,1) CHECK (0-5)
description         TEXT
highlights          JSONB
best_time_to_visit  TEXT
how_to_reach        TEXT
entry_fee           VARCHAR(100)
timings             TEXT
latitude            DECIMAL(10,6)
longitude           DECIMAL(10,6)
district            VARCHAR(100)
city                VARCHAR(100)
created_at          TIMESTAMP
```

#### place_images
```sql
id          SERIAL PRIMARY KEY
place_id    INTEGER REFERENCES places(id)
image_url   VARCHAR(255) NOT NULL
caption     VARCHAR(255)
created_at  TIMESTAMP
```

#### place_videos
```sql
id          SERIAL PRIMARY KEY
place_id    INTEGER REFERENCES places(id)
video_url   VARCHAR(255) NOT NULL
caption     VARCHAR(255)
created_at  TIMESTAMP
```

#### user_favorites
```sql
id          SERIAL PRIMARY KEY
user_id     INTEGER REFERENCES users(id)
place_id    INTEGER REFERENCES places(id)
created_at  TIMESTAMP
UNIQUE (user_id, place_id)
```

#### reviews
```sql
id          SERIAL PRIMARY KEY
user_id     INTEGER REFERENCES users(id)
place_id    INTEGER REFERENCES places(id)
rating      INTEGER CHECK (1-5)
comment     TEXT
created_at  TIMESTAMP
updated_at  TIMESTAMP
```

---

## 🔐 Environment Variables

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_password
DB_NAME=project

# JWT
JWT_SECRET=your_secret_key_min_32_chars

# CORS
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
```

---

## 📸 Screenshots

*Coming soon...*

---

## 🔧 Development

### Run Tests
```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

### Code Formatting
```bash
# Backend
npm run format

# Frontend
npm run format
```

### Linting
```bash
# Backend
npm run lint

# Frontend
npm run lint
```

---

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables
2. Update CORS settings for production domain
3. Use production PostgreSQL database
4. Enable SSL for database connection

### Frontend Deployment (Vercel/Netlify)
1. Build: `npm run build`
2. Update API_URL to production backend
3. Deploy build folder

---

## 📝 Roadmap

- [ ] Add favorites/wishlist functionality
- [ ] Implement user reviews and ratings
- [ ] Add search functionality
- [ ] Admin dashboard for managing places
- [ ] Image upload for places
- [ ] Integration with Google Maps
- [ ] Weather API integration
- [ ] Multi-language support (Telugu, Hindi, English)
- [ ] Mobile app (React Native)
- [ ] Progressive Web App (PWA)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Akshit**
- GitHub: [@yourusername](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- Tourist information sourced from various travel guides
- Images from tourism department resources
- Inspired by the beauty of Andhra Pradesh

---

## 📞 Support

For support, email support@akshittravel.com or create an issue in the repository.

---

**Made with ❤️ in Andhra Pradesh**
