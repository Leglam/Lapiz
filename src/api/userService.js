import apiClient from "./axiosInstance";

export const registerUser = async (userData) => {
  try {
    console.log(userData);
    
    const response = await apiClient.post("/Auth/register", {
      firstName: userData.firstName,
      lastName: userData.lastName,
      username: userData.username,
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
    });

    console.log(response);
    return response.data;
  } catch (e) {
    console.error("Error fetching products:", e);
    return e;
  }
};
