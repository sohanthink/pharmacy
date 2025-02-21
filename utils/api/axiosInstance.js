// api/axiosInstance.js
import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

const API_BASE_URL = "https://pharmacy.sohanthink.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Utility to get token from SecureStore
const getToken = async () => await SecureStore.getItemAsync("accessToken");

// Request interceptor to add token
api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token && !config.url.includes("/auth/login")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      await SecureStore.deleteItemAsync("accessToken");
      router.replace("/"); // Redirect to login or home
    }
    return Promise.reject(error);
  }
);

export default api;
