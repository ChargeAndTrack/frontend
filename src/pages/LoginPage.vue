<script setup lang="ts">
import { ref } from 'vue'

const showPassword = ref(false)
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="row justify-content-center align-items-center vh-100 overflow-y-hidden">
    <div class="card col-11 col-md-5 shadow">
      <div class="d-flex justify-content-center">
        <h1 class="py-2">ChargeAndTrack</h1>
      </div>
      <form autocomplete="on">
        <div class="form-group">
          <label for="login-username">Username</label>
          <input type="text" class="form-control" id="login-username" required>
        </div>
        <div class="form-password py-2">
          <label for="login-password">Password</label>
          <div class="input-group">
            <input :type="showPassword ? 'text' : 'password'" class="form-control" id="login-password" required>
            <button class="btn btn-outline-secondary" type="button" @click="togglePasswordVisibility">
              <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>
        </div>
        <div class="d-flex justify-content-end py-3">
          <button type="submit" class="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>
