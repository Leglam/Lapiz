<template>
  <!-- Product Main Section -->
  <div class="product-content">
    <div class="product-layout">
      <!-- Header with Navigation and Image -->
      <div class="product-header">
        <div class="product-header-img">
          <img
            :src="productImage"
            :alt="product.pdName"
            class="product-image"
          />
        </div>
      </div>

      <!-- Product Information -->
      <div class="product-info">
        <h2 class="product-title">{{ product.pdName }}</h2>
        <h3 class="product-price">{{ formatPrice(product.pdPrice) }}</h3>
        <div class="divider"></div>

        <!-- Size Selection -->
        <div class="product-options">
          <div class="size-section">
            <div class="size-header">
              <h4 class="size-title">ขนาด (UK)</h4>
              <div class="size-chart">
                <h5 class="size-chart-link">ตารางไซส์</h5>
              </div>
            </div>
            <div class="size-grid">
              <div
                v-for="(sizeGroup, index) in sizeGroups"
                :key="index"
                class="size-row"
              >
                <button
                  v-for="size in sizeGroup"
                  :key="size"
                  class="size-button"
                  :class="{ 'size-button--active': selectedSize === size }"
                  @click="selectSize(size)"
                >
                  {{ size }}
                </button>
              </div>
            </div>
          </div>

          <!-- Color Selection -->
          <h6 class="color-title">สี</h6>
          <div class="product-colors">
            <div
              v-for="color in product.pdColor"
              :key="color.pdCode"
              class="color-option"
              :class="{ 'color-selected': color.isSelected }"
              @click="selectColor(color.pdCode)"
            >
              <div
                class="color-inner"
                :style="{ backgroundColor: `var(--${color.pdColor})` }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <div class="divider"></div>
          <div class="button-group">
            <button class="add-to-cart-button" @click="addToCart">
              เพิ่มเข้าตะกร้าสินค้า
            </button>
            <button
              class="favorite-button"
              @click="toggleFavorite"
              @mouseenter="isHovered = true"
              @mouseleave="isHovered = false"
              :class="{
                'favorite-button--hovered': isHovered,
                'favorite-button--active': isFavorite,
              }"
            >
              <img
                :src="currentFavoriteIcon"
                alt="Favorite"
                class="favorite-icon"
              />
            </button>
          </div>
          <button class="buy-now-button" @click="buyNow">ซื้อเลย</button>
        </div>

        <!-- Social Share -->
        <div class="social-share">
          <div class="social-icons">
            <img
              v-for="(social, index) in socialIcons"
              :key="index"
              :src="social.icon"
              :alt="social.name"
              class="social-icon"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Product Details Tabs -->
    <div class="product-details">
      <div class="container">
        <div class="tabs-section">
          <div class="tabs">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              class="tab-button"
              :class="{ 'tab-button--active': activeTab === tab.id }"
              @click="setActiveTab(tab.id)"
            >
              {{ tab.label }}
            </button>
          </div>
          <div class="tab-content">
            <div v-if="activeTab === 'description'" class="tab-panel">
              <p class="description-text">
                {{ product.pdDesc }}
              </p>
            </div>
            <div v-else-if="activeTab === 'features'" class="tab-panel">
              <span>คุณสมบัติ content</span>
            </div>
            <div v-else-if="activeTab === 'reviews'" class="tab-panel">
              <span>รีวิว content</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount } from "vue";
import Shoes1 from "@/assets/shoes/shoe1.png";

import Fav from "@/assets/images/icon-fav-gray.svg";
import FavBlack from "@/assets/images/icon-fav-black.svg";
import FavRed from "@/assets/images/icon-fav-red.svg";

import Facebook from "@/assets/images/icon-facebook2.svg";
import Messenger from "@/assets/images/icon-messenger2.svg";
import Instragram from "@/assets/images/icon-ig2.svg";
import Share from "@/assets/images/icon-share.svg";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "@/stores/productStore";
import {
  getBasketProducts,
  updateBasketProducts,
  getWishlistProducts,
  addWishlistProducts,
  removeWishlistProduct,
} from "@/api/productService";

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();

const productId = computed(() => route.params.id);

const product = computed(() =>
  productStore.product.find((p) =>
    p.pdColor.some((color) => color.pdCode === productId.value)
  )
);

const wishlistProduct = computed(() => productStore.wishlistProduct);

// Product Data
const productImage = ref(Shoes1);

// Size Selection
const sizeGroups = ref([
  ["5", "5.5", "6", "6.5", "7", "7.5"],
  ["8", "8.5", "9", "9.5", "10", "10.5"],
]);

