<template>
  <transition name="fade" @before-leave="beforeLeave" @leave="onLeave">
    <div v-if="isVisible" class="product-card">
      <div @click="selectProduct" class="product-image-container">
        <img :src="shoe1" :alt="product.name" class="product-image" />
      </div>
      <div class="product-info">
        <h2 @click="selectProduct" class="product-title">
          {{ product.pdName }}
        </h2>
        <div class="product-details">
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
            <label class="checkbox-label">
              <input
                v-model="isCheckboxChecked"
                type="checkbox"
                name=""
                id=""
                @change="handleCheckbox"
                :disabled="isDisable"
              />
              <span>เปรียบเทียบ</span>
            </label>

            <a
              @click="pushPage('wishlist')"
              class="favorite-button"
              @mouseenter="isHovered = true"
              @mouseleave="isHovered = false"
              :class="{
                'favorite-button--hovered': isHovered,
              }"
            >
              <img
                :src="computedFavoriteIcon"
                alt="Favorite"
                class="favorite-icon"
                @click="toggleFavorite"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import shoe1 from "@/assets/shoes/shoe1.png";
import FavGray from "@/assets/images/FavGray.svg";
import FavRed from "@/assets/images/icon-fav-red.svg";

const props = defineProps({
  product: Object,
  isDisable: Boolean,
  checkboxValue: Boolean,
});

const emit = defineEmits([
  "select-color",
  "remove-product",
  "select-compare-product",
  "remove-compare-product",
]);
const router = useRouter();
const currentProduct = ref(null);
const isVisible = ref(true);
const isCheckboxChecked = ref(false);

// สถานะของหัวใจ
const isFavorite = ref(false);

// ฟังก์ชันสำหรับการคลิกหัวใจ
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};

// ฟังก์ชันเลือกสี
const selectColor = (colorId) => {
  currentProduct.value = colorId;
  emit("select-color", colorId);
};

// ฟังก์ชันเลือกสินค้าและไปที่หน้ารายละเอียด
const selectProduct = () => {
  router.push({
    name: "product-detail",
    params: { id: props.product.pdColor[0].pdCode },
  });
};

const handleCheckbox = () => {
  if (isCheckboxChecked.value) emit("select-compare-product", props.product);
  else emit("remove-compare-product", props.product);
};

// ฟังก์ชันก่อนที่คอมโพเนนต์จะหายไป
const beforeLeave = () => {
  // สามารถทำการเตรียมตัวก่อนที่การ์ดจะหายไป
};

// ฟังก์ชันการหายไปของการ์ด
const onLeave = (el, done) => {
  done();
};

// Favorite icon states
const isHovered = ref(false);

// Define icon paths
const favoriteIcons = {
  default: FavGray,
  hover: FavRed,
};

// Compute current icon based on isFavorite and hover state
const computedFavoriteIcon = computed(() => {
  if (isFavorite.value || isHovered.value) {
    return FavRed; // ใช้ FavRed เมื่อหัวใจถูกคลิกหรือ hovered
  }
  return FavGray;
});

watch(
  () => props.checkboxValue,
  (newValue) => {
    isCheckboxChecked.value = newValue;
  }
);
</script>

<style scoped>
@import "@/styles/remove-button-icon.scss";

.product-card {
  width: 16.46vw;
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
  padding: 0.5vw;
}

.product-image-container {
  padding: 0 1.38vw;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 13.88vw;
}

.product-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.product-info {
  padding: 1.11vw;
  flex-grow: 1;
}

.product-title {
  font-size: 0.97vw;
  margin: 0 0 0.83vw 0;
  color: var(--text-title-shoes-color);
  text-decoration: none;
  line-height: 1.4;
  text-align: left;
}

.product-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.59vw;
  /* align-items: center; */
}

.product-price {
  font-size: 0.97vw;
  font-weight: bold;
}

.product-colors {
  display: flex;
  gap: 0.55vw;
}

.color-option {
  width: 1.11vw;
  height: 1.11vw;
  border-radius: 50%;
  padding: 0.1vw;
  border: 0.06vw solid transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.color-option.color-selected {
  border-color: #4338ca;
}

.color-inner {
  width: 0.9vw;
  height: 0.9vw;
  border-radius: 50%;
  border: 0.06vw solid #e5e5e5;
}

.add-to-cart-button {
  background-color: #002fff;
  color: white;
  border: none;
  padding: 0.84vw;
  width: 100%;
  cursor: pointer;
  font-size: 0.97vw;
  transition: background-color 0.2s;
}

.add-to-cart-button:hover {
  background-color: #0052a3;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.4vw;
  cursor: pointer;
  font-size: 0.92vw;
  color: #000000;
}

.checkbox-label input[type="checkbox"] {
  width: 1.1vw;
  height: 1.1vw;
  cursor: pointer;
  margin: 0vw;

  &:disabled {
    cursor: not-allowed;
  }
}

.favorite-button {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  transform-origin: center;
  margin-top: 0.1vw;
}

.favorite-icon {
  width: 1.3vw;
  height: 1.1vw;
  position: relative;
  transition: transform 0.3s ease;
}

.favorite-button:hover .favorite-icon {
  transform: scale(1.2);
}

.favorite-button:active .favorite-icon {
  transform: scale(0.95);
}
</style>
