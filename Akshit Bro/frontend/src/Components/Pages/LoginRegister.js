import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginRegister.css";
import { AuthContext } from "./context/AuthContext.js";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      const endpoint = isLogin ? "/login" : "/register";
      const response = await axios.post(
        `http://localhost:5000${endpoint}`,
        isLogin
          ? { email: formData.email, password: formData.password }
          : formData
      );

      if (response.data.success) {
        if (isLogin) {
          // Store the token
          localStorage.setItem("token", response.data.token);

          // Store user info if backend sends it
          if (response.data.user) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            setUser(response.data.user);
          }

          // Redirect to home page
          navigate("/home", { replace: true });
        } else {
          // Show success message and switch to login
          setError("Registration successful! Please login.");
          setIsLogin(true);
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h2>{isLogin ? "Welcome Back!" : "Create Account"}</h2>
          <p>
            {isLogin
              ? "Please login to your account"
              : "Join us for amazing travel experiences"}
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          {isLogin && (
            <div className="form-group remember-forgot">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>
          )}

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={toggleForm} className="toggle-button">
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
