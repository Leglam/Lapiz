<template>
  <div class="comparison-container">
    <div class="comparison-header">
      <h2 class="comparison-title">เปรียบเทียบสินค้า
        <span class="compare-count">({{ compareProductList.length }}/2)</span>
      </h2>

      <div class="product-cards">
        <div
          class="product-card"
          v-for="(product, index) in compareProductList"
          :key="index"
        >
          <div class="product-image-container">
            <img
              :src="product.pdColor[0].pdImg"
              :alt="product.name"
              class="product-image"
            />
            <button class="remove-button" @click="() => removeProduct(index)">
              <span class="remove-icon">×</span>
            </button>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <button
          :disabled="compareProductList.length < 2"
          class="compare-button"
          @click="compareProducts"
        >
          เปรียบเทียบ
        </button>
        <button class="reset-button" @click="resetComparison">รีเซต</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "@/stores/productStore";
import { watch } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  compareProductList: {
    type: Array,
    required: false,
    default: () => [],
  },
});

const router = useRouter();
const productStore = useProductStore();

const compareProducts = () => {
  try {
    productStore.setCompareProduct(props.compareProductList);
    router.push({ name: "compare" });
  } catch (error) {
    console.log(error);
  }
};

const resetComparison = () => {
  props.compareProductList.splice(0, props.compareProductList.length);
};

const removeProduct = (index) => {
  props.compareProductList.splice(index, 1);
};

watch(
  () => props.compareProductList,
  (newValue) => {
    console.log(newValue);
  },
  { deep: true }
);
</script>

<style scoped lang='scss'>
.comparison-container {
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: white;
  font-family: "Prompt", sans-serif;
  width: 100%;
  margin: 0 auto;
  z-index: 1001;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.comparison-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin: 0px 50px 0 50px;
}

.comparison-title {
  font-size: 24px;
  font-weight: bold;
  text-align: left;
  margin: 0;
}

.compare-count {
  font-size: 20px;
  font-weight: bold;
  color: #666;
  margin-left: 10px;
}

.product-cards {
  display: flex;
  gap: 80px;
}

.product-card {
  position: relative;
  width: 120px;
}

.product-image-container {
  position: relative;
  //border: 1px solid #e0e0e0;
  transform: scale(1.5);
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.remove-button {
  position: absolute;
  top: 24px;
  right: 2px;
  width: 14px;
  height: 14px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
}

.remove-icon {
  line-height: 1;
}

.remove-icon:hover {
  transform: scale(1.1);
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.compare-button {
  width: 200px;
  height: 60px;
  font-size: 18px;
  background-color: #0039ff;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: bold;
  min-width: 120px;

  &:disabled {
    cursor: not-allowed;
    background-color: #737373;
  }
}

.compare-button:hover {
  background-color: #4869FF;
  border: #000000 solid 1px;
  transition: 0.3s;

  &:disabled {
    cursor: not-allowed;
    background-color: #737373;
  }
}

.reset-button {
  width: 200px;
  height: 60px;
  font-size: 18px;
  background-color: white;
  color: black;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  font-weight: bold;
  min-width: 120px;
}

.reset-button:hover {
  background-color: #D9D9D9;
  border: #000000 solid 1px ;
  transition: 0.3s;
}

@keyframes slideIn {
  0% {
    transform: translateY(10%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.comparison-container {
  animation: slideIn 0.6s ease;
}

</style>
