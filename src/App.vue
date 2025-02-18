<template>
  <Popup
    v-if="errorStore.errorMessage"
    :message="errorStore.errorMessage"
    @close="closePopup"
  />
  <TopHeader />
  <Header />
  <RouterView />
  <Footer :style="route.name === 'contact' ? 'margin-top: 8.7%;' : ''" />
</template>

<script setup>
import Popup from "./components/Popup.vue";
import TopHeader from "./components/TopHeader.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import { getAllProducts } from "@/api/productService";
import { onBeforeMount, ref } from "vue";
import { useProductStore } from "./stores/productStore";
import { useErrorStore } from "./stores/errorStore";

const router = useRouter();
const route = useRoute();
const productStore = useProductStore();
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
  await fetchProducts();
  await changeProductFormat();
});
</script>

<style scoped lang="scss"></style>
