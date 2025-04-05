<template>
  <div class="shoe-categories">
    <div class="shoe-slider">
      <button class="slider-button prev" @click="slidePrev">
        <span class="arrow">‹</span>
      </button>

      <div class="slider-container">
        <div class="slider-track" :style="sliderStyle">
          <!-- Loop over recommended products and display Card -->
          <div
            v-for="(product, index) in displayItems"
            :key="index"
            class="category-item"
            @click="selectCategory(product)"
          >
            <CardComponent :product="product" />
          </div>
        </div>
      </div>

      <button class="slider-button next" @click="slideNext">
        <span class="arrow">›</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import CardComponent from "./CardComponent.vue";
import { useProductStore } from "@/stores/productStore";

const productStore = useProductStore();

const currentSlide = ref(0);
const displayCount = 5;
const itemGap = 150; // เพิ่มระยะห่างเป็น 40px
const itemWidth = 16.46 * (window.innerWidth / 100) + itemGap; // 177px (ขนาดของ item) + 40px (gap)

const newProducts = computed(() => {
  // กรองสินค้าใหม่ที่ pdGender = "Men_New"
  return productStore.product.filter((p) => p.pdGender === "Men_New" || p.pdGender === "Wome_New");
});

const displayItems = computed(() => {
  const items = [...newProducts.value];
  const duplicateCount = displayCount - 1;
  return [...items, ...items.slice(0, duplicateCount)];
});

const sliderStyle = computed(() => ({
  transform: `translateX(-${currentSlide.value * itemWidth}px)`,
  transition: "transform 0.3s ease-in-out",
}));

const slidePrev = () => {
  if (currentSlide.value <= 0) {
    // หยุดเลื่อนเมื่อถึงจุดเริ่มต้น
    currentSlide.value = newProducts.value.length - displayCount;
  } else {
    currentSlide.value--;
  }
};

const slideNext = () => {
  if (currentSlide.value >= newProducts.value.length - displayCount) {
    // หยุดเลื่อนเมื่อถึงจุดสิ้นสุด
    currentSlide.value = 0;
  } else {
    currentSlide.value++;
  }
};

const selectCategory = (product) => {
  console.log("Selected product:", product.pdName);
};
</script>

<style scoped>
@import "@/styles/remove-button-icon.scss";

/* Shoecategories Styles */
.shoe-categories {
  /* margin: 0 auto; */
  padding: 20px 0px 20px 0px;
  max-width: 1440px;
}

.shoe-slider {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

/* ความกว้าง container - ปรับระยะห่างเป็น 40px */
.slider-container {
  width: calc((216px + 40px) * 5 - 40px); /* 5 items + 4 gaps (gap 40px) */
  overflow: hidden;
}

/* แถบเลื่อน - ปรับ gap เป็น 40px */
.slider-track {
  min-width: 100%;
  display: flex;
  gap: 1.66vw;
  transition: transform 0.3s ease-in-out;
}

.category-item {
  flex: 0 0 177px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.category-item:hover {
  transform: translateY(-5px);
}

/* ขนาดรูป */
.category-image {
  width: 177px;
  height: 176px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
}

.category-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.category-item:hover .category-image img {
  transform: scale(1.05);
}

.category-name-wrapper {
  position: relative;
  height: 35px;
  margin-top: -17px; /* Move the white box up to overlap with the image */
}

.category-name {
  position: absolute;
  left: 0;
  right: 0;
  background: white;
  height: 33px;
  width: 177px;
  margin: 0 auto;
  font-size: 16px;
  color: rgb(0, 0, 0);
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0 0 8px 8px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
}

.slider-button {
  background: rgba(0, 0, 0, 0.8); /* เปลี่ยนพื้นหลังเป็นสีดำโปร่งแสง 60% */
  border: 1px solid rgb(0, 0, 0);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 0 0 auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.slider-button:hover {
  background-color: #000000; /* คงสีขาวเมื่อ hover */
  transform: scale(1.1); /* ขยายขนาดเล็กน้อย */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15); /* เพิ่มเงาเมื่อ hover */
}

.slider-button:active {
  transform: scale(0.95); /* ลดขนาดเมื่อกด */
}

.arrow {
  font-size: 24px;
  line-height: 1;
  color: rgb(255, 255, 255);
  user-select: none;
}

/* ปรับ Media Queries ให้คำนวณด้วย gap 40px */
@media (max-width: 1200px) {
  .slider-container {
    width: calc((177px + 40px) * 5 - 40px); /* แสดง 5 items */
  }
}

@media (max-width: 992px) {
  .slider-container {
    width: calc((177px + 40px) * 4 - 40px); /* แสดง 4 items */
  }
}

@media (max-width: 768px) {
  .slider-container {
    width: calc((177px + 40px) * 3 - 40px); /* แสดง 3 items */
  }
}

@media (max-width: 576px) {
  .slider-container {
    width: calc((177px + 40px) * 2 - 40px); /* แสดง 2 items */
  }

  .shoe-slider {
    gap: 10px;
  }
}
</style>
