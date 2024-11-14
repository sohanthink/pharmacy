// hooks.js
import { useQuery } from "@tanstack/react-query";
import { fetchSuppliers } from "./api/supplierApi";
import { fetchCategories } from "./api/categoryApi";
import { fetchLeafSettings } from "./api/leafApi";
import { fetchMedicineCategories } from "./api/categoryApi";
import { fetchMedicineCompanies } from "./api/companyNameApi";

const queryConfig = {
  staleTime: 15 * 60 * 1000, // Data is fresh for 15 minutes
  cacheTime: 30 * 60 * 1000, // Cached in memory for 30 minutes
  onError: (error) => {
    console.error("Query error:", error);
  },
};

// fetch all suppliers
export const useFetchSuppliers = () => {
  return useQuery({
    ...queryConfig,
    queryKey: ["suppliers"],
    queryFn: fetchSuppliers,
  });
};

// fetch medicine categories
export const useFetchMedicineCategories = () => {
  return useQuery({
    ...queryConfig,
    queryKey: ["medicineCategories"],
    queryFn: fetchMedicineCategories,
    onError: (error) => {
      console.error("Failed to fetch suppliers:", error);
    },
  });
};

// export const useFetchCategories = () => {
//   return useQuery({
//     ...queryConfig,
//     queryKey: ["categories"],
//     queryFn: fetchCategories,
//   });
// };

export const useFetchLeafSettings = () => {
  return useQuery({
    ...queryConfig,
    queryKey: ["leafSettings"],
    queryFn: fetchLeafSettings,
  });
};

export const useFetchCompanyNames = () => {
  return useQuery({
    ...queryConfig,
    queryKey: ["fetchCompanyNames"],
    queryFn: fetchMedicineCompanies,
  });
};
