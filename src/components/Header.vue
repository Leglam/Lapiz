<template>
  <header>
    <!-- Main header -->
    <div class="main-header">
      <img
        src="@/assets/images/img_header_logo.png"
        alt="Logo Image"
        class="logo"
      />

      <div class="header-content">
        <!-- Navigation menu -->
        <ul class="nav-menu">
          <li><a @click="pushPage('men')" class="nav-link">ผู้ชาย</a></li>
          <li><a class="nav-link">ผู้หญิง</a></li>
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
            <a @click="pushPage('wishlist')" class="utility-icon">
              <img src="@/assets/images/icon-fav.svg" alt="Favorites Icon" />
            </a>
            <a @click="pushPage('cart')" class="utility-icon">
              <img src="@/assets/images/icon-cart.svg" alt="Cart Icon" />
            </a>
            <div>{{ basketProductCount }}</div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useProductStore } from "@/stores/productStore";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

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
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  background-color: #ecefbb;
  padding: 0.375rem 2.875rem;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
  font-family: "Mitr", sans-serif;
  margin: 0;
}

.logo {
  height: 48px;
  width: 108px;
  object-fit: contain;
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
  /* font-weight: 700; */
  letter-spacing: 0.6px;
  color: #b6b6b6;
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

.utility-icon img {
  height: 18px;
  margin-top: 10px;
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
