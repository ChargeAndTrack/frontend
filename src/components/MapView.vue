<script setup lang="ts">
import { onMounted } from 'vue';
import L from 'leaflet';

let map: L.Map;

onMounted(() => {
  map = L.map('map', { zoomControl: false }).setView([45.4642, 9.1900], 13); // Milano example

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map);
})
</script>

<template>
  <div id="map" class="h-100"></div>
</template>
