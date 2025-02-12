<template>
  <div class="top-header">
    <div class="top-header-container">
      <div>
        <span @click="pushPage('login')" class="login-link">เข้าสู่ระบบ</span>
        <span class="text-white"> | </span>
        <span @click="pushPage('register')" class="login-link"
          >สมัครสมาชิก</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const pushPage = (name) => {
  router.push({ name: name });
};
</script>

<style>
* {
  margin: unset;
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

.login-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  transition: opacity 0.3s ease;
  cursor: pointer;
}

.text-white {
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
}

.login-link:hover {
  opacity: 0.8;
}
</style>
