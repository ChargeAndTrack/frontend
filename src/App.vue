<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, onMounted } from 'vue';
import NavBarTop from './components/NavBarTop.vue';
import NavBarBottom from './components/NavBarBottom.vue';
import { useAuthenticationStore } from './store/authentication.store';
import { useErrorHandler } from './api/errorHandling';
import MessageToast from './components/MessageToast.vue';
import { useChargingStore } from './store/charging.store';

const route = useRoute();
const authenticationStore = useAuthenticationStore();
const chargingStore = useChargingStore();

const { message } = useErrorHandler();

const showNavbar = computed(() => {
  return route.name !== 'Login';
});

onMounted(() => {
  authenticationStore.restoreSession();
  chargingStore.restoreSession();
});
</script>

<template>
  <div
    data-bs-theme="custom"
    class="d-flex flex-column min-vh-100"
    :class="{ 'login-bg' : !showNavbar }"
  >
    <NavBarTop v-if="showNavbar" class="sticky-top" />
    <div class="flex-grow-1 d-flex pb-4 pb-md-0">
      <RouterView />
    </div>
    <NavBarBottom v-if="showNavbar" class="d-md-none mt-auto fixed-bottom" />
    <MessageToast
      :show="message.show" 
      :msg="message.text" 
      :msg-type="message.type" 
      @close="message.show = false"
    />
  </div>
</template>
