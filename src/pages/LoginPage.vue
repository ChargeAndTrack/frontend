<script setup lang="ts">
import router from '@/routes/router';
import { useAuthenticationStore } from '@/store/authentication.store'
import { reactive, ref } from 'vue'

const authenticationStore = useAuthenticationStore();

const error = ref('');
const loginForm = reactive({ username: '', password: '' });

const login = async () => {
  error.value = '';
  try {
    await authenticationStore.login(loginForm.username, loginForm.password);
    router.push({ name: 'Home' });
  } catch (err: any) {
    err.response?.status === 404
      ? error.value = "Credentials not valid"
      : error.value = "Server error";
    loginForm.password = '';
  }
}

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
      <form autocomplete="on" @submit.prevent="login">
        <div class="form-group">
          <label for="login-username">Username</label>
          <input
            type="text"
            class="form-control"
            id="login-username"
            v-model="loginForm.username"
            required
          >
        </div>
        <div class="form-password py-2">
          <label for="login-password">Password</label>
          <div class="input-group">
            <input
              :type="showPassword ? 'text' : 'password'"
              class="form-control"
              id="login-password"
              v-model="loginForm.password"
              required
            >
            <button class="btn btn-outline-secondary" type="button" @click="togglePasswordVisibility">
              <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>
        </div>
        <p v-if="error" class="text-danger">{{ error }}</p>
        <div class="d-flex justify-content-end py-3">
          <button type="submit" class="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>
