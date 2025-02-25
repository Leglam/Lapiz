<template>
  <div class="cart-container">
    <h1 class="cart-title">ตะกร้าสินค้า</h1>

    <div class="cart-header">
      <div class="cart-header-item product-col">สินค้า</div>
      <div class="cart-header-item quantity-col">จำนวน</div>
      <div class="cart-header-item total-col">ยอดรวม</div>
    </div>

    <div class="cart-items">
      <transition-group name="fade" tag="div" class="cart-items">
        <div
          v-for="(item, index) in cartItems"
          :key="item.pdId"
          class="cart-item"
        >
          <div class="product-info">
            <div class="product-image">
              <img :src="Shoes1" :alt="item.pdName" />
            </div>
            <div class="product-details">
              <div class="product-name">{{ item.pdName }}</div>
              <div class="product-variant">{{ item.pdColor }} / 9</div>
              <div class="product-price">{{ item.pdPrice.toFixed(2) }} THB</div>
            </div>
          </div>

          <div class="quantity-control">
            <div class="quantity-wrapper">
              <button @click="decreaseQuantity(item)" class="quantity-btn-left">
                −
              </button>
              <span class="quantity-display">{{ item.quantity }}</span>
              <button
                @click="increaseQuantity(item)"
                class="quantity-btn-right"
              >
                +
              </button>
            </div>
            <div class="quantity-label" @click="removeItem(item)">ลบ</div>
          </div>

          <div class="item-total">
            {{ (item.pdPrice * item.quantity).toFixed(2) }} THB
          </div>
        </div>
      </transition-group>
    </div>

    <div class="cart-summary">
      <div class="total-section">
        <div class="total-label">ยอดรวม:</div>
        <div class="total-amount">{{ totalPrice.toFixed(2) }} THB</div>
      </div>
      <div class="shipping-note">
        Tax included and shipping calculated at checkout
      </div>
      <button class="checkout-button">ชำระเงิน</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Shoes1 from "@/assets/shoes/shoe1.png";
import {
  getBasketProducts,
  removeBasketProduct,
  updateBasketProducts,
} from "@/api/productService";
import { useProductStore } from "@/stores/productStore";

const cartItems = ref([]);
const productStore = useProductStore();

const fetchProductInBasket = async () => {
  const response = await getBasketProducts();
  cartItems.value = response;
  console.log(cartItems.value);

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

// const removeItem = (item) => {
//   cartItems.value = cartItems.value.filter(
//     (cartItem) => cartItem.pdCode !== item.pdCode
//   );
// };

const removeItem = async (item) => {
  const response = await removeBasketProduct(item.pdCode);
  console.log(response);
  fetchProductInBasket();
};

const totalPrice = computed(() => {
  if (cartItems.value !== null) {
    return cartItems.value.reduce(
      (sum, item) => sum + item.pdPrice * item.quantity,
      0
    );
  } else {
    return 0;
  }
});

const increaseQuantity = async (item) => {
  await updateBasketProducts(item.pdCode, 1);
  fetchProductInBasket();
};

const decreaseQuantity = async (item) => {
  if (item.quantity > 1) {
    await updateBasketProducts(item.pdCode, -1);
    fetchProductInBasket();
  } else {
    removeItem(item);
  }
};

onMounted(() => {
  fetchProductInBasket();
});
</script>

<style scoped>
@font-face {
  font-family: "Mitr";
  src: url("@/assets/fonts/Mitr-Regular.ttf") format("truetype");
  /* src: url('@/assets/fonts/Athiti-Bold.ttf') format('truetype'); */
  font-weight: normal;
  font-style: normal;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
} /*animate*/

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-80px);
} /*animate*/

.cart-header-item.quantity-col {
  margin: 0 40px;
}

.cart-header-item.total-col {
  display: flex;
  justify-content: flex-end;
  text-align: right; /* เผื่อใช้เป็น fallback */
  margin: 0 15px;
}

.cart-header-item.product-col {
  margin: 0 15px;
}

.cart-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Mitr";
  margin-bottom: 71px;
  opacity: 0;
  transform: translateY(-5%); /* เลื่อนออกจากซ้าย */
  animation: slideIn 1s ease-out forwards;
}

.cart-title {
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
}

.cart-header {
  display: grid;
  grid-template-columns: 1fr 150px 150px;
  border-bottom: 3px solid #000;
  padding: 15px 0;
  font-weight: 700;
}

.cart-items {
  margin-top: 0px; /*ระยะห่างหัวรายการสินค้าในตะกร้า*/
}

.cart-item {
  display: grid;
  grid-template-columns: 1fr 150px 150px;
  padding: 38px 14px;
  border-bottom: 3px solid #000;
  align-items: center;
  background-color: #f8f8f8;
}

.product-info {
  display: flex;
  gap: 20px;
}

.product-image {
  width: 150px;
  height: 150px;
  border: 1px solid #000;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.product-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.product-name {
  font-size: 16px;
  font-weight: 500;
}

.product-variant {
  color: #666;
  font-size: 14px;
}

.product-price {
  font-weight: 500;
}

.quantity-control {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.quantity-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #000;
  padding: 5px;
}

.quantity-btn-right {
  background: none;
  border: none;
  padding: 0 8px;
  font-size: 18px;
  cursor: pointer;
}

.quantity-btn-right:hover {
  background: none;
  border: none;
  padding: 0 8px;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
}

.quantity-btn-right:active {
  transform: scale(0.95); /* ทำให้ปุ่มย่อขนาดลงเมื่อถูกกด */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* ลดความลึกของเงาเมื่อกด */
}

.quantity-btn-left {
  background: none;
  border: none;
  padding: 0 8px;
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.2s ease;
}

.quantity-btn-left:hover {
  background: none;
  border: none;
  padding: 0 8px;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
}

.quantity-btn-left:active {
  transform: scale(0.95); /* ทำให้ปุ่มย่อขนาดลงเมื่อถูกกด */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* ลดความลึกของเงาเมื่อกด */
}

.quantity-display {
  width: 30px;
  text-align: center;
  font-weight: 500;
}

.quantity-label {
  color: #000;
  cursor: pointer;
  text-decoration: underline;
}

.quantity-label:hover {
  color: #b72121;
  cursor: pointer;
  text-decoration: underline;
}

.item-total {
  font-weight: 500;
  text-align: right;
}

.cart-summary {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 15px;
}

.total-section {
  display: flex;
  gap: 10px;
  font-size: 24px;
  font-weight: 700;
}

.shipping-note {
  color: #666;
  font-size: 14px;
}

.checkout-button {
  background-color: #375bfe;
  color: white;
  border: 1px solid rgb(0, 0, 0);
  padding: 12px 60px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 4px;
}

.checkout-button:hover {
  background-color: #002fff;
  color: white;
  border: 1px solid rgb(0, 0, 0);
  padding: 12px 60px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.5s ease, color 0.5s ease, padding 0.5s ease;
}

@media (max-width: 768px) {
  .cart-container {
    padding: 10px;
  }

  .cart-header,
  .cart-item {
    grid-template-columns: 1fr 100px 100px;
  }

  .product-info {
    flex-direction: column;
    gap: 10px;
  }

  .product-image {
    width: 100px;
    height: 100px;
  }
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0); /* เลื่อนมาที่ตำแหน่งปกติ */
  }
}
</style>
