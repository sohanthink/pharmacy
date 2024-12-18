// api/supplierApi.js
import api from "./axiosInstance";

// Add a supplier
export const addSupplier = async (
  supplier_name,
  supplier_email,
  supplier_phone,
  medicine_company_id
) => {
  try {
    const response = await api.post("/user/supplier", {
      supplier_name,
      supplier_email,
      supplier_phone,
      medicine_company_id,
    });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Network Error");
  }
};

// Fetch all suppliers
export const fetchSuppliers = async () => {
  try {
    const response = await api.get("/user/supplier");
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
