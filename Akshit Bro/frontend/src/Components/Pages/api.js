// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000",
//   withCredentials: true,
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export const getProfile = () => API.get("/profile");
// export const updateProfile = (data) => API.put("/profile", data);

// export default API;


import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// Attach token only if available (for protected routes)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Example protected routes
export const getProfile = () => API.get("/profile");
export const updateProfile = (data) => API.put("/profile", data);

export default API;
