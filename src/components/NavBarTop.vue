<script setup lang="ts">
import NavButton from "@/components/NavButton.vue";
import { useAuthenticationStore } from "@/store/authentication.store";

const authenticationStore = useAuthenticationStore();
</script>

<template>
  <nav class="navbar navbar-expand-md bg-primary p-0 z-1">
    <div class="container-fluid d-flex justify-content-between align-items-center p-2">
      <ul class="navbar-nav d-none d-md-flex flex-row gap-md-3 p-2 p-md-0 px-md-3">
        <NavButton route-name="Home" />
        <NavButton route-name="Map" />
        <NavButton route-name="Manage" v-if="authenticationStore.isAdmin()" />
        <NavButton route-name="Profile" />
      </ul>
      <span class="navbar-brand ms-auto mb-0 h1">ChargeAndTrack</span>
    </div>
  </nav>
</template>
