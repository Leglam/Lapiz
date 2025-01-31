<template>
  <div class="topic-wrapper">
    <div class="line"></div>
    <div class="">Men</div>
    <div class="line"></div>
  </div>

  <div class="wrapper margin-top margin-left margin-right">
    <div class="filter-container"></div>
    <div class="product-wrapper">
      <div>สินค้าขายดี</div>
      <div class="card-container">
        <div v-for="product in products" :key="product.pdId">
          <CardComponent :-product-name="product.pdName" :-product-price="product.pdPrice" :-product-color="product.pdColor"/>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import CardComponent from "@/components/Card-Component.vue";

import { getAllProducts } from "@/api/productService";
import { onMounted, ref } from "vue";

const products = ref([]);

const fetchProducts = async () => {
  const data = await getAllProducts();
  if (data) {
    products.value = data;
  }
};

onMounted(async () => {
  await fetchProducts();
  console.log(products.value);
});
</script>

<style scoped lang="scss">
.topic-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3vh;

  .line {
    flex: 1;
    height: 3px;
    background-color: #00000025;
    margin: 0 10vw;
  }
}

.wrapper {
  display: flex;
  margin: 3vh 3vw 0 3vw;

  .filter-container {
    width: 20.14vw;
    height: 100vh;
    background-color: #00000025;
  }

  .product-wrapper {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    height: 100%;
    flex: 2;

    .card-container {
      margin-top: 30px;
      display: flex;
      gap: 2vw;
    }
  }
}
</style>
