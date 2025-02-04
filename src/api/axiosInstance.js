import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://cc5c-184-22-163-234.ngrok-free.app/api",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn("Unauthorized! Redirecting to login...");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error("Request error:", error.message);
    }

    // return Promise.reject(error);
  }
);

export default apiClient;
