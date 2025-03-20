<template>
  <div class="transaction-container">
    <div class="order-container">
      <!-- Left Section -->
      <div class="form-section">
        <!-- Contact Information -->
        <div class="contact-section">
          <div class="contact-header">
            <h1 class="section-heading">ข้อมูลติดต่อ</h1>
          </div>
          <div class="input-group">
            <input
              type="text"
              class="form-input full-width"
              placeholder="อีเมล"
            />
            <label class="checkbox-wrapper">
              <input type="checkbox" />
              <span>ส่งข่าวสาร และข้อเสนอพิเศษถึงฉันทางอีเมล</span>
            </label>
          </div>
        </div>

        <!-- Shipping Address -->
        <div class="shipping-section">
          <h2 class="section-heading">ที่อยู่จัดส่ง</h2>
          <div class="address-form">
            <div class="name-row">
              <input type="text" class="form-input" placeholder="ชื่อจริง" />
              <input type="text" class="form-input" placeholder="นามสกุล" />
            </div>
            <input
              type="text"
              class="form-input full-width"
              placeholder="ที่อยู่"
            />
            <div class="address-details">
              <input type="text" class="form-input" placeholder="เขต/แขวง" />
              <input type="text" class="form-input" placeholder="จังหวัด" />
              <input
                type="text"
                class="form-input"
                placeholder="รหัสไปรษณีย์"
              />
            </div>
            <input
              type="text"
              class="form-input full-width"
              placeholder="โทรศัพท์"
            />
            <div class="checkbox-group">
              <label class="checkbox-wrapper">
                <input type="checkbox" checked />
                <span>บันทึกข้อมูลนี้สำหรับครั้งถัดไป</span>
              </label>
              <label class="checkbox-wrapper">
                <input type="checkbox" checked />
                <span
                  >ที่อยู่เรียกเก็บเงิน
                  และที่อยู่จัดส่งของฉันเป็นที่อยู่เดียวกัน</span
                >
              </label>
            </div>
          </div>
        </div>

        <!-- Shipping Method -->
        <div class="shipping-method">
          <h2 class="section-heading">วิธีจัดส่ง</h2>
          <div class="shipping-notice">
            กรอกที่อยู่จัดส่งของคุณเพื่อดูวิธีการจัดส่งที่มีให้เลือก
          </div>
        </div>

        <!-- Payment Section -->
        <payment-section
          @update-payment-method="paymentMethod = $event"
        ></payment-section>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <a href="#" class="back-link">
            <img
              src="@/assets/images/icon-back.svg"
              alt="BackIcon"
              class="back-icon"
            />
            <span class="back-icon">กลับไปที่ตะกร้าสินค้า</span>
          </a>
          <button class="submit-button">สั่งซื้อเสร็จสมบูรณ์</button>
        </div>

        <!-- Footer -->
        <div class="footer">
          <div class="footer-line"></div>
          <!-- เส้นขีดด้านบน -->
          <div class="footer-links">
            <a href="#">นโยบายการคืนสินค้า</a>
            <a href="#">นโยบายข้อมูลส่วนบุคคล</a>
            <a href="#">ข้อตกลง และเงื่อนไข</a>
            <a href="#">ข้อมูลติดต่อ</a>
          </div>
        </div>
      </div>

      <!-- Right Section -->
      <div class="order-summary">
        <!-- Product List -->
        <div class="product-list">
          <div v-for="item in cartItems" :key="item.pdId" class="product-item">
            <img src="/src/assets/shoes/shoe1.png" :alt="item.pdName" class="product-image" />
            <div class="product-details">
              <p class="product-name">{{ item.pdName }}</p>
              <p class="product-variant">{{ item.pdColor }} / 9</p>
            </div>
            <p class="product-price">{{ item.pdPrice.toFixed(2) }} THB</p>
          </div>

          <!-- Discount Code -->
          <div class="discount-section">
            <input
              type="text"
              class="form-input full-width"
              placeholder="โค้ดส่วนลด"
            />
            <button class="apply-button">นำไปใช้</button>
          </div>

          <!-- Summary -->
          <div class="summary-subtotal">
            <div class="subtotal-row">
              <p>ยอดรวม ({{ cartItems.length }} รายการ)</p>
              <p>{{ totalPrice }} THB</p>
            </div>
            <div class="subtotal-row">
              <p>การจัดส่ง</p>
              <p>FREE</p>
            </div>
          </div>

          <!-- Total -->
          <div class="total-section">
            <div class="total-header">
              <h3>ยอดรวม</h3>
              <p class="tax-note">Including 0.00 THB in taxes</p>
            </div>
            <p class="total-amount">{{ totalPrice }} THB</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PaymentSection from "@/components/PaymentSection.vue";
import { buyBasketProducts } from "@/api/productService";
import { useProductStore } from "@/stores/productStore";

const productStore = useProductStore();

const cartItems = computed(() => {
  return productStore.basketProduct;
});

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

const paymentMethod = ref("card");

const buyProduct = async () => {
  await buyBasketProducts();
  fetchProductInBasket();
};
</script>

