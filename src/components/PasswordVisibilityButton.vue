<script setup lang="ts">
const showPassword = defineModel('showPassword', {
    type: Boolean,
    default: false
});
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
};
</script>

<template>
  <button class="btn btn-light border" type="button" @click="togglePasswordVisibility">
    <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
  </button>
</template>