const selectedSize = ref(null);

// Favorite icon states
const isFavorite = ref(false);
const isHovered = ref(false);

// Define icon paths
const favoriteIcons = {
  default: Fav,
  hover: FavBlack,
  active: FavRed,
};

// Compute current icon based on state
const currentFavoriteIcon = computed(() => {
  if (isFavorite.value) {
    return favoriteIcons.active;
  }
  if (isHovered.value) {
    return favoriteIcons.hover;
  }
  return favoriteIcons.default;
});

// Tabs
const tabs = ref([
  { id: "description", label: "รายละเอียด" },
  { id: "features", label: "คุณสมบัติ" },
  { id: "reviews", label: "รีวิว" },
]);
const activeTab = ref("description");

// Social Icons
const socialIcons = ref([
  { name: "Share", icon: Share },
  { name: "Facebook", icon: Facebook },
  { name: "Messenger", icon: Messenger },
  { name: "Instagram", icon: Instragram },
]);

// Methods

const formatPrice = (value) => {
  return `${value.toFixed(2)} THB`;
};

const selectSize = (size) => {
  selectedSize.value = size;
};

const selectColor = (colorId) => {
  product.value.pdColor = product.value.pdColor.map((color) => {
    color.isSelected = color.pdCode === colorId;
    return color;
  });
};

const fetchProductInWishlist = async () => {
  const response = await getWishlistProducts();

  if (response !== null) {
    productStore.setWishlistProduct(response);
  } else {
    productStore.setWishlistProduct([]);
  }
};

const fetchProductInBasket = async () => {
  const response = await getBasketProducts();

  if (response !== null) {
    const totalQuantity = response.reduce(
      (sum, product) => sum + product.quantity,
      0
    );
    productStore.setBasketProductCount(totalQuantity);
  } else {
    productStore.setBasketProductCount(0);
  }
};

const setActiveTab = (tabId) => {
  activeTab.value = tabId;
};

const addToCart = async () => {
  const selectedColor = product.value.pdColor.find((color) => color.isSelected);

  if (!selectedColor) {
    console.warn("No color selected!");
    return; // Exit function if no color is selected
  }

  // Use the selected color's pdCode
  await updateBasketProducts(selectedColor.pdCode, 1);
  await fetchProductInBasket();
};

const removeProductFromWishlist = async (pdCode) => {
  try {
    await removeWishlistProduct(pdCode);
    isFavorite.value = false;
  } catch (error) {
    console.log("Remove wishlist error");
  }
};

const addProductToWishlist = async (pdCode) => {
  try {
    await addWishlistProducts(pdCode);
    isFavorite.value = true;
  } catch (error) {
    console.log("Add wishlist error");
  }
};

const toggleFavorite = async () => {
  if (isFavorite.value) {
    await removeProductFromWishlist(product.value.pdColor[0].pdCode);
  } else {
    await addProductToWishlist(product.value.pdColor[0].pdCode);
  }

  await fetchProductInWishlist();

  console.log(isFavorite.value);
};

const buyNow = async () => {
  await addToCart();
  router.push({ name: 'cart' })
};

onBeforeMount(() => {
  const wishlistPdCodes = new Set(
    wishlistProduct.value.map((wishlist) => wishlist.pdCode)
  );

  isFavorite.value = product.value.pdColor.some((color) =>
    wishlistPdCodes.has(color.pdCode)
  );

  console.log(wishlistPdCodes);
  console.log(isFavorite.value);
});
</script>

<style scoped>
@import "@/styles/size-button.scss";

.product-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
}

.product-layout {
  display: flex;
  flex-direction: row;
  justify-content: flex-start; /* ให้บรรจุรูปไปที่ขอบซ้าย */
  align-items: center; /* จัดกลางในแนวตั้ง (บน-ล่าง) */
  gap: 49px;
  padding: 80px 300px 20px 300px;
  /* max-width: 1200px; */
}

.product-header {
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 60%; */
}

.product-header-img {
  /* ให้แสดงรูปอยู่ที่ซ้ายสุดและกลางในแนวตั้ง */
  display: flex;
  justify-content: flex-start; /* ชิดซ้าย */
  align-items: center; /* จัดกลางในแนวตั้ง */
}

.product-details {
  display: flex;
  justify-content: start;
  width: 100%;
  padding: 0px 10%;
  box-sizing: border-box;
}

.back-navigation {
  display: flex;
  align-items: center;
  gap: 8px;
}

