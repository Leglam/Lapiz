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
import { getWishlistProducts } from "@/api/productService";

const fetchedWishlistProducts = ref([]);
const wishlistProducts = ref([]);

const fetchWishlistProduct = async () => {
  const response = await getWishlistProducts();
  fetchedWishlistProducts.value = response;
  console.log("Wishlist Product: ", fetchedWishlistProducts.value);

  wishlistProducts.value = Object.values(
    fetchedWishlistProducts.value.reduce((acc, product) => {
      const { pdModel, pdId, pdCode, pdColor, pdStock, pdImg, ...rest } =
        product;

      if (!acc[pdModel]) {
        acc[pdModel] = { ...rest, pdModel, pdColor: [] }; // Initialize grouped product
      }

      acc[pdModel].pdColor.push({
        pdCode,
        pdColor,
        pdStock,
        pdImg,
        isSelected: false,
      });

      return acc;
    }, {})
  );

  console.log("Wishlist Product: ", wishlistProducts.value);
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

const removeProduct = (pdCode) => {
  wishlistProducts.value = wishlistProducts.value.map((product) => {
    product.pdColor = product.pdColor.filter(
      (color) => color.pdCode !== pdCode
    );
    return product;
  });

  console.log(wishlistProducts.value);
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
