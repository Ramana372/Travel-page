// import React, { useEffect, useState } from "react";
// import { getProfile, updateProfile } from "./api";
// import "./Profile.css";

// export default function Profile() {
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     getProfile()
//       .then((res) => setFormData({ ...res.data, password: "" }))
//       .catch(() => setError("❌ Failed to load profile"));
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       const res = await updateProfile(formData);
//       setSuccess("✅ Profile updated successfully!");
//     } catch (err) {
//       setError("❌ Failed to update profile");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "auto" }}>
//       <h2>Edit Profile</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {success && <p style={{ color: "green" }}>{success}</p>}

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input type="text" name="name" value={formData.name} onChange={handleChange} />
//         </div>

//         <div>
//           <label>Email:</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} />
//         </div>

//         <div>
//           <label>Password (optional):</label>
//           <input type="password" name="password" value={formData.password} onChange={handleChange} />
//         </div>

//         <button type="submit">Save Changes</button>
//       </form>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { getProfile, updateProfile } from "./api";
// import "./Profile.css"; // ✅ import the CSS

// export default function Profile() {
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     getProfile()
//       .then((res) => setFormData({ ...res.data, password: "" }))
//       .catch(() => setError("❌ Failed to load profile"));
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       await updateProfile(formData);
//       setSuccess("✅ Profile updated successfully!");
//     } catch (err) {
//       setError("❌ Failed to update profile");
//     }
//   };

//   return (
//     <div className="profile-container container-fluid">
//       <h2>Edit Profile</h2>
//       {error && <p className="error">{error}</p>}
//       {success && <p className="success">{success}</p>}

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input type="text" name="name" value={formData.name} onChange={handleChange} />
//         </div>

//         <div>
//           <label>Email:</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} />
//         </div>

//         <div>
//           <label>Password (optional):</label>
//           <input type="password" name="password" value={formData.password} onChange={handleChange} />
//         </div>

//         <button type="submit">Save Changes</button>
//       </form>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import API from "./api";
import { useAuth } from "./context/AuthContext.js";

function Profile() {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email, password: "" });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.patch("/profile", formData);
      if (res.data.success) {
        // ✅ Update global context immediately
        setUser({ ...user, name: formData.name, email: formData.email });
        alert("Profile updated successfully!");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      alert("Error updating profile.");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter new password (optional)"
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;
