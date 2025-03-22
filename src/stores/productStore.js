import { ref } from "vue";
import { defineStore } from "pinia";

export const useProductStore = defineStore("product", () => {
  const product = ref([]);
  const filteredProduct = ref([]);
  const compareProduct = ref([]);
  const wishlistProduct = ref([]);
  const basketProduct = ref([]);
  const basketProductCount = ref(0);

  const setProduct = (newProduct) => {
    product.value = newProduct;
  };

  const setFilteredProduct = (searchValue) => {
    if (!searchValue || searchValue === "") {
      filteredProduct.value = product.value;
    } else {
      filteredProduct.value = product.value.filter((p) =>
        p.pdName.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
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
    filteredProduct,
    compareProduct,
    wishlistProduct,
    basketProduct,
    basketProductCount,
    setProduct,
    setFilteredProduct,
    setCompareProduct,
    setWishlistProduct,
    setBasketProduct,
    setBasketProductCount,
  };
});
