import { ref } from "vue";
import { defineStore } from "pinia";

export const useProductStore = defineStore("product", () => {
  const product = ref([]);
  const wishlistProduct = ref([]);
  const basketProduct = ref([]);
  const basketProductCount = ref(0);

  const setProduct = (newProduct) => {
    product.value = newProduct;
  };

  const setWishlistProduct = (newWishlistProduct) => {
    wishlistProduct.value = newWishlistProduct;
  };

  const setBasketProduct = (newBasketProduct) => {
    basketProduct.value = newBasketProduct;
  };

  const setBasketProductCount = (newBasketProductCount) => {
    basketProductCount.value = newBasketProductCount;
  };

  return {
    product,
    wishlistProduct,
    basketProduct,
    basketProductCount,
    setProduct,
    setWishlistProduct,
    setBasketProduct,
    setBasketProductCount,
  };
});
