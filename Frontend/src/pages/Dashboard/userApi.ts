import axiosInstance from "../../api/axiosInstance";
export const fetchAllUsers = async () => {
  try {
    const response = await axiosInstance.get('/roles/hierarch');
    return response.data;
  } catch (error) {
    throw error;
  }
};