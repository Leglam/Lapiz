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

export const addWishlistProducts = async (pdCode) => {
  try {
    const response = await apiClient.post(`/Wishlist/addToWishlist/${pdCode}`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    return null;
  }
};

export const removeWishlistProduct = async (productCode) => {
  try {
    const response = await apiClient.put(
      `/Wishlist/removeFromWishlist/${productCode}`
    );
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Error removing product from wishlist:", error);
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

export const buyBasketProducts = async () => {
  try {
    const response = await apiClient.post("/Basket/buyProduct");
    return response.data;
  } catch (error) {
    console.log("Error buying products in basket:", error);
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

export const removeBasketProduct = async (productCode) => {
  try {
    const response = await apiClient.put(
      "/Basket/removeFromBasket",
      productCode
    );
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Error removing product from basket:", error);
    return null;
  }
};
