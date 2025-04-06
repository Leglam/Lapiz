<template>
  <div class="edit-info-container">
    <div class="edit-info-header">
      <div class="edit-info-navigation">
        <img
          src="@/assets/images/icon-back.svg"
          alt="BackIcon"
          class="back-icon"
        />
        <span @click="pushPage('my-account')" class="back-link">ย้อนกลับ</span>
      </div>
      <h1 class="page-title">แก้ไขข้อมูลบัญชี</h1>
    </div>

    <div class="edit-info-separator"></div>

    <div class="edit-info-content">
      <div class="edit-info-account-section">
        <h2 class="section-title">ข้อมูลบัญชี</h2>

        <div class="name-inputs">
          <div class="input-group">
            <label for="firstName">ชื่อจริง</label>
            <input id="firstName" v-model="userProfile.firstName" type="text" />
          </div>
          <div class="input-group">
            <label for="lastName">นามสกุล</label>
            <input id="lastName" v-model="userProfile.lastName" type="text" />
          </div>
        </div>

        <div class="username-email-inputs">
          <div class="input-group">
            <label for="username">ชื่อผู้ใช้</label>
            <input
              id="username"
              v-model="userProfile.username"
              type="text"
              placeholder="Thanathorn"
            />
          </div>
          <div class="input-group">
            <label for="email">อีเมล</label>
            <input
              id="email"
              v-model="userProfile.email"
              type="email"
              placeholder="naithanathorn46@gmail.com"
            />
          </div>
        </div>

        <div class="contact-inputs">
          <div class="input-group">
            <label for="phone">หมายเลขโทรศัพท์</label>
            <input
              id="phone"
              v-model="userProfile.phone"
              type="tel"
              placeholder="063-481-6644"
            />
          </div>
          <div class="input-group">
            <label for="birthday">วันเกิด</label>
            <input
              id="birthday"
              v-model="userProfile.birthday"
              type="date"
              placeholder="dd/mm/yy"
            />
          </div>
        </div>
      </div>

      <div class="edit-info-separator vertical"></div>

      <div class="edit-info-password-section">
        <h2 class="section-title">เปลี่ยนรหัสผ่าน</h2>

        <div class="password-inputs">
          <div class="input-group">
            <label for="currentPassword">
              รหัสผ่าน
              <span class="required">*</span>
            </label>
            <input
              id="currentPassword"
              v-model="password.current"
              type="password"
              placeholder="******"
            />
          </div>
          <div class="input-group">
            <label for="newPassword">
              รหัสผ่านใหม่
              <span class="required">*</span>
            </label>
            <input
              id="newPassword"
              v-model="password.new"
              type="password"
              placeholder="***********"
            />
          </div>
          <div class="input-group">
            <label for="confirmPassword">
              ยืนยันรหัสผ่านใหม่
              <span class="required">*</span>
            </label>
            <input
              id="confirmPassword"
              v-model="password.confirm"
              type="password"
              placeholder="***********"
            />
          </div>
        </div>
      </div>
    </div>

    <button class="save-button" @click="saveChanges">บันทึก</button>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, reactive, onMounted } from "vue";

const route = useRoute();
const router = useRouter();

const pushPage = (pageName) => {
  router.push({ name: pageName });
};

const userProfile = reactive({
  firstName: "ธนาทร",
  lastName: "เกริกกวิน",
  username: "Thanathorn",
  email: "naithanathorn46@gmail.com",
  phone: "063-481-6644",
  birthday: "2005-06-24",
});

const password = reactive({
  current: "",
  new: "",
  confirm: "",
});

const saveChanges = () => {
  // Add validation logic here
  if (password.new !== password.confirm) {
    alert("รหัสผ่านไม่ตรงกัน");
    return;
  }

  router.push({
    name: "my-account",
    query: { userProfile: JSON.stringify(userProfile) },
  });
  // Potential API call to save changes
};

onMounted(() => {
  if (route.query.userProfile) {
    const queryUserProfile = JSON.parse(route.query.userProfile);
    userProfile.firstName = queryUserProfile.firstName;
    userProfile.lastName = queryUserProfile.lastName;
    userProfile.username = queryUserProfile.username;
    userProfile.email = queryUserProfile.email;
  }
});
</script>

<style scoped>
@import "@/styles/back-link.scss";
@import "@/styles/save-button.scss";

.edit-info-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 6rem 6rem 6rem;
  margin-top: 10px;
}

.edit-info-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.edit-info-navigation {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.edit-info-separator {
  height: 2px;
  background-color: #a0a0a0;
}

.edit-info-separator.vertical {
  width: 1px;
  height: 340px;
}

.edit-info-content {
  display: flex;
  gap: 2rem;
}

.edit-info-account-section,
.edit-info-password-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.name-inputs,
.username-email-inputs,
.contact-inputs {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.password-inputs {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
}

.input-group input {
  padding: 0.5rem;
  border: 2px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  transition: box-shadow 0.3s ease;
}

.input-group input:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.required {
  color: red;
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

.edit-info-content {
  animation: slideIn 0.6s ease;
}
</style>
