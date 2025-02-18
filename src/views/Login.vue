<template>
  <div class="login-container">
    <h1 class="login-title">เข้าสู่ระบบ</h1>

    <form @submit.prevent="handleSubmit">
      <div class="form-groups">
        <div class="form-group">
          <label>ชื่อผู้ใช้ <span class="required">*</span></label>
          <input
            type="text"
            v-model="userAuth.username"
            placeholder="กรุณากรอกชื่อผู้ใช้"
            :class="{ error: usernameError }"
            @change="checkUsername"
            required
          />
        </div>

        <div class="form-group">
          <label>รหัสผ่าน <span class="required">*</span></label>
          <input
            type="password"
            v-model="userAuth.password"
            placeholder="กรุณากรอกรหัสผ่าน"
            :class="{ error: passwordError }"
            @blur="checkPassword"
            required
          />
          <p v-if="passwordError" class="error-message">
            ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง
          </p>
          <div class="forgot-password">
            <a href="#">ลืมรหัสผ่าน</a>
          </div>
        </div>

        <button type="submit" class="login-button">เข้าสู่ระบบ</button>
      </div>
    </form>

    <div class="signup-section">
      <p>
        ไม่มีบัญชีใช่ไหม?
        <a
          href="#"
          @click="
            () => {
              router.push('/register');
            }
          "
          >สมัครสมาชิก</a
        >
      </p>

      <div class="social-login">
        <button class="social-button facebook">
          <img src="@/assets/images/img_fb.png" alt="Facebook" />
        </button>
        <button class="social-button google">
          <img src="@/assets/images/img_google.png" alt="Google" />
        </button>
        <button class="social-button instagram">
          <img src="@/assets/images/img_ig.png" alt="Instagram" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { loginUser } from "@/api/userService";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const usernameError = ref(false);
const passwordError = ref(false);

const userAuth = reactive({
  username: "",
  password: "",
});

const checkUsername = () => {
  if (userAuth.username.length > 0) {
    const usernamePattern = /^[a-zA-Z0-9_]/; // ตัวอย่างเงื่อนไข: ชื่อผู้ใช้ต้องมีตัวเลขหรือตัวอักษร และมีความยาว 3-20 ตัว
    usernameError.value = !usernamePattern.test(userAuth.username); // ตรวจสอบชื่อผู้ใช้ตาม pattern
  }
};

const checkPassword = () => {
  if (userAuth.password.length > 0) {
    const passwordPattern = /^[a-zA-Z0-9_]/; // ตัวอย่างเงื่อนไข: ชื่อผู้ใช้ต้องมีตัวเลขหรือตัวอักษร และมีความยาว 3-20 ตัว
    passwordError.value = !passwordPattern.test(userAuth.password); // ตรวจสอบชื่อผู้ใช้ตาม pattern
  }
};

const handleSubmit = async () => {
  // Implement login logic here
  console.log("Login attempt:", {
    username: userAuth.username,
    password: userAuth.password,
  });

  const response = await loginUser(userAuth);
  if (response.status === 200) {
    const token = response.data.token;
    localStorage.setItem("token", token);
    router.push({ name: "men" });
  } else {
    usernameError.value = true;
    passwordError.value = true;
  }
};
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
  margin-bottom: 32px;
}

.form-group {
  margin-bottom: 24px;
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
  margin-top: 32px;
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
