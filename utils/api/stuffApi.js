import api from "./axiosInstance";

// Add a stuff
export const addStuff = async (
  name,
  email,
  phone,
  password,
  password_confirmation
) => {
  try {
    const response = await api.post("/user/create", {
      name,
      email,
      phone,
      password,
      password_confirmation,
    });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Network Error");
  }
};
