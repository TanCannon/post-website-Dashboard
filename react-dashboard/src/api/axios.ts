import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// Interceptor
// api will redirect to login on 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;