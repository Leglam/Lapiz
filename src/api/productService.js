import apiClient from "./axiosInstance";

export const getAllProducts = async () => {
  try {
    const response = await apiClient.get("/Product/getProducts");
    
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};