.back-icon {
  width: 24px;
  height: 24px;
}

.product-image {
  width: 600px;
  height: 600px;
  object-fit: contain;
  border: #b7b7b7 solid 2px;
}

.product-info {
  /* width: 40%; */
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.product-title {
  font-size: 28px;
  line-height: 1.5;
  letter-spacing: -0.29px;
}

.product-price {
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.22px;
}

.divider {
  height: 1px;
  background-color: #000;
  width: 100%;
  margin: 8px 0;
}

.size-section {
  margin-top: 16px;
}

.size-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.size-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.size-row {
  display: flex;
  gap: 12px;
}

.size-title {
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.22px;
}

.size-chart-link {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.9px;
  color: #002fff;
  text-decoration: underline;
  cursor: pointer;
}

.size-chart-link:hover {
  color: #b72121;
}

.product-colors {
  display: flex;
  gap: 8px;
}

.color-title {
  margin: 24px 0 16px 0;
  font-size: 20px;
}

.color-option {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  padding: 1.5px;
  border: 1px solid transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.color-option.color-selected {
  border-color: #4338ca;
}

.color-inner {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  border: 1px solid #e5e5e5;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.button-group {
  display: flex;
  gap: 12px;
}

.add-to-cart-button {
  width: 100%;
  height: 42px;
  background-color: #002fff;
  color: #fff;
  border: 2px solid #000;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.22px;
  transition: all 0.3s ease;
  cursor: pointer;
  box-sizing: border-box;
  transform-origin: center;
}

.add-to-cart-button:hover {
  background-color: #375bfe;
}

/*=====================================================*/
.favorite-button {
  width: 42px;
  height: 42px;
  background-color: #fff;
  border: 2px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;

  /* เพิ่มเข้ามาลองทำ animate*/
  cursor: pointer;
  transition: all 0.3s ease;
}
/* เพิ่มเข้ามาลองทำ animate*/
.favorite-button--hovered {
  background-color: #dedede;
}

/* Active/Selected state styles */
.favorite-button--active {
  background-color: #bebebe;
  /* border-color: #ff4040; */
}

/* Combined states animate หลังกด fav แล้ว*/
.favorite-button--active.favorite-button--hovered {
  background-color: #f0f0f0;
  /* border-color: #ff2020; */
}

.favorite-icon {
  width: 24px;
  height: 24px;
  transition: transform 0.2s ease;
}

.favorite-button:hover .favorite-icon {
  transform: scale(1.1);
}

.favorite-button:active .favorite-icon {
  transform: scale(0.9);
}
/*=====================================================*/
.buy-now-button {
  width: 100%;
  height: 42px;
  background-color: #000;
  color: #fff;
  border: 2px solid #000;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.22px;
  transition: all 0.3s ease;
  cursor: pointer;
  box-sizing: border-box;
  transform-origin: center;
}

.add-to-cart-button:active,
.buy-now-button:active {
  transform: scale(0.98); /* หดตัวปุ่มเมื่อคลิก */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* เพิ่มเงาขณะคลิก */
}

.buy-now-button:hover {
  background-color: #323232;
}

.social-share {
  display: flex;
  align-items: center;
  gap: 28px;
  margin-top: 18px;
}

.social-icons {
  display: flex;
  gap: 28px;
}

.social-icon:hover {
  transform: scale(1.2); /* ขยายขนาดเล็กน้อย */
}

.social-icon:active {
  transform: scale(1.1); /* ขยายเล็กน้อยขณะคลิก */
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3); /* เพิ่มเงาลึกเมื่อคลิก */
}

.social-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  width: 24px;
  height: 24px;
  transition: all 0.3s ease;
  cursor: pointer;
  transform-origin: center;
}

.tabs-section {
  margin-top: 34px;
}

.tabs {
  display: flex;
  gap: 16px;
  border-bottom: 1px solid #000;
}

.tab-button {
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
}

.tab-button--active {
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-bottom: none;
  position: relative;
}

.tab-content {
  padding: 48px 24px;
}

.description-text {
  font-size: 16px;
  line-height: 1.875;
}

@media (max-width: 1050px) {
  .product-layout {
    flex-direction: column;
    padding: 40px 5%;
  }

  .product-info {
    width: 100%;
  }

  .product-image {
    width: 100%;
    height: auto;
  }
}

@media (max-width: 550px) {
  .product-header {
    flex-direction: column;
  }

  .add-to-cart-button,
  .buy-now-button {
    padding: 0 28px;
  }
}
</style>
