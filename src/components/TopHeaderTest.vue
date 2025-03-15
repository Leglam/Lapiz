<template>
  <div class="top-header">
    <div class="top-header-container">
      <div class="login-signin-profile-container">
        <router-link to="/login" class="login-link">เข้าสู่ระบบ</router-link>
        <span class="separator">|</span>
        <router-link to="/register" class="register-link">สมัครสมาชิก</router-link>
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

// Favorite icon states
const isHovered = ref(false)

// Define icon paths
const ProfileIcons = {
  default: ProfileIcon,
  hover: ProfileIconHover,
}

// Compute current icon based on state
const currentProfileIcon = computed(() => {
  if (isHovered.value) {
    return ProfileIcons.hover
  }
  return ProfileIcons.default
})
</script>

<style scoped>
.separator {
  margin: 0 5px; /* ระยะห่างระหว่างข้อความและเครื่องหมาย | */
  font-size: 18px;
  color: #fff; /* สีขาว */
}

.top-header {
  background-color: #000000;
  padding: 8px 0;
}

.top-header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  text-align: right;
}

.login-signin-profile-container{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.login-link, .register-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  transition: opacity 0.3s ease;
}

.login-link:hover, .register-link:hover {
  opacity: 0.8;
  text-decoration: underline;
  text-decoration-color: #ffffff;
}

.profile-img-container {
  position: relative; /* เพื่อให้จัดตำแหน่งซ้อนกัน */
  width: 24px;
  height: 24px;
  margin-left: 10px; /* ระยะห่างจากข้อความ */
}


</style>