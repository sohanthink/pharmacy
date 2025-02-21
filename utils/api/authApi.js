import api from "./axiosInstance";

// Function to handle login
export const Login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", {
      email_or_phone: email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log("Login error:", error);
    console.error("API error/while login:", error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
};
