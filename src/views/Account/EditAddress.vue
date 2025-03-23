<template>
  <div class="edit-address-page">
    <div class="back-navigation">
      <img src='@/assets/images/icon-back.svg' alt="BackIcon" class="back-icon" />
      <span @click="pushPage('my-account')" class="back-link">ย้อนกลับ</span>
    </div>
    
    <h1 class="page-title">แก้ไขที่อยู่</h1>

    <div class="edit-info-separator"></div>

    <div class="address-container">
      <div class="shipping-address">
        <h2 class="address-subtitle">ที่อยู่จัดส่ง</h2>
        <textarea 
          v-model="shippingAddress.detail"
          class="address-textarea" 
          placeholder="15 อาคารเซ็นจูรี่ ถนนพญาไท"
        ></textarea>
        
        <div class="address-details">
          <div class="address-field">
            <label>เขต/แขวง</label>
            <input 
              v-model="shippingAddress.district"
              type="text" 
              placeholder="แขวงถนนพญาไท"
            />
          </div>
          <div class="address-field">
            <label>จังหวัด</label>
            <input 
              v-model="shippingAddress.province"
              type="text" 
              placeholder="กรุงเทพมหานคร"
            />
          </div>
          <div class="address-field">
            <label>รหัสไปรษณีย์</label>
            <input 
              v-model="shippingAddress.postalCode"
              type="text" 
              placeholder="10400"
            />
          </div>
        </div>
      </div>

      <div class="edit-info-separator vertical"></div>

      <div class="billing-address">
        <h2 class="address-subtitle">ที่อยู่สำหรับเรียกเก็บเงิน</h2>
        <textarea 
          v-model="billingAddress.detail"
          class="address-textarea" 
          placeholder="15 อาคารเซ็นจูรี่ ถนนพญาไท"
        ></textarea>
        
        <div class="address-details">
          <div class="address-field">
            <label>เขต/แขวง</label>
            <input 
              v-model="billingAddress.district"
              type="text" 
              placeholder="แขวงถนนพญาไท"
            />
          </div>
          <div class="address-field">
            <label>จังหวัด</label>
            <input 
              v-model="billingAddress.province"
              type="text" 
              placeholder="กรุงเทพมหานคร"
            />
          </div>
          <div class="address-field">
            <label>รหัสไปรษณีย์</label>
            <input 
              v-model="billingAddress.postalCode"
              type="text" 
              placeholder="10400"
            />
          </div>
        </div>
      </div>
    </div>

    <button 
      class="save-button"
      @click="saveAddresses"
    >
      บันทึก
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter();

const pushPage = (pageName) => {
  router.push({ name: pageName });
};

const shippingAddress = ref({
  detail: '',
  district: '',
  province: '',
  postalCode: ''
})

const billingAddress = ref({
  detail: '',
  district: '',
  province: '',
  postalCode: ''
})

const saveAddresses = () => {
  console.log('Shipping Address:', shippingAddress.value)
  console.log('Billing Address:', billingAddress.value)
}
</script>

<style scoped>
@import "@/styles/back-link.scss";
@import "@/styles/save-button.scss";

.edit-address-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto; 
  margin-top: 10px;
  padding: 6rem 6rem 6rem 6rem;
  
}

.back-navigation {
  display: flex;
  align-items: center;
  gap: 10px;
}

.back-icon {
  font-weight: bold;
  font-size: 20px;
}

.page-title {
  font-size: 24px;
}

.address-container {
  display: flex;
  flex-direction: row;
  gap: 2rem;
}

.shipping-address,
.billing-address {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.address-subtitle {
  font-size: 20px;
  font-weight: bold;
}

.address-textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #CCCCCC;
  border-radius: 5px;
  resize: none;
  box-sizing: border-box;
  transition: box-shadow 0.3s ease;
}

.address-details {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.address-field {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.address-field label {
  font-size: 16px;
}

.address-field input {
  padding: 0.5rem;
  border: 2px solid #ccc;
  border-radius: 4px;
  width: 100%;  
  box-sizing: border-box; 
  transition: box-shadow 0.3s ease;
}

.address-field input:hover, .address-textarea:hover{
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.edit-info-separator {
  height: 1px;
  background-color: #a0a0a0;
}

.edit-info-separator.vertical {
  width: 0.5px;
  height: 300px;
}

@keyframes slideIn {
  0% {
    transform: translatex(5%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.address-container{
  animation: slideIn 0.6s ease;
}
</style>