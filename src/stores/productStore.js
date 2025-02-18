import { ref } from "vue";
import { defineStore } from "pinia";

export const useProductStore = defineStore("product", () => {
  const product = ref([]);

  const setProduct = (newProduct) => {
    product.value = newProduct;
  };

  return { product, setProduct };
});
