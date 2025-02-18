<template>
  <div class="topic-wrapper">
    <div class="line"></div>
    <div class="">Men</div>
    <div class="line"></div>
  </div>

  <div class="wrapper margin-top margin-left margin-right" style="gap: 20px">
    <div class="filter-container"></div>
    <div class="product-wrapper">
      <div>สินค้าขายดี</div>
      <div class="card-container">
        <CardComponent
          @click="clickProduct"
          v-for="product in products"
          :key="product.pdModel"
          :product="product"
          @select-color="selectColor"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import CardComponent from "@/components/Card-Component.vue";
import { useProductStore } from "@/stores/productStore";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const productStore = useProductStore();
const products = ref([]);

const selectColor = (colorId) => {
  products.value = products.value.map((product) => {
    product.pdColor = product.pdColor.map((color) => {
      color.isSelected = color.pdCode === colorId;
      return color;
    });
    return product;
  });
};

const clickProduct = () => {
  router.push({ name: "product-detail", params: { id: 100001 } });
};

onBeforeMount(() => {
  products.value = productStore.product;
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
