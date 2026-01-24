<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import NavBar from '@/components/NavBar.vue';

const route = useRoute()

const showNavbar = computed(() => {
  return route.name !== 'Login';
});
</script>

<template>
  <div data-bs-theme="custom" class="overflow-x-hidden" :class="{ 'login-bg' : !showNavbar }">
    <NavBar v-if="showNavbar" />
    <div class="mx-auto">
      <RouterView />
    </div>
  </div>
</template>
