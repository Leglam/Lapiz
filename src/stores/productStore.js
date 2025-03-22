import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useProductStore = defineStore("product", () => {
  const product = ref([]);
  const filteredProduct = computed(() => {
    if (searchValue.value === "") {
      return product.value;
    } else {
      return product.value.filter((p) =>
        p.pdName.toLowerCase().includes(searchValue.value.toLowerCase())
      );
    }
  });
  const compareProduct = ref([]);
  const wishlistProduct = ref([]);
  const basketProduct = ref([]);
  const basketProductCount = ref(0);
  const searchValue = ref("");

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

  const setSearchValue = (newValue) => {
    searchValue.value = newValue;
  };

  return {
    product,
    filteredProduct,
    compareProduct,
    wishlistProduct,
    basketProduct,
    basketProductCount,
    searchValue,
    setProduct,
    setCompareProduct,
    setWishlistProduct,
    setBasketProduct,
    setBasketProductCount,
    setSearchValue,
  };
});
