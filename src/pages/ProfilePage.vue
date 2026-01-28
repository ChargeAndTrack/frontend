<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ProfileCard from '@/components/ProfileCard.vue';
import CarsCard from '@/components/CarsCard.vue';
import CarModal from '@/components/CarModal.vue';
import { getUserRequest } from '@/api/user';
import type { User } from '@/types/user';
import type { CarBody, Car } from '@/types/car';
import { addCarRequest, getCarRequest, updateCarRequest } from '@/api/cars';
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

// Add car logic
const showAddCarModal = ref(false);
const addCarError = ref('');
const onAddCar = (): void => {
  showAddCarModal.value = true;
}
const onConfirmAddCar = async (car: CarBody): Promise<void> => {
  addCarError.value = '';
  try {
    const response: AxiosResponse<Car> = await addCarRequest(car);
    user.value.cars.push(response.data);
    showAddCarModal.value = false;
  } catch (err: any) {
    addCarError.value = 'Failed to add car.';
  }
}

// Edit car logic
const showEditCarModal = ref(false);
const editCarId = ref<string>('');
const editCarData = ref<CarBody>({ plate: '', maxBattery: 0 });
const editCarError = ref('');
const onEditCar = async (carId: string): Promise<void> => {
  editCarId.value = carId;
  const response: AxiosResponse<Car> = await getCarRequest(carId);
  editCarData.value = response.data;
  showEditCarModal.value = true;
}
const onConfirmEditCar = async (car: CarBody): Promise<void> => {
  editCarError.value = '';
  try {
    const response: AxiosResponse<Car> = await updateCarRequest(editCarId.value, car);
    user.value.cars[user.value.cars.findIndex(c => c._id === editCarId.value)] = response.data;
    showEditCarModal.value = false;
  } catch (err: any) {
    editCarError.value = 'Failed to edit car.';
  }
}
</script>

<template>
  <div class="d-flex flex-column pt-3 pb-5 pb-md-3">
    <ProfileCard :user="user" />
    <CarsCard :cars="user.cars" @add-car="onAddCar" @edit-car="onEditCar" />
    <CarModal
      v-if="showAddCarModal"
      :error="addCarError"
      @cancel="showAddCarModal = false"
      @confirm="onConfirmAddCar"
    />
    <CarModal
      v-if="showEditCarModal"
      :currentCar="editCarData"
      :error="editCarError"
      @cancel="showEditCarModal = false"
      @confirm="onConfirmEditCar"
    />
  </div>
</template>
