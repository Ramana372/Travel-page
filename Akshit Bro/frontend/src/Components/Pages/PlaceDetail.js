import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from 'framer-motion';
import API from "./api.js";

const IMAGE_BASE_URL = "http://localhost:5000/Images/";

const getCategoryTheme = (category) => {
  const themes = {
    beaches: {
      primary: "#0077BE",
      secondary: "#00B4D8",
      accent: "#48CAE4",
      text: "#023E8A",
      light: "#E0F7FF",
      gradient: "linear-gradient(135deg, #0077BE 0%, #00B4D8 100%)",
      icon: "🏖️"
    },
    hills: {
      primary: "#2D6A4F",
      secondary: "#40916C",
      accent: "#52B788",
      text: "#1B4332",
      light: "#D8F3DC",
      gradient: "linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)",
      icon: "⛰️"
    },
    heritage: {
      primary: "#8B4513",
      secondary: "#CD853F",
      accent: "#DEB887",
      text: "#654321",
      light: "#F5E6D3",
      gradient: "linear-gradient(135deg, #8B4513 0%, #CD853F 100%)",
      icon: "🏛️"
    },
    nature: {
      primary: "#6A4C93",
      secondary: "#9D7E8F",
      accent: "#C8A882",
      text: "#4A3B6B",
      light: "#F0E6F6",
      gradient: "linear-gradient(135deg, #6A4C93 0%, #9D7E8F 100%)",
      icon: "🌿"
    },
    spiritual: {
      primary: "#D4A017",
      secondary: "#F4D35E",
      accent: "#EE964B",
      text: "#8B6914",
      light: "#FFF8E7",
      gradient: "linear-gradient(135deg, #D4A017 0%, #F4D35E 100%)",
      icon: "🙏"
    },
    cities: {
      primary: "#264653",
      secondary: "#2A9D8F",
      accent: "#E9C46A",
      text: "#1B3A3A",
      light: "#E8F4F8",
      gradient: "linear-gradient(135deg, #264653 0%, #2A9D8F 100%)",
      icon: "🏙️"
    },
    caves: {
      primary: "#423B34",
      secondary: "#6B5B4A",
      accent: "#8B7355",
      text: "#2C2416",
      light: "#F5F1ED",
      gradient: "linear-gradient(135deg, #423B34 0%, #6B5B4A 100%)",
      icon: "🪨"
    },
    temples: {
      primary: "#B8651B",
      secondary: "#D4915B",
      accent: "#F0AD4E",
      text: "#7A4419",
      light: "#FEF1E1",
      gradient: "linear-gradient(135deg, #B8651B 0%, #D4915B 100%)",
      icon: "🏯"
    },
    waterfalls: {
      primary: "#0B6E99",
      secondary: "#3FA796",
      accent: "#A0D8D8",
      text: "#063970",
      light: "#E1F5FF",
      gradient: "linear-gradient(135deg, #0B6E99 0%, #3FA796 100%)",
      icon: "💧"
    },
    forts: {
      primary: "#5F4A42",
      secondary: "#8B7355",
      accent: "#D4A574",
      text: "#3E342E",
      light: "#F5EFE7",
      gradient: "linear-gradient(135deg, #5F4A42 0%, #8B7355 100%)",
      icon: "🏰"
    }
  };
  
  return themes[category?.toLowerCase()] || themes.nature;
};

const CulturalPattern = ({ type = "mandala" }) => (
  <svg 
    className="absolute inset-0 w-full h-full opacity-3 pointer-events-none"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <pattern id="cultural-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.8"/>
        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.6"/>
        <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.6"/>
        <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.8"/>
        <circle cx="50" cy="50" r="5" fill="currentColor"/>
        <path d="M50,50 L65,50 M50,50 L35,50 M50,50 L50,65 M50,50 L50,35" stroke="currentColor" strokeWidth="0.5"/>
      </pattern>
    </defs>
    <rect width="100" height="100" fill="url(#cultural-pattern)"/>
  </svg>
);

const PlaceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [place, setPlace] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [similarPlaces, setSimilarPlaces] = useState([]);
  const [similarPlacesLoading, setSimilarPlacesLoading] = useState(false);
  const [similarPlacesError, setSimilarPlacesError] = useState(null);

  const defaultImage = "https://via.placeholder.com/400x300?text=Placeholder+Image";

  const fetchPlaceDetails = async (signal) => {
    setIsLoading(true);
    setError(null);
    try {
const response = await API.get(`/places/${id}`, { signal });
      const placeData = response.data;

      if (placeData.error || !placeData.id) {
        throw new Error(placeData.error || "Place not found");
      }

      setPlace(placeData);
      setError(null);
    } catch (error) {
      if (error.name === "AbortError") return;
      const errorMessage =
        error.response?.status === 404
          ? "This place could not be found."
          : "Failed to load place details. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSimilarPlaces = async (signal) => {
    if (!place?.latitude || !place?.longitude) {
      setSimilarPlaces([]);
      setSimilarPlacesError("Location coordinates not available.");
      return;
    }

    setSimilarPlacesLoading(true);
    setSimilarPlacesError(null);

    try {
      const response = await API.get(`/places/nearby`, {
        params: {
          latitude: place.latitude,
          longitude: place.longitude,
          radius: 100,
        },
        timeout: 10000,
        signal,
      });

      const nearbyData = Array.isArray(response.data) ? response.data : (response.data?.places || []);

      const filteredPlaces = nearbyData
        .filter((p) => p.id !== parseInt(id))
        .sort((a, b) => (a.distance || 0) - (b.distance || 0))
        .slice(0, 6);

      setSimilarPlaces(filteredPlaces);
      setSimilarPlacesError(null);
    } catch (error) {
      if (error.name === "AbortError") return;
      let errorMessage = "Unable to load nearby places.";
      if (error.code === "ECONNABORTED") {
        errorMessage = "Request timed out. Please check your connection.";
      } else if (error.response?.status === 404) {
        errorMessage = "No nearby places found.";
      } else if (error.response?.status >= 500) {
        errorMessage = "Server error. Please try again later.";
      }
      setSimilarPlaces([]);
      setSimilarPlacesError(errorMessage);
    } finally {
      setSimilarPlacesLoading(false);
    }
  };

  useEffect(() => {
  const controller = new AbortController();

  if (id == null || isNaN(Number(id))) {
    setError("Invalid place ID.");
    setIsLoading(false);
    return;
  }

  window.scrollTo(0, 0);
  fetchPlaceDetails(controller.signal);

  return () => controller.abort();
}, [id]);


  useEffect(() => {
    const controller = new AbortController();
    if (place?.latitude && place?.longitude) {
      fetchSimilarPlaces(controller.signal);
    }
    return () => controller.abort();
  }, [place?.latitude, place?.longitude, id]);

  const getFormattedLocation = (place) => {
    if (!place) return "Location not available";
    const locationParts = [];
    if (place.location) locationParts.push(place.location);
    else if (place.city) locationParts.push(place.city);
    if (place.district && !place.location?.includes(place.district)) {
      locationParts.push(place.district);
    }
    if (place.state && !place.location?.includes(place.state)) {
      locationParts.push(place.state);
    }
    return locationParts.length > 0 ? locationParts.join(", ") : "Location not available";
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return defaultImage;
    const cleanPath = imagePath.startsWith('images/') ? imagePath.substring(7) : imagePath;
    return `${IMAGE_BASE_URL}${cleanPath}`;
  };

  const galleryImages = place?.images?.length
    ? place.images.map(img => getImageUrl(img.image_url))
    : [place?.image_url ? getImageUrl(place.image_url) : defaultImage];

  const videos = place?.videos?.length
    ? place.videos.map((video, index) => ({
        id: index,
        title: place.name ? `${place.name} - Video ${index + 1}` : `Video ${index + 1}`,
        url: getImageUrl(video.video_url),
        fullScreenUrl: getImageUrl(video.video_url)
      }))
    : [];

  
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const openFullScreenVideo = (videoUrl) => {
    setCurrentVideo(videoUrl);
    setIsFullScreen(true);
  };

  const closeFullScreenVideo = () => {
    setCurrentVideo(null);
    setIsFullScreen(false);
  };

  const openGalleryModal = (imageUrl, index) => {
    setActiveImage(imageUrl);
    setActiveImageIndex(index);
    setShowGalleryModal(true);
  };

  const closeGalleryModal = () => {
    setActiveImage(null);
    setShowGalleryModal(false);
  };

  const handleNextImage = () => {
    if (activeImageIndex < galleryImages.length - 1) {
      setActiveImage(galleryImages[activeImageIndex + 1]);
      setActiveImageIndex(activeImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (activeImageIndex > 0) {
      setActiveImage(galleryImages[activeImageIndex - 1]);
      setActiveImageIndex(activeImageIndex - 1);
    }
  };

  const relatedPlacesSettings = {
    dots: false,
    infinite: similarPlaces.length > 3,
    speed: 500,
    slidesToShow: Math.min(3, similarPlaces.length || 1),
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: Math.min(3, similarPlaces.length || 1), slidesToScroll: 1 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: Math.min(2, similarPlaces.length || 1), slidesToScroll: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  const renderMap = () => {
    if (!place?.latitude || !place?.longitude) {
      return (
        <div className="rounded-2xl p-12 text-center border" style={{ backgroundColor: '#FFFFFF', borderColor: '#E3E1DC', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' }}>
          <p className="text-lg" style={{ color: '#555' }}>📍 Map not available - Location coordinates missing</p>
        </div>
      );
    }

    const mapUrl = `https://maps.google.com/maps?q=${place.latitude},${place.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    return (
      <div className="w-full h-96 rounded-2xl overflow-hidden" style={{ border: '1px solid #E3E1DC', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' }}>
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title={`Location Map for ${place.name || "Place"}`}
          onError={() => setError("Failed to load map. Please check your connection.")}
        />
      </div>
    );
  };

  const handleSimilarPlaceClick = (placeId) => {
    navigate(`/places/${placeId}`);
  };

  const renderSimilarPlaces = () => {
    if (similarPlacesLoading) {
      return (
        <motion.div 
          className="flex justify-center items-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center">
            <div 
              className="w-12 h-12 border-4 rounded-full animate-spin mx-auto mb-4"
              style={{
                borderColor: `${place ? getCategoryTheme(place.category).primary : '#D4A017'}20`,
                borderTopColor: place ? getCategoryTheme(place.category).primary : '#D4A017'
              }}
            />
            <p 
              className="text-lg font-medium"
              style={{ color: place ? getCategoryTheme(place.category).text : '#555' }}
            >
              Finding nearby places...
            </p>
          </div>
        </motion.div>
      );
    }

    if (similarPlacesError) {
      return (
        <motion.div 
          className="rounded-3xl p-8 text-center border-4"
          style={{
            backgroundColor: place ? getCategoryTheme(place.category).light : '#FFFFFF',
            borderColor: place ? getCategoryTheme(place.category).accent : '#E3E1DC',
            boxShadow: `0 8px 32px ${place ? getCategoryTheme(place.category).primary : '#D4A017'}15`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p 
            className="mb-6 text-lg font-medium"
            style={{ color: place ? getCategoryTheme(place.category).text : '#2C2C2C' }}
          >
            ❌ {similarPlacesError}
          </p>
          <motion.button 
            onClick={() => fetchSimilarPlaces(new AbortController().signal)}
            className="px-8 py-3 text-white rounded-full font-semibold transition-all"
            style={{
              backgroundColor: place ? getCategoryTheme(place.category).primary : '#D4A017',
              boxShadow: `0 4px 12px ${place ? getCategoryTheme(place.category).primary : '#D4A017'}20`
            }}
            whileHover={{ scale: 1.05 }}
          >
            🔄 Try Again
          </motion.button>
        </motion.div>
      );
    }

    if (similarPlaces.length === 0) {
      return (
        <motion.div 
          className="rounded-3xl p-12 text-center border-4"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: place ? getCategoryTheme(place.category).accent : '#E3E1DC',
            boxShadow: `0 8px 32px ${place ? getCategoryTheme(place.category).primary : '#D4A017'}15`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p 
            className="text-lg font-medium"
            style={{ color: place ? getCategoryTheme(place.category).text : '#555' }}
          >
            🏞️ No nearby places found within 100km radius.
          </p>
        </motion.div>
      );
    }

    return (
      <div className="w-full">
        <Slider {...relatedPlacesSettings}>
          {similarPlaces.map((similarPlace, index) => (
            <div key={similarPlace.id} className="px-4">
              <motion.div
                className="rounded-3xl overflow-hidden transition cursor-pointer h-full group border-4"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: place ? getCategoryTheme(place.category).primary : '#E3E1DC',
                  boxShadow: `0 8px 32px ${place ? getCategoryTheme(place.category).primary : '#D4A017'}15`
                }}
                onClick={() => handleSimilarPlaceClick(similarPlace.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleSimilarPlaceClick(similarPlace.id)}
                aria-label={`View details for ${similarPlace.name}`}
                whileHover={{
                  y: -8,
                  boxShadow: `0 16px 48px ${place ? getCategoryTheme(place.category).primary : '#D4A017'}30`
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={similarPlace.image_url ? getImageUrl(similarPlace.image_url) : defaultImage}
                    alt={`${similarPlace.name} thumbnail`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => (e.target.src = defaultImage)}
                  />
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: place ? 
                        `linear-gradient(135deg, ${getCategoryTheme(place.category).primary}ee 0%, ${getCategoryTheme(place.category).secondary}ee 100%)`
                        : 'linear-gradient(135deg, #000000ee 0%, #333333ee 100%)'
                    }}
                  />
                  
                  <motion.div
                    className="absolute top-4 right-4 backdrop-blur px-4 py-2 rounded-full text-white text-sm font-semibold border-2"
                    style={{
                      backgroundColor: `${place ? getCategoryTheme(place.category).primary : '#D4A017'}cc`,
                      borderColor: place ? getCategoryTheme(place.category).accent : '#E3E1DC'
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    📍 {similarPlace.distance?.toFixed(1) || 0} km
                  </motion.div>
                </div>

                <div className="p-6">
                  <h3 
                    className="font-bold text-lg mb-2"
                    style={{ color: place ? getCategoryTheme(place.category).text : '#2C2C2C' }}
                  >
                    {similarPlace.name}
                  </h3>
                  <p 
                    className="text-sm mb-4 line-clamp-2"
                    style={{ color: '#666' }}
                  >
                    {getFormattedLocation(similarPlace)}
                  </p>
                  
                  {similarPlace.category && (
                    <div 
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold border-2"
                      style={{
                        backgroundColor: `${place ? getCategoryTheme(place.category).accent : '#D4A017'}15`,
                        color: place ? getCategoryTheme(place.category).primary : '#2C2C2C',
                        borderColor: place ? getCategoryTheme(place.category).accent : '#E3E1DC'
                      }}
                    >
                      {similarPlace.category}
                    </div>
                  )}
                </div>

                <div className="px-6 pb-6">
                  <motion.button
                    className="w-full py-2 rounded-lg font-semibold text-center transition-all text-white"
                    style={{
                      backgroundColor: place ? getCategoryTheme(place.category).primary : '#D4A017',
                      boxShadow: `0 4px 12px ${place ? getCategoryTheme(place.category).primary : '#D4A017'}1a`
                    }}
                    whileHover={{ boxShadow: `0 8px 20px ${place ? getCategoryTheme(place.category).primary : '#D4A017'}26` }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Details →
                  </motion.button>
                </div>
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center">
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-[#E8E6E1] border-t-[#D4A017] rounded-full mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-xl font-medium" style={{ color: '#2C2C2C' }}>Loading place details...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center px-8">
        <motion.div 
          className="max-w-md text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-6xl mb-6">❌</div>
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#2C2C2C', fontFamily: "'Playfair Display', serif" }}>
            {error}
          </h2>
          <div className="flex flex-col gap-4">
            <motion.button
              onClick={() => fetchPlaceDetails(new AbortController().signal)}
              className="px-6 py-3 text-white rounded-lg font-semibold"
              style={{
                backgroundColor: '#D4A017',
                boxShadow: '0 4px 12px rgba(212, 160, 23, 0.2)'
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 6px 16px rgba(212, 160, 23, 0.3)' }}
              whileTap={{ scale: 0.98 }}
            >
              🔄 Retry
            </motion.button>
            <motion.button
              onClick={() => navigate("/places")}
              className="px-6 py-3 rounded-lg font-semibold"
              style={{
                backgroundColor: '#FFFFFF',
                color: '#2C2C2C',
                border: '1px solid #E3E1DC',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
              }}
              whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)' }}
              whileTap={{ scale: 0.98 }}
            >
              ← Back to Places
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center px-8">
        <motion.div 
          className="max-w-md text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#2C2C2C', fontFamily: "'Playfair Display', serif" }}>
            No place data available
          </h2>
          <motion.button
            onClick={() => navigate("/places")}
            className="px-6 py-3 text-white rounded-lg font-semibold"
            style={{ backgroundColor: '#D4A017' }}
            whileHover={{ scale: 1.05 }}
          >
            Back to Places
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      <main className="w-full">
        <motion.section 
          className="relative h-[400px] md:h-[500px] overflow-hidden group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.img
              src={place?.image_url ? getImageUrl(place.image_url) : "https://via.placeholder.com/1600x900"}
              alt={`${place?.name || "Place"} main image`}
              className="w-full h-full object-cover"
              onError={(e) => (e.target.src = "https://via.placeholder.com/1600x900")}
              initial={{ scale: 1 }}
              animate={{ scale: 1.03 }}
              transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
            />
          </div>

          <motion.div 
            className="absolute inset-0 z-10"
            style={{ 
              backgroundImage: place ? 
                `linear-gradient(135deg, ${getCategoryTheme(place.category).primary}55 0%, ${getCategoryTheme(place.category).secondary}33 100%)` 
                : 'linear-gradient(135deg, #000000dd 0%, #333333aa 100%)',
              mixBlendMode: 'multiply'
            }}
          />
          <div className="absolute inset-0 z-5 opacity-0">
            <CulturalPattern />
          </div>

          <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-16 z-20">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-between"
            >
              <motion.button
                onClick={() => navigate("/places")}
                className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-full backdrop-blur-md transition-all hover:scale-110 font-medium"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
                aria-label="Go back to places list"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>←</span>
                <span>Explore</span>
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <div>
                <h1 
                  className="text-6xl md:text-7xl lg:text-8xl font-black text-white drop-shadow-2xl leading-tight mb-4" 
                  style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 4px 20px rgba(0,0,0,0.4)' }}
                >
                  {place?.name || "Discover India"}
                </h1>
                <motion.div
                  className="w-20 h-1 rounded-full"
                  style={{ backgroundColor: place ? getCategoryTheme(place.category).accent : '#D4A017' }}
                  initial={{ width: 0 }}
                  animate={{ width: 80 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
              </div>

              <div className="flex items-center gap-3 text-xl md:text-2xl text-gray-100 drop-shadow-lg">
                <span className="text-3xl">📍</span>
                <p className="font-light">{getFormattedLocation(place)}</p>
              </div>

              <motion.button
                onClick={() => navigate(`/places?category=${place?.category || 'all'}`)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all"
                style={{ 
                  backgroundColor: place ? getCategoryTheme(place.category).primary : '#D4A017',
                  color: '#FFFFFF',
                  boxShadow: `0 4px 12px ${place ? getCategoryTheme(place.category).primary : '#D4A017'}40`
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                whileHover={{ scale: 1.05, boxShadow: `0 8px 20px ${place ? getCategoryTheme(place.category).primary : 'transparent'}60` }}
                whileTap={{ scale: 0.98 }}
                aria-label={`View more ${place?.category || 'places'}`}
              >
                <span className="text-lg">🏛️</span>
                {place?.category ? place.category.charAt(0).toUpperCase() + place.category.slice(1) : 'Places'}
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          className="max-w-5xl mx-auto px-6 md:px-8 py-24 relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="space-y-8">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div 
                className="h-1 rounded-full"
                style={{ backgroundColor: place ? getCategoryTheme(place.category).primary : '#D4A017' }}
              />
            </motion.div>

            <div>
              <h2 
                className="text-5xl md:text-6xl font-black mb-8" 
                style={{ 
                  fontFamily: "'Playfair Display', serif",
                  color: place ? getCategoryTheme(place.category).text : '#2C2C2C'
                }}
              >
                The Story of {place?.name}
              </h2>
              <p 
                className="text-lg md:text-xl leading-relaxed font-light"
                style={{ 
                  color: '#666',
                  lineHeight: '1.95',
                  letterSpacing: '0.3px'
                }}
              >
                {place?.description || "Discover the rich heritage and unique charm of this remarkable destination."}
              </p>
            </div>
          </div>
        </motion.section>

        {place.highlights?.length > 0 && (
          <motion.section 
            className="max-w-6xl mx-auto px-6 md:px-8 py-24 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-16">
              <div>
                <h2 
                  className="text-5xl md:text-6xl font-black mb-4"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: place ? getCategoryTheme(place.category).text : '#2C2C2C'
                  }}
                >
                  ✨ What Makes It Special
                </h2>
                <motion.div
                  className="w-20 h-1 rounded-full"
                  style={{ backgroundColor: place ? getCategoryTheme(place.category).primary : '#D4A017' }}
                  initial={{ width: 0 }}
                  whileInView={{ width: 80 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {place.highlights.map((highlight, index) => (
                  <motion.div 
                    key={index}
                    className="rounded-3xl p-8 transition-all hover:shadow-2xl backdrop-blur-sm group cursor-pointer border-2"
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderColor: place ? getCategoryTheme(place.category).accent : '#E3E1DC',
                      boxShadow: `0 4px 20px ${place ? getCategoryTheme(place.category).primary : '#D4A017'}15`
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      y: -12,
                      boxShadow: `0 16px 40px ${place ? getCategoryTheme(place.category).primary : '#D4A017'}30`
                    }}
                  >
                    <motion.div 
                      className="text-5xl mb-6"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      ✨
                    </motion.div>
                    <p 
                      className="font-semibold text-lg leading-relaxed"
                      style={{ 
                        color: place ? getCategoryTheme(place.category).text : '#2C2C2C'
                      }}
                    >
                      {highlight}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {galleryImages.length > 0 && (
          <motion.section 
            className="max-w-6xl mx-auto px-6 md:px-8 py-24 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-16">
              <div>
                <h2 
                  className="text-5xl md:text-6xl font-black mb-4"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: place ? getCategoryTheme(place.category).text : '#2C2C2C'
                  }}
                >
                  📸 Visual Journey
                </h2>
                <motion.div
                  className="w-20 h-1 rounded-full"
                  style={{ backgroundColor: place ? getCategoryTheme(place.category).primary : '#D4A017' }}
                  initial={{ width: 0 }}
                  whileInView={{ width: 80 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((img, index) => (
                  <motion.div
                    key={index}
                    className="rounded-3xl overflow-hidden cursor-pointer group relative h-80 border-4"
                    style={{
                      borderColor: place ? getCategoryTheme(place.category).accent : '#E3E1DC',
                      boxShadow: `0 8px 32px ${place ? getCategoryTheme(place.category).primary : '#D4A017'}20`
                    }}
                    onClick={() => openGalleryModal(img, index)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, boxShadow: `0 16px 48px ${place ? getCategoryTheme(place.category).primary : '#D4A017'}40` }}
                  >
                    <img
                      src={img}
                      alt={`${place.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700"
                      onError={(e) => (e.target.src = "https://via.placeholder.com/600x400")}
                    />
                    
                    <motion.div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
                      style={{
                        background: place ? 
                          `linear-gradient(135deg, ${getCategoryTheme(place.category).primary}ee 0%, ${getCategoryTheme(place.category).secondary}ee 100%)`
                          : 'linear-gradient(135deg, #000000ee 0%, #333333ee 100%)'
                      }}
                    >
                      <motion.div
                        className="text-center text-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-5xl mb-3">🔍</div>
                        <p className="font-bold text-lg">View Full Size</p>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        <motion.section 
          className="max-w-6xl mx-auto px-6 md:px-8 py-20 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="space-y-12">
            <div>
              <h2 
                className="text-5xl md:text-6xl font-black mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: place ? getCategoryTheme(place.category).text : '#2C2C2C'
                }}
              >
                🎬 Experience in Motion
              </h2>
              <motion.div
                className="w-20 h-1 rounded-full"
                style={{ backgroundColor: place ? getCategoryTheme(place.category).primary : '#D4A017' }}
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              />
            </div>
            
            <motion.div 
              className="rounded-3xl overflow-hidden backdrop-blur-sm border-4"
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: place ? getCategoryTheme(place.category).accent : '#E3E1DC',
                boxShadow: `0 12px 48px ${place ? getCategoryTheme(place.category).primary : '#D4A017'}20`
              }}
              whileHover={{ boxShadow: `0 20px 64px ${place ? getCategoryTheme(place.category).primary : '#D4A017'}30` }}
            >
              <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0, overflow: 'hidden', backgroundColor: '#000' }}>
                <iframe
                  src="https://www.youtube.com/embed/3zvJpZ5y1eM?rel=0&modestbranding=1"
                  title={`${place?.name || 'Destination'} cultural and spiritual heritage video`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              
              <div className="p-8 md:p-12">
                <h3 
                  className="text-3xl font-black mb-4"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: place ? getCategoryTheme(place.category).text : '#2C2C2C'
                  }}
                >
                  Discover the Cultural Heritage
                </h3>
                <p 
                  className="mb-8 leading-relaxed text-lg"
                  style={{ color: '#555', lineHeight: '1.8' }}
                >>
                  Immerse yourself in the profound cultural and spiritual significance of {place?.name || 'this destination'}. Experience the traditions, rituals, and heritage that have shaped this sacred place for generations.
                </p>
                <motion.a
                  href="https://www.youtube.com/watch?v=3zvJpZ5y1eM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all"
                  style={{
                    backgroundColor: place ? getCategoryTheme(place.category).primary : '#D4A017',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    boxShadow: `0 4px 12px ${place ? getCategoryTheme(place.category).primary : '#D4A017'}20`
                  }}
                  whileHover={{ scale: 1.05, boxShadow: `0 8px 20px ${place ? getCategoryTheme(place.category).primary : '#D4A017'}30` }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>▶</span>
                  <span>Watch on YouTube</span>
                </motion.a>
              </div>
            </motion.div>

            {videos.length > 0 && (
              <>
                <div className="mt-16">
                  <h3 
                    className="text-3xl font-black mb-8"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: place ? getCategoryTheme(place.category).text : '#2C2C2C'
                    }}
                  >
                    More Videos
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {videos.map((video, index) => (
                      <motion.div 
                        key={video.id}
                        className="rounded-2xl overflow-hidden backdrop-blur-sm"
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E3E1DC',
                          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)'
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)' }}
                      >
                        <div className="relative bg-black h-64">
                          <video
                            src={video.url}
                            controls
                            playsInline
                            className="w-full h-full object-cover"
                            aria-label={video.title}
                          />
                        </div>
                        <div className="p-6">
                          <h4 className="font-bold text-lg mb-4" style={{ color: '#2C2C2C' }}>
                            {video.title}
                          </h4>
                          <motion.button 
                            onClick={() => openFullScreenVideo(video.fullScreenUrl)}
                            className="w-full px-4 py-3 text-white rounded-lg font-semibold transition-all"
                            style={{
                              backgroundColor: '#D4A017',
                              boxShadow: '0 2px 8px rgba(212, 160, 23, 0.2)'
                            }}
                            whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(212, 160, 23, 0.3)' }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Watch Full Video
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.section>

        <motion.section 
          className="max-w-6xl mx-auto px-6 md:px-8 py-20 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="space-y-12">
            <div>
              <h2 
                className="text-5xl md:text-6xl font-black mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: place ? getCategoryTheme(place.category).text : '#2C2C2C'
                }}
              >
                ℹ️ Essential Information
              </h2>
              <motion.div
                className="w-20 h-1 rounded-full"
                style={{ backgroundColor: place ? getCategoryTheme(place.category).primary : '#D4A017' }}
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div 
                className="rounded-3xl p-8 border-4 flex flex-col items-center text-center"
                style={{
                  borderColor: place ? getCategoryTheme(place.category).primary : '#D4A017',
                  backgroundColor: '#FFFFFF',
                  boxShadow: `0 4px 16px ${place ? getCategoryTheme(place.category).primary : '#D4A017'}10`
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, boxShadow: `0 12px 32px ${place ? getCategoryTheme(place.category).primary : '#D4A017'}15` }}
              >
                <div 
                  className="text-5xl mb-4 w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${place ? getCategoryTheme(place.category).accent : '#D4A017'}20`
                  }}
                >
                  📅
                </div>
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ color: place ? getCategoryTheme(place.category).text : '#2C2C2C' }}
                >
                  Best Time to Visit
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {place.best_time_to_visit || "Please check specific season guidelines"}
                </p>
              </motion.div>

              <motion.div 
                className="rounded-3xl p-8 border-4 flex flex-col items-center text-center"
                style={{
                  borderColor: place ? getCategoryTheme(place.category).primary : '#D4A017',
                  backgroundColor: place ? getCategoryTheme(place.category).light : '#FDF8F3',
                  boxShadow: `0 8px 32px ${place ? getCategoryTheme(place.category).primary : '#D4A017'}15`
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, boxShadow: `0 16px 48px ${place ? getCategoryTheme(place.category).primary : '#D4A017'}30` }}
              >
                <div 
                  className="text-5xl mb-4 w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${place ? getCategoryTheme(place.category).accent : '#D4A017'}20`
                  }}
                >
                  🚗
                </div>
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ color: place ? getCategoryTheme(place.category).text : '#2C2C2C' }}
                >
                  How to Reach
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {place.how_to_reach || "Multiple transport options available"}
                </p>
              </motion.div>

              <motion.div 
                className="rounded-3xl p-8 border-4 flex flex-col items-center text-center"
                style={{
                  borderColor: place ? getCategoryTheme(place.category).primary : '#D4A017',
                  backgroundColor: '#FFFFFF',
                  boxShadow: `0 4px 16px ${place ? getCategoryTheme(place.category).primary : '#D4A017'}10`
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, boxShadow: `0 12px 32px ${place ? getCategoryTheme(place.category).primary : '#D4A017'}15` }}
              >
                <div 
                  className="text-5xl mb-4 w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${place ? getCategoryTheme(place.category).accent : '#D4A017'}20`
                  }}
                >
                  💰
                </div>
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ color: place ? getCategoryTheme(place.category).text : '#2C2C2C' }}
                >
                  Entry Fee
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {place.entry_fee || "Check at entrance for current rates"}
                </p>
              </motion.div>

              <motion.div 
                className="rounded-3xl p-8 border-4 flex flex-col items-center text-center"
                style={{
                  borderColor: place ? getCategoryTheme(place.category).primary : '#D4A017',
                  backgroundColor: place ? getCategoryTheme(place.category).light : '#FDF8F3',
                  boxShadow: `0 8px 32px ${place ? getCategoryTheme(place.category).primary : '#D4A017'}15`
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, boxShadow: `0 16km 48px ${place ? getCategoryTheme(place.category).primary : '#D4A017'}30` }}
              >
                <div 
                  className="text-5xl mb-4 w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${place ? getCategoryTheme(place.category).accent : '#D4A017'}20`
                  }}
                >
                  ⏰
                </div>
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ color: place ? getCategoryTheme(place.category).text : '#2C2C2C' }}
                >
                  Timings
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {place.timings || "Open daily from sunrise to sunset"}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="max-w-6xl mx-auto px-6 md:px-8 py-20 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="space-y-12">
            <div>
              <h2 
                className="text-5xl md:text-6xl font-black mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: place ? getCategoryTheme(place.category).text : '#2C2C2C'
                }}
              >
                📍 Location Map
              </h2>
              <motion.div
                className="w-20 h-1 rounded-full"
                style={{ backgroundColor: place ? getCategoryTheme(place.category).primary : '#D4A017' }}
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              />
            </div>
            <motion.div 
              className="rounded-3xl overflow-hidden border-4"
              style={{
                borderColor: place ? getCategoryTheme(place.category).accent : '#E3E1DC',
                boxShadow: `0 12px 48px ${place ? getCategoryTheme(place.category).primary : '#D4A017'}20`
              }}
              whileHover={{ boxShadow: `0 20px 64px ${place ? getCategoryTheme(place.category).primary : '#D4A017'}30` }}
            >
              {renderMap()}
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          className="max-w-6xl mx-auto px-6 md:px-8 py-20 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="space-y-12">
            <div>
              <h2 
                className="text-5xl md:text-6xl font-black mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: place ? getCategoryTheme(place.category).text : '#2C2C2C'
                }}
              >
                ✨ You May Also Like
              </h2>
              <motion.div
                className="w-20 h-1 rounded-full"
                style={{ backgroundColor: place ? getCategoryTheme(place.category).primary : '#D4A017' }}
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              />
            </div>
            {renderSimilarPlaces()}
          </div>
        </motion.section>

        {showGalleryModal && activeImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={closeGalleryModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative max-w-5xl w-full flex items-center gap-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                className="absolute left-0 -ml-20 w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center text-3xl transition hidden lg:flex backdrop-blur-md"
                onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                aria-label="Previous image"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                ‹
              </motion.button>

              <motion.img
                src={activeImage}
                alt="Enlarged gallery image"
                className="w-full rounded-3xl"
                onClick={(e) => e.stopPropagation()}
                onError={(e) => (e.target.src = defaultImage)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              />

              <motion.button
                className="absolute right-0 -mr-20 w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center text-3xl transition hidden lg:flex backdrop-blur-md"
                onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                aria-label="Next image"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                ›
              </motion.button>

              <motion.button
                className="absolute top-4 right-4 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center text-3xl transition backdrop-blur-md"
                onClick={closeGalleryModal}
                aria-label="Close gallery modal"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                ×
              </motion.button>

              <motion.div
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/50 text-white rounded-full text-sm font-semibold backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {activeImageIndex + 1} / {galleryImages.length}
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {isFullScreen && currentVideo && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            onClick={closeFullScreenVideo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <video
                src={currentVideo}
                controls
                autoPlay
                playsInline
                onClick={(e) => e.stopPropagation()}
                className="w-full h-full max-h-screen"
                aria-label="Full-screen video"
              />
              <motion.button
                className="absolute top-4 right-4 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center text-3xl transition backdrop-blur-md"
                onClick={closeFullScreenVideo}
                aria-label="Close full-screen video"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                ×
              </motion.button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default PlaceDetail;