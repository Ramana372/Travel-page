import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "./api.js";
import { motion } from 'framer-motion';

const IMAGE_BASE_URL = "http://localhost:5000/Images/";

const MandalaWatermark = ({ position = "top-right" }) => (
  <svg 
    className={`absolute ${position} w-20 h-20 opacity-10 pointer-events-none`}
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    <defs>
      <pattern id="mandala-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#D4A017" strokeWidth="0.8"/>
        <circle cx="50" cy="50" r="35" fill="none" stroke="#D4A017" strokeWidth="0.6"/>
        <circle cx="50" cy="50" r="25" fill="none" stroke="#D4A017" strokeWidth="0.6"/>
        <circle cx="50" cy="50" r="15" fill="none" stroke="#D4A017" strokeWidth="0.8"/>
        <circle cx="50" cy="50" r="5" fill="#D4A017"/>
      </pattern>
    </defs>
    <rect width="100" height="100" fill="url(#mandala-pattern)"/>
  </svg>
);

const Places = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const defaultImage = "/Images/carousel-img2.jpg";
  const defaultCategory = searchParams.get("category") || "all";
  const searchQuery = searchParams.get("search") || "";
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return defaultImage;
    const cleanPath = imagePath.startsWith('images/') ? imagePath.substring(7) : imagePath;
    return `${IMAGE_BASE_URL}${cleanPath}`;
  };

  const categories = [
    { id: "all", name: "All Places", emoji: "🌍" },
    { id: "hills", name: "Hills & Mountains", emoji: "⛰️" },
    { id: "beaches", name: "Beaches", emoji: "🏖️" },
    { id: "waterfalls", name: "Waterfalls", emoji: "💧" },
    { id: "caves", name: "Caves", emoji: "🪨" },
    { id: "temples", name: "Temples", emoji: "🏛️" },
    { id: "forts", name: "Forts", emoji: "🏰" },
    { id: "nature", name: "Nature & Wildlife", emoji: "🌿" }
  ];

  useEffect(() => {
    fetchPlaces();
  }, []);

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category") || "all";
    const searchFromUrl = searchParams.get("search") || "";
    setSelectedCategory(categoryFromUrl);
    
    if (searchFromUrl.trim()) {
      const searchLower = searchFromUrl.toLowerCase();
      const searchFiltered = places.filter(place =>
        place.name.toLowerCase().includes(searchLower) ||
        place.location?.toLowerCase().includes(searchLower) ||
        place.city?.toLowerCase().includes(searchLower) ||
        place.description?.toLowerCase().includes(searchLower)
      );
      setFilteredPlaces(searchFiltered);
    }
  }, [searchParams]);

  useEffect(() => {
    filterPlaces();
  }, [selectedCategory, places]);

  const filterPlaces = () => {
    const searchFromUrl = searchParams.get("search") || "";
    let filtered = places;
    
    if (searchFromUrl.trim()) {
      const searchLower = searchFromUrl.toLowerCase();
      filtered = filtered.filter(place =>
        place.name.toLowerCase().includes(searchLower) ||
        place.location?.toLowerCase().includes(searchLower) ||
        place.city?.toLowerCase().includes(searchLower) ||
        place.description?.toLowerCase().includes(searchLower)
      );
    }
    
    if (selectedCategory === "all") {
      setFilteredPlaces(filtered);
    } else if (selectedCategory === "nature") {
      const natureFiltered = filtered.filter(place => {
        const category = place.category?.toLowerCase();
        return category === "eco-tourism" || 
               category === "wildlife" || 
               category === "valleys" || 
               category === "villages";
      });
      setFilteredPlaces(natureFiltered);
    } else {
      const categoryFiltered = filtered.filter(place =>
        place.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredPlaces(categoryFiltered);
    }
  };

  const fetchPlaces = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await API.get("/places");
      if (response.data) {
        setPlaces(response.data);
      } else {
        setError("No places data received from server");
        setPlaces([]);
      }
    } catch (error) {
      console.error("Error loading places:", error);
      setError("Error loading places. Please try again later.");
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceClick = (placeId) => {
    navigate(`/places/${placeId}`);
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = defaultImage;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] via-[#FEFDFB] to-[#F6F4EF] pt-20 pb-20">
        <div className="text-center text-lg font-semibold animate-pulse" style={{ color: '#2B2B2B' }}>
          <span style={{ fontFamily: "'Playfair Display', serif" }}>Loading destinations...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] via-[#FEFDFB] to-[#F6F4EF] pt-32 pb-24 px-0 overflow-x-hidden relative">
      <div className="absolute inset-0 opacity-3 pointer-events-none">

      </div>
      <motion.div 
        className="text-center mb-24 px-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {searchQuery ? (
          <div>
            <h2 
              className="text-5xl sm:text-6xl font-black mb-4 tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif", color: '#2B2B2B' }}
            >
              Search Results
            </h2>
            <p className="text-xl sm:text-2xl mb-2" style={{ color: '#6B6B6B' }}>
              for: "{searchQuery}"
            </p>
            <motion.div 
              className="h-1 bg-gradient-to-r from-[#F28C28] to-[#F5A855] mx-auto mt-6"
              style={{ width: "15%" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        ) : (
          <div>
            <h2 
              className="text-5xl sm:text-6xl font-black mb-6 tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif", color: '#2B2B2B' }}
            >
              Explore Amazing Destinations
            </h2>
            <p className="text-lg sm:text-xl mb-2" style={{ color: '#6B6B6B' }}>
              Discover the heritage and beauty across India
            </p>
            <motion.div 
              className="h-1 bg-gradient-to-r from-[#F28C28] to-[#F5A855] mx-auto mt-6"
              style={{ width: "20%" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        )}
      </motion.div>

      {error && (
        <motion.p 
          className="text-center text-base mx-auto mb-8 px-8 py-5 rounded-2xl shadow-lg border-2 max-w-2xl font-medium relative z-10"
          style={{
            color: '#2B2B2B',
            backgroundColor: 'rgba(242, 140, 40, 0.1)',
            borderColor: 'rgba(242, 140, 40, 0.4)'
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {error}
        </motion.p>
      )}

      <motion.div 
        className="sticky top-24 z-40 pt-4 pb-12 mb-12 relative z-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(250, 249, 246, 1), rgba(250, 249, 246, 0.7))'
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex flex-wrap justify-center gap-4 px-6 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              id={`category-${category.id}`}
              onClick={() => setSelectedCategory(category.id)}
              className="px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap border-2 flex items-center gap-2"
              style={{
                backgroundColor: selectedCategory === category.id ? '#F28C28' : '#FEFDFB',
                color: selectedCategory === category.id ? 'white' : '#2B2B2B',
                borderColor: selectedCategory === category.id ? '#F28C28' : '#D4A017',
                boxShadow: selectedCategory === category.id ? '0 8px 20px rgba(242, 140, 40, 0.3)' : '0 4px 12px rgba(43, 43, 43, 0.06)'
              }}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <span className="text-lg">{category.emoji}</span>
              {category.name}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {filteredPlaces.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {filteredPlaces.map((place, index) => (
              <motion.div
                key={place.id}
                onClick={() => handlePlaceClick(place.id)}
                className="group relative cursor-pointer rounded-3xl overflow-hidden h-full flex flex-col shadow-lg hover:shadow-2xl transition-all duration-500"
                style={{
                  backgroundColor: '#FEFDFB',
                  borderWidth: '2px',
                  borderColor: '#D4A017',
                  boxShadow: '0 8px 24px rgba(43, 43, 43, 0.06)'
                }}
                whileHover={{ 
                  y: -16,
                  boxShadow: '0 16px 48px rgba(43, 43, 43, 0.12)'
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="absolute top-0 right-0 z-0">
                  <MandalaWatermark position="top-right" />
                </div>
                <div className="absolute bottom-0 left-0 z-0">
                  <MandalaWatermark position="bottom-left" />
                </div>

                <div className="relative w-full h-80 overflow-hidden bg-gradient-to-br from-[#FEFDFB] to-[#F6F4EF]">
                  <img
                    src={getImageUrl(place.image_url)}
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                    onError={handleImageError}
                    loading="lazy"
                    style={{ filter: 'saturate(1.05) brightness(0.98)' }}
                  />
                  <div 
                    className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-30"
                    style={{ background: 'linear-gradient(135deg, rgba(242, 140, 40, 0.2), rgba(43, 43, 43, 0.1))' }}
                  />
                  <motion.div
                    className="absolute top-5 left-5 px-4 py-2 rounded-full font-bold text-sm text-white z-10"
                    style={{
                      backgroundColor: '#F28C28',
                      boxShadow: '0 4px 12px rgba(242, 140, 40, 0.4)'
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {place.category || "Destination"}
                  </motion.div>
                </div>

                <div className="p-8 flex-1 flex flex-col relative z-10" style={{ backgroundColor: '#FEFDFB' }}>
                  <h3 
                    className="text-2xl font-bold mb-4 line-clamp-2"
                    style={{ fontFamily: "'Playfair Display', serif", color: '#2B2B2B' }}
                  >
                    {place.name}
                  </h3>

                  <p className="text-sm leading-relaxed mb-6 flex-1 line-clamp-3" style={{ color: '#6B6B6B' }}>
                    {place.description}
                  </p>

                  <div className="flex items-center gap-3 text-sm font-bold mt-auto">
                    <span className="text-xl">📍</span>
                    <span style={{ color: '#4A3F35' }}>{place.location || place.city}</span>
                  </div>

                  <motion.div
                    className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ y: 10 }}
                    whileHover={{ y: 0 }}
                  >
                    <button
                      className="w-full py-3 rounded-xl font-bold text-white transition-all duration-300"
                      style={{
                        backgroundColor: '#F28C28',
                        boxShadow: '0 6px 16px rgba(242, 140, 40, 0.3)'
                      }}
                    >
                      Discover More →
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-24 px-8 rounded-3xl border-2"
            style={{
              backgroundColor: '#FEFDFB',
              borderColor: '#D4A017',
              boxShadow: '0 8px 24px rgba(43, 43, 43, 0.06)'
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p 
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "'Playfair Display', serif", color: '#2B2B2B' }}
            >
              No Destinations Found
            </p>
            <p style={{ color: '#6B6B6B' }}>
              Try adjusting your filters to discover more amazing places
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Places;
