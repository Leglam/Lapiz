<template>
  <div class="topic-wrapper">
    <div class="line"></div>
    <div class="">Men</div>
    <div class="line"></div>
  </div>

  <div class="wrapper margin-top margin-left margin-right" style="gap: 20px">
    <div class="filter-container">
      <ProductFilter />
    </div>
    <div class="product-wrapper">
      <div class="dropdown" @click="toggleDropdown">
        <div class="dropdown-header">
          <span>สินค้าขายดี</span>
          <span
            class="arrow"
            :class="{
              'arrow-up': isDropdownOpen,
              'arrow-down': !isDropdownOpen,
            }"
          ></span>
        </div>
        <div v-if="isDropdownOpen" class="dropdown-content">
          <p>Kuy option</p>
          <p>yed option</p>
          <p>hee option</p>
        </div>
      </div>
      <div class="card-container">
        <CardComponent
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
import ProductFilter from "@/components/ProductFilter.vue";
import CardComponent from "@/components/Card-Component.vue";
import { useProductStore } from "@/stores/productStore";
import { computed, onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const productStore = useProductStore();
const products = computed(() => {
  return productStore.product;
});
const isDropdownOpen = ref(false);

const selectColor = (colorId) => {
  products.value = products.value.map((product) => {
    product.pdColor = product.pdColor.map((color) => {
      color.isSelected = color.pdCode === colorId;
      return color;
    });
    return product;
  });
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
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
  margin: 3vh 3vw 3vh 3vw;

  .filter-container {
    width: 20.14vw;
    height: 100vh;
    // padding: 20px;
    background-color: #00000025;
  }

  .product-wrapper {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    height: 100%;
    flex: 2;

    .dropdown {
      position: relative;
      cursor: pointer;
      margin-bottom: 20px;
      padding: 8px;
      border: 1px solid #ccc;
      background-color: #fff;
      width: 12vw;
      box-sizing: border-box;
    }

    .dropdown-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .arrow {
      display: inline-block;
      width: 0;
      height: 0;
      margin-left: 10px;
      vertical-align: middle;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
    }

    .arrow-up {
      border-bottom: 5px solid #000;
    }

    .arrow-down {
      border-top: 5px solid #000;
    }

    .dropdown-content {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 0px 0px 8px 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      z-index: 10;
      padding: 10px;
    }

    .card-container {
      margin-top: 30px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2vw;
    }
  }
}
</style>
