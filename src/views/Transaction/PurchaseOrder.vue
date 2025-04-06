<template>
  <div class="order-page">
    <div class="order-container">
      <!-- Header Section -->
      <div class="order-header">
        <div class="back-button">
          <img
            src="@/assets/images/icon-back.svg"
            alt="BackIcon"
            class="back-icon"
          />
          <span class="back-link" @click="pushPage('my-account')">ย้อนกลับ</span>
        </div>
        <h1 class="order-title">คำสั่งซื้อ #KE1600008502</h1>
        <p class="order-date">Order placed on 28 สิงหาคม 2024</p>
      </div>

      <!-- Order Items Table -->
      <table class="order-table">
        <thead>
          <tr>
            <th class="product-header">สินค้า</th>
            <th class="quantity-header">จำนวน</th>
            <th class="total-header">ยอดรวม</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in orderItems" :key="index">
            <td class="product-cell">
              <div class="product-info">
                <img :src="item.image" :alt="item.name" class="product-image" />
                <div class="product-details">
                  <p class="product-name">{{ item.name }}</p>
                  <p class="product-variant">{{ item.variant }}</p>
                </div>
              </div>
            </td>
            <td></td>
            <td class="price-cell">{{ item.price }} THB</td>
          </tr>
        </tbody>
      </table>

      <!-- Order Summary -->
      <div class="order-summary">
        <div class="flex-1"></div>
        <div class="flex-1">
          <div class="summary-row">
            <span>ยอดรวม ({{ orderItems.length }} รายการ)</span>
            <span>{{ subtotal }} THB</span>
          </div>
          <div class="summary-row">
            <span>การจัดส่ง</span>
            <span>FREE</span>
          </div>
          <div class="total-section">
            <div class="total-row">
              <span class="total-label">ยอดรวม</span>
              <span class="total-amount">{{ total }} THB</span>
            </div>
            <p class="tax-info">Including {{ tax }} THB in taxes</p>
          </div>
        </div>
      </div>

      <!-- Order Information -->
      <div class="order-info-section">
        <h2 class="section-title">ข้อมูลคำสั่งซื้อ</h2>
        <div class="info-grid">
          <div class="info-column">
            <div class="info-group">
              <h3 class="info-label">ข้อมูลติดต่อ</h3>
              <p class="info-value">{{ contactEmail }}</p>
            </div>
            <div class="info-group">
              <h3 class="info-label">ช่องทางการชำระเงิน</h3>
              <p class="info-value">{{ paymentMethod }}</p>
            </div>
          </div>

          <div class="info-column">
            <h3 class="info-label">ที่อยู่จัดส่ง</h3>
            <p class="info-value">
              {{ shippingAddress.name }}<br />
              {{ shippingAddress.address }}<br />
              {{ shippingAddress.phone }}
            </p>
          </div>

          <div class="info-column">
            <h3 class="info-label">ที่อยู่สำหรับเรียกเก็บเงิน</h3>
            <p class="info-value">
              {{ billingAddress.name }}<br />
              {{ billingAddress.address }}<br />
              {{ billingAddress.phone }}
            </p>
          </div>

          <div class="info-column">
            <h3 class="info-label">ช่องทางการจัดส่ง</h3>
            <p class="info-value">{{ shippingMethod }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Shoes1 from "@/assets/shoes/shoe1.png";
import Shoes2 from "@/assets/shoes/shoe1.png";
import { useRouter } from "vue-router";

const router = useRouter();

const pushPage = (pageName) => {
  router.push({ name: pageName });
};

const orderItems = ref([
  {
    name: "รองเท้าผ้าใบ รุ่น Champion Toe Cap Canvas",
    variant: "Navy / 9",
    price: "2,250.00",
    image: Shoes1,
  },
  {
    name: "รองเท้าผ้าใบ รุ่น Champion Organic Cotton",
    variant: "Light Pink / 9",
    price: "2,050.00",
    image: Shoes2,
  },
  {
    name: "รองเท้าผ้าใบ รุ่น Champion Organic Cotton",
    variant: "Light Pink / 9",
    price: "2,050.00",
    image: Shoes2,
  },
]);

const subtotal = ref("4,300.00");
const tax = ref("0.00");
const total = ref("4,300.00");
const contactEmail = ref("naithanathorn46@gmail.com");
const paymentMethod = ref("Credit / Debit Card");
const shippingMethod = ref("Free Shipping");

const shippingAddress = ref({
  name: "ธนาทร เกริกกวิน",
  address: "15 อาคารเซ็นจูรี่ ถนนพญาไท แขวงถนนพญาไท กรุงเทพมหานคร 10400",
  phone: "063-481-6644",
});

const billingAddress = ref({
  name: "ธนาทร เกริกกวิน",
  address: "15 อาคารเซ็นจูรี่ ถนนพญาไท แขวงถนนพญาไท กรุงเทพมหานคร 10400",
  phone: "063-481-6644",
});
</script>

<style scoped>
@import "@/styles/back-link.scss";

@font-face {
  font-family: "Mitr";
  src: url("@/assets/fonts/Mitr-Regular.ttf") format("truetype");
  /* src: url('@/assets/fonts/Athiti-Bold.ttf') format('truetype'); */
  font-weight: normal;
  font-style: normal;
}

.quantity-header {
  text-align: center !important;
}

th.total-header {
  display: flex;
  justify-content: flex-end;
  text-align: right; /* เผื่อใช้เป็น fallback */
}

.order-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: "Mitr";
  padding-top: 80px;

}

