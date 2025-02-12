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

const route = useRoute();
</script>

<style scoped lang="scss"></style>
