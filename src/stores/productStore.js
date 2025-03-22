import { ref } from "vue";
import { defineStore } from "pinia";

export const useProductStore = defineStore("product", () => {
  const product = ref([]);
  const compareProduct = ref([]);
  const wishlistProduct = ref([]);
  const basketProduct = ref([]);
  const basketProductCount = ref(0);

  const setProduct = (newProduct) => {
    product.value = newProduct;
  };

  const setCompareProduct = (newCompareProduct) => {
    compareProduct.value = newCompareProduct;
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
    compareProduct,
    wishlistProduct,
    basketProduct,
    basketProductCount,
    setProduct,
    setCompareProduct,
    setWishlistProduct,
    setBasketProduct,
    setBasketProductCount,
  };
});
