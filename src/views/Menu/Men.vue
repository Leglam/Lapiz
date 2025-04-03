<template>
  <div class="topic-wrapper">
    <div class="line"></div>
    <div class="men-text" ref="menTextRef">
      ผู้ชาย
    </div>
    <div class="line"></div>
  </div>

  <div class="wrapper margin-top margin-left margin-right" style="gap: 20px">
    <div class="filter-container">
      <ProductFilter
        :product="products"
        @update:colors="(value) => (colorToFilter = value)"
        @update:genders="(value) => (selectedGenders = value)"
        @update:brands="(value) => (selectedBrands = value)"
        @update:priceRange="(value) => (priceRange = value)"
      />
    </div>
    <div class="product-wrapper">
      <div class="dropdown" @click="toggleDropdown">
        <div class="dropdown-header">
          <span>{{ selectedDropdownItem }}</span>
          <img
            :src="arrowIcon"
            alt="arrow"
            :class="{
              'arrow-up': isDropdownOpen,
              'arrow-down': !isDropdownOpen,
            }"
            class="dropdown-arrow"
          />
        </div>
        <div v-if="isDropdownOpen" class="dropdown-content">
          <p
            class="dropdown-style"
            @click="selectDropdownItem('สินค้าที่เกี่ยวข้อง')"
            :class="{
              disabled: selectedDropdownItem === 'สินค้าที่เกี่ยวข้อง',
            }"
          >
            สินค้าที่เกี่ยวข้อง
          </p>
          <p
            class="dropdown-style"
            @click="selectDropdownItem('สินค้าขายดี')"
            :class="{ disabled: selectedDropdownItem === 'สินค้าขายดี' }"
          >
            สินค้าขายดี
          </p>
          <p
            class="dropdown-style"
            @click="selectDropdownItem('สินค้าใหม่')"
            :class="{ disabled: selectedDropdownItem === 'สินค้าใหม่' }"
          >
            สินค้าใหม่
          </p>
          <p
            class="dropdown-style"
            @click="selectDropdownItem('ราคา : จากน้อยไปมาก')"
            :class="{
              disabled: selectedDropdownItem === 'ราคา : จากน้อยไปมาก',
            }"
          >
            ราคา : จากน้อยไปมาก
          </p>
          <p
            class="dropdown-style"
            @click="selectDropdownItem('ราคา : จากมากไปน้อย')"
            :class="{
              disabled: selectedDropdownItem === 'ราคา : จากมากไปน้อย',
            }"
          >
            ราคา : จากมากไปน้อย
          </p>
        </div>
      </div>
      <div class="card-container">
        <CardComponent
          v-for="product in filteredProduct"
          :key="product.pdModel"
          :product="product"
          :is-disable="compareProductList.length >= 2"
          :checkbox-value="isProductInCompareList(product)"
          :pd-img-number="selectedProduct"
          @select-color="selectColor"
          @select-compare-product="handleCompareProduct"
          @remove-compare-product="handleRemoveCompareProduct"
        />
      </div>

      <CompareBar
        v-if="compareProductList.length > 0"
        :compare-product-list="compareProductList"
      />
    </div>
  </div>
</template>

<script setup>
import ProductFilter from "@/components/ProductFilter.vue";
import CardComponent from "@/components/CardComponent.vue";
import { useProductStore } from "@/stores/productStore";
import {
  computed,
  ref,
  watch,
  nextTick,
  onMounted,
  onBeforeUnmount,
} from "vue";
import CompareBar from "@/components/compareBar.vue";
import arrowIcon from "@/assets/images/arrow-down-dropdown.svg";

const menTextRef = ref(null); // reference to the men-text element

const productStore = useProductStore();

const isDropdownOpen = ref(false);
const selectedDropdownItem = ref("สินค้าที่เกี่ยวข้อง");

const customScrollOffset = 140;

const colorToFilter = ref([]);
const priceRange = ref({ min: 0, max: 6000 });

const selectedGenders = ref([]);
const selectedBrands = ref([]);

const products = computed(() => {
  return productStore.product.filter((p) => p.pdGender === "Men");
});

