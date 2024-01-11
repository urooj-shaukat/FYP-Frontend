import axios from "axios";

const http = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: { 'Content-Type': 'application/json' }
});


http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && !config.url.includes('/User/login')) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    const token = response.data.token;
    if (token) {
      localStorage.setItem("token", token);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;

