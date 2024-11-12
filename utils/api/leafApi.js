// api/leafApi.js
import api from "./axiosInstance";

// Add a leaf setting
export const addLeafSetting = async (leaf_type, total_number) => {
  try {
    const response = await api.post("/user/leaf_setting", {
      leaf_type,
      total_number,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Network Error");
  }
};

// Fetch all leaf settings
export const fetchLeafSettings = async () => {
  try {
    const response = await api.get("/user/leaf_setting");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Network Error");
  }
};
