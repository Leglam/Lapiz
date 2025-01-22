<template>
    <div class="login-container">
        <h1 class="login-title">เข้าสู่ระบบ</h1>
        
        <form @submit.prevent="handleSubmit">
        <div class="form-groups">
            <div class="form-group">
            <label>อีเมล <span class="required">*</span></label>
            <input 
                type="email"
                v-model="email"
                placeholder="กรุณากรอกอีเมล"
                required
            >
            </div>
            
            <div class="form-group">
            <label>รหัสผ่าน <span class="required">*</span></label>
            <input 
                type="password"
                v-model="password"
                placeholder="กรุณากรอกรหัสผ่าน"
                required
            >
            <div class="forgot-password">
                <a href="#">ลืมรหัสผ่าน</a>
            </div>
            </div>
            
            <button 
            type="submit"
            class="login-button"
            >
            เข้าสู่ระบบ
            </button>
        </div>
        </form>
        
        <div class="signup-section">
        <p>ไม่มีบัญชีใช่ไหม? <a href="#">สมัครสมาชิก</a></p>
        
        <div class="social-login">
            <button class="social-button facebook">
            <img src="" alt="Facebook">
            </button>
            <button class="social-button google">
            <img src="" alt="Google">
            </button>
            <button class="social-button instagram">
            <img src="" alt="Instagram">
            </button>
        </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    const email = ref('')
    const password = ref('')

    const handleSubmit = () => {
    // Implement login logic here
    console.log('Login attempt:', { email: email.value, password: password.value })
    }
</script>

<style>
    .login-container {
    max-width: 480px;
    margin: 48px auto;
    padding: 32px 24px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .login-title {
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    color: #333333;
    margin-bottom: 32px;
    }

    .form-group {
    margin-bottom: 24px;
    }

    .form-group label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    margin-bottom: 8px;
    }

    .form-group label .required {
    color: #ff4444;
    margin-left: 4px;
    }

    .form-group input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
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
    font-size: 13px;
    color: #4444ff;
    text-decoration: none;
    transition: color 0.3s ease;
    }

    .forgot-password a:hover {
    color: #2222dd;
    text-decoration: underline;
    }

    .login-button {
    width: 100%;
    padding: 12px;
    background-color: #4444ff;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
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
    font-size: 14px;
    color: #666666;
    margin-bottom: 16px;
    }

    .signup-section a {
    color: #4444ff;
    text-decoration: none;
    font-weight: 500;
    margin-left: 4px;
    }

    .signup-section a:hover {
    text-decoration: underline;
    }

    .social-login {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 24px;
    }

    .social-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border: 1px solid #e0e0e0;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    }

    .social-button:hover {
    background-color: #f5f5f5;
    transform: translateY(-2px);
    }

    .social-button img {
    width: 24px;
    height: 24px;
    }

    .social-button.facebook:hover {
    border-color: #1877f2;
    background-color: rgba(24, 119, 242, 0.1);
    }

    .social-button.google:hover {
    border-color: #db4437;
    background-color: rgba(219, 68, 55, 0.1);
    }

    .social-button.instagram:hover {
    border-color: #e4405f;
    background-color: rgba(228, 64, 95, 0.1);
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

    .form-group:nth-child(1) { animation-delay: 0.1s; }
    .form-group:nth-child(2) { animation-delay: 0.2s; }
    .form-group:nth-child(3) { animation-delay: 0.3s; }
</style>