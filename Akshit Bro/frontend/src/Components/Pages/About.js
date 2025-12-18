import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IMAGE_BASE_URL = "http://localhost:5000/Images/";

const About = () => {
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <div className="min-h-screen bg-amber-50">
            <div className="bg-gradient-to-br from-amber-700 via-amber-700 to-amber-600 min-h-96 flex items-center justify-center relative overflow-hidden pt-20">
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100" height="100" fill="url(%23grid)"/%3E%3C/svg%3E")'
                }}></div>
                <div className="text-center text-white z-10 px-6">
                    <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-4 drop-shadow-lg">Discover Andhra Pradesh</h1>
                    <p className="text-xl md:text-2xl font-light opacity-95">Your Ultimate Guide to Exploring the Jewels of South India</p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
                
                <div className="grid md:grid-cols-2 gap-8">
                    {[
                        { icon: '🎯', title: 'Our Mission', text: 'To showcase the breathtaking beauty and rich cultural heritage of Andhra Pradesh, making it accessible to travelers worldwide. We\'re dedicated to promoting sustainable tourism while preserving the authentic essence of each destination.' },
                        { icon: '🌟', title: 'Our Vision', text: 'To establish Andhra Pradesh as a premier tourist destination in India, celebrated for its pristine beaches, majestic temples, stunning hill stations, and warm hospitality that creates unforgettable memories.' }
                    ].map((card, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-200">
                            <div className="text-4xl mb-4">{card.icon}</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-playfair">{card.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{card.text}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-10 border border-amber-200">
                    <h2 className="text-3xl md:text-4xl font-playfair font-bold text-amber-900 mb-6">Our Story</h2>
                    <p className="text-amber-800 leading-relaxed text-lg">
                        Born from a deep love for Andhra Pradesh's diverse landscapes and rich cultural tapestry, our platform has been connecting travelers with the state's hidden gems since 2020. From the sacred temples of Tirupati to the pristine beaches of Visakhapatnam, from the misty hills of Araku Valley to the historic forts of Chandragiri - we've curated an extensive collection of destinations that showcase the best of what Andhra Pradesh has to offer. Our journey is driven by the belief that travel is not just about visiting places, but about immersing yourself in local cultures, savoring regional cuisines, and creating memories that last a lifetime.
                    </p>
                </div>

                <div>
                    <h2 className="text-3xl md:text-4xl font-playfair font-bold text-amber-900 mb-12 text-center">Why Choose Us</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: '🗺️', title: 'Comprehensive Guides', desc: 'Detailed information about 32+ tourist destinations across Andhra Pradesh' },
                            { icon: '📸', title: 'Authentic Photography', desc: 'High-quality images captured by professional travel photographers' },
                            { icon: '💡', title: 'Expert Insights', desc: 'Local tips, best times to visit, and hidden gems known only to insiders' },
                            { icon: '🎯', title: 'Easy Navigation', desc: 'Filter destinations by category - beaches, temples, hills, waterfalls & more' },
                            { icon: '🌍', title: 'Cultural Heritage', desc: 'Discover the rich history and traditions of each destination' },
                            { icon: '⭐', title: 'Trusted Reviews', desc: 'Real experiences shared by thousands of satisfied travelers' }
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-amber-100">
                                <div className="text-4xl mb-3">{feature.icon}</div>
                                <h3 className="font-bold text-amber-900 mb-2">{feature.title}</h3>
                                <p className="text-amber-700 text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-playfair font-bold text-amber-900 mb-12">Meet Our Expert</h2>
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-200 max-w-md mx-auto">
                        <img src={`${IMAGE_BASE_URL}Akshit/Akshit.jpg`} alt="Akshit" className="w-48 h-48 rounded-full mx-auto mb-6 border-4 border-amber-700 object-cover" />
                        <h3 className="text-2xl font-bold text-amber-900 mb-2 font-playfair">Akshit</h3>
                        <p className="text-amber-700 font-semibold mb-4">Travel Vlogger & Content Creator</p>
                        <p className="text-amber-800 leading-relaxed mb-6">
                            With 4 years of dedicated travel content creation, Akshit has captured the essence of Andhra Pradesh's beauty through cinematic videos. His passion for authentic storytelling and adventure has helped thousands discover hidden gems across the region through his YouTube channel "Akshit Travel Diaries".
                        </p>
                        <div className="flex justify-center gap-4">
                            <a href="https://www.youtube.com/@AkshitTravelDiaries" target="_blank" rel="noopener noreferrer" className="text-3xl hover:scale-125 transition-transform">🎥</a>
                            <a href="https://www.youtube.com/@AkshitTravelDiaries" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-semibold hover:bg-red-700 transition-colors">Subscribe</a>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-amber-700 to-amber-600 rounded-2xl p-12 text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Ready to Explore?</h2>
                    <p className="text-lg opacity-90 mb-8">Start your journey through the magnificent landscapes and cultural treasures of Andhra Pradesh</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={() => navigate('/places')} className="px-8 py-3 bg-white text-amber-700 rounded-full font-semibold hover:bg-amber-50 transition-colors">
                            Explore Destinations
                        </button>
                        <button onClick={() => navigate('/expert')} className="px-8 py-3 bg-amber-600/20 hover:bg-amber-500/30 rounded-full font-semibold border border-white transition-colors">
                            View Photo Gallery
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;