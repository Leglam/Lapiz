<template>
  <div class="filter-detail-container">
    <div class="filter-content">
      <!-- Size Section -->
      <div class="filter-section">
        <h2 class="filter-title">ขนาด (UK)</h2>
        <div class="size-selector">
          <label v-for="size in sizes" :key="size" class="size-chip">
            <input
              type="checkbox"
              :value="size"
              v-model="selectedSizes"
              class="size-input"
            />
            <span class="size-label">{{ size }}</span>
          </label>
        </div>
      </div>

      <div class="filter-divider"></div>

      <!-- Color Section -->
      <div class="filter-section">
        <h3 class="filter-title">สี</h3>
        <div class="color-grid">
          <div v-for="(color, index) in colors" :key="index" class="color-item">
            <input
              type="checkbox"
              :value="color"
              v-model="selectedColors"
              class="color-input"
            />
            <div class="color-button">
              <div
                :style="{ backgroundColor: `var(--${color})` }"
                class="color-box"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="filter-divider"></div>

      <!-- Price Range Section (ที่ปรับปรุง) -->
      <div class="filter-section">
        <h4 class="filter-title">ราคา</h4>
        <div class="price-range">
          <div class="price-input-group">
            <div class="price-input-container">
              <input
                type="text"
                v-model="minPriceInput"
                @blur="handleMinPriceInput"
                class="price-text-input"
                placeholder="0"
              />
              <span class="price-currency">THB</span>
            </div>
            <span class="price-separator">-</span>
            <div class="price-input-container">
              <input
                type="text"
                v-model="maxPriceInput"
                @blur="handleMaxPriceInput"
                class="price-text-input"
                :placeholder="maxPriceLimit"
              />
              <span class="price-currency">THB</span>
            </div>
          </div>

          <div class="range-slider-container">
            <input
              type="range"
              :min="0"
              :max="maxPriceLimit"
              :step="100"
              v-model.number="minPrice"
              class="price-slider min-price-slider"
              @input="updateMinPriceInput"
            />
            <input
              type="range"
              :min="0"
              :max="maxPriceLimit"
              :step="100"
              v-model.number="maxPrice"
              class="price-slider max-price-slider"
              @input="updateMaxPriceInput"
            />
            <div class="range-slider-track"></div>
          </div>
        </div>
      </div>

      <div class="filter-divider"></div>

      <!-- Gender Section -->
      <div class="filter-section">
        <h5 class="filter-title">เพศ</h5>
        <div class="gender-options">
          <label class="checkbox-label">
            <input type="checkbox" v-model="selectedGenders" value="Male" />
            <span>ผู้ชาย</span>
          </label>
          <label class="checkbox-label">
            <input type="checkbox" v-model="selectedGenders" value="Female" />
            <span>ผู้หญิง</span>
          </label>
        </div>
      </div>

      <div class="filter-divider"></div>

      <!-- Brand Section -->
      <div class="filter-section">
        <h6 class="filter-title">แบรนด์</h6>
        <div class="brand-options">
          <label v-for="brand in brands" :key="brand" class="checkbox-label">
            <input type="checkbox" :value="brand" v-model="selectedBrands" />
            <span>{{ brand }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  product: {
    type: Array,
    required: true,
  },
});

const sizes = [
  "3.5",
  "4",
  "4.5",
  "5",
  "5.5",
  "6",
  "6.5",
  "7",
  "7.5",
  "8",
  "8.5",
  "9",
  "9.5",
  "10",
  "10.5",
  "11",
  "11.5",
  "12",
];

const colors = computed(() => {
  return [
    ...new Set(
      props.product.flatMap((product) =>
        product.pdColor.map((color) => color.pdColor)
      )
    ),
  ];
});

const brands = [
  "Keds",
  "Converse",
  "Nike",
  "Adidas",
  "Reebok",
  "Lacoste",
  "Puma",
];

const selectedSizes = ref([]);
const selectedColors = ref([]);
const selectedGenders = ref([]);
const selectedBrands = ref([]);

