// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { placesData } from '../data';
// import './Navbar.css';

// const Navbar = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [searchResults, setSearchResults] = useState([]);
//     const [showResults, setShowResults] = useState(false);
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [isSearching, setIsSearching] = useState(false);
//     const [searchError, setSearchError] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const delayDebounceFn = setTimeout(async () => {
//             if (searchTerm.trim().length > 0) {
//                 try {
//                     setIsSearching(true);
//                     setSearchError(null);
//                     console.log('Searching for:', searchTerm);

//                     const localResults = Object.entries(placesData)
//                         .filter(([_, place]) => {
//                             const searchLower = searchTerm.toLowerCase();
//                             return (
//                                 place.name.toLowerCase().includes(searchLower) ||
//                                 place.city?.toLowerCase().includes(searchLower) ||
//                                 place.location?.toLowerCase().includes(searchLower) ||
//                                 place.description?.toLowerCase().includes(searchLower)
//                             );
//                         })
//                         .map(([id, place]) => ({
//                             id,
//                             name: place.name,
//                             city: place.city || place.location,
//                             description: place.description,
//                             image_url: place.image_url
//                         }));

//                     if (localResults.length > 0) {
//                         console.log('Found results in local data:', localResults);
//                         setSearchResults(localResults);
//                         setShowResults(true);
//                         return;
//                     }

//                     // If no local results, try API
//                     const response = await axios.get(`http://localhost:5000/search?q=${encodeURIComponent(searchTerm)}`);
//                     console.log('Search results from API:', response.data);
//                     setSearchResults(response.data.places || []);
//                     setShowResults(true);
//                 } catch (error) {
//                     console.error('Search error:', error);
//                     setSearchError('Failed to search places. Please try again.');
//                     setSearchResults([]);
//                 } finally {
//                     setIsSearching(false);
//                 }
//             } else {
//                 setSearchResults([]);
//                 setShowResults(false);
//             }
//         }, 300); // 300ms delay

//         return () => clearTimeout(delayDebounceFn);
//     }, [searchTerm]);

//     const handleSearch = (e) => {
//         const value = e.target.value;
//         setSearchTerm(value);
//     };

//     const handleResultClick = (place) => {
//         console.log('Selected place:', place);
//         setShowResults(false);
//         setSearchTerm('');
//         navigate(`/places/${place.id}`);
//         setMenuOpen(false);
//     };

//     const handleMenuToggle = () => {
//         setMenuOpen(!menuOpen);
//     };

//     const handleLinkClick = () => {
//         setMenuOpen(false);
//     };

//     return (
//         <nav className="navbar">
//             <div className="navbar-container">
//                 <Link to="/" className="navbar-logo" onClick={handleLinkClick}>
//                     Travel Guide
//                 </Link>

//                 <button className="menu-toggle" onClick={handleMenuToggle}>
//                     ☰
//                 </button>

//                 <div className="search-container">
//                     <input
//                         type="text"
//                         placeholder="Search places or cities..."
//                         value={searchTerm}
//                         onChange={handleSearch}
//                         className="search-input"
//                     />
//                     {isSearching && (
//                         <div className="search-loading">Searching...</div>
//                     )}
//                     {searchError && (
//                         <div className="search-error">{searchError}</div>
//                     )}
//                     {showResults && searchResults.length > 0 && (
//                         <div className="search-results">
//                             {searchResults.map((place) => (
//                                 <div
//                                     key={place.id}
//                                     className="search-result-item"
//                                     onClick={() => handleResultClick(place)}
//                                 >
//                                     <div className="search-result-image">
//                                         <img
//                                             src={place.image_url || '/Images/default-place.jpg'}
//                                             alt={place.name}
//                                             onError={(e) => {
//                                                 e.target.onerror = null;
//                                                 e.target.src = '/Images/default-place.jpg';
//                                             }}
//                                         />
//                                     </div>
//                                     <div className="search-result-info">
//                                         <h4>{place.name}</h4>
//                                         <p className="result-location">📍 {place.city || place.location}</p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                     {showResults && searchResults.length === 0 && !isSearching && (
//                         <div className="search-no-results">No places found</div>
//                     )}
//                 </div>

