// api/categoryApi.js
import api from "./axiosInstance";

// Add a medicine category
export const addCategory = async (category_name) => {
  try {
    const response = await api.post("/user/category", { category_name });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Network Error");
  }
};

// Fetch all categories
export const fetchMedicineCategories = async () => {
  try {
    const response = await api.get("/user/category");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Network Error");
  }
};
