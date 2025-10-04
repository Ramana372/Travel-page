import React, { useEffect } from 'react';
import './About.css';

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <div className="about-page container-fluid">
            <div className="about-hero">
                <div className="about-hero-content">
                    <h1>About Travel Guide</h1>
                    <p>Discover the world with us</p>
                </div>
            </div>

            <div className="about-content">
                <div className="about-section">
                    <div className="mission-vision">
                        <div className="mission-card">
                            <h3>Our Mission</h3>
                            <p>To inspire and enable travelers to explore the world's most beautiful destinations while providing authentic experiences and creating lasting memories.</p>
                        </div>
                        <div className="vision-card">
                            <h3>Our Vision</h3>
                            <p>To become the most trusted travel companion for adventurers worldwide, connecting people with unique destinations and unforgettable experiences.</p>
                        </div>
                    </div>
                </div>

                <div className="about-section">
                    <h2>Our Story</h2>
                    <p>Founded with a passion for travel and exploration, Travel Guide has been helping adventurers discover the world's hidden gems since 2020. We believe that travel is not just about visiting places, but about experiencing cultures, meeting people, and creating memories that last a lifetime.</p>
                </div>

                <div className="about-section team-section">
                    <h2>Meet Our Team</h2>
                    <div className="team-grid">
                        <div className="team-member">
                            <img src="/Images/Akshit.jpg" alt="Akshit" />
                            <h3>Akshit</h3>
                            <p>Lead Traveler</p>
                            <div className="bio">
                                Passionate about exploring hidden gems and sharing authentic travel experiences.
                            </div>
                        </div>
                        <div className="team-member">
                            <img src="/Images/team2.jpg" alt="Sarah" />
                            <h3>Sarah Johnson</h3>
                            <p>Travel Consultant</p>
                            <div className="bio">
                                Expert in crafting personalized travel itineraries and cultural experiences.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;