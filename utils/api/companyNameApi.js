import api from "./axiosInstance";

// add medicine company names eg: ACME,Beximco etc
export const addMedicineCompany = async (company_name) => {
  try {
    const response = await api.post("/user/medicine_company", {
      company_name,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Network Error");
  }
};

// fetch medicine companies

export const fetchMedicineCompanies = async () => {
  try {
    const response = await api.get("/user/medicine_company");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || "Network Error");
  }
};
