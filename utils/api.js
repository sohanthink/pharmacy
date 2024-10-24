import axios from "axios";

const API_BASE_URL = "https://pharmacy.sohanthink.com/api"; // replace with your actual API URL

// Function to handle API requests
const apiRequest = async (method, url, data = {}, headers = {}) => {
  try {
    const response = await axios({
      method,
      url: `${API_BASE_URL}${url}`,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("API error:", error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

// Example functions for login, sign up, etc.
export const login = (email, password) => {
  return apiRequest("POST", "/auth/login", { email, password });
};

export const getUserProfile = (token) => {
  return apiRequest(
    "GET",
    "/user/profile",
    {},
    { Authorization: `Bearer ${token}` }
  );
};