// ตั้งค่าราคาขั้นต่ำและสูงสุด
const maxPriceLimit = 6000;
const minPrice = ref(0);
const maxPrice = ref(maxPriceLimit);
const minPriceInput = ref("0");
const maxPriceInput = ref(maxPriceLimit.toString());

// ฟังก์ชันอัพเดทค่าที่แสดงในช่องข้อความ
const updateMinPriceInput = () => {
  minPriceInput.value = minPrice.value.toString();
  validatePriceRange();
};

const updateMaxPriceInput = () => {
  maxPriceInput.value = maxPrice.value.toString();
  validatePriceRange();
};

// ฟังก์ชันจัดการค่าที่ผู้ใช้กรอกในช่องข้อความ
const handleMinPriceInput = () => {
  let value = parseInt(minPriceInput.value.replace(/[^0-9]/g, ""));

  if (isNaN(value)) {
    value = 0;
  }

  // ตรวจสอบขอบเขต
  if (value < 0) value = 0;
  if (value > maxPriceLimit) value = maxPriceLimit;

  minPrice.value = value;
  minPriceInput.value = value.toString();
  validatePriceRange();
};

const handleMaxPriceInput = () => {
  let value = parseInt(maxPriceInput.value.replace(/[^0-9]/g, ""));

  if (isNaN(value)) {
    value = maxPriceLimit;
  }

  // ตรวจสอบขอบเขต
  if (value < 0) value = 0;
  if (value > maxPriceLimit) value = maxPriceLimit;

  maxPrice.value = value;
  maxPriceInput.value = value.toString();
  validatePriceRange();
};

// ฟังก์ชันตรวจสอบช่วงราคา
const validatePriceRange = () => {
  if (parseInt(minPrice.value) > parseInt(maxPrice.value)) {
    minPrice.value = maxPrice.value;
    minPriceInput.value = maxPrice.value.toString();
  }
};

// ส่งค่าช่วงราคาที่เปลี่ยนแปลงออกไป
watch([minPrice, maxPrice], () => {
  emit("update:priceRange", {
    min: minPrice.value,
    max: maxPrice.value,
  });
});

// Watchers อื่นๆ
watch(selectedSizes, (newVal) => {
  emit("update:sizes", newVal);
});

watch(selectedColors, (newVal) => {
  emit("update:colors", newVal);
});

watch(selectedGenders, (newVal) => {
  emit("update:genders", newVal);
});

watch(selectedBrands, (newVal) => {
  emit("update:brands", newVal);
});

const emit = defineEmits([
  "update:sizes",
  "update:colors",
  "update:genders",
  "update:brands",
  "update:priceRange",
]);
</script>

<style scoped lang="scss">
.filter-detail-container {
  width: 20.4vw;
  height: 84vw; /* ให้ความสูงปรับตามเนื้อหา */
  align-self: flex-start; /* เพิ่ม align-self เพื่อให้ยึดติดกับด้านบน */
  // height: calc(100vh - 69px);
  //min-height: 100vh; ให้ container มีความสูงขั้นต่ำเท่ากับความสูงหน้าจอ
  padding: 20px;
  overflow-x: hidden;
  box-sizing: border-box;
}

.filter-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: none; /* ทำให้ขยายตามเนื้อหาที่มี */
  height: auto; /* ให้ความสูงปรับตามเนื้อหาภายใน */
}

.filter-section {
  display: flex;
  flex-direction: column;
  // gap: 16px;
}

.filter-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 10px 0 20px;
}

.filter-divider {
  height: 1px;
  background-color: #000;
  margin: 8px 0;
}

/* Size Selector Styles */
/* Ensure 5 items per row */
.size-selector {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}

.size-chip {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 30px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  cursor: pointer;
  padding: 0;
  transition: all 0.1s ease;
}

.size-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.size-label {
  font-size: 14px;
  color: #7b7171;
  transition: color 0.2s ease;
}

/* Hover state - black border and text */
.size-chip:hover {
  outline: 1px solid rgb(56, 56, 56);
}

.size-chip:hover .size-label {
  color: #000;
  font-size: medium;
}

