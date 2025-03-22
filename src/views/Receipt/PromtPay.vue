<template>
  <div class="order-page">
    <div class="order-logo">
      <img
        src="@/assets/images/img_header_logo.png"
        alt="Logo Image"
        class="logo"
      />
    </div>

    <div class="order-container">
      <!-- Left Column -->
      <div class="order-details">
        <div class="confirmation-header">
          <img
            src="@/assets/images/checkmark-green.svg"
            alt="Checkmark"
            class="confirmation-icon"
          />
          <div class="confirmation-text">
            <p class="confirmation-number">Confirmation #KE1600008502</p>
            <h2 class="thank-you">ขอบคุณ!</h2>
          </div>
        </div>

        <div class="order-status-box">
          <h3 class="status-title">คำสั่งซื้อของคุณได้รับการยืนยันแล้ว</h3>
          <p class="status-pending">
            This order has a pending payment. The balance will be updated when
            payment is received.
          </p>
          <p class="status-message">
            ชำระค่าสินค้าได้ที่<br />
            ชื่อบัญชี : ธนาทร เกริกกวิน<br />
            ช่องทางการชำระเงิน: PromptPay<br />
            รหัสพร้อมเพย์: 085-542-1173<br />
          </p>

          <p class="status-message">
            ภายหลังการชำระเงินแล้ว กรุณาส่งหลักฐานการโอนเงินมาที่ Facebook:
            Lapiz Thailand หรือ Line: @Lapizshoes<br />
            (ท่านสามารถชำระเงินได้ภายใน 3 วัน นับจากวันที่ท่านสั่งซื้อ
            โดยหากพ้นกำหนดการชำระเงินแล้ว
            ทางบริษัทขอสงวนสิทธิ์ในการยกเลิกรายการสั่งซื้อของท่านโดยอัตโนมัติ)
          </p>

          <img
            src="@/assets/images/qr_promtpay.png"
            alt="QR Code PromptPay"
            class="qr-code"
          />
        </div>

        <div class="customer-info-box">
          <h3 class="info-title">ข้อมูลคำสั่งซื้อ</h3>

          <div class="customer-info-content">
            <!-- คอลัมน์ที่ 1 -->
            <div class="info-column">
              <div class="info-section">
                <h4 class="info-subtitle">ข้อมูลติดต่อ</h4>
                <p>naithanathorn46@gmail.com</p>
              </div>

              <div class="info-section">
                <h4 class="info-subtitle">ที่อยู่จัดส่ง</h4>
                <p>ธนาทร เกริกกวิน</p>
                <p>15 อาคารเซ็นจูรี่ ถนนพญาไท แขวงถนนพญาไท</p>
                <p>กรุงเทพมหานคร 10400</p>
                <p>063-481-6644</p>
              </div>

              <div class="info-section">
                <h4 class="info-subtitle">ช่องทางการจัดส่ง</h4>
                <p>Free Shipping</p>
              </div>
            </div>

            <!-- คอลัมน์ที่ 2 -->
            <div class="info-column">
              <div class="info-section">
                <h4 class="info-subtitle">ช่องทางการชำระเงิน</h4>
                <p>PromptPay 4,300.00 THB</p>
              </div>

              <div class="info-section">
                <h4 class="info-subtitle">ที่อยู่สำหรับเรียกเก็บเงิน</h4>
                <p>ธนาทร เกริกกวิน</p>
                <p>15 อาคารเซ็นจูรี่ ถนนพญาไท แขวงถนนพญาไท</p>
                <p>กรุงเทพมหานคร 10400</p>
                <p>063-481-6644</p>
              </div>
            </div>
          </div>
        </div>

        <div class="help-section">
          <div class="help-text">
            <p>ต้องการความช่วยเหลือ?</p>
            <a href="#" class="contact-link">ติดต่อเรา</a>
          </div>
          <button @click="backToHome" class="continue-shopping">
            เลือกซื้อสินค้าต่อ
          </button>
        </div>
      </div>

      <!-- Right Column -->
      <div class="order-summary">
        <div class="product-list">
          <div v-for="item in receiptItems" class="product-item">
            <img
              :src="item.pdImg"
              alt="Navy shoe"
              class="product-image"
            />
            <div class="product-details">
              <p class="product-name">
                {{ item.pdName }}
              </p>
              <p class="product-variant">{{ item.pdColor }} / 9</p>
            </div>
            <p class="product-price">
              {{
                (item.pdPrice * item.quantity).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
              THB
            </p>
          </div>

          <div class="summary-subtotal">
            <div class="subtotal-row">
              <p>ยอดรวม ({{ totalQuantity }} รายการ)</p>
              <p>
                {{
                  totalPrice.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                }}
                THB
              </p>
            </div>
            <div class="subtotal-row">
              <p>การจัดส่ง</p>
              <p>FREE</p>
            </div>
          </div>

          <div class="total-section">
            <div class="total-header">
              <h3>ยอดรวม</h3>
              <p class="tax-note">Including 0.00 THB in taxes</p>
            </div>
            <p class="total-amount">
              {{
                totalPrice.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
              THB
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "@/stores/productStore";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const productStore = useProductStore();

const receiptItems = computed(() => {
  return productStore.basketProduct;
});

const totalPrice = computed(() => {
  if (receiptItems.value !== null) {
    return receiptItems.value.reduce(
      (sum, item) => sum + item.pdPrice * item.quantity,
      0
    );
  } else {
    return 0;
  }
});

const totalQuantity = computed(() => {
  if (receiptItems.value !== null) {
    return receiptItems.value.reduce((count, item) => count + item.quantity, 0);
  }
});

const backToHome = () => {
  productStore.setBasketProduct([]);
  router.push({ name: "homepage" });
};
</script>

<style scoped>
.order-page {
  width: 100%;
  background: linear-gradient(to right, #fff 50%, #f8f8f8 50%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.order-logo {
  display: flex;
  padding: 0.375rem 2.875rem;
  background-color: #ecefbb;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
}

.logo {
  height: 48px;
  width: 108px;
  object-fit: contain;
  margin-left: 80px;
}

/* ปรับให้ container แบ่งเป็น 50:50 */
.order-container {
  display: flex;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 0;
  gap: 0;
}

/* ปรับ content ให้อยู่ตรงกลาง */
.order-details,
.order-summary {
  flex: 1;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
}

/* ให้ order-details อยู่ทางซ้าย */
.order-details {
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

.confirmation-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 2rem;
}

.confirmation-icon {
  width: 2rem;
  height: 2rem;
}

.confirmation-number {
  color: #666;
  margin-bottom: 0.5rem;
}

.thank-you {
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
}

.qr-code {
  display: block;
  margin: 16px auto 0;
  width: 145px;
  height: 145px;
}

/* ขยายกรอบข้อความฝั่งซ้าย 2 กล่อง */
.order-status-box,
.customer-info-box {
  background-color: #fff;
  border: 1px solid #000000;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 850px; /* จำกัดความกว้างสูงสุด */
}

.status-title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.status-pending {
  color: #666;
  margin-bottom: 1rem;
}

.status-message {
  margin-bottom: 1rem;
  line-height: 1.5;
}

.info-title {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
}

/* จัดรูปแบบใหม่สำหรับข้อมูลคำสั่งซื้อแบบ 2 คอลัมน์ */
.customer-info-content {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.info-column {
  flex: 1;
  min-width: 200px; /* กำหนดความกว้างขั้นต่ำ */
}

.info-section {
  margin-bottom: 1.5rem;
}

.info-subtitle {
  color: #000000;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  text-decoration: underline;
}

.help-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0rem;
}

.help-text {
  color: #000000;
  display: flex; /* ให้ข้อความและปุ่มอยู่ในแถวเดียวกัน */
  align-items: center; /* จัดให้แนวเดียวกัน */
  gap: 0.5rem; /* เพิ่มระยะห่างระหว่างข้อความและลิงก์ */
}

.contact-link {
  color: #002fff;
  text-decoration: none;
}

.contact-link:hover {
  color: #002fff;
  text-decoration: underline;
}

.continue-shopping {
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

.continue-shopping:hover {
  background-color: #2042d8; /* ทำให้เข้มขึ้นเมื่อโฮเวอร์ */
}

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

@media (max-width: 1024px) {
  .order-logo {
    padding: 0.5rem 1rem;
  }

  .logo {
    height: 40px;
    width: 90px;
    max-width: 90%;
  }
}

@media (max-width: 768px) {
  .order-logo {
    justify-content: center;
    padding: 0.5rem;
  }

  .logo {
    height: 35px;
    width: 80px;
  }
  .order-container {
    flex-direction: column;
  }

  .order-details,
  .order-summary {
    width: 100%;
    padding: 0 2rem;
    align-items: center;
  }

  .order-details {
    background-color: #fff;
  }

  .order-summary {
    background-color: #f8f8f8;
  }

  .customer-info-content {
    flex-direction: column;
  }
}
</style>
