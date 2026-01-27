<script setup lang="ts">
import router from '@/routes/router';
import { useAuthenticationStore } from '@/store/authentication.store';
import { reactive, ref } from 'vue';
import PasswordVisibilityButton from '@/components/PasswordVisibilityButton.vue';

const authenticationStore = useAuthenticationStore();

const showPassword = ref(false);
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
</script>

<template>
  <div class="row justify-content-center align-items-center vh-100">
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
            <PasswordVisibilityButton v-model:show-password="showPassword" />
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
