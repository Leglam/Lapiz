<template>
  <Header></Header>
  <!-- <Men /> -->
  <!-- <Cookie /> -->
  <!-- <RouterView></RouterView> -->

  <div class="search-test">
    <input type="text" placeholder="ค้นหา" class="test-search-input" />
    <div class="test-search-icon"></div>
  </div>
</template>

<script setup>
import Men from "./views/Menu/Men.vue";
import Header from "./components/Header.vue";
// import MainHeader from "./components/MainHeader.vue";
// import Contact from './views/Policies/Contact.vue';
// import Cookie from "./views/Policies/Cookie.vue";
// import ExchangeReturn from "./views/Policies/ExchangeReturn.vue";
// import Footer from "./components/Footer.vue";
</script>

<style scoped lang="scss">
.search-test {
  position: relative;
  display: flex;
  justify-content: center;
}

.test-search-input {
  width: 100%;
  height: 38px;
  padding-left: 0.75rem;
  border-radius: 10px;
  border: 1px solid #000000;
  background-color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0.6px;
  color: #b6b6b6;
}

.test-search-icon {
  width: 20px;
  height: 20px;
  background-color: red;
  position: relative;
  right: 20px;
}
</style>
