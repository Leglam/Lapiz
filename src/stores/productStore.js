import { ref } from "vue";
import { defineStore } from "pinia";

export const useProductStore = defineStore("product", () => {
  const product = ref([]);
  const wishlistProduct = ref([]);
  const basketProductCount = ref(0);

  const setProduct = (newProduct) => {
    product.value = newProduct;
  };

  const setWishlistProduct = (newWishlistProduct) => {
    wishlistProduct.value = newWishlistProduct;
  };

  const setBasketProductCount = (newBasketProductCount) => {
    basketProductCount.value = newBasketProductCount;
  };

  return {
    product,
    wishlistProduct,
    basketProductCount,
    setProduct,
    setWishlistProduct,
    setBasketProductCount,
  };
});
