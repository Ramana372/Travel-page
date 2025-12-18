import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./context/AuthContext.js";
import { motion } from "framer-motion";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    if (errors[id]) setErrors({ ...errors, [id]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin) {
      if (!formData.name.trim()) newErrors.name = "Full name is required";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/login" : "/register";
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await axios.post(`http://localhost:5000${endpoint}`, payload);

      if (response.data.success) {
        if (isLogin) {
          localStorage.setItem("token", response.data.token);
          setUser(response.data.user);
          navigate("/home", { replace: true });
        } else {
          setError("Registration successful! Please login.");
          setIsLogin(true);
        }
      } else {
        throw new Error(response.data.message || "Operation failed");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setError("");
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 flex items-center justify-center p-5 relative overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full blur-3xl opacity-20"
          animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ top: '-50px', right: '-50px' }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-3xl opacity-20"
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{ bottom: '-50px', left: '-50px' }}
        />
      </div>

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white rounded-3xl shadow-2xl border border-indigo-100 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 px-8 py-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-white/90 text-sm">
              {isLogin
                ? "Sign in to explore amazing destinations"
                : "Join us to start your adventure"}
            </p>
          </div>

          <div className="px-8 py-8">
            {error && (
              <motion.div
                className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg text-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-amber-900">Full Name</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">👤</span>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full h-12 pl-12 pr-4 bg-white border-2 rounded-lg text-gray-800 placeholder-gray-400 transition-all shadow-sm ${
                        errors.name
                          ? "border-red-500 focus:ring-2 focus:ring-red-200"
                          : "border-indigo-200 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                      }`}
                    />
                  </div>
                  {errors.name && <span className="text-red-600 text-xs">{errors.name}</span>}
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-amber-900">Email Address</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">📧</span>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full h-12 pl-12 pr-4 bg-white border-2 rounded-lg text-gray-800 placeholder-gray-400 transition-all shadow-sm ${
                      errors.email
                        ? "border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-indigo-200 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    }`}
                  />
                </div>
                {errors.email && <span className="text-red-600 text-xs">{errors.email}</span>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-amber-900">Password</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">🔒</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full h-12 pl-12 pr-12 bg-white border-2 rounded-lg text-gray-800 placeholder-gray-400 transition-all shadow-sm ${
                      errors.password
                        ? "border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-indigo-200 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer hover:text-indigo-600 transition-colors"
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                {errors.password && <span className="text-red-600 text-xs">{errors.password}</span>}
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-amber-900">Confirm Password</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">🔐</span>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`w-full h-12 pl-12 pr-12 bg-white border-2 rounded-lg text-gray-800 placeholder-gray-400 transition-all shadow-sm ${
                        errors.confirmPassword
                          ? "border-red-500 focus:ring-2 focus:ring-red-200"
                          : "border-indigo-200 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer hover:text-indigo-600 transition-colors"
                    >
                      {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="text-red-600 text-xs">{errors.confirmPassword}</span>}
                </div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-8 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold text-lg rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? "Processing..." : (isLogin ? "Sign In" : "Create Account")}
              </motion.button>

              {isLogin && (
                <div className="text-center mt-4">
                  <Link
                    to="/forgot-password"
                    className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm transition-colors"
                  >
                    Forgot your password?
                  </Link>
                </div>
              )}
            </form>

            <div className="mt-6">
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-600">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  type="button"
                  className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-indigo-200 rounded-lg text-gray-800 font-semibold hover:bg-indigo-50 hover:border-indigo-400 transition-all shadow-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xl">🔵</span>
                  <span className="hidden sm:inline text-sm">Google</span>
                </motion.button>
                <motion.button
                  type="button"
                  className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-indigo-200 rounded-lg text-gray-800 font-semibold hover:bg-indigo-50 hover:border-indigo-400 transition-all shadow-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xl">🍎</span>
                  <span className="hidden sm:inline text-sm">Apple</span>
                </motion.button>
              </div>
            </div>

            <p className="text-center mt-8 text-gray-700 text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <motion.button
                onClick={toggleForm}
                className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors bg-none border-none cursor-pointer p-0"
                whileHover={{ scale: 1.05 }}
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </motion.button>
            </p>
          </div>
        </div>

        <motion.p
          className="text-center text-gray-600 text-xs mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Your gateway to exploring the world's most beautiful destinations
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoginRegister;
