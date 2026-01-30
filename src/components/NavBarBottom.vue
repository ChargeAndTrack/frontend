<script setup lang="ts">
import NavButton from "@/components/NavButton.vue";
import { useAuthenticationStore } from "@/store/authentication.store";

const authenticationStore = useAuthenticationStore();
</script>

<template>
  <nav class="navbar bg-primary">
    <ul class="navbar-nav flex-row justify-content-around w-100 px-2">
      <NavButton route-name="Home" icon-name="house" />
      <NavButton route-name="Map" icon-name="geo-alt-fill" />
      <NavButton route-name="Manage" v-if="authenticationStore.isAdmin()" icon-name="tools" />
      <NavButton route-name="Profile" icon-name="person" />
    </ul>
  </nav>
</template>
