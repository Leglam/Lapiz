import apiClient from "./axiosInstance";

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post("/Auth/register", {
      firstName: userData.firstName,
      lastName: userData.lastName,
      username: userData.username,
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
    });

    return response;
  } catch (error) {
    console.error("Error Registration:", error);
    return error;
  }
};

export const loginUser = async (userAuth) => {
  try {
    const response = await apiClient.post("/Auth/login", {
      username: userAuth.username,
      password: userAuth.password,
    });

    console.log(response);
    return response;
  } catch (error) {
    console.error("Error Authentication:", error);
    return error;
  }
};
