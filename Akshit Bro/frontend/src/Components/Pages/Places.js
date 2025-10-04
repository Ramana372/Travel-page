import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Places.css";
import API from "./api.js";



const Places = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const defaultImage = "/Images/carousel-img2.jpg";
  const defaultCategory = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  const categories = [
    { id: "all", name: "All Places" },
    { id: "hills", name: "Hills & Mountains" },
    { id: "beaches", name: "Beaches" },
    { id: "waterfalls", name: "Waterfalls" },
    { id: "caves", name: "Caves" },
    { id: "temples", name: "Temples" },
    { id: "forts", name: "Forts" }
  ];

  useEffect(() => {
    fetchPlaces();
  }, []);

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category") || "all";
    setSelectedCategory(categoryFromUrl);
  }, [searchParams]);

  useEffect(() => {
    filterPlaces();
  }, [selectedCategory, places]);

  const filterPlaces = () => {
    if (selectedCategory === "all") {
      setFilteredPlaces(places);
    } else {
      const filtered = places.filter(place =>
        place.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredPlaces(filtered);
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
    // Pass numeric ID to match MySQL database format
    navigate(`/places/${placeId}`);
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = defaultImage;
  };

  if (loading) {
    return (
      <div className="places-page container-fluid">
        <div className="loading">Loading places...</div>
      </div>
    );
  }

  return (
    <div className="places-page container-fluid">
      <div className="places-header">
        <h2 className="search-title">Explore Places</h2>
        <h2 className="popular-title">Popular Destinations</h2>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category.id}
            id={`category-${category.id}`}
            className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="places-grid">
        {filteredPlaces.length > 0 ? (
          filteredPlaces.map((place) => (
            <div
              key={place.id}
              className="place-card"
              onClick={() => handlePlaceClick(place.id)}
            >
              <div className="place-image-container">
                <img
                  src={place.image_url}
                  alt={place.name}
                  className="place-image"
                  onError={handleImageError}
                  loading="lazy"
                />
              </div>
              <div className="place-info">
                <h3 className="place-name">{place.name}</h3>
                <p className="place-description">{place.description}</p>
                <div className="place-meta">
                  <span className="place-location">
                    📍 {place.location || place.city}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-places">No places found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Places;
