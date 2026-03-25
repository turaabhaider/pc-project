import axios from 'axios';

const API = axios.create({
  // In production on Railway, this will use the VITE_API_URL variable
  // In local development, it falls back to your localhost:5000
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

export default API;