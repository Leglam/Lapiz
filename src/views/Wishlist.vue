<template>
  <div class="wishlist">
    <div class="wishlist-container">
      <h1 class="wishlist-title">รายการโปรด</h1>
      <div class="wishlist-separator"></div>
      <div class="wishlist-product-grid">
        <WishlistCardComponent
          v-for="product in wishlistProducts"
          :key="product.pdModel"
          :product="product"
          @select-color="selectColor"
          @remove-product="removeProduct"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import WishlistCardComponent from "@/components/Wishlist-Card-Component.vue";
import {
  getWishlistProducts,
  removeWishlistProduct,
} from "@/api/productService";
import { useProductStore } from "@/stores/productStore";

const productStore = useProductStore();
const wishlistProducts = ref([]);

const fetchWishlistProduct = async () => {
  const response = await getWishlistProducts();
  
  if (response !== null) {
    productStore.setWishlistProduct(response);
  } else {
    productStore.setWishlistProduct([]);
    wishlistProducts.value = null;
    return;
  }

  const wishlistPdModels = new Set(
    response.map((wishlistItem) => wishlistItem.pdModel)
  );
  const fullProducts = productStore.product.filter((product) =>
    wishlistPdModels.has(product.pdModel)
  );

  wishlistProducts.value = fullProducts ? fullProducts : null;
};

const selectColor = (colorId) => {
  wishlistProducts.value = wishlistProducts.value.map((product) => {
    product.pdColor = product.pdColor.map((color) => {
      color.isSelected = color.pdCode === colorId;
      return color;
    });
    return product;
  });
};

const removeProduct = async (pdCode) => {
  const response = await removeWishlistProduct(pdCode);

  console.log("Remove product from wishlist: ", response);
  fetchWishlistProduct();
};

onMounted(() => {
  fetchWishlistProduct();
});
</script>

<style>
.wishlist {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 6rem 6rem 6rem;
}

.wishlist-title {
  font-size: 32x;
  font-weight: bold;
  margin: 0 0 8px 0;
  padding: 0;
}

.wishlist-separator {
  height: 1px;
  background-color: #000;
  margin: 20px 0 40px 0;
  width: 100%;
}

.wishlist-product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  width: 100%;
}

@media only screen and (max-width: 1024px) {
  .wishlist-product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media only screen and (max-width: 640px) {
  .wishlist-product-grid {
    grid-template-columns: 1fr;
  }

  .wishlist {
    padding: 16px;
  }
}
</style>
