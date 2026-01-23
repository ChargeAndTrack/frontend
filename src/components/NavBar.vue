<script setup lang="ts">
import NavButton from "@/components/NavButton.vue";
</script>

<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <NavButton route-name="Login" />
          <NavButton route-name="Home" />
          <NavButton route-name="Map" />
          <NavButton route-name="Manage" />
          <NavButton route-name="Profile" />
        </ul>
      </div>
      <span class="navbar-brand mb-0 h1">ChargeAndTrack</span>
    </div>
  </nav>
</template>

<style scoped>
</style>