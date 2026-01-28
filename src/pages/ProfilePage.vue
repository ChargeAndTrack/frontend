<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ProfileCard from '@/components/ProfileCard.vue';
import CarsCard from '@/components/CarsCard.vue';
import AddCarModal from '@/components/AddCarModal.vue';
import { getUserRequest } from '@/api/user';
import type { User } from '@/types/user';
import type { AddCarBody, Car } from '@/types/car';
import { addCarRequest } from '@/api/cars';
import type { AxiosResponse } from 'axios';

const user = ref<User>({
  username: '',
  password: '',
  role: '',
  cars: []
});

const getUser = async (): Promise<void> => {
  const response: AxiosResponse<User> = await getUserRequest();
  user.value = response.data;
}

onMounted(async () => { await getUser(); });

const showAddCarModal = ref(false);
const addCarError = ref('');
const onAddCar = (): void => {
  showAddCarModal.value = true;
}
const onConfirmAddCar = async (car: AddCarBody): Promise<void> => {
  try {
    const addResponse: AxiosResponse<Car> = await addCarRequest(car);
    user.value.cars.push(addResponse.data);
    showAddCarModal.value = false;
  } catch (err: any) {
    addCarError.value = 'Failed to add car.';
  }
}
</script>

<template>
  <div class="d-flex flex-column pt-3 pb-5 pb-md-3">
    <ProfileCard :user="user" />
    <CarsCard :cars="user.cars" @add-car="onAddCar" />
    <AddCarModal
      v-if="showAddCarModal"
      :error="addCarError"
      @cancel-add="showAddCarModal = false"
      @confirm-add="onConfirmAddCar"
    />
  </div>
</template>

<style scoped>
</style>
