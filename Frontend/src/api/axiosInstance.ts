 
 

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.BACKEND_API_BASE_URL, // 🔁 Replace with your backend URL
  headers: {
  "ngrok-skip-browser-warning": "69420",
}
  ,
});

// ✅ Request Interceptor: Attach JWT token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // or from a Redux store/context
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor: Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized (e.g., token expired)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; // force redirect to login
    }

    // Optionally show toast here or return error message
    return Promise.reject(error);
  }
);

export default axiosInstance;
