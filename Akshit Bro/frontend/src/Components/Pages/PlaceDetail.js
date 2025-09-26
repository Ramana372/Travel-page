import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PlaceDetail.css";
import API from "./api.js";



const PlaceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [place, setPlace] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [similarPlaces, setSimilarPlaces] = useState([]);
  const [similarPlacesLoading, setSimilarPlacesLoading] = useState(false);
  const [similarPlacesError, setSimilarPlacesError] = useState(null);

  const defaultImage = "https://via.placeholder.com/400x300?text=Placeholder+Image";

  // Fetch place details
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

  // Fetch similar places
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

      const filteredPlaces = response.data
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

  // useEffect(() => {
  //   const controller = new AbortController();
  //   if (!id || isNaN(parseInt(id))) {
  //     setError("Invalid place ID.");
  //     setIsLoading(false);
  //     return;
  //   }
  //   window.scrollTo(0, 0);
  //   fetchPlaceDetails(controller.signal);

  //   return () => controller.abort();
  // }, [id]);

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

  // Format rating stars
  const formatRating = (rating) => {
    if (!rating || isNaN(rating)) return "No rating";
    return `${rating.toFixed(1)} ⭐`;
  };

  // Format location information
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

  // Dynamic gallery images (assuming API provides gallery_images)
  const galleryImages = place?.gallery_images?.length
    ? place.gallery_images
    : [place?.image_url || defaultImage];

  // Dynamic videos (assuming API provides videos)
  const videos = place?.videos?.length
    ? place.videos
    : [
        {
          id: 1,
          title: `${place?.name || "Place"} Travel Guide`,
          thumbnail: place?.image_url || defaultImage,
          url: "/Images/VID_20220106_143506.mp4",
          fullScreenUrl: "/Images/VID_20220106_143518.mp4",
        },
        {
          id: 2,
          title: `Exploring ${place?.name || "Place"}`,
          thumbnail: place?.image_url || defaultImage,
          url: "/Images/VID_20220106_144230.mp4",
          fullScreenUrl: "/Images/VID_20220106_144757.mp4",
        },
      ];

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

  const openGalleryModal = (imageUrl) => {
    setActiveImage(imageUrl);
    setShowGalleryModal(true);
  };

  const closeGalleryModal = () => {
    setActiveImage(null);
    setShowGalleryModal(false);
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
        <div className="map-placeholder">
          <p>📍 Map not available - Location coordinates missing</p>
        </div>
      );
    }

    const mapUrl = `https://maps.google.com/maps?q=${place.latitude},${place.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    return (
      <div className="map-container">
        <iframe
          src={mapUrl}
          width="100%"
          height="400"
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
        <div className="similar-places-loading">
          <div className="loading-spinner">
            <div className="spinner" />
            <p>Finding nearby places...</p>
          </div>
        </div>
      );
    }

    if (similarPlacesError) {
      return (
        <div className="similar-places-error">
          <p>❌ {similarPlacesError}</p>
          <button onClick={() => fetchSimilarPlaces(new AbortController().signal)} className="retry-button">
            🔄 Try Again
          </button>
        </div>
      );
    }

    if (similarPlaces.length === 0) {
      return (
        <div className="no-similar-places">
          <p>🏞️ No nearby places found within 100km radius.</p>
        </div>
      );
    }

    return (
      <div className="similar-places-container">
        <Slider {...relatedPlacesSettings}>
          {similarPlaces.map((similarPlace) => (
            <div key={similarPlace.id} className="similar-place-card">
              <div
                className="similar-place-content"
                onClick={() => handleSimilarPlaceClick(similarPlace.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleSimilarPlaceClick(similarPlace.id)}
                aria-label={`View details for ${similarPlace.name}`}
              >
                <div className="similar-place-image">
                  <img
                    src={similarPlace.image_url || defaultImage}
                    alt={`${similarPlace.name} thumbnail`}
                    onError={(e) => (e.target.src = defaultImage)}
                  />
                  <div className="distance-badge">
                    📍 {similarPlace.distance?.toFixed(1) || 0} km
                  </div>
                </div>
                <div className="similar-place-info">
                  <h3>{similarPlace.name}</h3>
                  <p className="location">{getFormattedLocation(similarPlace)}</p>
                  <div className="place-meta">
                    <span className="rating">{formatRating(similarPlace.rating)}</span>
                    {similarPlace.category && (
                      <span className="category">{similarPlace.category}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="place-detail-page">
        <div className="loading-container">
          <div className="loading-spinner">
            <div className="spinner" />
            <p>Loading place details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="place-detail-page">
        <div className="error-container">
          <h2>❌ {error}</h2>
          <div className="error-actions">
            <button onClick={() => fetchPlaceDetails(new AbortController().signal)} className="retry-button">
              🔄 Retry
            </button>
            <button onClick={() => navigate("/places")} className="back-button">
              ← Back to Places
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="place-detail-page">
        <div className="no-data">
          <h2>No place data available</h2>
          <button onClick={() => navigate("/places")} className="back-button">
            Back to Places
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="place-detail-page">
      <main className="place-content">
        <section className="place-hero">
          <div className="hero-overlay" />
          <img
            src={place?.image_url || defaultImage}
            alt={`${place?.name || "Place"} main image`}
            className="hero-image"
            onError={(e) => (e.target.src = defaultImage)}
          />
          <div className="hero-content">
            <button
              onClick={() => navigate("/places")}
              className="back-button"
              aria-label="Go back to places list"
            >
              ← Back to Places
            </button>
            <h1>{place?.name || "Unknown Place"}</h1>
            <p className="place-location">{getFormattedLocation(place)}</p>
            <div className="place-rating">
              <span className="rating-stars">{formatRating(place?.rating)}</span>
            </div>
          </div>
        </section>

        <section className="place-info">
          <h2>About {place.name}</h2>
          <p>{place.description || "No description available"}</p>
        </section>

        {place.highlights?.length > 0 && (
          <section className="place-highlights">
            <h2>Highlights</h2>
            <div className="highlights-grid">
              {place.highlights.map((highlight, index) => (
                <div key={index} className="highlight-item">
                  <span className="highlight-icon">✨</span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {galleryImages.length > 0 && (
          <section className="place-gallery">
            <h2>Image Gallery</h2>
            <div className="gallery-images">
              {galleryImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${place.name} - Image ${index + 1}`}
                  onClick={() => openGalleryModal(img)}
                  onError={(e) => (e.target.src = defaultImage)}
                />
              ))}
            </div>
          </section>
        )}

        {videos.length > 0 && (
          <section className="place-videos">
            <h2>Videos</h2>
            <div className="video-grid">
              {videos.map((video) => (
                <div key={video.id} className="video-card">
                  <video
                    src={video.url}
                    controls
                    playsInline
                    loop
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                    aria-label={video.title}
                  />
                  <h3>{video.title}</h3>
                  <button onClick={() => openFullScreenVideo(video.fullScreenUrl)}>
                    Watch Full Video
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="place-details">
          <div className="detail-section">
            <h3>🕐 Best Time to Visit</h3>
            <p>{place.best_time_to_visit || "No information available"}</p>
          </div>
          <div className="detail-section">
            <h3>🚗 How to Reach</h3>
            <p>{place.how_to_reach || "No information available"}</p>
          </div>
          <div className="detail-section">
            <h3>💰 Entry Fee</h3>
            <p>{place.entry_fee || "Free Entry"}</p>
          </div>
          <div className="detail-section">
            <h3>⏰ Timings</h3>
            <p>{place.timings || "No information available"}</p>
          </div>
        </section>

        <section className="place-map">
          <h2>📍 Location Map</h2>
          {renderMap()}
        </section>

        <section className="similar-places">
          <h2>You May Also Like</h2>
          {renderSimilarPlaces()}
        </section>

        {showGalleryModal && activeImage && (
          <div className="gallery-modal" onClick={closeGalleryModal}>
            <div className="modal-content">
              <img
                src={activeImage}
                alt="Enlarged gallery image"
                onClick={(e) => e.stopPropagation()}
                onError={(e) => (e.target.src = defaultImage)}
              />
              <button
                className="close-modal"
                onClick={closeGalleryModal}
                aria-label="Close gallery modal"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {isFullScreen && currentVideo && (
          <div className="full-screen-video-overlay" onClick={closeFullScreenVideo}>
            <div className="video-container">
              <video
                src={currentVideo}
                controls
                autoPlay
                playsInline
                onClick={(e) => e.stopPropagation()}
                aria-label="Full-screen video"
              />
              <button
                className="close-video"
                onClick={closeFullScreenVideo}
                aria-label="Close full-screen video"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PlaceDetail;


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-fade';
// import "./PlaceDetail.css";
// import axios from "axios";

// // Configure axios base URL
// axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// const PlaceDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [place, setPlace] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [similarPlaces, setSimilarPlaces] = useState([]);
//   const [showImageModal, setShowImageModal] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [favorites, setFavorites] = useState([]);

//   const defaultImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3";

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 0.6,
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { duration: 0.5 }
//     }
//   };

//   // Fetch place details with enhanced error handling
//   const fetchPlaceDetails = async (signal) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(`/places/${id}`, { signal });
//       const placeData = response.data;

//       if (placeData.error || !placeData.id) {
//         throw new Error(placeData.error || "Place not found");
//       }

//       setPlace(placeData);
//       document.title = `${placeData.name} - Travel Guide`;
//     } catch (error) {
//       if (error.name === "AbortError") return;
//       const errorMessage =
//         error.response?.status === 404
//           ? "This destination could not be found."
//           : "Failed to load destination details. Please try again.";
//       setError(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Enhanced similar places fetch
//   const fetchSimilarPlaces = async (signal) => {
//     if (!place?.latitude || !place?.longitude) return;

//     try {
//       const response = await axios.get(`/places/nearby`, {
//         params: {
//           latitude: place.latitude,
//           longitude: place.longitude,
//           radius: 75,
//         },
//         signal,
//       });

//       const filteredPlaces = response.data
//         .filter((p) => p.id !== parseInt(id))
//         .slice(0, 8);

//       setSimilarPlaces(filteredPlaces);
//     } catch (error) {
//       console.error("Error fetching similar places:", error);
//     }
//   };

//   useEffect(() => {
//     const controller = new AbortController();
//     if (!id || isNaN(parseInt(id))) {
//       setError("Invalid destination ID.");
//       setIsLoading(false);
//       return;
//     }
    
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     fetchPlaceDetails(controller.signal);

//     return () => controller.abort();
//   }, [id]);

//   useEffect(() => {
//     const controller = new AbortController();
//     if (place?.latitude && place?.longitude) {
//       fetchSimilarPlaces(controller.signal);
//     }
//     return () => controller.abort();
//   }, [place?.latitude, place?.longitude, id]);

//   // Enhanced rating display
//   const renderRating = (rating) => {
//     if (!rating || isNaN(rating)) return null;
//     const stars = Math.round(rating);
//     return (
//       <div className="rating-display">
//         <div className="stars">
//           {[...Array(5)].map((_, i) => (
//             <span key={i} className={i < stars ? 'star filled' : 'star'}>
//               ★
//             </span>
//           ))}
//         </div>
//         <span className="rating-number">{rating.toFixed(1)}</span>
//       </div>
//     );
//   };

//   // Enhanced location formatting
//   const getFormattedLocation = (place) => {
//     if (!place) return "Location unavailable";
//     const parts = [place.location, place.city, place.state].filter(Boolean);
//     return parts.join(", ") || "Location unavailable";
//   };

//   // Gallery with enhanced features
//   const galleryImages = place?.gallery_images?.length
//     ? place.gallery_images
//     : [place?.image_url || defaultImage];

//   const openImageModal = (image) => {
//     setSelectedImage(image);
//     setShowImageModal(true);
//   };

//   // Tab content renderer
//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'overview':
//         return (
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="tab-content overview-content"
//           >
//             <div className="description-card glass-card">
//               <h3>About This Destination</h3>
//               <p>{place.description || "Discover the beauty and wonder of this amazing destination."}</p>
//             </div>
            
//             {place.highlights?.length > 0 && (
//               <div className="highlights-card glass-card">
//                 <h3>Key Highlights</h3>
//                 <div className="highlights-grid">
//                   {place.highlights.map((highlight, index) => (
//                     <motion.div
//                       key={index}
//                       className="highlight-item"
//                       whileHover={{ scale: 1.05 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <div className="highlight-icon">✨</div>
//                       <span>{highlight}</span>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         );
      
//       case 'details':
//         return (
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="tab-content details-content"
//           >
//             <div className="details-grid">
//               <div className="detail-card glass-card">
//                 <div className="detail-icon">🕐</div>
//                 <h4>Best Time to Visit</h4>
//                 <p>{place.best_time_to_visit || "Year-round destination"}</p>
//               </div>
              
//               <div className="detail-card glass-card">
//                 <div className="detail-icon">🚗</div>
//                 <h4>How to Reach</h4>
//                 <p>{place.how_to_reach || "Accessible by various transportation modes"}</p>
//               </div>
              
//               <div className="detail-card glass-card">
//                 <div className="detail-icon">💰</div>
//                 <h4>Entry Fee</h4>
//                 <p>{place.entry_fee || "Free Entry"}</p>
//               </div>
              
//               <div className="detail-card glass-card">
//                 <div className="detail-icon">⏰</div>
//                 <h4>Timings</h4>
//                 <p>{place.timings || "Open 24/7"}</p>
//               </div>
//             </div>
//           </motion.div>
//         );
      
//       case 'gallery':
//         return (
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="tab-content gallery-content"
//           >
//             <div className="gallery-grid">
//               {galleryImages.map((image, index) => (
//                 <motion.div
//                   key={index}
//                   className="gallery-item"
//                   whileHover={{ scale: 1.05 }}
//                   onClick={() => openImageModal(image)}
//                 >
//                   <img
//                     src={image}
//                     alt={`${place.name} - Image ${index + 1}`}
//                     onError={(e) => (e.target.src = defaultImage)}
//                   />
//                   <div className="gallery-overlay">
//                     <span>View Full Size</span>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         );
      
//       case 'location':
//         return (
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="tab-content location-content"
//           >
//             <div className="map-container glass-card">
//               {place?.latitude && place?.longitude ? (
//                 <iframe
//                   src={`https://maps.google.com/maps?q=${place.latitude},${place.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
//                   width="100%"
//                   height="400"
//                   style={{ border: 0, borderRadius: '12px' }}
//                   allowFullScreen=""
//                   loading="lazy"
//                   title={`Location Map for ${place.name}`}
//                 />
//               ) : (
//                 <div className="map-placeholder">
//                   <div className="placeholder-icon">📍</div>
//                   <p>Map not available - Location coordinates missing</p>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         );
      
//       default:
//         return null;
//     }
//   };

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="modern-place-detail">
//         <div className="loading-container">
//           <motion.div
//             className="loading-spinner"
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//           >
//             <div className="spinner-ring"></div>
//           </motion.div>
//           <p>Loading destination details...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="modern-place-detail">
//         <motion.div
//           className="error-container glass-card"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <div className="error-icon">❌</div>
//           <h2>{error}</h2>
//           <div className="error-actions">
//             <button
//               onClick={() => fetchPlaceDetails(new AbortController().signal)}
//               className="retry-btn"
//             >
//               🔄 Try Again
//             </button>
//             <button
//               onClick={() => navigate("/places")}
//               className="back-btn"
//             >
//               ← Back to Destinations
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     );
//   }

//   if (!place) return null;

//   return (
//     <motion.div
//       className="modern-place-detail"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       {/* Hero Section with Parallax Effect */}
//       <motion.section className="hero-section" variants={itemVariants}>
//         <div className="hero-background">
//           <img
//             src={place?.image_url || defaultImage}
//             alt={place?.name}
//             className="hero-image"
//             onError={(e) => (e.target.src = defaultImage)}
//           />
//           <div className="hero-overlay"></div>
//         </div>
        
//         <div className="hero-content">
//           <motion.button
//             className="back-button glass-button"
//             onClick={() => navigate("/places")}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             ← Back
//           </motion.button>
          
//           <motion.div className="hero-info" variants={itemVariants}>
//             <h1 className="hero-title">{place?.name}</h1>
//             <p className="hero-location">📍 {getFormattedLocation(place)}</p>
//             {place?.rating && (
//               <div className="hero-rating">
//                 {renderRating(place.rating)}
//               </div>
//             )}
//           </motion.div>
//         </div>
//       </motion.section>

//       {/* Navigation Tabs */}
//       <motion.section className="tabs-section" variants={itemVariants}>
//         <div className="tabs-container glass-card">
//           {[
//             { id: 'overview', label: 'Overview', icon: '📖' },
//             { id: 'details', label: 'Details', icon: 'ℹ️' },
//             { id: 'gallery', label: 'Gallery', icon: '🖼️' },
//             { id: 'location', label: 'Location', icon: '📍' }
//           ].map((tab) => (
//             <motion.button
//               key={tab.id}
//               className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
//               onClick={() => setActiveTab(tab.id)}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <span className="tab-icon">{tab.icon}</span>
//               <span className="tab-label">{tab.label}</span>
//             </motion.button>
//           ))}
//         </div>
//       </motion.section>

//       {/* Tab Content */}
//       <motion.section className="content-section" variants={itemVariants}>
//         <AnimatePresence mode="wait">
//           {renderTabContent()}
//         </AnimatePresence>
//       </motion.section>

//       {/* Similar Places Section */}
//       {similarPlaces.length > 0 && (
//         <motion.section className="similar-places-section" variants={itemVariants}>
//           <div className="section-header">
//             <h2>Discover Similar Destinations</h2>
//             <p>Explore more amazing places nearby</p>
//           </div>
          
//           <Swiper
//             modules={[Navigation, Pagination, Autoplay]}
//             spaceBetween={24}
//             slidesPerView={1}
//             navigation
//             pagination={{ clickable: true }}
//             autoplay={{ delay: 3000, disableOnInteraction: false }}
//             breakpoints={{
//               640: { slidesPerView: 2 },
//               768: { slidesPerView: 3 },
//               1024: { slidesPerView: 4 }
//             }}
//             className="similar-places-slider"
//           >
//             {similarPlaces.map((similarPlace) => (
//               <SwiperSlide key={similarPlace.id}>
//                 <motion.div
//                   className="similar-place-card glass-card"
//                   whileHover={{ y: -10, scale: 1.02 }}
//                   transition={{ duration: 0.3 }}
//                   onClick={() => navigate(`/places/${similarPlace.id}`)}
//                 >
//                   <div className="card-image">
//                     <img
//                       src={similarPlace.image_url || defaultImage}
//                       alt={similarPlace.name}
//                       onError={(e) => (e.target.src = defaultImage)}
//                     />
//                     {similarPlace.distance && (
//                       <div className="distance-badge">
//                         {similarPlace.distance.toFixed(1)} km
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="card-content">
//                     <h3>{similarPlace.name}</h3>
//                     <p className="card-location">{getFormattedLocation(similarPlace)}</p>
//                     {similarPlace.rating && (
//                       <div className="card-rating">
//                         {renderRating(similarPlace.rating)}
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </motion.section>
//       )}

//       {/* Image Modal */}
//       <AnimatePresence>
//         {showImageModal && selectedImage && (
//           <motion.div
//             className="image-modal"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setShowImageModal(false)}
//           >
//             <motion.div
//               className="modal-content"
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.8, opacity: 0 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <img
//                 src={selectedImage}
//                 alt="Full size view"
//                 onError={(e) => (e.target.src = defaultImage)}
//               />
//               <button
//                 className="close-modal"
//                 onClick={() => setShowImageModal(false)}
//               >
//                 ×
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// };

// export default PlaceDetail;
