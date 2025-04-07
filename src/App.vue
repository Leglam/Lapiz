<template>
  <div>
    <Popup
      v-if="errorStore.errorMessage"
      :message="errorStore.errorMessage"
      @close="closePopup"
    />
    <TopHeader />
    <Header />

    <div class="router-container">
      <RouterView />
    </div>
    <Footer :style="route.name === 'contact' ? 'margin-top: 8.7%;' : ''" />
  </div>
</template>

<script setup>
import Popup from "./components/Popup.vue";
import TopHeader from "./components/TopHeader.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import { getAllProducts, getBasketProducts, getWishlistProducts } from "@/api/productService";
import { onBeforeMount, onMounted, ref } from "vue";
import { useProductStore } from "./stores/productStore";
import { useErrorStore } from "./stores/errorStore";
import { useLoginStore } from "./stores/loginStore";
import './styles/main.scss';

const router = useRouter();
const route = useRoute();
const productStore = useProductStore();
const loginStore = useLoginStore();
const fetchedData = ref([]);
const products = ref([]);
const errorStore = useErrorStore();

const fetchProducts = async () => {
  const data = await getAllProducts();
  if (data) {
    fetchedData.value = data;
  }
};

const changeProductFormat = async () => {
  products.value = Object.values(
    fetchedData.value.reduce((acc, product) => {
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

  productStore.setProduct(products.value);
};

const closePopup = () => {
  if (errorStore.errorType === "auth") {
    router.push({ name: "login" });
  } else if (errorStore.errorType === "network") {
    router.go(0);
  }

  errorStore.clearError();
};

onBeforeMount(async () => {
  // localStorage.removeItem("token");

  await fetchProducts();
  await changeProductFormat();
  console.log(productStore.filteredProduct);
});

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

const fetchProductInWishlist = async () => {
  const response = await getWishlistProducts();

  if (response !== null) {
    productStore.setWishlistProduct(response);
  } else {
    productStore.setWishlistProduct([]);
  }
};

onMounted(async () => {
  if (localStorage.getItem("token")) {
    await fetchProductInBasket();
    await fetchProductInWishlist();
    loginStore.setIsLogin(true);
  }
});

// onBeforeMount(async () => {
//   // localStorage.removeItem("token");
//   if(localStorage.getItem("token") !== null) {
//     getUserName();
//     loginStore.setIsLogin(true);
//   }
  
//   await fetchProducts();
//   await changeProductFormat();
//   console.log(productStore.filteredProduct);
// });
</script>

<style scoped lang="scss">
.router-container {
  min-height: calc(100vh - 330px - 73px - 39px);
}
</style>
