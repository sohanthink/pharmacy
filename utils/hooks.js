import { useQuery } from "@tanstack/react-query";
import { fetchSuppliers } from "./api";

export const useFetchSuppliers = () => {
  return useQuery({
    queryKey: ["suppliers"],
    queryFn: fetchSuppliers,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    onError: (error) => {
      console.error("Failed to fetch suppliers:", error);
    },
  });
};