const filteredProduct = computed(() => {
  return products.value.filter((p) => {
    // กรองตามสี
    const colorMatch =
      colorToFilter.value.length === 0 ||
      p.pdColor.some((color) => colorToFilter.value.includes(color.pdColor));

    // กรองตามเพศ
    const genderMatch =
      selectedGenders.value.length === 0 ||
      selectedGenders.value.includes(p.pdGender);

    // กรองตามแบรนด์
    const brandMatch =
      selectedBrands.value.length === 0 ||
      selectedBrands.value.includes(p.pdBrand);

    // กรองตามช่วงราคา
    const priceMatch =
      p.pdPrice >= priceRange.value.min && p.pdPrice <= priceRange.value.max;

    return colorMatch && genderMatch && brandMatch && priceMatch;
  });
});

const selectedProduct = ref("");

const compareProductList = ref([]);

const handleCompareProduct = (value) => {
  compareProductList.value.push(value);
};

const selectColor = (colorId) => {
  products.value.map((product) => {
    product.pdColor = product.pdColor.map((color) => {
      color.isSelected = color.pdCode === colorId;
      return color;
    });
    return product;
  });

  selectedProduct.value = colorId;
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectDropdownItem = (item) => {
  if (item !== selectedDropdownItem.value) {
    selectedDropdownItem.value = item;
    // isDropdownOpen.value = false;
  }
};

const closeDropdownIfClickedOutside = (event) => {
  const dropdown = document.querySelector(".dropdown");
  if (dropdown && !dropdown.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};

const isProductInCompareList = (product) => {
  return compareProductList.value.some((p) => p.pdModel === product.pdModel);
};

const handleRemoveCompareProduct = (product) => {
  const index = compareProductList.value.findIndex(
    (p) => p.pdModel === product.pdModel
  );

  if (index !== -1) {
    compareProductList.value.splice(index, 1);
  }
};

watch(
  () => productStore.searchValue,
  async (newValue) => {
    if (newValue !== "") {
      // ใช้ nextTick เพื่อให้มั่นใจว่า DOM ถูกอัปเดตก่อนที่จะเลื่อน
      await nextTick(() => {
        if (menTextRef.value) {
          // ลองใช้ window.scrollTo เพื่อให้เลื่อนไปยังตำแหน่งของ menTextRef
          window.scrollTo({
            top: menTextRef.value.offsetTop - customScrollOffset, // ใช้ offsetTop เพื่อเลื่อนไปยังตำแหน่งของ element
            behavior: "smooth", // เลื่อนแบบราบรื่น
          });
        }
      });
    }
  }
);

onMounted(() => {
  document.addEventListener("click", closeDropdownIfClickedOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdownIfClickedOutside);
});
</script>

<style scoped lang="scss">
.topic-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3vh;
  padding-top: 45px;

  .line {
    flex: 1;
    height: 3px;
    background-color: #00000025;
    margin: 0 10vw;
  }
}

.men-text {
  font-size: 24px;
  font-weight: bold;
}

.wrapper {
  display: flex;
  margin: 3vh 3vw 3vh 3vw;

  .filter-container {
    //position: sticky;
    top: 80px; /* ปรับตามความสูงของ header หรือ navigation bar ถ้ามี */
    background: #fbfbfb;
    border: 1px solid #ccc;
    border: 1px solid #e0e0e0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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
      margin-bottom: 0px;
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

    .dropdown-arrow {
      width: 16px; /* ขนาดของลูกศร */
      height: 16px; /* ขนาดของลูกศร */
      transition: transform 0.3s ease;
    }

    .dropdown-arrow.arrow-up {
      transform: rotate(180deg); /* หมุนลูกศรขึ้น */
    }

    .dropdown-arrow.arrow-down {
      transform: rotate(0deg); /* ลูกศรลง */
    }

    .dropdown-content {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: #fff;
      border: 1px solid #ccc;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      z-index: 10;
    }

    .dropdown-style {
      outline: 1px solid #ccc;
      margin: 0px;
      padding: 8px;
    }

    .dropdown-style:hover {
      background-color: #ececec;
      outline: 1px solid black;
      transition: 0.1s;
      font-weight: 600;
    }

    .dropdown-style.disabled {
      background-color: #ececec;
      color: #000000;
      cursor: not-allowed;
    }

    .card-container {
      flex: 1; //ให้ container ของ products เป็น flex: 1 เพื่อขยายพื้นที่ตามที่มี
      margin-top: 30px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2vw;
    }
  }
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

.card-container {
  animation: slideIn 0.6s;
}
</style>
