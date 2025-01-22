<template>
  <div class="top-header">
    <div class="top-header-container">
      <router-link to="/login" class="login-link">เข้าสู่ระบบ | สมัครสมาชิก</router-link>
    </div>
  </div>
</template>

<style>
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
}

.login-link:hover {
  opacity: 0.8;
}
</style>