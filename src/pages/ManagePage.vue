<script setup lang="ts">
import ChargingStationCardExpanded from '@/components/ChargingStationCardExpanded.vue';
import FloatingActionButton from '@/components/FloatingActionButton.vue';
import SearchBar from '@/components/SearchBar.vue';
</script>

<template>
  <div class="container-fluid justify-content-center overflow-y-hidden">
    <SearchBar />
    <div class="row justify-content-center">
      <ChargingStationCardExpanded />
    </div>
    <FloatingActionButton />
  </div>
</template>

<style scoped>
</style>