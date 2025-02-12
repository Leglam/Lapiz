<template>
  <div class="register-container">
    <h1 class="register-title">สมัครสมาชิก</h1>

    <form @submit.prevent="handleSubmit">
      <div class="form-groups">
        <!-- ชื่อจริง -->
        <div class="form-group">
          <label>ชื่อจริง <span class="required">*</span></label>
          <input
            type="text"
            v-model="firstName"
            placeholder="กรุณากรอกชื่อจริง"
            required
          />
        </div>

        <!-- นามสกุล -->
        <div class="form-group">
          <label>นามสกุล <span class="required">*</span></label>
          <input
            type="text"
            v-model="lastName"
            placeholder="กรุณากรอกนามสกุล"
            required
          />
        </div>

        <!-- ชื่อผู้ใช้ -->
        <div class="form-group">
          <label>ชื่อผู้ใช้ <span class="required">*</span></label>
          <input
            type="text"
            v-model="username"
            placeholder="กรุณากรอกชื่อผู้ใช้"
            :class="{ error: usernameError && username.length > 0 }"
            required
            @blur="checkUsername"
          />
          <p v-if="usernameError && username.length > 0" class="error-message">
            ชื่อผู้ใช้นี้ไม่สามารถใช้ได้
          </p>
        </div>

        <!-- อีเมล -->
        <div class="form-group">
          <label>อีเมล <span class="required">*</span></label>
          <input
            type="email"
            v-model="email"
            placeholder="กรุณากรอกอีเมล"
            :class="{ error: emailError && email.length > 0 }"
            required
            @blur="checkEmail"
          />
          <p v-if="emailError && email.length > 0" class="error-message">
            กรุณากรอกอีเมลให้ถูก format
          </p>
        </div>

        <!-- รหัสผ่าน -->
        <div class="form-group">
          <label>รหัสผ่าน <span class="required">*</span></label>
          <input
            type="password"
            v-model="password"
            placeholder="กรุณากรอกรหัสผ่าน"
            required
            :class="{ error: passwordError && password.length > 0 }"
            @blur="validatePassword"
          />
          <p v-if="passwordError && password.length > 0" class="error-message">
            รหัสผ่านต้องมีอย่างน้อย 8 ตัว และต้องประกอบด้วยตัวอักษรพิมพ์ใหญ่,
            ตัวพิมพ์เล็ก และตัวเลข
          </p>
        </div>

        <!-- ยืนยันรหัสผ่าน -->
        <div class="form-group">
          <label>ยืนยันรหัสผ่าน <span class="required">*</span></label>
          <input
            type="password"
            v-model="confirmPassword"
            placeholder="กรุณายืนยันรหัสผ่าน"
            required
            :class="{ 'error': confirmPasswordError }"
            @blur="validateConfirmPassword"
          />
          <p v-if="confirmPasswordError" class="error-message">
            รหัสผ่านไม่ตรงกันหรือกรุณากรอกรหัสผ่านก่อน
          </p>
        </div>

        <button type="submit" class="register-button">สมัครสมาชิก</button>
      </div>
    </form>

    <div class="login-section">
      <p>
        มีบัญชีอยู่แล้ว?
        <a
          href="#"
          @click="
            () => {
              router.push('/login');
            }
          "
          >เข้าสู่ระบบ</a
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
import { registerUser } from "@/api/userService";
import { ref } from "vue";
import { useRouter } from "vue-router";

const firstName = ref("");
const lastName = ref("");
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const usernameError = ref(false);
const emailError = ref(false);
const passwordError = ref(false);
const confirmPasswordError = ref(false);

const router = useRouter();

const userData = ref({
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

// ฟังก์ชันตรวจสอบชื่อผู้ใช้
const checkUsername = () => {
  if (username.value.length > 0) {
    const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/; // ตัวอย่างเงื่อนไข: ชื่อผู้ใช้ต้องมีตัวเลขหรือตัวอักษร และมีความยาว 3-20 ตัว
    usernameError.value = !usernamePattern.test(username.value); // ตรวจสอบชื่อผู้ใช้ตาม pattern
  }
};

// ฟังก์ชันตรวจสอบอีเมล
const checkEmail = () => {
  if (email.value.length > 0) {
    const existingEmails = ["test@example.com", "user@example.com"]; // ตัวอย่างอีเมลที่ถูกใช้ไปแล้ว
    emailError.value = existingEmails.includes(email.value);
    if (!emailError.value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // ตรวจสอบรูปแบบอีเมล
      emailError.value = !emailPattern.test(email.value); // ตรวจสอบรูปแบบของอีเมล
    }
  }
};

// ฟังก์ชันตรวจสอบรหัสผ่าน
const validatePassword = () => {
  if (password.value.length > 0) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    passwordError.value = !passwordPattern.test(password.value);
  }
};

// ฟังก์ชันตรวจสอบยืนยันรหัสผ่าน
const validateConfirmPassword = () => {
  if (confirmPassword.value === "") {
    confirmPasswordError.value = false; // ไม่ให้แจ้งเตือนหากยืนยันรหัสผ่านไม่ได้กรอก
  } else if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = true;
  } else {
    confirmPasswordError.value = false;
  }
};

const updateUserData = async () => {
  userData.value.firstName = firstName.value;
  userData.value.lastName = lastName.value;
  userData.value.username = username.value;
  userData.value.email = email.value;
  userData.value.password = password.value;
  userData.value.confirmPassword = confirmPassword.value;
};

const registerUserAccount = async () => {
  const result = await registerUser(userData.value);
  if (result.status === 200) {
    console.log("login successful");

    router.push("/login");
  } else {
    usernameError.value = true;
    passwordError.value = true;
  }
};

// ฟังก์ชันส่งข้อมูล
const handleSubmit = async () => {
  // ทำการตรวจสอบข้อมูลก่อนการส่ง
  validatePassword();
  validateConfirmPassword();
  checkUsername();
  checkEmail();

  // ถ้าข้อมูลถูกต้อง
  if (
    !usernameError.value &&
    !emailError.value &&
    !passwordError.value &&
    !confirmPasswordError.value
  ) {
    await updateUserData();
    registerUserAccount();
  }
};
</script>

<style scoped>
@import "@/styles/social-button.scss";

.register-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 480px;
  margin: 48px auto;
  padding: 32px 24px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.register-title {
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
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 8px;
}

.form-group label .required {
  color: #ff4444;
  margin-left: 4px;
}

.form-group input {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 14px;
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

.register-button {
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

.register-button:hover {
  background-color: #2222dd;
}

.register-button:active {
  transform: translateY(1px);
}

.login-section {
  margin-top: 32px;
  text-align: center;
}

.login-section p {
  font-size: 15px;
  color: #666666;
  margin-bottom: 16px;
}

.login-section a {
  color: #002fff;
  font-size: 15px;
  text-decoration: none;
  font-weight: 500;
  margin-left: 4px;
}

.login-section a:hover {
  text-decoration: underline;
  color: #2222dd;
  font-weight: 600;
}
</style>