//                 <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
//                     <li className="nav-item">
//                         <Link to="/" className="nav-link" onClick={handleLinkClick}>
//                             Home
//                         </Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link to="/places" className="nav-link" onClick={handleLinkClick}>
//                             Places
//                         </Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link to="/Expert" className="nav-link" onClick={handleLinkClick}>
//                             Expert
//                         </Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link to="/about" className="nav-link" onClick={handleLinkClick}>
//                             About
//                         </Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link to="/login" className="nav-link login-link" onClick={handleLinkClick}>
//                             Login
//                         </Link>
//                     </li>
//                 </ul>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { placesData } from "../data";
import { getProfile } from "./Pages/api.js";
import "./Navbar.css";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Load stored user on first render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch fresh profile from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.debug("No token found - skipping profile fetch");
          return;
        }

        console.debug("Fetching profile with token present");
        const res = await getProfile();
        setUser(res.data.user || res.data);

        // keep localStorage updated
        localStorage.setItem("user", JSON.stringify(res.data.user || res.data));
      } catch (err) {
        console.error("Failed to fetch profile", err);
        setUser(null);
        localStorage.removeItem("user");
      }
    };
    fetchUser();
  }, []);

  // 🔍 Search logic
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim().length > 0) {
        try {
          setIsSearching(true);
          setSearchError(null);

          const localResults = Object.entries(placesData)
            .filter(([_, place]) => {
              const searchLower = searchTerm.toLowerCase();
              return (
                place.name.toLowerCase().includes(searchLower) ||
                place.city?.toLowerCase().includes(searchLower) ||
                place.location?.toLowerCase().includes(searchLower) ||
                place.description?.toLowerCase().includes(searchLower)
              );
            })
            .map(([id, place]) => ({
              id,
              name: place.name,
              city: place.city || place.location,
              description: place.description,
              image_url: place.image_url,
            }));

          if (localResults.length > 0) {
            setSearchResults(localResults);
            setShowResults(true);
            return;
          }

          const response = await axios.get(
            `http://localhost:5000/search?q=${encodeURIComponent(searchTerm)}`
          );
          setSearchResults(response.data.places || []);
          setShowResults(true);
        } catch (error) {
          console.error("Search error:", error);
          setSearchError("Failed to search places. Please try again.");
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleResultClick = (place) => {
    setShowResults(false);
    setSearchTerm("");
    navigate(`/places/${place.id}`);
    setMenuOpen(false);
  };

  const handleMenuToggle = () => setMenuOpen(!menuOpen);
  const handleLinkClick = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={handleLinkClick}>
          Travel Guide
        </Link>

        <button className="menu-toggle" onClick={handleMenuToggle}>
          ☰
        </button>

        {/* 🔍 Search Box */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search places or cities..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          {isSearching && <div className="search-loading">Searching...</div>}
          {searchError && <div className="search-error">{searchError}</div>}
          {showResults && searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((place) => (
                <div
                  key={place.id}
                  className="search-result-item"
                  onClick={() => handleResultClick(place)}
                >
                  <div className="search-result-image">
                    <img
                      src={place.image_url || "/Images/default-place.jpg"}
                      alt={place.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/Images/default-place.jpg";
                      }}
                    />
                  </div>
                  <div className="search-result-info">
                    <h4>{place.name}</h4>
                    <p className="result-location">
                      📍 {place.city || place.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {showResults && searchResults.length === 0 && !isSearching && (
            <div className="search-no-results">No places found</div>
          )}
        </div>

        {/* 🔗 Menu Items */}
        <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={handleLinkClick}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/places" className="nav-link" onClick={handleLinkClick}>
              Places
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Expert" className="nav-link" onClick={handleLinkClick}>
              Expert
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link" onClick={handleLinkClick}>
              About
            </Link>
          </li>


          {user ? (
  <li className="nav-item dropdown">
    <span className="nav-link profile-link">
      <div className="profile-avatar">
        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
      </div>
      <span className="profile-name">{user.name || "Profile"}</span> ⬇
    </span>
    <ul className="dropdown-menu">
      <li className="dropdown-header">
        <div className="profile-avatar large">
          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
        <div className="profile-info">
          <strong>{user.name}</strong>
          <p>{user.email}</p>
        </div>
      </li>
      <li>
        <Link to="/profile" onClick={handleLinkClick}>
          ✏️ Edit Profile
        </Link>
      </li>
      <li>
        <button onClick={handleLogout} className="logout-btn">
          🚪 Logout
        </button>
      </li>
    </ul>
  </li>
) : (
  <li className="nav-item">
    <Link
      to="/login"
      className="nav-link login-link"
      onClick={handleLinkClick}
    >
      Login
    </Link>
  </li>
)}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
