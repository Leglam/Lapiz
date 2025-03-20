<template>
  <div class="top-header">
    <div class="top-header-container">
      <div v-if="!isLogin" class="login-signin-profile-container">
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
              'profile--hovered': isHovered,
            }"
          >
            <img :src="currentProfileIcon" alt="Profile" class="profile-icon" />
          </a>
        </div>
      </div>
      <div v-else>
        <div class="login_container">
          <div @click="pushPage('my-account')" class="login_username">
            {{ username }}
          </div>
          <div class="profile-img-container">
            <a
              href="#"
              class="profile-img"
              @mouseenter="isHovered = true"
              @mouseleave="isHovered = false"
              :class="{
                'profile--hovered': isHovered,
              }"
            >
              <img
                :src="currentProfileIcon"
                alt="Profile"
                class="profile-icon"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import ProfileIcon from "@/assets/images/ProfileIcon.svg";
import ProfileIconHover from "@/assets/images/ProfileIconHover.svg";
import { useRouter } from "vue-router";
import { useLoginStore } from "@/stores/loginStore";

const router = useRouter();
const loginStore = useLoginStore();
const isHovered = ref(false);
const username = ref("");

const pushPage = (name) => {
  router.push({ name: name });
};

const ProfileIcons = {
  default: ProfileIcon,
  hover: ProfileIconHover,
};

const getUserName = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    username.value = "No token found";
    return;
  }

  try {
    const payloadBase64 = token.split(".")[1];
    const payloadJson = atob(payloadBase64);
    const payloadData = JSON.parse(payloadJson);

    username.value = payloadData.unique_name || "Unknown User";
    loginStore.setUsername(username.value);
  } catch (error) {
    username.value = "Invalid token";
  }
};

const currentProfileIcon = computed(() => {
  if (isHovered.value) {
    return ProfileIcons.hover;
  }
  return ProfileIcons.default;
});

const isLogin = computed(() => {
  return loginStore.isLogin;
});

watch(isLogin, (newValue) => {
  if (newValue === true) {
    getUserName();
  }
});
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

.login-link,
.register-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.login-link:hover,
.register-link:hover {
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

.login_container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 6px;
}

.login_username {
  color: var(--white-color);
  font-size: 16px;
  font-weight: medium;
  cursor: pointer;
  text-decoration: underline;
  transition: 0.3s;
}

.login_username:hover {
  color: var(--text-userLogin-color);
  opacity: 0.8;
}
</style>