.order-container {
  background: white;
  padding: 10px;
}

/* Header Styles */
.order-header {
  margin-bottom: 40px;
}

.back-button {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  color: #333;
  cursor: pointer;
  margin-bottom: 16px;

}

.back-arrow {
  font-size: 24px;
}

.order-title {
  font-size: 24px;
  margin: 0;
  font-weight: 600;
}

.order-date {
  color: #666;
  margin: 8px 0 0;
  font-size: 16px;
}

/* Table Styles */
.order-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
}

.order-table th {
  text-align: left;
  padding: 12px 0;
  font-weight: 600;
  font-size: 16px;
}

.product-cell {
  padding: 10px 0;
  width: 65%; /* กำหนดความกว้างของ cell ให้รองรับ product info */
}

.product-info {
  display: flex;
  gap: 20px;
  align-items: flex-start; /* แก้จาก center เป็น flex-start */
}

.product-image {
  width: 102px; /* กำหนดขนาดที่แน่นอน */
  height: 90px;
  padding: 0px;
  /* border: 1px solid #eee; */
  background: white;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* ใช้ contain แทน cover เพื่อให้เห็นรูปเต็ม */
}

.product-details {
  flex: 1;
  padding-top: 10px; /* เพิ่ม padding-top เพื่อจัดตำแหน่งข้อความ */
}

.price-cell {
  text-align: right;
  font-weight: 500;
}

/* Summary Styles */
.order-summary {
  border-top: 1px solid #7d7d7d;
  padding-top: 25px;
  margin-bottom: 25px;
  display: flex;
}

.flex-1 {
  flex: 1;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 16px;
}

.total-section {
  margin-top: 20px;
  text-align: right;
}

.total-row {
  display: flex;
  justify-content: space-between;

  gap: 40px;
  font-size: 20px;
  font-weight: 600;
}

.tax-info {
  color: #666;
  margin: 0;
  font-size: 14px;
}

/* Order Info Styles */
.order-info-section {
  border-top: 1px solid #7d7d7d;
  padding-top: 30px;
}

.section-title {
  font-size: 20px;
  margin: 0 0 20px;
}

.info-grid {
  display: grid;
  grid-template-columns: auto 1fr 1fr auto;
  gap: 70px;
} /*ทำให้ item ด้านซ้ายและขวาชิดขอบโดยธรรมชาติ ส่วนตรงกลางเฉลี่ยอัตโนมัติ*/

.info-column {
  font-size: 14px;
}

.info-label {
  font-size: 14px;
  color: #333;
  margin: 0 0 8px;
  text-decoration: underline;
  font-weight: normal;
}

.info-value {
  margin: 0;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .info-grid {
    grid-template-columns: 1fr;
  }

  .total-row {
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
  }
}
</style>
