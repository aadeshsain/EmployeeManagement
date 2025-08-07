
import axiosInstance from "../../api/axiosInstance";

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string; // Add this!
  role?: string;
}) => {
   
  try {

    const response = await axiosInstance.post('/auth/register-user', userData, {
      headers: {
        'ngrok-skip-browser-warning': '69420',
      },
    });
    
    return response.data;
  } catch (error: any) {
    console.error('📛 Registration failed:', error?.response?.data || error.message);

    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      'Registration failed. Please try again.';

    throw new Error(message);
  }
};
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
   
    const response = await axiosInstance.post('/auth/login', credentials, {
      headers: {
        'ngrok-skip-browser-warning': '69420',
        'Content-Type': 'application/json',
      },
    });
   
    return response.data; 
   // should return { token: '...', user: {...} }
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      'Login failed. Please try again.';
    throw new Error(message);
  }
};
