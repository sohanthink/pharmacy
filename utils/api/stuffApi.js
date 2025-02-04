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

//fetch all stuff
export const fetchStuff = async () => {
  try {
    const response = await api.get("/user/index");
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Network Error");
  }
};
