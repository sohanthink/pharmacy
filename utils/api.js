// utils/api.js
import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

const API_BASE_URL = "https://pharmacy.sohanthink.com/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json", // Default content type
  },
});

// Interceptor to add token to every request
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("accessToken");
    console.log(token);

    if (!config.url.includes("/auth/login") && token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("token:", token);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiry and redirect
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login if unauthorized
      await SecureStore.deleteItemAsync("accessToken");
      router.replace("/"); // Redirect to the login or home screen
    }
    return Promise.reject(error);
  }
);

// Function to handle login
export const Login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", {
      email_or_phone: email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("API error/while login:", error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

// Function to add a supplier
export const addsupplier = async (
  supplier_name,
  supplier_email,
  supplier_phone,
  company_name
) => {
  try {
    const response = await api.post("/user/medicine_company", {
      supplier_name,
      supplier_email,
      supplier_phone,
      company_name,
    });
    return response.data;
  } catch (error) {
    console.error("API error/while Adding Supplier:", error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

// Function to fetch all suppliers
export const fetchSuppliers = async () => {
  try {
    const response = await api.get("/user/medicine_company");
    return response.data;
  } catch (error) {
    console.error("API error while fetching suppliers:", error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const deleteSupplier = async (supplierId) => {
  try {
    const response = await api.delete(`user/medicine_company/${supplierId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete supplier."
    );
  }
};

// Function to add a medeicine categories
export const addcategories = async (category_name) => {
  try {
    const response = await api.post("/user/category", {
      category_name,
    });
    return response.data;
  } catch (error) {
    console.error("API error/while Adding medicine categories:", error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

// Function to fetch all medicine categories
export const fetchMedicineCategories = async () => {
  try {
    const response = await api.get("/user/category");
    return response.data;
  } catch (error) {
    console.error("API error while fetching suppliers:", error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export default api;
