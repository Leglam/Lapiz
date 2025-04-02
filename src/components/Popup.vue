<template>
  <Teleport to="body">
    <div class="popup-overlay">
      <div class="popup">
        <button
          @click="handleCloseMessage"
          style="position: absolute; top: 0; right: 0; margin: 8px 20px"
        >
          X
        </button>
        <p>{{ message }}</p>
        <button @click="$emit('close')">Close</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useErrorStore } from "../stores/errorStore";

defineProps({
  message: String,
});

const errorStore = useErrorStore();

const handleCloseMessage = () => {
  errorStore.clearError();
};
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
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
</style>
