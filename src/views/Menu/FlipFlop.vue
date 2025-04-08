<template>
  <div class="topic-wrapper">
    <div class="line"></div>
    <div class="flip-flop-text" ref="menTextRef">
      รองเท้าแตะ
    </div>
    <div class="line"></div>
  </div>

  <div class="wrapper margin-top margin-left margin-right" style="gap: 20px">
    <div class="filter-container">
      <ProductFilter
        :product="products"
        @update:colors="(value) => (colorToFilter = value)"
        @update:brands="(value) => (selectedBrands = value)"
        @update:types="(value) => (selectedTypes = value)"
        @update:priceRange="(value) => (priceRange = value)"
      />
    </div>
    <div class="product-wrapper">
      <div class="dropdown-wrapper">
        <div class="sort-text">เรียงตาม</div>
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
            <p
              class="dropdown-style"
              @click="selectDropdownItem('ชื่อสินค้า (A ~ Z)')"
              :class="{ disabled: selectedDropdownItem === 'ชื่อสินค้า (A ~ Z)' }"
            >
              ชื่อสินค้า (A ~ Z)
            </p>
            <p
              class="dropdown-style"
              @click="selectDropdownItem('ชื่อสินค้า (Z ~ A)')"
              :class="{ disabled: selectedDropdownItem === 'ชื่อสินค้า (Z ~ A)' }"
            >
              ชื่อสินค้า (Z ~ A)
            </p>
          </div>
        </div>
      </div>
      <div class="card-container">
        <CardComponent
          v-for="product in displayedProducts"
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

      <div v-if="hasMoreProducts" class="load-more-container">
        <button class="load-more-button" @click="loadMoreProducts">
          โหลดเพิ่มเติม ({{ displayedProducts.length }} / {{ filteredProduct.length }})
        </button>
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
  import CompareBar from "@/components/CompareBar.vue";
  import arrowIcon from "@/assets/images/arrow-down-dropdown.svg";

  const menTextRef = ref(null);

  const productStore = useProductStore();

  const isDropdownOpen = ref(false);
  const selectedDropdownItem = ref("สินค้าที่เกี่ยวข้อง");

  const customScrollOffset = 140;

  const colorToFilter = ref([]);
  const priceRange = ref({ min: 0, max: 10000 });

  const selectedBrands = ref([]);
  const selectedTypes = ref([]);

  // กำหนดค่าเริ่มต้นสำหรับการแสดงสินค้า
  const itemsPerPage = ref(16); // จำนวนสินค้าที่แสดงต่อหน้า
  const currentPage = ref(1); // หน้าปัจจุบัน

  const products = computed(() => {
    return productStore.product.filter(
      (p) => p.pdType === "FlipFlop" || p.pdGender === "Men_FlipFlop_Best" || p.pdGender === "Men_FlipFlop_New"
                                    || p.pdGender === "Women_FlipFlop_Best" || p.pdGender === "Women_FlipFlop_New"
    );
  });

  const filteredProduct = computed(() => {
    // กรองสินค้า
    let filtered = products.value.filter((p) => {
      // กรองตามสี
      const colorMatch =
        colorToFilter.value.length === 0 ||
        p.pdColor.some((color) => colorToFilter.value.includes(color.pdColor));

      // กรองตามแบรนด์
      const brandMatch =
        selectedBrands.value.length === 0 ||
        selectedBrands.value.includes(p.pdBrand);

      // กรองตามประเภท
      const typeMatch =
        selectedTypes.value.length === 0 ||
        selectedTypes.value.includes(p.pdType);

      // กรองตามช่วงราคา
      const priceMatch =
        p.pdPrice >= priceRange.value.min && p.pdPrice <= priceRange.value.max;

      return colorMatch && brandMatch && typeMatch && priceMatch;
    });

    // กรองเฉพาะสินค้าขายดี
    if (selectedDropdownItem.value === "สินค้าขายดี") {
      filtered = filtered.filter((p) => p.pdGender === "Men_FlipFlop_Best" || p.pdGender === "Women_FlipFlop_Best");
    }

    // กรองเฉพาะสินค้าใหม่
    if (selectedDropdownItem.value === "สินค้าใหม่") {
      filtered = filtered.filter((p) => p.pdGender === "Men_FlipFlop_New" || p.pdGender === "Women_FlipFlop_New");
    }

    // เรียงลำดับสินค้า
    if (selectedDropdownItem.value === "ราคา : จากน้อยไปมาก") {
      filtered.sort((a, b) => a.pdPrice - b.pdPrice); // เรียงจากน้อยไปมาก
    } else if (selectedDropdownItem.value === "ราคา : จากมากไปน้อย") {
      filtered.sort((a, b) => b.pdPrice - a.pdPrice); // เรียงจากมากไปน้อย
    } else if (selectedDropdownItem.value === "ชื่อสินค้า (A ~ Z)") {
      filtered.sort((a, b) => a.pdName.localeCompare(b.pdName)); // เรียงตามตัวอักษร A ไป Z
    } else if (selectedDropdownItem.value === "ชื่อสินค้า (Z ~ A)") {
      filtered.sort((a, b) => b.pdName.localeCompare(a.pdName)); // เรียงตามตัวอักษร Z ไป A
    }

    return filtered;
  });

  // สินค้าที่จะแสดงตามจำนวนหน้าปัจจุบัน
  const displayedProducts = computed(() => {
  const startIndex = 0;
  const endIndex = currentPage.value * itemsPerPage.value;
    return filteredProduct.value.slice(startIndex, endIndex);
  });
  
  // ตรวจสอบว่ายังมีสินค้าให้แสดงเพิ่มเติมหรือไม่
  const hasMoreProducts = computed(() => {
    return displayedProducts.value.length < filteredProduct.value.length;
  });

  // ฟังก์ชันสำหรับโหลดสินค้าเพิ่มเติม
  const loadMoreProducts = () => {
    currentPage.value += 1;
  };

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

      // รีเซ็ตการแสดงผลเมื่อมีการเปลี่ยนตัวกรอง
      currentPage.value = 1;
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

  // รีเซ็ตหน้าเมื่อมีการเปลี่ยนแปลงตัวกรอง
  watch([colorToFilter, selectedBrands, selectedTypes, priceRange], () => {
    currentPage.value = 1;
  });

  watch(
    () => productStore.searchValue,
    async (newValue) => {
      if (newValue !== "") {
        // รีเซ็ตหน้าเมื่อมีการค้นหาใหม่
        currentPage.value = 1;

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

  .flip-flop-text {
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

      .dropdown-wrapper {
        display: flex;
        align-items: center;
        gap : 10px;
        font-size: 16px;
        font-weight: 500;
      }

      .sort-text {
        font-size: 16px;
        font-weight: bold;
        color: #000000;
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
        top: calc(100% + 10px);
        left: 0;
        right: 0;
        background-color: #fff;
        border: 1px solid #ccc;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
        z-index: 10;
        transform: translateY(15%); /* เริ่มต้นเลื่อนลงเล็กน้อย */
        opacity: 0;
        animation: slideUp 0.4s ease-in-out forwards;
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

  @keyframes slideUp {
    0% {
      transform: translateY(10%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .dropdown-content {
    transition: box-shadow 0.3s ease-in-out;
  }

  .card-container {
    animation: slideIn 0.6s;
  }

  .load-more-container {
    display: flex;
    justify-content: center;
    margin: 20px 0;
    width: 100%;
  }

  .load-more-button {
    position: relative;
    top: 5px;
    background-color: #2042D8;
    color: white;
    font-weight: bold;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .load-more-button:hover {
    font-size: 17px;
    background-color: #375BFE;
  }
</style>
