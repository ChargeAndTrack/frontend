<script setup lang="ts">
const showPassword = defineModel('show-password', {
    type: Boolean,
    default: false
});
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
};
</script>

<template>
  <button class="btn btn-outline-secondary" type="button" @click="togglePasswordVisibility">
    <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
  </button>
</template>
