<template>
  <TopHeader />
  <Header />
  <RouterView />
  <Footer :style="route.name === 'contact' ? 'margin-top: 8.7%;' : ''" />
</template>

<script setup>
import TopHeader from "./components/TopHeader.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { RouterView, useRoute } from "vue-router";
import { getAllProducts } from "@/api/productService";
import { onMounted } from "vue";
import { useProductStore } from "./stores/productStore";

const route = useRoute();
const productStore = useProductStore();

const fetchProducts = async () => {
  const data = await getAllProducts();
  if (data) {
    productStore.setProduct(data);
  }
};

onMounted(async () => {
  await fetchProducts();
  console.log(productStore.product);
});
</script>

<style scoped lang="scss"></style>
