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

export const getWishlistProducts = async () => {
  try {
    const response = await apiClient.get("/Wishlist/getWishlistProduct");
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Error fetching products in wishlist:", error);
    return null;
  }
};

export const getBasketProducts = async () => {
  try {
    const response = await apiClient.get("/Basket/getBasket");
    return response.data;
  } catch (error) {
    console.error("Error fetching products in basket:", error);
    return null;
  }
};

export const updateBasketProducts = async (productCode, quantity) => {
  try {
    const response = await apiClient.put("/Basket/updateBasket", {
      productCode: productCode,
      quantity: quantity,
    });

    return response;
  } catch (error) {
    console.error("Error updating products in basket:", error);
    return null;
  }
};
