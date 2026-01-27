<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ProfileCard from '@/components/ProfileCard.vue';
import CarsCard from '@/components/CarsCard.vue';
import { getUserRequest } from '@/api/user';
import type { User } from '@/types/user';

const user = ref<User>({
  username: '',
  password: '',
  role: '',
  cars: []
});

async function getUser() {
  const { data } = await getUserRequest();
  user.value = {
    username: data.username,
    password: data.password,
    role: data.role,
    cars: data.cars
  }
}

onMounted(async () => { await getUser(); });
</script>

<template>
  <div class="d-flex flex-column pt-3 pb-5 pb-md-3">
    <ProfileCard :user="user" />
    <CarsCard :cars="user.cars" />
  </div>
</template>

<style scoped>
</style>
