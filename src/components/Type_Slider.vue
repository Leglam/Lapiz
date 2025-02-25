<template>
  <div class="shoe-categories">
    <div class="shoe-slider">
      <button class="slider-button prev" @click="slidePrev">
        <span class="arrow">‹</span>
      </button>

      <div class="slider-container">
        <div class="slider-track" :style="sliderStyle">
          <div v-for="(category, index) in displayItems" 
               :key="index" 
               class="category-item"
               @click="selectCategory(category)">
            <div class="category-image">
              <img :src="category.image" :alt="category.name" />
            </div>
            <div class="category-name-wrapper">
              <div class="category-name">{{ category.name }}</div>
            </div>
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
import { ref, computed } from 'vue';
import Sneaker from '@/assets/shoes/type_sneaker.png';
import FlipFlop from '@/assets/shoes/type_flip-flops.png';
import Trainer from '@/assets/shoes/type_trainers.png';
import HighHeel from '@/assets/shoes/type_high-heels.png';
import Flats from '@/assets/shoes/type_flats.png';
import Boot from '@/assets/shoes/type_boots.png';
import Leather from '@/assets/shoes/type_leather.png';

const currentSlide = ref(0);
const displayCount = 6;
const itemGap = 40; // เพิ่มระยะห่างเป็น 40px
const itemWidth = 177 + itemGap; // 177px (ขนาดของ item) + 40px (gap)

const categories = [
  { name: "รองเท้าผ้าใบ", image: Sneaker },
  { name: "รองเท้าแตะ", image: FlipFlop },
  { name: "รองเท้ากีฬา", image: Trainer },
  { name: "รองเท้าส้นสูง", image: HighHeel },
  { name: "รองเท้าส้นเตี้ย", image: Flats },
  { name: "รองเท้าบูท", image: Boot },
  { name: "รองเท้าหนัง", image: Leather },
  { name: "รองเท้าวิ่ง", image: Boot },
];

// สร้าง circular array สำหรับการแสดงผลแบบวนซ้ำ
const displayItems = computed(() => {
  const items = [...categories];
  const duplicateCount = displayCount - 1;
  return [...items, ...items.slice(0, duplicateCount)];
});

// คำนวณ ตน.การเลื่อน
const sliderStyle = computed(() => ({
  transform: `translateX(-${currentSlide.value * itemWidth}px)`,
  transition: 'transform 0.3s ease-in-out',
}));

// เลื่อนไปทางซ้าย
const slidePrev = () => {
  if (currentSlide.value <= 0) {
    // เมื่อถึงจุดเริ่มต้น ให้วนกลับไปท้ายสุด
    currentSlide.value = categories.length - displayCount;
  } else {
    currentSlide.value--;
  }
};

// เลื่อนไปทางขวา
const slideNext = () => {
  if (currentSlide.value >= categories.length - displayCount) {
    // เมื่อถึงจุดสุดท้าย ให้วนกลับไปจุดเริ่มต้น
    currentSlide.value = 0;
  } else {
    currentSlide.value++;
  }
};

// ฟังก์ชันเมื่อคลิกที่หมวดหมู่
const selectCategory = (category) => {
  // TODO: เพิ่มการจัดการเมื่อคลิกที่หมวดหมู่
  console.log('Selected category:', category.name);
};
</script>

<style scoped>
.shoe-categories {
  margin: 0 auto;
  padding: 20px;
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
  width: calc((177px + 40px) * 6 - 40px); /* 6 items + 5 gaps */
  overflow: hidden;
}

/* แถบเลื่อน - ปรับ gap เป็น 40px */
.slider-track {
  min-width: 100%;
  display: flex;
  gap: 40px;
  transition: transform 0.3s ease-in-out;
}

.category-item {
  width: 177px;
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