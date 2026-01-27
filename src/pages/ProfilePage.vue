<script setup lang="ts">
import { ref } from 'vue';
import ProfileCard from '@/components/ProfileCard.vue';
import CarsCard from '@/components/CarsCard.vue';

const user = ref({
  username: 'user1',
  password: 'user11234',
  role: 'Base user'
});
const cars = ref([
  { plate: 'AB123CD', capacity: 2000 },
  { plate: 'EF456GH', capacity: 2000 },
  { plate: 'IJ789KL', capacity: 1500 },
  { plate: 'MN123OP', capacity: 1500 },
  { plate: 'QR456ST', capacity: 1800 },
  { plate: 'UV789WX', capacity: 1800 },
  { plate: 'YZ123AB', capacity: 1800 }
]);
</script>

<template>
  <div class="d-flex flex-column pt-3 pb-5 pb-md-3">
    <ProfileCard :user="user" />
    <CarsCard :cars="cars" />
  </div>
</template>

<style scoped>
</style>
