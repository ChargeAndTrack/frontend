<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import NavBar from '@/components/NavBar.vue';
import { useAuthenticationStore } from './store/authentication.store';
import { useErrorHandler } from './api/errorHandling';
import MessageToast from './components/MessageToast.vue';

const route = useRoute();
const authenticationStore = useAuthenticationStore();

const { message } = useErrorHandler();

const showNavbar = computed(() => {
  return route.name !== 'Login';
});

onMounted(() => authenticationStore.restoreSession());
</script>

<template>
  <div data-bs-theme="custom" class="overflow-x-hidden" :class="{ 'login-bg' : !showNavbar }">
    <NavBar v-if="showNavbar" />
    <div class="mx-auto">
      <RouterView />
    </div>
    <MessageToast
      :show="message.show" 
      :msg="message.text" 
      :msg-type="message.type" 
      @close="message.show = false"
    />
  </div>
</template>
