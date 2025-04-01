<template>
  <header>
    <!-- Main header -->
    <div class="main-header">
      <a @click="pushPage('homepage')" class="logo">
        <img
          src="@/assets/images/img_header_logo.png"
          alt="Logo Image"
          class="logo"
        />
      </a>

      <div v-if="route.name !== 'transaction'" class="header-content">
        <!-- Navigation menu -->
        <ul class="nav-menu">
          <li><a @click="pushPage('men')" class="nav-link">ผู้ชาย</a></li>
          <li><a @click="pushPage('women')" class="nav-link">ผู้หญิง</a></li>
          <li><a class="nav-link">เด็ก</a></li>
          <li><a class="nav-link">กีฬา</a></li>
          <li><a class="nav-link">สินค้าขายดี</a></li>
        </ul>

        <!-- Search and utilities -->
        <div class="utilities-section">
          <div class="search-container">
            <input
              v-model="searchBarValue"
              type="text"
              placeholder="ค้นหา"
              class="search-input"
              @input="handleSearch"
            />
            <button
              v-if="searchBarValue"
              @click="clearSearch"
              class="clear-button"
            >
              <img
                src="@/assets/images/searching_box.svg"
                alt="searching"
                class="searching-button"
              />
            </button>
            <img
              v-else
              src="@/assets/images/search_box.svg"
              alt="search"
              class="search-icon"
            />
          </div>

          <div class="right-utilities">
            <div class="language-selector">
              <span class="active">TH</span>
              <span>|</span>
              <span class="inactive">EN</span>
            </div>

            <a
              @click="pushPage('wishlist')"
              class="favorite-button"
              @mouseenter="isHovered = true"
              @mouseleave="isHovered = false"
              :class="{
                'favorite-button--hovered': isHovered,
              }"
            >
              <img
                :src="currentFavoriteIcon"
                alt="Favorite"
                class="favorite-icon"
              />
            </a>

            <a @click="pushPage('cart')" class="cart-icon">
              <img src="@/assets/images/icon-cart.svg" alt="Cart Icon" />
              <div
                v-if="basketProductCount > 0"
                class="basket-count"
                :class="{
                  'more-than-99': basketProductCount > 99,
                  'more-than-9': basketProductCount > 9,
                }"
              >
                {{ basketCountDisplay }}
              </div>
            </a>
            <!-- <div>{{ basketProductCount }}</div> -->
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useProductStore } from "@/stores/productStore";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import FavBlack from "@/assets/images/icon-fav-black.svg";
import FavRed from "@/assets/images/icon-fav-red.svg";

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();

const searchBarValue = ref("");
const basketProductCount = computed(() => {
  return productStore.basketProductCount;
});

const clearSearch = () => {
  searchBarValue.value = "";
};

const pushPage = (pageName) => {
  router.push({ name: pageName });
};

const handleSearch = () => {
  productStore.setSearchValue(searchBarValue.value);
};

const basketCountDisplay = computed(() => {
  return basketProductCount.value > 99 ? "99+" : basketProductCount.value;
});

// Favorite icon states
const isHovered = ref(false);

// Define icon paths
const favoriteIcons = {
  default: FavBlack,
  hover: FavRed,
};

// Compute current icon based on state
const currentFavoriteIcon = computed(() => {
  if (isHovered.value) {
    return favoriteIcons.hover;
  }
  return favoriteIcons.default;
});
</script>

<style scoped>
@font-face {
  font-family: "Mitr";
  src: url("@/assets/fonts/Mitr-Regular.ttf") format("truetype");
  /* src: url('@/assets/fonts/Athiti-Bold.ttf') format('truetype'); */
  font-weight: normal;
  font-style: normal;
}

.main-header {
  max-width: 100vw;
  position: fixed;
  top: 39px;
  left: 0;
  z-index: 1000;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  background-color: #ecefbb;
  /* padding: 0.375rem 2.875rem; */
  padding: 0 47px 0 47px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
  font-family: "Mitr", sans-serif;
  margin: 0;
  box-sizing: border-box;
}

.logo {
  height: 48px;
  width: 108px;
  object-fit: contain;
}

.logo:hover {
  transition: transform 0.3s ease;
}

.header-content {
  display: flex;
  width: 86%;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  margin-right: 0.25rem;
}

.nav-menu {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.875rem;
  list-style: none;
  padding: 0;
}

.nav-link {
  font-size: 18px;
  font-weight: 700;
  color: #000000;
  text-decoration: none;
  cursor: pointer;
}

.nav-link:hover {
  font-size: 18px;
  font-weight: 700;
  color: #b72121;
  text-decoration: none;
  cursor: pointer;
}

.utilities-section {
  display: flex;
  width: 40%;
  align-items: center;
  justify-content: center;
  gap: 1.625rem;
}

.search-container {
  position: relative;
  flex-grow: 1;
  display: flex;
}

.search-input {
  width: 100%;
  height: 38px;
  padding-left: 0.75rem;
  border-radius: 10px;
  border: 1px solid #000000;
  background-color: #ffffff;
  font-size: 18px;
  letter-spacing: 0.6px;
  color: #000000;
}

.search-container:hover {
  position: relative;
  flex-grow: 1;
  display: flex;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* เพิ่มเงา */
  transition: opacity 0.5s ease, box-shadow 0.3s ease;
}

.search-icon,
.searching-button,
.clear-button {
  position: absolute;
  right: 0;
  top: 0%;
  /* transform: translateY(-50%); */
  height: 42px;
  width: 42px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
}

.right-utilities {
  display: flex;
  width: 34%;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  padding: 0.25rem 0;
}

.language-selector {
  display: flex;
  gap: 0.25rem;
  font-size: 18px;
  font-weight: 700;
}

.language-selector .active {
  color: #000000;
}

.language-selector .inactive {
  color: #707070;
}

.favorite-button {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  transform-origin: center;
  margin-top: 2px;
}

.favorite-icon {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.cart-icon img {
  height: 18px;
  margin-top: 10px;
  transition: transform 0.3s ease;
}

.logo,
.cart-icon,
.favorite-icon {
  position: relative;
}

.logo:hover {
  transform: scale(1.03);
}

.favorite-button:hover .favorite-icon,
.cart-icon:hover {
  transform: scale(1.2);
}

.favorite-button:active .favorite-icon,
.cart-icon:active {
  transform: scale(0.95);
}

.basket-count {
  position: absolute;
  top: 1px;
  right: -10px;
  background-color: red;
  color: white;
  font-size: 12px;
  font-weight: 500;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 1px 2px 1px 2px;
}

.basket-count.more-than-9 {
  width: 16px; /* จะให้ยืดตามตัวเลข */
  padding: 1px 2px 1px 2px;
  font-size: 12px; /* เพิ่มขนาดตัวอักษรให้พอดี */
  right: -10px;
}

.basket-count.more-than-99 {
  width: auto;
  padding: 1px 2px 1px 2px;
  font-size: 10px;
  right: -10px;
}

@media (max-width: 768px) {
  .main-header {
    flex-direction: column;
    padding: 1.25rem;
  }

  .header-content {
    width: 100%;
    flex-direction: column;
    margin-right: 0;
  }

  .utilities-section {
    width: 100%;
    flex-direction: column;
  }

  .right-utilities {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .login-section {
    width: auto;
  }

  .nav-menu {
    justify-content: center;
  }
}
</style>
