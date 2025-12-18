import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getProfile } from "./Pages/api.js";

const IMAGE_BASE_URL = "http://localhost:5000/Images/";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);

  const navigate = useNavigate();

  const navItems = [
    { label: "Home", href: "/", onClick: () => navigate("/") },
    { label: "Destinations", href: "/places", onClick: () => navigate("/places") },
    { label: "Blog", href: "/blog", onClick: () => navigate("/blog") },
    { label: "Contact", href: "/contact", onClick: () => navigate("/contact") },
    { label: "FAQ", href: "/faq", onClick: () => navigate("/faq") }
  ];

  const defaultImage = "https://via.placeholder.com/400x300?text=Place";
  
  const getImageUrl = (imagePath) => {
    if (!imagePath) return defaultImage;
    const cleanPath = imagePath.startsWith('images/') ? imagePath.substring(7) : imagePath;
    return `${IMAGE_BASE_URL}${cleanPath}`;
  };

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await getProfile();
        const profile = res.data.user || res.data;
        setUser(profile);
        localStorage.setItem("user", JSON.stringify(profile));
      } catch (err) {
        setUser(null);
        localStorage.removeItem("user");
      }
    };
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim().length > 0) {
        try {
          setIsSearching(true);
          
          const response = await axios.get(`http://localhost:5000/search`, {
            params: {
              q: searchTerm
            }
          });

          const places = response.data.places || [];
          setSearchResults(places.slice(0, 5));
        } catch (error) {
          console.error('Search error:', error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/places?search=${encodeURIComponent(searchTerm)}`);
      setShowSearch(false);
      setSearchTerm('');
    }
  };

  const handleResultClick = (place) => {
    navigate(`/places/${place.id}`);
    setShowSearch(false);
    setSearchTerm('');
    setSearchResults([]);
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-yellow-600/30 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Link to="/" className="flex items-center gap-2 text-amber-900 font-bold text-xl hover:text-amber-700 transition-colors">
            <svg width="28" height="28" strokeWidth="2" fill="none" stroke="currentColor" className="text-amber-700">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="hidden sm:inline">Travel Explorer</span>
          </Link>

          <div className="hidden md:flex flex-1 justify-center gap-8">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={item.onClick}
                className="text-amber-900 font-semibold hover:text-amber-700 transition-colors text-sm"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">

            <div className="relative" ref={searchRef}>
              <button 
                className="p-2 text-amber-700 hover:text-amber-900 transition-colors"
                onClick={() => setShowSearch(!showSearch)}
              >
                🔍
              </button>
              
              {showSearch && (
                <div className="absolute right-0 top-full mt-1 w-96 bg-white rounded-lg shadow-2xl border border-amber-200 z-50">
                  <form onSubmit={handleSearchSubmit} className="p-4 border-b border-amber-200">
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Search destinations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 bg-amber-50 text-amber-900 px-4 py-2 rounded border border-amber-300 focus:border-amber-600 focus:outline-none h-10"
                        autoFocus
                      />
                      <button type="submit" className="bg-gradient-to-r from-amber-700 to-amber-600 text-white px-6 py-2 rounded hover:opacity-90 transition-opacity font-bold h-10 whitespace-nowrap">
                        Search
                      </button>
                    </div>
                  </form>
                  
                  {isSearching && (
                    <div className="p-4 text-center text-amber-700">Searching...</div>
                  )}
                  
                  {searchResults.length > 0 && (
                    <div className="max-h-96 overflow-y-auto">
                      {searchResults.map((place) => (
                        <div
                          key={place.id}
                          className="flex gap-3 p-3 border-b border-amber-200 hover:bg-amber-100 cursor-pointer transition-colors"
                          onClick={() => handleResultClick(place)}
                        >
                          <img
                            src={getImageUrl(place.image_url)}
                            alt={place.name}
                            className="w-12 h-12 object-cover rounded"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/Images/default-place.jpg';
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-amber-900 font-semibold truncate">{place.name}</h4>
                            <p className="text-amber-700 text-sm">📍 {place.city}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {!isSearching && searchTerm && searchResults.length === 0 && (
                    <div className="p-4 text-center text-amber-700">No results found</div>
                  )}
                </div>
              )}
            </div>

            {user ? (
              <div className="relative group">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-100 hover:bg-amber-200 cursor-pointer transition-colors">
                  <div className="w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center text-white font-bold text-sm">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-amber-900 text-sm hidden sm:inline truncate max-w-xs">{user.name}</span>
                </div>

                <ul className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-2xl border border-amber-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <li className="border-b border-amber-200"><Link to="/profile" className="block px-4 py-2 text-amber-800 hover:text-amber-900 hover:bg-amber-100 transition-colors">My Profile</Link></li>
                  <li><button onClick={logout} className="w-full text-left px-4 py-2 text-amber-800 hover:text-amber-900 hover:bg-amber-100 transition-colors">Logout</button></li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:block px-4 py-2 bg-gradient-to-r from-amber-700 to-amber-600 text-white rounded-lg font-bold hover:opacity-90 transition-opacity">Login</Link>
            )}
          </div>

          <button className="md:hidden ml-4 p-2 text-amber-700 hover:text-amber-900 transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="w-6 h-5 flex flex-col justify-around">
              <span className={`h-0.5 bg-white transition-all ${ menuOpen ? 'rotate-45 translate-y-2' : '' }`}></span>
              <span className={`h-0.5 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
