import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from "./api";
import { useAuth } from "./context/AuthContext.js";

function Profile() {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (user) {
      setFormData({ 
        name: user.name, 
        email: user.email, 
        password: "",
        confirmPassword: ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    
    if (!formData.name || !formData.email) {
      setErrorMessage("Name and email are required");
      return;
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      const updateData = {
        name: formData.name,
        email: formData.email
      };

      if (formData.password) {
        updateData.password = formData.password;
      }

      const res = await API.patch("/profile", updateData);
      
      if (res.data.success) {
        setUser({ 
          ...user, 
          name: formData.name, 
          email: formData.email 
        });
        setSuccessMessage("Profile updated successfully!");
        setIsEditing(false);
        setFormData({
          ...formData,
          password: "",
          confirmPassword: ""
        });
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (err) {
      console.error("Profile update error:", err);
      setErrorMessage(err.response?.data?.message || "Error updating profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFFDF8] via-[#FBF9F4] to-[#F8F7F4] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <p className="text-xl text-amber-800">Loading profile...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF8] via-[#FBF9F4] to-[#F8F7F4] py-20 px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800 mb-2 font-playfair">
              My Profile
            </h1>
            <p className="text-amber-700 text-lg">Manage your account information</p>
          </div>

          <motion.div
            layout
            className="mb-6"
          >
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-100 border-l-4 border-green-500 p-4 rounded-lg flex items-center gap-3"
              >
                <span className="text-2xl">✅</span>
                <p className="text-green-700">{successMessage}</p>
              </motion.div>
            )}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 border-l-4 border-red-500 p-4 rounded-lg flex items-center gap-3"
              >
                <span className="text-2xl">❌</span>
                <p className="text-red-700">{errorMessage}</p>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl shadow-xl border border-amber-100 overflow-hidden"
            whileHover={{ boxShadow: "0 20px 40px rgba(242, 140, 40, 0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-8 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-3xl"
                    whileHover={{ scale: 1.05 }}
                  >
                    👤
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-amber-100">{user.email}</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-6 py-2 bg-white text-amber-700 font-bold rounded-full hover:bg-amber-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isEditing ? "Cancel" : "Edit"}
                </motion.button>
              </div>
            </div>

            <div className="p-8">
              {!isEditing ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="border-b border-amber-100 pb-4">
                    <p className="text-sm font-semibold text-amber-600 uppercase tracking-wide">Full Name</p>
                    <p className="text-xl text-amber-900 font-medium mt-2">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-amber-600 uppercase tracking-wide">Email Address</p>
                    <p className="text-xl text-amber-900 font-medium mt-2">{user.email}</p>
                  </div>
                  <motion.div
                    className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-sm text-blue-700">
                      💡 <strong>Tip:</strong> Click the "Edit" button above to update your profile information or change your password.
                    </p>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleUpdate}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-bold text-amber-900 mb-2">Full Name</label>
                    <motion.input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition-colors"
                      placeholder="Enter your full name"
                      whileFocus={{ boxShadow: "0 0 0 3px rgba(180, 83, 9, 0.1)" }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-amber-900 mb-2">Email Address</label>
                    <motion.input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition-colors"
                      placeholder="Enter your email"
                      whileFocus={{ boxShadow: "0 0 0 3px rgba(180, 83, 9, 0.1)" }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-amber-900 mb-2">New Password (Optional)</label>
                    <motion.input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition-colors"
                      placeholder="Leave blank to keep current password"
                      whileFocus={{ boxShadow: "0 0 0 3px rgba(180, 83, 9, 0.1)" }}
                    />
                  </div>

                  {formData.password && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <label className="block text-sm font-bold text-amber-900 mb-2">Confirm Password</label>
                      <motion.input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition-colors"
                        placeholder="Re-enter your password"
                        whileFocus={{ boxShadow: "0 0 0 3px rgba(180, 83, 9, 0.1)" }}
                      />
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold rounded-lg hover:from-amber-700 hover:to-amber-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? "Updating..." : "Save Changes"}
                  </motion.button>
                </motion.form>
              )}
            </div>
          </motion.div>

          <motion.div
            className="mt-8 p-6 bg-amber-50 border-2 border-amber-200 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-bold text-amber-900 mb-2">🔒 Security Note</h3>
            <p className="text-amber-800 text-sm">
              Your account is protected with secure encryption. Never share your password with anyone. 
              We'll never ask for your password via email or phone.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Profile;
