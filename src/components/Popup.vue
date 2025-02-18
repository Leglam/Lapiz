<template>
  <Teleport to="body">
    <div class="popup-overlay">
      <div class="popup">
        <p>{{ message }}</p>
        <button @click="$emit('close')">Close</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  message: String,
});
</script>

<style>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.popup {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
</style>
