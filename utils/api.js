import axios from "axios";

const API_BASE_URL = "https://pharmacy.sohanthink.com/api";

// Function to handle API requests
export const Login = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      {
        email_or_phone: email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json", // Ensure JSON data
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API error/while login:", error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

// Function to Add Supplier requests
export const addsupplier = async (
  supplier_name,
  supplier_email,
  supplier_phone,
  company_name,
  supplier_no
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/medicine_company`,
      {
        supplier_name,
        supplier_email,
        supplier_phone,
        company_name,
        supplier_no,
      },
      {
        headers: {
          "Content-Type": "application/json", // Ensure JSON data
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API error/while Adding Supplier:", error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
};
