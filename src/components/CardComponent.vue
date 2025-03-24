<template>
  <transition name="fade" @before-leave="beforeLeave" @leave="onLeave">
    <div v-if="isVisible" class="product-card">
      <div @click="selectProduct" class="product-image-container">
        <img :src="getProductImage" :alt="product.name" class="product-image" />
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
            <span class="product-price"
              >{{ product.pdPrice.toLocaleString("en-US") }} THB</span
            >
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
import { ref, computed, watch, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import shoe1 from "@/assets/shoes/shoe1.png";
import FavGray from "@/assets/images/FavGray.svg";
import FavRed from "@/assets/images/icon-fav-red.svg";
import {
  addWishlistProducts,
  getWishlistProducts,
  removeWishlistProduct,
} from "@/api/productService";
import { useProductStore } from "@/stores/productStore";

const props = defineProps({
  product: Object,
  isDisable: Boolean,
  checkboxValue: Boolean,
  pdImgNumber: String,
});

const emit = defineEmits([
  "select-color",
  "remove-product",
  "select-compare-product",
  "remove-compare-product",
]);

const productStore = useProductStore();
const router = useRouter();
const currentProduct = ref(null);
const isVisible = ref(true);
const isCheckboxChecked = ref(false);

const isFavorite = ref(false);

const wishlistProduct = computed(() => productStore.wishlistProduct);

const getProductImage = computed(() => {
  if (!props.product?.pdColor) return shoe1;

  const matchedColor = props.product.pdColor.find(
    (color) => color.pdCode === props.pdImgNumber
  );

  return matchedColor?.pdImg || props.product.pdColor[0].pdImg;
});

const fetchProductInWishlist = async () => {
  const response = await getWishlistProducts();

  if (response !== null) {
    productStore.setWishlistProduct(response);
  } else {
    productStore.setWishlistProduct([]);
  }
};

const toggleFavorite = async () => {
  if (isFavorite.value) {
    await removeProductFromWishlist(props.product.pdColor[0].pdCode);
  } else {
    await addProductToWishlist(props.product.pdColor[0].pdCode);
  }

  await fetchProductInWishlist();

  console.log(isFavorite.value);
};

const addProductToWishlist = async (pdCode) => {
  try {
    await addWishlistProducts(pdCode);
    isFavorite.value = true;
  } catch (error) {
    console.log("Add wishlist error");
  }
};

const removeProductFromWishlist = async (pdCode) => {
  try {
    await removeWishlistProduct(pdCode);
    isFavorite.value = false;
  } catch (error) {
    console.log("Remove wishlist error");
  }
};

const selectColor = (colorId) => {
  currentProduct.value = colorId;
  emit("select-color", colorId);
};

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

const beforeLeave = () => {
  // สามารถทำการเตรียมตัวก่อนที่การ์ดจะหายไป
};

// ฟังก์ชันการหายไปของการ์ด
const onLeave = (el, done) => {
  done();
};

const isHovered = ref(false);

const computedFavoriteIcon = computed(() => {
  if (isFavorite.value || isHovered.value) {
    return FavRed;
  }
  return FavGray;
});

watch(
  () => props.checkboxValue,
  (newValue) => {
    isCheckboxChecked.value = newValue;
  }
);

onBeforeMount(() => {
  const wishlistPdCodes = new Set(
    wishlistProduct.value.map((wishlist) => wishlist.pdCode)
  );

  isFavorite.value = props.product.pdColor.some((color) =>
    wishlistPdCodes.has(color.pdCode)
  );
});
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
  width: 1.05vw;
  height: 1.05vw;
  border-radius: 50%;
  padding: 0.1vw;
  border: 0.06vw solid transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-color: #9B9B9B;
}

.color-option:hover {
  border-color: #4338ca;
  outline: 1px solid #4338ca;
}

.color-option.color-selected {
  border-color: #4338ca;
  outline: 1px solid #4338ca;
  box-shadow: 0 0 4px #4338ca; /* เพิ่มเงาสีม่วงอ่อน */
  transition: all 0.2s ease-in-out; /* ทำให้เอฟเฟกต์ดูนุ่มนวล */
}

.color-inner {
  width: 0.92vw;
  height: 0.92vw;
  border-radius: 50%;
  border: 0.06vw solid #4338ca;
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
  appearance: none; /* ลบสไตล์เริ่มต้น */
  border: 1px solid #000000; 
  border-radius: 3px;
  background-color: white; 
  position: relative;

  &:disabled {
    cursor: not-allowed;
  }
}

.checkbox-label input[type="checkbox"]:checked::after {
  content: ''; /* สร้างเนื้อหาใหม่ */
  position: absolute;
  top: 1px;
  left: 6px;
  width: 4px;
  height: 12px;
  border: solid black; /* ขีดเส้นสีขาว */
  border-width: 0 3px 3px 0; /* กำหนดขนาดของขีดเส้นเพื่อให้เหมือนติ๊กถูก */
  transform: rotate(45deg); /* หมุนให้เป็นรูปติ๊กถูก */
}

.checkbox-label input[type="checkbox"]:hover {
  box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.3); /* เพิ่มเงาดำเมื่อ hover */
  transition: 0.3s;
}

.checkbox-label input[type="checkbox"]:disabled {
  cursor: not-allowed;
  opacity: 0.5; /* ทำให้ดูจางเมื่อไม่สามารถคลิกได้ */
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
