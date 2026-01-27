<script setup lang="ts">
import NavButton from "@/components/NavButton.vue";
import { useAuthenticationStore } from "@/store/authentication.store";

const authenticationStore = useAuthenticationStore();
</script>

<template>
  <nav class="navbar bg-primary p-0 z-1">
    <div class="container-fluid d-block">
      <div class="fixed-md-top bg-primary d-flex justify-content-between p-2">
        <ul class="navbar-nav d-none d-md-flex flex-row gap-md-3 p-2 p-md-0 px-md-3">
          <NavButton route-name="Home" />
          <NavButton route-name="Map" />
          <NavButton route-name="Manage" v-if="authenticationStore.isAdmin()" />
          <NavButton route-name="Profile" />
        </ul>
        <span class="navbar-brand ms-auto mb-0 h1">ChargeAndTrack</span>
      </div>

      <div class="fixed-bottom d-md-none bg-primary">
        <ul class="navbar-nav flex-row gap-md-3 p-2 p-md-0 px-md-3 justify-content-around justify-content-center">
          <NavButton route-name="Home" icon-name="house" />
          <NavButton route-name="Map" icon-name="geo-alt-fill" />
          <NavButton route-name="Manage" v-if="authenticationStore.isAdmin()" icon-name="tools" />
          <NavButton route-name="Profile" icon-name="person" />
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
</style>