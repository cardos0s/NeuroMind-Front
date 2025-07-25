import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5081/api',
  });
// Interceptor para adicionar o token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) { 
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;