<style scoped>
.transaction-container {
  width: 100%;
  background: linear-gradient(to right, #fff 50%, #f8f8f8 50%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ปรับให้ container แบ่งเป็น 50:50 */
.order-container {
  display: flex;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 0;
  gap: 0;
}

/* Form Section */
.form-section {
  flex: 1;
  max-width: 700px;
  padding: 0 2rem;
}

.section-heading {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}

.form-input {
  width: 169px;
  height: 42px; /* เพิ่มความสูงให้สมดุล */
  padding: 0 15px;
  border: 1px solid #e0e0e0;
  border-radius: 6px; /* เพิ่มความโค้งมน */
  font-size: 14px;
  transition: border-color 0.3s ease-in-out;
}

/* Contact Section */
.contact-section {
  margin-bottom: 30px;
}

/* จัดตำแหน่งปุ่มเข้าสู่ระบบไปทางขวา */
.contact-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  font-size: 14px;
}

.input-group {
  width: 619px;
}

/* Address Form */
.shipping-section {
  margin-bottom: 30px;
}

.address-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 618px;
}

/* ให้ช่องกรอกข้อมูลเรียงต่อกันในแถวเดียว */
.name-row,
.address-details {
  width: 649px;
  display: flex;
  gap: 15px;
}

/* ให้ทุกช่องภายในแถวมีขนาดเท่ากัน */
.name-row input,
.address-details input {
  flex: 1;
}

/* ปรับช่อง input ขนาดเต็มสำหรับที่อยู่ และโทรศัพท์ */
.full-width {
  width: 100%;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 5px;
}

/* Shipping Method */
.shipping-method {
  margin-bottom: 30px;
}

.shipping-notice {
  width: 609px;
  padding: 20px;
  background-color: #fff4ca;
  /* border: 2px solid #000000; */
  border-radius: 8px;
  font-size: 14px;
  color: #858585;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #002fff;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

.submit-button {
  position: relative;
  background-color: #375bfe; /* สีน้ำเงินสด */
  color: white; /* ตัวอักษรสีขาว */
  padding: 0.75rem 1.5rem; /* ขยายขนาดปุ่ม */
  font-size: 1.2rem; /* ขนาดตัวอักษรใหญ่ขึ้น */
  font-weight: bold; /* ตัวหนา */
  border: 2px solid black; /* เส้นขอบสีดำ */
  border-radius: 8px; /* มุมโค้งมน */
  cursor: pointer; /* เปลี่ยนเมาส์เป็น pointer เมื่อ hover */
  transition: all 0.2s ease-in-out; /* เพิ่มเอฟเฟกต์นุ่มนวลเมื่อโฮเวอร์ */
  left: 3.1rem;
}

.submit-button:hover {
  background-color: #2042d8; /* ทำให้เข้มขึ้นเมื่อโฮเวอร์ */
}

/* Order Summary */

/* ปรับ content ให้อยู่ตรงกลาง */
.form-section,
.order-summary {
  flex: 1;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
}

/* ให้ order-details อยู่ทางซ้าย */
.form-section {
  margin-top: 40px;
  margin-left: auto;
  margin-right: 6rem;
}

/* ให้ order-summary อยู่ทางขวา */
.order-summary {
  position: relative;
  margin-top: 40px;
  margin-left: 0;
  margin-right: auto;
  left: -3.1rem;
}

/* Product List */
.product-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
}

/* เพิ่มกรอบให้รูปสินค้า */
.product-image {
  width: 105px;
  height: 90px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #7f7f7f; /* เพิ่มเส้นขอบ */
  padding: 3px; /* เพิ่มระยะห่างระหว่างรูปกับขอบ */
  background-color: #fff; /* กำหนดพื้นหลังสีขาว */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* เพิ่มเงา */
}

.product-details {
  flex: 1;
}

.product-name {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.product-variant {
  color: #666;
}

.product-price {
  font-weight: 500;
}

/* Discount Section */
.discount-section {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.apply-button {
  padding: 0 20px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap; /* ป้องกันข้อความขึ้นบรรทัดใหม่ */
  min-width: 100px; /* ปรับความกว้างขั้นต่ำ */
}

.apply-button:hover {
  border: solid 2px;
  border-color: #000000;
  background-color: #535252;
}

/* Summary Details */
.summary-subtotal {
  border-top: 1px solid #e0e0e0;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
}

.subtotal-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

/* Total */
.total-section {
  border-top: 1px solid #e0e0e0;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.total-header h3 {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.tax-note {
  color: #666;
  font-size: 0.875rem;
}

.total-amount {
  font-size: 1.5rem;
  font-weight: bold;
}

/* Footer */
.footer {
  margin-top: 2rem;
}

/* เพิ่มเส้นขีดด้านบน */
.footer-line {
  width: 649px;
  height: 2px;
  background-color: black;
  margin-bottom: 10px;
}

/* จัดเรียงเมนูให้อยู่ตรงกลาง */
.footer-links {
  position: relative;
  display: flex;
  gap: 50px; /* กำหนดระยะห่าง */
  justify-content: center;
  font-size: 14px;
  left: 1rem;
}

/* ขีดเส้นใต้เมนู */
.footer-links a {
  color: black;
  text-decoration: underline;
  font-weight: 500;
}

.footer-links a:hover {
  color: #002fff;
}

/* Responsive Design */
</style>
