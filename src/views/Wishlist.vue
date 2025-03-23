<template>
  <div class="wishlist">
    <div class="wishlist-container">
      <h1 class="wishlist-title">รายการโปรด</h1>
      <div class="wishlist-separator"></div>
      <div v-if="wishlistProducts.length > 0" class="wishlist-product-grid">
        <WishlistCardComponent
          v-for="product in wishlistProducts"
          :key="product.pdModel"
          :product="product"
          :pd-img-number="selectedProduct"
          @select-color="selectColor"
          @remove-product="removeProduct"
        />
      </div>
      <div v-else class="wishlist-empty-Container">
        <img
          src="@/assets/images/favourite-empty.svg"
          alt="wishlist-empty-Image"
          class="wishlist-empty-Image"
        />
        <span class="Empty-Cart-text">ถึงเค้าจะไม่ชอบ แต่เราชอบนะ!</span>
        <button class="shopping-button" @click="pushPage('homepage')">
          <span class="Empty-Cart-text">ช้อปปิ้งกันเลย</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import WishlistCardComponent from "@/components/Wishlist-Card-Component.vue";
import {
  getWishlistProducts,
  removeWishlistProduct,
} from "@/api/productService";
import { useProductStore } from "@/stores/productStore";

const router = useRouter();
const productStore = useProductStore();
const wishlistProducts = ref([]);
const selectedProduct = ref("");

const pushPage = (pageName) => {
  router.push({ name: pageName });
};

const fetchWishlistProduct = async () => {
  const response = await getWishlistProducts();

  if (response !== null) {
    productStore.setWishlistProduct(response);
  } else {
    productStore.setWishlistProduct([]);
    wishlistProducts.value = [];
    return;
  }

  const wishlistPdModels = new Set(
    response.map((wishlistItem) => wishlistItem.pdModel)
  );
  const fullProducts = productStore.product.filter((product) =>
    wishlistPdModels.has(product.pdModel)
  );

  wishlistProducts.value = fullProducts ? fullProducts : null;
  console.log(wishlistProducts.value);
};

const selectColor = (colorId) => {
  wishlistProducts.value = wishlistProducts.value.map((product) => {
    product.pdColor = product.pdColor.map((color) => {
      color.isSelected = color.pdCode === colorId;
      return color;
    });
    return product;
  });

  selectedProduct.value = colorId;
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
@import "@/styles/shopping-button.scss";

.wishlist {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 60px;
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

.wishlist-empty-Container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1.9444vw;
  padding-top: 2.0833vw;
}

.wishlist-empty-Image {
  width: 10vw;
  height: 10vw;
  align-self: center;
}

.Empty-Cart-text {
  text-align: center;
  font-size: 1.1vw;
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

@keyframes slideIn {
  0% {
    transform: translateY(10%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.wishlist-container {
  animation: slideIn 0.6s ease-out;
}
</style>
