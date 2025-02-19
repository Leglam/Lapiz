<template>
    <div class="login-container">
      <h1 class="login-title">เข้าสู่ระบบ</h1>
      <h2 class="reset-password-title ">รีเซ็ตรหัสผ่าน</h2>
      <p class="text-description">เราจะส่งอีเมลถึงคุณเพื่อรีเซ็ตรหัสผ่านของคุณ</p>
  
      <form @submit.prevent="handleSubmit">
        <div class="form-groups">
          <div class="form-group">
            <label>อีเมล <span class="required">*</span></label>
            <input
              type="text"
              v-model="userAuth.username"
              placeholder="กรุณากรอกอีเมล"
              :class="{ error: usernameError }"
              @change="checkUsername"
              required
            />
          </div>
          <button type="submit" class="login-button">ส่ง</button>
        </div>
      </form>
  
      <div class="signup-section">
        <p>
          <a
            href="#"
            @click="
              () => {
                router.push('/register');
              }
            "
            >ยกเลิก</a
          >
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from "vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  
  const userAuth = reactive({
    username: "",
    password: "",
  });
  </script>
  
  <style>
  @import "@/styles/social-button.scss";
  
  .login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 480px;
    margin: 48px auto; /* ใช้ margin auto ในแนวนอน */
    padding: 32px 24px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .login-title {
    font-size: 32px;
    font-weight: bold;
    text-align: left;
    color: #000;
    margin-bottom: 38px;
  }

  .text-description{
    font-size: 16px;
    font-weight: 100;
    text-align: center;
    color: #858585;
    margin-bottom: 16px;
  }

  .reset-password-title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    color: #000;
    margin-bottom: 10px;
}
  
  .form-group {
    margin-bottom: 28px;
  }
  
  .form-group label {
    display: block;
    font-size: 16px; /* เพิ่มขนาดฟอนต์ */
    font-weight: bold; /* ทำฟอนต์หนา */
    color: #333333;
    margin-bottom: 8px;
  }
  
  .form-group label .required {
    color: #ff4444;
    margin-left: 4px;
  }
  
  .form-group input {
    width: 100%; /* ทำให้กล่อง input เต็มความกว้างของ .form-group */
    box-sizing: border-box; /* ทำให้ padding และ border ไม่ทำให้ขนาดกล่องเกินขอบ */
    padding: 10px 14px; /* ปรับ padding เพื่อให้ดูสบายตา */
    border: 1px solid #000;
    border-radius: 2px;
    font-size: 14px;
    color: #333333;
    transition: all 0.3s ease;
  }
  
  .form-group input:focus {
    outline: none;
    border-color: #4444ff;
    box-shadow: 0 0 0 2px rgba(68, 68, 255, 0.1);
  }
  
  .form-group input::placeholder {
    color: #999999;
  }
  
  .forgot-password {
    text-align: right;
    margin-top: 8px;
  }
  
  .forgot-password a {
    font-size: 14px;
    color: #002fff;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .forgot-password a:hover {
    color: #2222dd;
    font-weight: 600;
    text-decoration: underline;
  }
  
  .login-button {
    width: 100%;
    padding: 12px;
    background-color: #4444ff;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    font-size: 19px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .login-button:hover {
    background-color: #2222dd;
  }
  
  .login-button:active {
    transform: translateY(1px);
  }
  
  .signup-section {
    margin-top: 19px;
    text-align: center;
  }
  
  .signup-section p {
    font-size: 15px;
    color: #666666;
    margin-bottom: 16px;
  }
  
  .signup-section a {
    color: #002fff;
    font-size: 15px;
    text-decoration: none;
    font-weight: 500;
    margin-left: 4px;
  }
  
  .signup-section a:hover {
    text-decoration: underline;
    color: #2222dd;
    font-weight: 600;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .form-group {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  .form-group:nth-child(1) {
    animation-delay: 0.1s;
  }
  .form-group:nth-child(2) {
    animation-delay: 0.2s;
  }
  .form-group:nth-child(3) {
    animation-delay: 0.3s;
  }
  </style>
  