import axiosInstance from "../../api/axiosInstance";

// 🔹 Helper: Centralized Error Handler
const handleError = (error: any, defaultMsg: string) => {
  console.error("❌ API Error:", {
    status: error?.response?.status,
    data: error?.response?.data,
    message: error.message,
  });

  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    defaultMsg
  );
};

// ✅ Register User
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
  companyName: string;
  number: string;
  role?: string;
}) => {
  try {
    const response = await axiosInstance.post("/auth/register-user", userData, {
      headers: { "ngrok-skip-browser-warning": "69420" },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(handleError(error, "Registration failed. Please try again."));
  }
};

// ✅ Login User
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
        "Content-Type": "application/json",
      },
    });

    const { token, user } = response.data;

    // 🔹 Save token + user info
    if (token) localStorage.setItem("access_token", token);
    if (user) localStorage.setItem("user", JSON.stringify(user));

    return response.data;
  } catch (error: any) {
    throw new Error(handleError(error, "Login failed. Please try again."));
  }
};

// ✅ Create Company
export const createCompany = async (companyData: {
  companyName: string;
  companyEmail: string;
}) => {
  try {
    const token = localStorage.getItem("access_token");

    const response = await axiosInstance.post("/auth/create-company", companyData, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "ngrok-skip-browser-warning": "69420",
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(handleError(error, "Company registration failed. Please try again."));
  }
};

// ✅ Logout Utility
export const logoutUser = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
  window.location.href = "/login"; // redirect
};
            