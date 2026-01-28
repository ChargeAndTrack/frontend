<script setup lang="ts">
import router from '@/routes/router';
import { useAuthenticationStore } from '@/store/authentication.store';
import { reactive, ref } from 'vue';
import PasswordVisibilityButton from '@/components/PasswordVisibilityButton.vue';
import FormField from '@/components/FormField.vue';

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
        <FormField label="Username" id="login-username" v-model:value="loginForm.username" />
        <FormField label="Password" id="login-password" inputType="password"
            v-model:value="loginForm.password" v-model:showPassword="showPassword">
          <template #extra>
            <PasswordVisibilityButton v-model:showPassword="showPassword" />
          </template>
        </FormField>
        <p v-if="error" class="text-danger m-0">{{ error }}</p>
        <div class="d-flex justify-content-end py-3">
          <button type="submit" class="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>
