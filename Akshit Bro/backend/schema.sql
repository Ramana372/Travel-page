-- ============================================================
-- AKSHIT BRO TRAVEL WEBSITE - DATABASE SCHEMA
-- Complete SQL Schema for Travel Places Management System
-- ============================================================

-- Drop existing objects (if needed for clean reinstall)
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS user_favorites CASCADE;
DROP TABLE IF EXISTS place_videos CASCADE;
DROP TABLE IF EXISTS place_images CASCADE;
DROP TABLE IF EXISTS places CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ============================================================
-- TABLE: users
-- Description: Stores user account information
-- ============================================================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX idx_users_email ON users(email);

-- ============================================================
-- TABLE: places
-- Description: Stores information about tourism destinations
-- ============================================================
CREATE TABLE places (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50),
    location VARCHAR(255),
    city VARCHAR(100),
    district VARCHAR(100),
    state VARCHAR(100),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    description TEXT,
    image_url VARCHAR(500),
    rating DECIMAL(3, 2),
    highlights TEXT[],
    best_season VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX idx_places_category ON places(category);
CREATE INDEX idx_places_city ON places(city);
CREATE INDEX idx_places_district ON places(district);
CREATE INDEX idx_places_name ON places(name);

-- ============================================================
-- TABLE: place_images
-- Description: Stores gallery images for each place
-- ============================================================
CREATE TABLE place_images (
    id SERIAL PRIMARY KEY,
    place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    description VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on place_id for faster queries
CREATE INDEX idx_place_images_place_id ON place_images(place_id);

-- ============================================================
-- TABLE: place_videos
-- Description: Stores videos for each place
-- ============================================================
CREATE TABLE place_videos (
    id SERIAL PRIMARY KEY,
    place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
    video_url VARCHAR(500) NOT NULL,
    title VARCHAR(255),
    description TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on place_id for faster queries
CREATE INDEX idx_place_videos_place_id ON place_videos(place_id);

-- ============================================================
-- TABLE: user_favorites
-- Description: Stores user's favorite places
-- ============================================================
CREATE TABLE user_favorites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, place_id)
);

-- Create indexes for faster queries
CREATE INDEX idx_user_favorites_user_id ON user_favorites(user_id);
CREATE INDEX idx_user_favorites_place_id ON user_favorites(place_id);

-- ============================================================
-- TABLE: reviews
-- Description: Stores user reviews and ratings for places
-- ============================================================
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating DECIMAL(3, 2),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX idx_reviews_place_id ON reviews(place_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);

-- ============================================================
-- NOTES:
-- 1. Image paths should be in format: images/FolderName/filename.ext
-- 2. All image files should be stored in backend/Images/ directory
-- 3. Video files should be stored in backend/Images/ directory
-- 4. The server serves static files from /Images route
-- 5. Frontend accesses images via: http://localhost:5000/Images/path
-- ============================================================
