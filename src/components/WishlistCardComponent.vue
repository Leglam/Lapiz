<template>
  <transition name="fade" @before-leave="beforeLeave" @leave="onLeave">
    <div v-if="isVisible" class="product-card">
      <div class="product-header">
        <button
          class="remove-button"
          @click="removeFromWishlist"
          :class="{ 'remove-button-animate': isRemoving }"
        >
          ×
        </button>
      </div>
      <div @click="selectProduct" class="product-image-container">
        <img :src="getProductImage" :alt="product.name" class="product-image" />
      </div>
      <div class="product-info">
        <h2 @click="selectProduct" class="product-title">
          {{ product.pdName }}
        </h2>
        <div class="product-details">
          <span class="product-price">{{ (product.pdPrice).toLocaleString("en-US") }} THB</span>
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
      <button @click="addProductToBasket()" class="add-to-cart-button">
        <span class="add-to-cart-text">เพิ่มเข้าตะกร้าสินค้า</span>
      </button>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from "vue";
import shoe1 from "@/assets/shoes/shoe1.png";
import { updateBasketProducts, getBasketProducts } from "@/api/productService";
import { useProductStore } from "@/stores/productStore";
import { useRouter } from "vue-router";

const props = defineProps({
  product: Object,
  pdImgNumber: String,
});

const router = useRouter();

const productStore = useProductStore();
const currentProduct = ref(null);

const emit = defineEmits(["select-color", "remove-product"]);

const isVisible = ref(true);
const isRemoving = ref(false);

const getProductImage = computed(() => {
  if (!props.product?.pdColor) return shoe1;

  const matchedColor = props.product.pdColor.find(
    (color) => color.pdCode === props.pdImgNumber
  );

  return matchedColor?.pdImg || props.product.pdColor[0].pdImg;
});

const selectColor = (colorId) => {
  currentProduct.value = colorId;
  emit("select-color", colorId);
};

const removeFromWishlist = () => {
  isRemoving.value = true;
  setTimeout(() => {
    if (props.product.pdColor.length <= 1) {
      isVisible.value = false;
    } else isRemoving.value = false;

    emit("remove-product", props.product.pdColor[0].pdCode);
  }, 600); // รอจนกว่า animation จะเสร็จสิ้น (600ms)
};

function beforeLeave() {
  // สามารถทำอะไรเพิ่มเติมก่อนที่ card จะหายไปได้
}

function onLeave(el, done) {
  // เมื่อ card หายไปแล้ว จะทำการลบหรือทำงานเพิ่มเติม
  done();
}

const fetchProductInBasket = async () => {
  const response = await getBasketProducts();

  if (response !== null) {
    const totalQuantity = response.reduce(
      (sum, product) => sum + product.quantity,
      0
    );
    productStore.setBasketProductCount(totalQuantity);
  } else {
    productStore.setBasketProductCount(0);
  }
};

const increaseQuantity = async (pdCode) => {
  await updateBasketProducts(pdCode, 1);
  await fetchProductInBasket();
};

const selectProduct = () => {
  router.push({
    name: "product-detail",
    params: { id: props.product.pdColor[0].pdCode },
  });
};

const addProductToBasket = async () => {
  if (currentProduct.value) {
    increaseQuantity(currentProduct.value);
    console.log("Add product to basket", currentProduct.value);
    removeFromWishlist();
  } else console.error("Please select color first");
};
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
  font-size: 0.9vw;
  margin: 0 0 0.83vw 0;
  color: var(--text-title-shoes-color);
  text-decoration: none;
  line-height: 1.4;
  text-align: left;
  height: 2.7vw; /* กำหนดความสูงคงที่ประมาณ 2 บรรทัด */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* จำกัดแค่ 2 บรรทัด */
  line-clamp: 2; /* Standard property for compatibility */
  -webkit-box-orient: vertical;
  text-overflow: ellipsis; /* เพิ่มจุดไข่ปลา ... ถ้าข้อความยาวเกิน */
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
