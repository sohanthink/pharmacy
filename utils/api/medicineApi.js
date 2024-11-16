// api/supplierApi.js
import api from "./axiosInstance";

// Add a supplier
export const addMedicine = async (
  category_id,
  leaf_setting_id,
  medicine_company_id,
  medicine_name,
  shelf_id,
  medicine_details,
  supplier_price,
  box_mrp
) => {
  try {
    const response = await api.post("/user/medicine", {
      category_id,
      leaf_setting_id,
      medicine_company_id,
      medicine_name,
      shelf_id,
      medicine_details,
      supplier_price,
      box_mrp,
    });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Network Error");
  }
};

// Fetch all medicines
export const fetchMedicines = async () => {
  try {
    const response = await api.get("/user/medicine");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Network Error");
  }
};
