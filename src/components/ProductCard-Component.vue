<template>
    <div class="product-card">
      <div class="product-image-container">
        <img :src="shoe1" :alt="product.name" class="product-image" />
      </div>
      <div class="product-info">
        <h2 class="product-title">{{ product.pdName }}</h2>
        <div class="product-details">
          <span class="product-price">{{ product.pdPrice }} THB</span>
          <div class="product-colors">
            <div
              v-for="color in product.pdColor"
              :key="color.pdCode"
              class="color-option"
              :class="{ 'color-selected': color.isSelected }"
              @click="selectColor(color.pdCode)"
            >
              <div
                class="color-inner"
                :style="{ backgroundColor: `var(--${color.pdColor})` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="product-actions">
        <label class="compare-checkbox">
          <input 
            type="checkbox" 
            v-model="isCompareSelected"
            @change="toggleCompare"
          >
          <span class="checkbox-text">เปรียบเทียบ</span>
        </label>
        <button 
          class="favorite-button"
          :class="{ 'is-favorite': isFavorite }"
          @click="toggleFavorite"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import shoe1 from "@/assets/shoes/shoe1.png";
  
  const props = defineProps({
    product: Object,
  });
  
  const emit = defineEmits(["select-color", "toggle-compare", "toggle-favorite"]);
  
  const currentProduct = ref(null);
  const isCompareSelected = ref(false);
  const isFavorite = ref(false);
  
  const selectColor = (colorId) => {
    currentProduct.value = colorId;
    emit("select-color", colorId);
  };
  
  const toggleCompare = () => {
    emit("toggle-compare", {
      productId: props.product.id,
      isSelected: isCompareSelected.value
    });
  };
  
  const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value;
    emit("toggle-favorite", {
      productId: props.product.id,
      isFavorite: isFavorite.value
    });
  };
  </script>
  
  <style scoped>
  .product-card {
    background-color: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding: 16px;
  }
  
  .product-image-container {
    padding: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  }
  
  .product-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  
  .product-info {
    padding: 16px 0;
    flex-grow: 1;
  }
  
  .product-title {
    font-size: 14px;
    margin: 0 0 12px 0;
    color: var(--text-title-shoes-color);
    text-decoration: none;
    line-height: 1.4;
  }
  
  .product-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .product-price {
    font-size: 14px;
    font-weight: bold;
  }
  
  .product-colors {
    display: flex;
    gap: 8px;
  }
  
  .color-option {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    padding: 1.5px;
    border: 1px solid transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .color-option.color-selected {
    border-color: #4338ca;
  }
  
  .color-inner {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    border: 1px solid #e5e5e5;
  }
  
  .product-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid #e5e5e5;
  }
  
  .compare-checkbox {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
  
  .compare-checkbox input {
    width: 16px;
    height: 16px;
  }
  
  .checkbox-text {
    font-size: 14px;
    color: #666;
  }
  
  .favorite-button {
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    color: #999;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;
  }
  
  .favorite-button.is-favorite {
    color: #ff4d4d;
  }
  
  .favorite-button:hover {
    color: #ff4d4d;
  }
  
  .favorite-button svg {
    width: 20px;
    height: 20px;
  }
  </style>