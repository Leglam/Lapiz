import { ref } from "vue";
import { defineStore } from "pinia";

export const useProductStore = defineStore("product", () => {
  const product = ref([]);
  const basketProductCount = ref(0);

  const setProduct = (newProduct) => {
    product.value = newProduct;
  };

  const setBasketProductCount = (newBasketProductCount) => {
    basketProductCount.value = newBasketProductCount;
  };

  return { product, basketProductCount, setProduct, setBasketProductCount };
});
