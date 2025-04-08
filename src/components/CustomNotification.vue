<!-- CustomNotification.vue -->
<template>
    <Transition name="fade">
      <div v-if="isVisible" class="notification-overlay">
        <div class="notification-container">
          <div class="notification-header" :class="`notification-header--${type}`">
            <span class="notification-title">{{ titleText }}</span>
            <button class="close-button" @click="close">×</button>
          </div>
          <div class="notification-content">
            <div class="icon-container">
              <div class="info-icon" :class="`info-icon--${type}`">
                <span v-if="type === 'info'">i</span>
                <span v-else-if="type === 'success'">✓</span>
                <span v-else-if="type === 'error'">!</span>
                <span v-else-if="type === 'warning'">⚠</span>
                <span v-else-if="type === 'favorite'">♥</span>
              </div>
            </div>
            <p class="notification-message">{{ message }}</p>
          </div>
          <div class="notification-footer">
            <button class="confirm-button" :class="`confirm-button--${type}`" @click="close">ตกลง</button>
          </div>
        </div>
      </div>
    </Transition>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
  
  const props = defineProps({
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'info',
      validator: (value) => ['info', 'success', 'error', 'warning', 'favorite'].includes(value)
    },
    duration: {
      type: Number,
      default: 3000
    },
    autoClose: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  });
  
  const emit = defineEmits(['close']);
  
  const isVisible = ref(false);
  let timer = null;
  
  const titleText = computed(() => {
    if (props.title) return props.title;
    
    const titles = {
      info: 'แจ้งเตือน',
      success: 'สำเร็จ',
      error: 'ข้อผิดพลาด',
      warning: 'คำเตือน',
      favorite: 'รายการโปรด'
    };
    
    return titles[props.type] || 'แจ้งเตือน';
  });
  
  const show = () => {
    isVisible.value = true;
    if (props.autoClose) {
      timer = setTimeout(() => {
        close();
      }, props.duration);
    }
  };
  
  const close = () => {
    isVisible.value = false;
    clearTimeout(timer);
    emit('close');
  };
  
  onMounted(() => {
    show();
  });
  
  onBeforeUnmount(() => {
    clearTimeout(timer);
  });
  
  defineExpose({ close });
  </script>
  
  <style scoped>
  .notification-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
  
  .notification-container {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 400px;
    overflow: hidden;
  }
  
  .notification-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #eee;
  }
  
  .notification-header--info {
    background-color: #3498db;
    color: white;
  }
  
  .notification-header--success {
    background-color: #2ecc71;
    color: white;
  }
  
  .notification-header--error {
    background-color: #e74c3c;
    color: white;
  }
  
  .notification-header--warning {
    background-color: #f39c12;
    color: white;
  }
  
  .notification-header--favorite {
    background-color: #e84393;
    color: white;
  }
  
  .notification-title {
    font-weight: 600;
    font-size: 18px;
  }
  
  .close-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: inherit;
    opacity: 0.8;
  }
  
  .close-button:hover {
    opacity: 1;
  }
  
  .notification-content {
    padding: 20px 16px;
    display: flex;
    align-items: center;
  }
  
  .icon-container {
    margin-right: 16px;
  }
  
  .info-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: white;
  }
  
  .info-icon--info {
    background-color: #3498db;
  }
  
  .info-icon--success {
    background-color: #2ecc71;
  }
  
  .info-icon--error {
    background-color: #e74c3c;
  }
  
  .info-icon--warning {
    background-color: #f39c12;
  }
  
  .info-icon--favorite {
    background-color: #e84393;
  }
  
  .notification-message {
    color: #333;
    font-size: 16px;
    margin: 0;
    flex: 1;
  }
  
  .notification-footer {
    padding: 12px 16px;
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid #eee;
  }
  
  .confirm-button {
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s;
    color: white;
  }
  
  .confirm-button--info {
    background-color: #3498db;
  }
  
  .confirm-button--info:hover {
    background-color: #2980b9;
  }
  
  .confirm-button--success {
    background-color: #2ecc71;
  }
  
  .confirm-button--success:hover {
    background-color: #27ae60;
  }
  
  .confirm-button--error {
    background-color: #e74c3c;
  }
  
  .confirm-button--error:hover {
    background-color: #c0392b;
  }
  
  .confirm-button--warning {
    background-color: #f39c12;
  }
  
  .confirm-button--warning:hover {
    background-color: #e67e22;
  }
  
  .confirm-button--favorite {
    background-color: #e84393;
  }
  
  .confirm-button--favorite:hover {
    background-color: #d63031;
  }
  
  /* Animation */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>