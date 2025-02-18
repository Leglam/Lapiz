<template>
  <transition name="fade" @before-leave="beforeLeave" @leave="onLeave">
    <div v-if="isVisible" class="product-card">
      <div class="product-image-container">
        <img :src="shoe1" :alt="product.name" class="product-image" />
      </div>
      <div class="product-info">
        <h2 class="product-title">{{ product.pdName }}</h2>
        <div class="product-details" >
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
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
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <input type="checkbox" name="" id="" />
            <input type="checkbox" name="" id="" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from "vue";
import shoe1 from "@/assets/shoes/shoe1.png";

const props = defineProps({
  product: Object,
});

const currentProduct = ref(null);

const emit = defineEmits(["select-color", "remove-product"]);

const isVisible = ref(true);
const isRemoving = ref(false);

const selectColor = (colorId) => {
  currentProduct.value = colorId;
  emit("select-color", colorId);
};

function beforeLeave() {
  // สามารถทำอะไรเพิ่มเติมก่อนที่ card จะหายไปได้
}

function onLeave(el, done) {
  // เมื่อ card หายไปแล้ว จะทำการลบหรือทำงานเพิ่มเติม
  done();
}
</script>

<style scoped>
@import "@/styles/remove-button-icon.scss";

.product-card {
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.product-card.fade-leave-active {
  opacity: 0;
  transform: scale(0.9); /* ลดขนาดเมื่อหายไป */
}

.product-card.fade-enter-active {
  opacity: 1;
  transform: scale(1);
}

.remove-button {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #000;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.remove-button:active {
  transform: scale(0.9);
}

.remove-button-animate {
  animation: remove-button-animation 0.6s ease-in-out forwards;
}

@keyframes remove-button-animation {
  0% {
    transform: rotate(0deg) scale(1);
    opacity: 1;
  }
  50% {
    transform: rotate(45deg) scale(1);
    opacity: 1;
  }
  100% {
    transform: rotate(90deg) scale(0);
    opacity: 0;
  }
}

.product-header {
  display: flex;
  justify-content: flex-end;
  padding: 8px;
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
  padding: 16px;
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
  flex-direction: column;
  justify-content: space-between;
  gap: 0.59vw;
  /* align-items: center; */
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

.add-to-cart-button {
  background-color: #002fff;
  color: white;
  border: none;
  padding: 12px;
  width: 100%;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.add-to-cart-button:hover {
  background-color: #0052a3;
}
</style>
