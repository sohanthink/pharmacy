// api/supplierApi.js
import api from "./axiosInstance";

// Add a supplier
export const addSupplier = async (
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
    throw new Error(error.response?.data || "Network Error");
  }
};

// Fetch all suppliers
export const fetchSuppliers = async () => {
  try {
    const response = await api.get("/user/medicine_company");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Network Error");
  }
};

// Delete a supplier
export const deleteSupplier = async (supplierId) => {
  try {
    const response = await api.delete(`/user/medicine_company/${supplierId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete supplier."
    );
  }
};
