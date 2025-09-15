import axios from "axios";
import { getToken } from "../auth/session";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5081/api",
});

// Anexa o Bearer automaticamente
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;