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

      // Ensure response.data is an array before processing
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
    const galleryImages = place?.images?.length
    ? place.images.map(img => process.env.PUBLIC_URL + "" + img.image_url)
    : [place?.image_url ? process.env.PUBLIC_URL + "" + place.image_url : defaultImage];

  // Dynamic videos (updated to match API response structure)
  const videos = place?.videos?.length
    ? place.videos.map((video, index) => ({
        id: index,
        title: place.name ? `${place.name} - Video ${index + 1}` : `Video ${index + 1}`,
        url: process.env.PUBLIC_URL + "" + video.video_path,
        fullScreenUrl: process.env.PUBLIC_URL + "" + video.video_path
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
      <main className="place-content container-fluid">
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
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./PlaceDetail.css";
// import API from "./api.js";

// const PlaceDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [place, setPlace] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeImage, setActiveImage] = useState(null);
//   const [showGalleryModal, setShowGalleryModal] = useState(false);
//   const [similarPlaces, setSimilarPlaces] = useState([]);
//   const [similarPlacesLoading, setSimilarPlacesLoading] = useState(false);
//   const [similarPlacesError, setSimilarPlacesError] = useState(null);

//   const defaultImage = "/images/1.jpg";

//   // Fetch place details
//   const fetchPlaceDetails = async (signal) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await API.get(`/places/${id}`, { signal });
//       const placeData = response.data;

//       if (placeData.error || !placeData.id) {
//         throw new Error(placeData.error || "Place not found");
//       }

//       setPlace(placeData);
//       setError(null);
//     } catch (error) {
//       if (error.name === "AbortError") return;
//       const errorMessage =
//         error.response?.status === 404
//           ? "This place could not be found."
//           : "Failed to load place details. Please try again.";
//       setError(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Fetch similar places
//   const fetchSimilarPlaces = async (signal) => {
//     if (!place?.latitude || !place?.longitude) {
//       setSimilarPlaces([]);
//       setSimilarPlacesError("Location coordinates not available.");
//       return;
//     }

//     setSimilarPlacesLoading(true);
//     setSimilarPlacesError(null);

//     try {
//       const response = await API.get(`/places/nearby`, {
//         params: {
//           latitude: place.latitude,
//           longitude: place.longitude,
//           radius: 100,
//         },
//         timeout: 10000,
//         signal,
//       });

//       // Ensure response.data is an array before processing
//       const nearbyData = Array.isArray(response.data) ? response.data : (response.data?.places || []);

//       const filteredPlaces = nearbyData
//         .filter((p) => p.id !== parseInt(id))
//         .sort((a, b) => (a.distance || 0) - (b.distance || 0))
//         .slice(0, 6);

//       setSimilarPlaces(filteredPlaces);
//       setSimilarPlacesError(null);
//     } catch (error) {
//       if (error.name === "AbortError") return;
//       let errorMessage = "Unable to load nearby places.";
//       if (error.code === "ECONNABORTED") {
//         errorMessage = "Request timed out. Please check your connection.";
//       } else if (error.response?.status === 404) {
//         errorMessage = "No nearby places found.";
//       } else if (error.response?.status >= 500) {
//         errorMessage = "Server error. Please try again later.";
//       }
//       setSimilarPlaces([]);
//       setSimilarPlacesError(errorMessage);
//     } finally {
//       setSimilarPlacesLoading(false);
//     }
//   };

//   useEffect(() => {
//     const controller = new AbortController();

//     if (id == null || isNaN(Number(id))) {
//       setError("Invalid place ID.");
//       setIsLoading(false);
//       return;
//     }

//     window.scrollTo(0, 0);
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

//   // Format rating stars
//   const formatRating = (rating) => {
//     if (!rating || isNaN(rating)) return "No rating";
//     return `${rating.toFixed(1)} ⭐`;
//   };

//   // Format location information
//   const getFormattedLocation = (place) => {
//     if (!place) return "Location not available";
//     const locationParts = [];
//     if (place.location) locationParts.push(place.location);
//     else if (place.city) locationParts.push(place.city);
//     if (place.district && !place.location?.includes(place.district)) {
//       locationParts.push(place.district);
//     }
//     if (place.state && !place.location?.includes(place.state)) {
//       locationParts.push(place.state);
//     }
//     return locationParts.length > 0 ? locationParts.join(", ") : "Location not available";
//   };

//   // Dynamic gallery images (updated to match API response structure)
//   const galleryImages = place?.images?.length
//     ? place.images.map(img => process.env.PUBLIC_URL + "" + img.image_url)
//     : [place?.image_url ? process.env.PUBLIC_URL + "" + place.image_url : defaultImage];

//   // Dynamic videos (updated to match API response structure)
//   const videos = place?.videos?.length
//     ? place.videos.map((video, index) => ({
//         id: index,
//         title: place.name ? `${place.name} - Video ${index + 1}` : `Video ${index + 1}`,
//         url: process.env.PUBLIC_URL + "" + video.video_path,
//         fullScreenUrl: process.env.PUBLIC_URL + "" + video.video_path
//       }))
//     : [];

//   const [currentVideo, setCurrentVideo] = useState(null);
//   const [isFullScreen, setIsFullScreen] = useState(false);

//   const openFullScreenVideo = (videoUrl) => {
//     setCurrentVideo(videoUrl);
//     setIsFullScreen(true);
//   };

//   const closeFullScreenVideo = () => {
//     setCurrentVideo(null);
//     setIsFullScreen(false);
//   };

//   const openGalleryModal = (imageUrl) => {
//     setActiveImage(imageUrl);
//     setShowGalleryModal(true);
//   };

//   const closeGalleryModal = () => {
//     setActiveImage(null);
//     setShowGalleryModal(false);
//   };

//   const relatedPlacesSettings = {
//     dots: false,
//     infinite: similarPlaces.length > 3,
//     speed: 500,
//     slidesToShow: Math.min(3, similarPlaces.length || 1),
//     slidesToScroll: 1,
//     arrows: true,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: { slidesToShow: Math.min(3, similarPlaces.length || 1), slidesToScroll: 1 },
//       },
//       {
//         breakpoint: 600,
//         settings: { slidesToShow: Math.min(2, similarPlaces.length || 1), slidesToScroll: 1 },
//       },
//       {
//         breakpoint: 480,
//         settings: { slidesToShow: 1, slidesToScroll: 1 },
//       },
//     ],
//   };

//   const renderMap = () => {
//     if (!place?.latitude || !place?.longitude) {
//       return (
//         <div className="map-placeholder">
//           <p>📍 Map not available - Location coordinates missing</p>
//         </div>
//       );
//     }

//     const mapUrl = `https://maps.google.com/maps?q=${place.latitude},${place.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
//     return (
//       <div className="map-container">
//         <iframe
//           src={mapUrl}
//           width="100%"
//           height="400"
//           style={{ border: 0 }}
//           allowFullScreen=""
//           loading="lazy"
//           title={`Location Map for ${place.name || "Place"}`}
//           onError={() => setError("Failed to load map. Please check your connection.")}
//         />
//       </div>
//     );
//   };

//   const handleSimilarPlaceClick = (placeId) => {
//     navigate(`/places/${placeId}`);
//   };

//   const renderSimilarPlaces = () => {
//     if (similarPlacesLoading) {
//       return (
//         <div className="similar-places-loading">
//           <div className="loading-spinner">
//             <div className="spinner" />
//             <p>Finding nearby places...</p>
//           </div>
//         </div>
//       );
//     }

//     if (similarPlacesError) {
//       return (
//         <div className="similar-places-error">
//           <p>❌ {similarPlacesError}</p>
//           <button onClick={() => fetchSimilarPlaces(new AbortController().signal)} className="retry-button">
//             🔄 Try Again
//           </button>
//         </div>
//       );
//     }

//     if (similarPlaces.length === 0) {
//       return (
//         <div className="no-similar-places">
//           <p>🏞️ No nearby places found within 100km radius.</p>
//         </div>
//       );
//     }

//     return (
//       <div className="similar-places-container">
//         <Slider {...relatedPlacesSettings}>
//           {similarPlaces.map((similarPlace) => (
//             <div key={similarPlace.id} className="similar-place-card">
//               <div
//                 className="similar-place-content"
//                 onClick={() => handleSimilarPlaceClick(similarPlace.id)}
//                 role="button"
//                 tabIndex={0}
//                 onKeyDown={(e) => e.key === "Enter" && handleSimilarPlaceClick(similarPlace.id)}
//                 aria-label={`View details for ${similarPlace.name}`}
//               >
//                 <div className="similar-place-image">
//                   <img
//                     src={similarPlace.image_url || defaultImage}
//                     alt={`${similarPlace.name} thumbnail`}
//                     onError={(e) => (e.target.src = defaultImage)}
//                   />
//                   <div className="distance-badge">
//                     📍 {similarPlace.distance?.toFixed(1) || 0} km
//                   </div>
//                 </div>
//                 <div className="similar-place-info">
//                   <h3>{similarPlace.name}</h3>
//                   <p className="location">{getFormattedLocation(similarPlace)}</p>
//                   <div className="place-meta">
//                     <span className="rating">{formatRating(similarPlace.rating)}</span>
//                     {similarPlace.category && (
//                       <span className="category">{similarPlace.category}</span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     );
//   };

//   if (isLoading) {
//     return (
//       <div className="place-detail-page">
//         <div className="loading-container">
//           <div className="loading-spinner">
//             <div className="spinner" />
//             <p>Loading place details...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="place-detail-page">
//         <div className="error-container">
//           <h2>❌ {error}</h2>
//           <div className="error-actions">
//             <button onClick={() => fetchPlaceDetails(new AbortController().signal)} className="retry-button">
//               🔄 Retry
//             </button>
//             <button onClick={() => navigate("/places")} className="back-button">
//               ← Back to Places
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!place) {
//     return (
//       <div className="place-detail-page">
//         <div className="no-data">
//           <h2>No place data available</h2>
//           <button onClick={() => navigate("/places")} className="back-button">
//             Back to Places
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="place-detail-page">
//       <main className="place-content container-fluid">
//         <section className="place-hero">
//           <div className="hero-overlay" />
//           <img
//             src={place?.image_url || defaultImage}
//             alt={`${place?.name || "Place"} main image`}
//             className="hero-image"
//             onError={(e) => (e.target.src = defaultImage)}
//           />
//           <div className="hero-content">
//             <button
//               onClick={() => navigate("/places")}
//               className="back-button"
//               aria-label="Go back to places list"
//             >
//               ← Back to Places
//             </button>
//             <h1>{place?.name || "Unknown Place"}</h1>
//             <p className="place-location">{getFormattedLocation(place)}</p>
//             <div className="place-rating">
//               <span className="rating-stars">{formatRating(place?.rating)}</span>
//             </div>
//           </div>
//         </section>

//         <section className="place-info">
//           <h2>About {place.name}</h2>
//           <p>{place.description || "No description available"}</p>
//         </section>

//         {place.highlights?.length > 0 && (
//           <section className="place-highlights">
//             <h2>Highlights</h2>
//             <div className="highlights-grid">
//               {place.highlights.map((highlight, index) => (
//                 <div key={index} className="highlight-item">
//                   <span className="highlight-icon">✨</span>
//                   <span>{highlight}</span>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}

//         {galleryImages.length > 0 && (
//           <section className="place-gallery">
//             <h2>Image Gallery</h2>
//             <div className="gallery-images">
//               {galleryImages.map((img, index) => (
//                 <img
//                   key={index}
//                   src={img}
//                   alt={`${place.name} - Image ${index + 1}`}
//                   onClick={() => openGalleryModal(img)}
//                   onError={(e) => (e.target.src = defaultImage)}
//                 />
//               ))}
//             </div>
//           </section>
//         )}

//         {videos.length > 0 && (
//           <section className="place-videos">
//             <h2>Videos</h2>
//             <div className="video-grid">
//               {videos.map((video) => (
//                 <div key={video.id} className="video-card">
//                   <video
//                     src={video.url}
//                     controls
//                     playsInline
//                     loop
//                     style={{
//                       width: "100%",
//                       height: "200px",
//                       objectFit: "cover",
//                       borderRadius: "8px",
//                     }}
//                     aria-label={video.title}
//                   />
//                   <h3>{video.title}</h3>
//                   <button onClick={() => openFullScreenVideo(video.fullScreenUrl)}>
//                     Watch Full Video
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}

//         <section className="place-details">
//           <div className="detail-section">
//             <h3>🕐 Best Time to Visit</h3>
//             <p>{place.best_time_to_visit || "No information available"}</p>
//           </div>
//           <div className="detail-section">
//             <h3>🚗 How to Reach</h3>
//             <p>{place.how_to_reach || "No information available"}</p>
//           </div>
//           <div className="detail-section">
//             <h3>💰 Entry Fee</h3>
//             <p>{place.entry_fee || "Free Entry"}</p>
//           </div>
//           <div className="detail-section">
//             <h3>⏰ Timings</h3>
//             <p>{place.timings || "No information available"}</p>
//           </div>
//         </section>

//         <section className="place-map">
//           <h2>📍 Location Map</h2>
//           {renderMap()}
//         </section>

//         <section className="similar-places">
//           <h2>You May Also Like</h2>
//           {renderSimilarPlaces()}
//         </section>

//         {showGalleryModal && activeImage && (
//           <div className="gallery-modal" onClick={closeGalleryModal}>
//             <div className="modal-content">
//               <img
//                 src={activeImage}
//                 alt="Enlarged gallery image"
//                 onClick={(e) => e.stopPropagation()}
//                 onError={(e) => (e.target.src = defaultImage)}
//               />
//               <button
//                 className="close-modal"
//                 onClick={closeGalleryModal}
//                 aria-label="Close gallery modal"
//               >
//                 ×
//               </button>
//             </div>
//           </div>
//         )}

//         {isFullScreen && currentVideo && (
//           <div className="full-screen-video-overlay" onClick={closeFullScreenVideo}>
//             <div className="video-container">
//               <video
//                 src={currentVideo}
//                 controls
//                 autoPlay
//                 playsInline
//                 onClick={(e) => e.stopPropagation()}
//                 aria-label="Full-screen video"
//               />
//               <button
//                 className="close-video"
//                 onClick={closeFullScreenVideo}
//                 aria-label="Close full-screen video"
//               >
//                 ×
//               </button>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default PlaceDetail;