/* Checked state - red border and text */
.size-input:checked + .size-label {
  color: #000000;
  font-weight: 500;
}

.size-input:checked ~ .size-chip {
  border-color: #ff0000;
}

/* Active/Selected state */
.size-chip:has(.size-input:checked) {
  border-color: #ff0000;
}

.size-input:active + .size-label,
.size-input:focus + .size-label {
  color: #000000;
}

/* Color Grid Styles */
.color-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 12px;
  row-gap: 10px;
  justify-items: center;
}

.color-item {
  position: relative;
}

.color-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  width: 47px;
  height: 47px;
  z-index: 2;
}

.color-button {
  width: 47px;
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #787878;
  border-radius: 4px;
  cursor: pointer;
  background: white;
  transition: box-shadow 0.3s ease;
}

.color-button:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
}

.color-box {
  width: 37px;
  height: 37px;
  border-radius: 2px;
}

.color-input:checked + .color-button {
  box-shadow: inset 0 0 0 1px #000;
}

/* Price Range Styles */
.price-range {
  width: 100%;
}

.price-values {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.price-value {
  font-size: 14px;
  color: #666;
}

.price-slider {
  -webkit-appearance: none;
  position: absolute;
  top: 2px;
  left: -2px;
  width: 100%;
  height: 2px;
  background: transparent;
  z-index: 2;
  pointer-events: none;
}

.price-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  border: 2px solid #333;
  cursor: pointer;
  pointer-events: auto;
}

// .price-slider::-moz-range-thumb {
//   width: 20px;
//   height: 20px;
//   border-radius: 50%;
//   background: white;
//   border: 2px solid #333;
//   cursor: pointer;
//   pointer-events: auto;
// }

.price-input-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.price-input-container {
  position: relative;
  width: 45%;
}

.price-text-input {
  width: 100%;
  padding: 8px 40px 8px 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
  color: black;
}

.price-text-input:focus {
  outline: none;
  border-color: #333;
}

.price-currency {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 14px;
}

.price-separator {
  font-size: 16px;
  color: #666;
}

/* ระยะห่างตัวเลื่อนราคา */
.range-slider-container {
  position: relative;
  height: 30px;
  margin-top: 10px;
}

.range-slider-track {
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  height: 8px;
  border-radius: 20px;
  background-color: #d9d9d9;
  z-index: 1;
}

/* เพิ่มความชัดเจนให้กับ thumb ของแต่ละ slider */
/* .min-price-slider::-webkit-slider-thumb {
  z-index: 3;
}

.max-price-slider::-webkit-slider-thumb {
  z-index: 4;
} */

/* เพิ่มความชัดเจนให้กับ thumb ของแต่ละ slider (Firefox) */
/* .min-price-slider::-moz-range-thumb {
  z-index: 3;
}

.max-price-slider::-moz-range-thumb {
  z-index: 4;
} */

/* Checkbox Styles */
.checkbox-label {
  display: flex;
  align-items: center;
  width: 60%;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  margin: 4px 0;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  border: 2px solid #666;
  border-radius: 2px;
  cursor: pointer;
  appearance: none; /* ลบสไตล์เริ่มต้น */
  border: 1px solid #000000;
  border-radius: 3px;
  background-color: white;
  position: relative;
}

.checkbox-label input[type="checkbox"]:checked::after {
  content: ""; /* สร้างเนื้อหาใหม่ */
  position: absolute;
  top: 1px;
  left: 5px;
  width: 4px;
  height: 11px;
  border: solid black; /* ขีดเส้นสีขาว */
  border-width: 0 3px 3px 0; /* กำหนดขนาดของขีดเส้นเพื่อให้เหมือนติ๊กถูก */
  transform: rotate(45deg); /* หมุนให้เป็นรูปติ๊กถูก */
}

.checkbox-label input[type="checkbox"]:hover {
  box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.3); /* เพิ่มเงาดำเมื่อ hover */
  transition: 0.3s;
}

.checkbox-label span {
  font-size: 16px;
  color: #333;
}

.gender-options,
.brand-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
