<template>
  <div class="top-header">
    <div class="top-header-container">
      <div class="login-signin-profile-container">
        <div>
          <span @click="pushPage('login')" class="login-link">เข้าสู่ระบบ</span>
          <span class="text-white"> | </span>
          <span @click="pushPage('register')" class="login-link"
            >สมัครสมาชิก</span
          >
        </div>
        <div class="profile-img-container">
          <a 
              href="#"
              class="profile-img"
              @mouseenter="isHovered = true"
              @mouseleave="isHovered = false"
              :class="{
                'profile--hovered': isHovered
              }"
            >
              <img :src="currentProfileIcon" alt="Profile" class="profile-icon" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProfileIcon from '@/assets/images/ProfileIcon.svg';
import ProfileIconHover from '@/assets/images/ProfileIconHover.svg';
import { useRouter } from "vue-router";

const router = useRouter();

const pushPage = (name) => {
  router.push({ name: name });
};

const isHovered = ref(false)

const ProfileIcons = {
  default: ProfileIcon,
  hover: ProfileIconHover,
}

const currentProfileIcon = computed(() => {
  if (isHovered.value) {
    return ProfileIcons.hover
  }
  return ProfileIcons.default
})
</script>

<style scoped>

* {
  margin: unset;
}

.separator {
  margin: 0 5px; /* ระยะห่างระหว่างข้อความและเครื่องหมาย | */
  font-size: 18px;
  color: #fff; /* สีขาว */
}

.top-header {
  background-color: #000000;
  padding: 10px 44px;
}

.top-header-container {
  display: flex; /* ใช้ flexbox */
  justify-content: flex-end; /* ขยับเนื้อหาทั้งหมดไปขวา */
  align-items: center; /* จัดตำแหน่งในแนวตั้ง */
  width: 100%; /* ทำให้ความกว้างเต็ม */
}

.login-signin-profile-container {
  display: flex; /* ใช้ flexbox ในการจัดเรียงส่วนต่างๆ */
  justify-content: flex-end; /* ขยับไปขวาสุด */
  align-items: center;
}

.login-link, .register-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.login-link:hover, .register-link:hover {
  opacity: 0.8;
  text-decoration: underline;
  text-decoration-color: #ffffff;
}

.text-white {
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
}

.profile-img-container {
  position: relative; /* เพื่อให้จัดตำแหน่งซ้อนกัน */
  width: 22px;
  height: 19px;
  margin-left: 10px; /* ระยะห่างจากข้อความ */
}

.profile-icon {
  width: 18px;
  height: auto;
}
</style>
