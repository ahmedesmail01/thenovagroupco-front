import axios from "axios";

const api = axios.create({
  baseURL: "https://api.example.com", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptors if needed
api.interceptors.request.use((config) => {
  // const token = localStorage.getItem('token')
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`
  // }
  return config;
});

export default api;
