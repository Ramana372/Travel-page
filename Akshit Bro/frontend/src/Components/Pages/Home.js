import React, { useContext, useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from './context/AuthContext';
import { motion } from 'framer-motion';

const IMAGE_BASE_URL = "http://localhost:5000/Images/";

const IndianMotifsPattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-3" preserveAspectRatio="none">
    <defs>
      <pattern id="mandala" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
        <circle cx="100" cy="100" r="80" fill="none" stroke="#F28C28" strokeWidth="1"/>
        <circle cx="100" cy="100" r="60" fill="none" stroke="#F28C28" strokeWidth="0.5"/>
        <circle cx="100" cy="100" r="40" fill="none" stroke="#F28C28" strokeWidth="0.5"/>
        <circle cx="100" cy="100" r="20" fill="none" stroke="#F28C28" strokeWidth="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#mandala)"/>
  </svg>
);

function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.includes('/Images/')) return imagePath;
    const cleanPath = imagePath.startsWith('images/') ? imagePath.substring(7) : imagePath;
    return `${IMAGE_BASE_URL}${cleanPath}`;
  };

  const heroImages = [
    `${IMAGE_BASE_URL}carousel-img2.jpg`,
    `${IMAGE_BASE_URL}KothapalliWaterfalls/Kothapalli_waterfalls.jpg`,
    `${IMAGE_BASE_URL}PapiHills/papi_hills1.webp`,
    `${IMAGE_BASE_URL}Rushikonda_Beach/Rushikonda_beach.webp`,
    `${IMAGE_BASE_URL}BorraCaves/borra_caves.webp`
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const categories = [
    { id: 'all', name: 'All Destinations', icon: '🌍' },
    { id: 'beaches', name: 'Beaches', icon: '🏖️' },
    { id: 'hills', name: 'Mountains', icon: '⛰️' },
    { id: 'temples', name: 'Heritage', icon: '🏛️' }
  ];

  const Famousplace = [
    { img: `${IMAGE_BASE_URL}KothapalliWaterfalls/Kothapalli_waterfalls.jpg`, name: "Waterfalls", category: "waterfalls", description: "Pristine natural beauty", cta: "Discover Waterfalls" },
    { img: `${IMAGE_BASE_URL}Rushikonda_Beach/Rushikonda_beach.webp`, name: "Beaches", category: "beaches", description: "Coastal paradise", cta: "Visit Beaches" },
    { img: `${IMAGE_BASE_URL}PapiHills/papi_hills1.webp`, name: "Mountains", category: "hills", description: "Scenic hill stations", cta: "Explore Mountains" },
    { img: `${IMAGE_BASE_URL}1000Pillars/1000pillerstemple.jpg`, name: "Heritage Sites", category: "temples", description: "Ancient wonders", cta: "Tour Heritage Sites" },
    { img: `${IMAGE_BASE_URL}BorraCaves/borra_caves.webp`, name: "Caves", category: "caves", description: "Underground marvels", cta: "Enter Caves" },
    { img: `${IMAGE_BASE_URL}ChandaragiriFort/Chandaragiri_fort.jpg`, name: "Forts", category: "forts", description: "Historic landmarks", cta: "Visit Forts" }
  ];

  const features = [
    { 
      icon: "🗺️", 
      title: "Curated Destinations", 
      description: "Hand-picked locations showcasing natural beauty and cultural heritage",
      link: "/places",
      cta: "Explore Places →"
    },
    { 
      icon: "📸", 
      title: "Visual Guides", 
      description: "Stunning photography and detailed descriptions of each destination",
      link: "/places",
      cta: "View Gallery →"
    },
    { 
      icon: "⭐", 
      title: "Expert Insights", 
      description: "Travel tips and local knowledge from experienced explorers",
      link: "/blog",
      cta: "Read Stories →"
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const destinationSliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: { 
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: { 
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ]
  };

  const handlePlaceClick = (category) => navigate(`/places?category=${category}`);
  
  const handleExploreClick = () => navigate('/expert');
  
  const filteredPlaces = activeCategory === 'all' 
    ? Famousplace 
    : Famousplace.filter(place => place.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF9F6] via-[#FEFDFB] to-[#F6F4EF]">
      <section className="relative h-screen overflow-hidden group">
        {heroImages.map((img, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/35 to-black/50" />

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p 
            className="text-sm md:text-base font-semibold tracking-widest mb-6"
            style={{ color: '#F28C28' }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✨ DISCOVER AMAZING DESTINATIONS ✨
          </motion.p>
          
          <div className="relative mb-8">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight text-white drop-shadow-2xl" 
                style={{ fontFamily: "'Playfair Display', serif" }}>
              Journey Through <br /> Unforgettable Moments
            </h1>
            <motion.div 
              className="absolute inset-x-0 mx-auto h-1 bg-gradient-to-r from-[#F28C28] via-[#F5A855] to-[#F28C28]"
style={{ width: "93%", bottom: "-20px" }}

              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
          
          <p className="text-lg md:text-2xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed font-light mt-6">
            Explore remarkable destinations with curated experiences and authentic stories
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-4">
            <motion.button
              onClick={() => navigate('/places')}
              className="px-10 md:px-14 py-4 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
              style={{
                backgroundColor: '#F28C28',
                boxShadow: '0 12px 30px rgba(242, 140, 40, 0.35)'
              }}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Destinations →
            </motion.button>
            <motion.button
              onClick={() => navigate('/about')}
              className="px-10 md:px-14 py-4 backdrop-blur-md border-2 text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-lg"
              style={{ borderColor: 'rgba(255,255,255,0.6)' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-10">
          <motion.button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
            className="text-white text-3xl transition-colors hover:text-[#F28C28]"
            whileHover={{ scale: 1.2 }}
          >
            ‹
          </motion.button>
          <div className="flex gap-2">
            {heroImages.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-[#F28C28] w-8' : 'bg-white/60 w-3'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
          <motion.button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroImages.length)}
            className="text-white text-3xl hover:text-[#D4A017] transition-colors"
            whileHover={{ scale: 1.2 }}
          >
            ›
          </motion.button>
        </div>
      </section>

      <motion.section
        className="py-24 px-4 md:px-8 bg-gradient-to-b from-[#FFFDF8] via-[#FBF9F4] to-[#F8F7F4]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >


        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="mb-20 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold tracking-widest mb-4 uppercase" style={{ color: '#F28C28' }}>
              🌍 FEATURED DESTINATIONS
            </p>
            <div className="relative inline-block md:block">
              <h2 
                className="text-5xl md:text-6xl font-black mb-4"
                style={{ fontFamily: "'Playfair Display', serif", color: '#2B2B2B' }}
              >
                Explore Amazing Places
              </h2>
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#F28C28] to-[#F5A855]"
                style={{ width: "52%", bottom: "-12px" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <p className="max-w-2xl mt-6" style={{ color: '#6B6B6B' }}>
              Discover captivating destinations with curated experiences
            </p>
          </motion.div>

          <div className="destinations-slider">
            <Slider {...destinationSliderSettings}>
              {Famousplace.map((dest, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="px-3"
                >
                  <div 
                    className="rounded-3xl overflow-hidden hover:scale-105 transition-all duration-400 h-full border-2 backdrop-blur-sm group shadow-lg hover:shadow-2xl"
                    style={{
                      backgroundColor: '#FEFDFB',
                      borderColor: '#D4A017',
                      boxShadow: '0 8px 24px rgba(43, 43, 43, 0.06)'
                    }}
                  >
                    <div className="relative h-80 overflow-hidden">
                      <motion.img
                        src={dest.img}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-75" />
                      
                      <motion.span 
                        className="absolute top-5 right-5 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                        style={{ backgroundColor: '#F28C28' }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {dest.category}
                      </motion.span>
                    </div>

                    <div className="p-8">
                      <h3 
                        className="text-2xl font-bold mb-3"
                        style={{ fontFamily: "'Playfair Display', serif", color: '#2B2B2B' }}
                      >
                        {dest.name}
                      </h3>
                      <p className="mb-8 text-base leading-relaxed line-clamp-2" style={{ color: '#6B6B6B' }}>
                        {dest.description}
                      </p>
                      <motion.button
                        onClick={() => navigate('/places')}
                        className="w-full text-white font-bold py-3 rounded-xl transition-all duration-300"
                        style={{ 
                          backgroundColor: '#F28C28',
                          boxShadow: '0 8px 20px rgba(242, 140, 40, 0.3)'
                        }}
                        whileHover={{ scale: 1.02, boxShadow: '0 12px 30px rgba(242, 140, 40, 0.4)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Discover →
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </Slider>
          </div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.button
              onClick={() => navigate('/places')}
              className="px-12 py-4 border-2 rounded-xl font-bold text-lg transition-all duration-300 text-white"
              style={{
                backgroundColor: '#F28C28',
                borderColor: '#F28C28',
                boxShadow: '0 8px 20px rgba(242, 140, 40, 0.2)'
              }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 12px 30px rgba(242, 140, 40, 0.35)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              View All Destinations →
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="py-24 px-4 md:px-8 bg-gradient-to-b from-[#FBF9F4] via-[#FFFDF8] to-[#FBF9F4] relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >


        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold tracking-widest mb-4 uppercase" style={{ color: '#F28C28' }}>
              WHY CHOOSE US
            </p>
            <h2 
              className="text-5xl md:text-6xl font-black mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: '#2B2B2B' }}
            >
              Your Complete Travel Companion
            </h2>
            <motion.div 
              className="h-1 bg-gradient-to-r from-[#F28C28] to-[#F5A855] mt-4"
              style={{ width: "74.5%", bottom: "6px" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <p className="text-base max-w-2xl mt-6" style={{ color: '#6B6B6B' }}>
              Experience travel like never before with our premium, curated services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: '🗺️',
                title: 'Curated Destinations',
                description: 'Hand-picked locations showcasing natural beauty and cultural heritage'
              },
              {
                icon: '📸',
                title: 'Visual Guides',
                description: 'Stunning photography and detailed descriptions capturing the essence'
              },
              {
                icon: '⭐',
                title: 'Expert Insights',
                description: 'Travel tips and local knowledge from experienced explorers'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="rounded-3xl p-10 border-2 hover:scale-105 transition-all duration-400 overflow-hidden group"
                style={{
                  backgroundColor: '#FEFDFB',
                  borderColor: '#D4A017',
                  boxShadow: '0 8px 24px rgba(43, 43, 43, 0.06)'
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
              >
                <motion.div 
                  className="text-6xl mb-8 inline-block"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "'Playfair Display', serif", color: '#2B2B2B' }}
                >
                  {feature.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: '#6B6B6B' }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-24 px-4 md:px-8 bg-gradient-to-b from-[#FEFDFB] to-[#F6F4EF] relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >


        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold tracking-widest mb-4 uppercase" style={{ color: '#F28C28' }}>
              OUR TEAM
            </p>
            <div className="relative inline-block">
              <h2 
                className="text-5xl md:text-6xl font-black mb-6"
                style={{ fontFamily: "'Playfair Display', serif", color: '#2B2B2B' }}
              >
                Meet Travel Experts
              </h2>
              <div 
                className="absolute inset-x-0 mx-auto h-1 bg-gradient-to-r from-[#F28C28] via-[#F5A855] to-[#F28C28]"
                style={{ width: "99%", bottom: "10px" }}
              />
            </div>
            <p className="text-lg max-w-2xl" style={{ color: '#6B6B6B' }}>
              Passionate explorers sharing authentic experiences and insider knowledge from across India
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              className="rounded-3xl overflow-hidden border-2 hover:scale-105 transition-all duration-400"
              style={{
                backgroundColor: '#FEFDFB',
                borderColor: '#D4A017',
                boxShadow: '0 12px 40px rgba(43, 43, 43, 0.06)'
              }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -8 }}
            >
              <div className="relative h-72 overflow-hidden group">
                <img
                  src="/Images/Akshit/Akshit.jpg"
                  alt="Akshit"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-10">
                <div className="flex items-center justify-between mb-3">
                  <h3 
                    className="text-2xl font-bold"
                    style={{ fontFamily: "'Playfair Display', serif", color: '#2B2B2B' }}
                  >
                    Akshit
                  </h3>
                  <span className="px-4 py-2 text-xs font-bold rounded-full"
                        style={{ backgroundColor: 'rgba(242, 140, 40, 0.1)', color: '#F28C28' }}>
                    Expert
                  </span>
                </div>
                <p className="font-bold mb-4" style={{ color: '#F28C28' }}>Lead Travel Expert</p>
                <p className="leading-relaxed mb-8" style={{ color: '#6B6B6B' }}>
                  With over 5 years of exploring hidden gems across India, Akshit brings authentic travel insights and carefully curated experiences to every journey.
                </p>
                <motion.button 
                  className="w-full text-white py-3 px-4 rounded-xl font-bold transition-all duration-300"
                  style={{ 
                    backgroundColor: '#F28C28',
                    boxShadow: '0 8px 20px rgba(242, 140, 40, 0.2)'
                  }}
                  whileHover={{ scale: 1.05, boxShadow: '0 12px 30px rgba(242, 140, 40, 0.35)' }}
                >
                  View Profile
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              className="rounded-3xl overflow-hidden border-2 hover:scale-105 transition-all duration-400"
              style={{
                backgroundColor: '#FEFDFB',
                borderColor: '#D4A017',
                boxShadow: '0 12px 40px rgba(43, 43, 43, 0.06)'
              }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="h-72 overflow-hidden group">
                <video
                  src="/Images/video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-10">
                <h3 
                  className="text-3xl font-bold mb-4"
                  style={{ fontFamily: "'Playfair Display', serif", color: '#2B2B2B' }}
                >
                  Discover Stories
                </h3>
                <p className="leading-relaxed mb-8" style={{ color: '#6B6B6B' }}>
                  Join us on a transformative journey through breathtaking landscapes, authentic cultural experiences, and unforgettable adventures across India.
                </p>
                <motion.button
                  onClick={() => navigate('/expert')}
                  className="w-full text-white font-bold py-3 px-4 rounded-xl transition-all duration-300"
                  style={{ 
                    backgroundColor: '#F28C28',
                    boxShadow: '0 8px 20px rgba(242, 140, 40, 0.2)'
                  }}
                  whileHover={{ scale: 1.05, boxShadow: '0 12px 30px rgba(242, 140, 40, 0.35)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore More →
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-24 px-4 md:px-8 relative overflow-hidden"
        style={{ backgroundColor: '#FFFDF8' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        
        <motion.div
          className="max-w-5xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="rounded-3xl p-16 md:p-20 relative overflow-hidden group border-2"
            style={{
              background: 'linear-gradient(135deg, #F28C28 0%, #D4A017 50%, #F28C28 100%)',
              borderColor: '#D4A017',
              boxShadow: '0 20px 60px rgba(242, 140, 40, 0.35)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#7B2236]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <h2 
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 text-white relative z-10 drop-shadow-lg"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Ready for Your Indian Adventure?
            </h2>
            <p className="text-white/95 text-xl mb-12 leading-relaxed relative z-10 font-light">
              Start exploring our curated collection of India's most beautiful and culturally rich destinations
            </p>
            <div className="relative z-10 flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                onClick={() => navigate('/places')}
                className="px-12 py-4 text-[#F28C28] font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 border-2 border-white/30"
                style={{ backgroundColor: 'white' }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Exploring Now →
              </motion.button>
              <motion.button
                onClick={() => navigate('/contact')}
                className="px-12 py-4 text-white font-bold text-lg rounded-xl border-2 border-white/60 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Help
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}

export default Home;
