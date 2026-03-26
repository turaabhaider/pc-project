import axios from 'axios';

const API = axios.create({
  // This automatically uses the Railway URL when deployed
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

export default API;