<template>
  <div class="payment-section">
    <h2 class="section-heading">การชำระเงิน</h2>
    <p class="security-text">All transactions are secure and encrypted.</p>
    
    <!-- Payment Methods -->
    <div class="payment-methods">
      <button 
        v-for="method in paymentMethods" 
        :key="method.value"
        :class="['payment-method', { active: selectedMethod === method.value }]"
        @click="selectedMethod = method.value"
      >
        {{ method.label }}
      </button>
    </div>

    <!-- Card Details Section -->
    <div v-if="selectedMethod === 'card'" class="card-details">
      <div class="card-info">
        <p class="card-info-heading">ข้อมูลบัตร</p>
        <div class="card-logos">
          <img src="@/assets/images/img_visa.png" alt="Visa" />
          <img src="@/assets/images/img_mastercard.png" alt="Mastercard" />
          <img src="@/assets/images/img_jcb.png" alt="JCB" />
        </div>
      </div>

      <div class="card-form">
        <div class="input-row">
          <input 
            type="text" 
            class="form-input" 
            placeholder="ชื่อเจ้าของบัตร"
            v-model="cardDetails.name"
          />
          <input 
            type="text" 
            class="form-input" 
            placeholder="หมายเลขบัตร"
            v-model="cardDetails.number"
          />
        </div>
        <div class="input-row">
          <input 
            type="text" 
            class="form-input" 
            placeholder="วันหมดอายุ (ดด/ปป)"
            v-model="cardDetails.expiry"
          />
          <div class="cvv-input">
            <input 
              type="text" 
              class="form-input" 
              placeholder="CVV"
              v-model="cardDetails.cvv"
            />
            <!-- <button class="cvv-info" title="CVV Information">?</button> -->
            <img src="@/assets/images/cvv_info.svg" alt="CVV Information" class="cvv-icon" />
          </div>
        </div>
      </div>
    </div>

    <!-- PromptPay Section -->
    <div v-if="selectedMethod === 'promptpay'" class="promptpay-section">
      <p class="section-subheading">พร้อมเพย์</p>
      <button class="promptpay-logo" @click="handlePromptPayClick">
        <img src="@/assets/images/payment-promptpay.png" alt="PromptPay" />
      </button>
    </div>

    <!-- Cash on Delivery Section -->
    <div v-if="selectedMethod === 'cod'" class="cod-section">
      <p class="section-subheading">เก็บเงินปลายทาง</p>
      <button class="cod-logo" @click="handleCodClick">
        <img src="@/assets/images/payment-cod.png" alt="Cash on Delivery" />
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PaymentSection',
    data() {
      return {
        selectedMethod: 'card',
        cardDetails: {
          name: '',
          number: '',
          expiry: '',
          cvv: ''
        },
        paymentMethods: [
          { value: 'card', label: 'Credit / Debit Card' },
          { value: 'promptpay', label: 'PromptPay' },
          { value: 'cod', label: 'Cash on Delivery' }
        ]
      }
    },
    methods: {
      selectPaymentMethod(method) {
        this.selectedMethod = method;
        this.$emit('update-payment-method', method); // ส่งค่าไป Transaction.vue
      }
    }
  }
</script>

<style scoped>
.payment-section {
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 8px;
  /* max-width: 700px; กำหนดความกว้างให้เป็น 631px */
  background-color: white;
  width: 609px; /* ปรับให้กว้างเต็มฟอร์ม */
}

.section-heading {
  font-weight: bold;
  font-size: 18px;
}

.security-text {
  font-size: 14px;
  margin-top: 0.5rem;
  color: #666;
}

.payment-methods {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.payment-method {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  background-color: white;
}

.payment-method.active {
  border-color: red;
  color: red;
}

.promptpay-section,
.cod-section {
  margin-top: 20px;
}

.promptpay-logo,
.cod-logo {
  width: 132px;  /* กำหนดความกว้าง */
  height: 61px;  /* กำหนดความสูง */
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  transform: scale(1); /* ปรับให้เนื้อหายังคงขนาดสมดุล */
}
.promptpay-logo:hover,
.cod-logo:hover {
  border: 2px solid #dc4d4d;
}

.promptpay-logo img {
  width: 128px;
  height: 58px;
  object-fit: contain; /* ป้องกันภาพผิดสัดส่วน */
  border-radius: 8px;
}

.cod-logo img {
  width: 128px;
  height: 57px;
  object-fit: contain; /* ป้องกันภาพผิดสัดส่วน */
  border-radius: 8px;
}

/* Card Details */
.card-details {
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.card-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-info-heading {
  font-weight: 500;
}

.card-logos {
  display: flex;
  gap: 10px;
}

.card-logos img {
  height: 20px;
}

.card-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* แบ่งเป็น 2 คอลัมน์ขนาดเท่ากัน */
  gap: 15px; /* ระยะห่างระหว่างกล่อง */
}

.input-row {
  display: contents; /* ใช้ contents เพื่อให้ child elements คงการจัดวางของ grid */
  gap: 15px;
}

.form-input {
  width: 244px; /* ปรับให้ input กินพื้นที่เต็มคอลัมน์ */
  height: 40px;
  padding: 0 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
}

.cvv-input {
  width: 100%; /* ทำให้ CVV input ปรับขนาดตามพื้นที่ที่เหลือ */
  position: relative;
}

/* .cvv-info {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-weight: bold;
} */

.cvv-icon {
  width: 16px; /* กำหนดขนาดรูป */
  height: auto;
  position: absolute;
  top: 13px;
  right: 10px; /* จัดตำแหน่งรูปให้อยู่ด้านขวา */
  cursor: pointer;
}

@media (max-width: 768px) {
  .input-row {
    flex-direction: column;
  }
  
  .cvv-input {
    width: 100%;
  }
}
</style>
