import axios from "axios";
import { useErrorStore } from "@/stores/errorStore";

const apiClient = axios.create({
  baseURL: "http://localhost:5184/api",
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
    const errorStore = useErrorStore();

    if (error.response) {
      if (error.response.status === 401) {
        errorStore.setError("Unauthorized! Please log in again.", "auth");
        localStorage.removeItem("token");
      } else if (
        error.response.status === 404 ||
        error.response.status === 400
      ) {
        return Promise.reject(error);
      } else {
        errorStore.setError(`Error: ${error.response.statusText}`, "general");
      }
    } else if (error.request) {
      errorStore.setError("No response from the server.", "network");
    } else {
      errorStore.setError(`Request error: ${error.message}`, "unknown");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
