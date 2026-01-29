<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ProfileCard from '@/components/ProfileCard.vue';
import CarsCard from '@/components/CarsCard.vue';
import CarModal from '@/components/CarModal.vue';
import { getUserRequest } from '@/api/user';
import type { User } from '@/types/user';
import type { CarBody, Car } from '@/types/car';
import { addCarRequest, deleteCarRequest, getCarRequest, updateCarRequest } from '@/api/cars';
import type { AxiosResponse } from 'axios';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue';

const error = ref('');
const user = ref<User>({
  username: '',
  password: '',
  role: '',
  cars: []
});

const getUser = async (): Promise<void> => {
  error.value = '';
  try {
    const response: AxiosResponse<User> = await getUserRequest();
    user.value = response.data;
  } catch (err: any) {
    error.value = 'Failed to load user data.';
  }
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
  error.value = '';
  editCarId.value = carId;
  try {
    const response: AxiosResponse<Car> = await getCarRequest(carId);
    editCarData.value = response.data;
    showEditCarModal.value = true;
  } catch (err: any) {
    error.value = 'Failed to load car data.';
  }
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

// Delete car logic
const showConfirmDeleteModal = ref(false);
const deleteCarId = ref<string>('');
const deleteCarPlate = ref<string>('');
const deleteCarError = ref('');
const onDeleteCar = async (carData: { id: string, plate: string }): Promise<void> => {
  deleteCarId.value = carData.id;
  deleteCarPlate.value = carData.plate;
  showConfirmDeleteModal.value = true;
}
const onConfirmDeleteCar = async (): Promise<void> => {
  deleteCarError.value = '';
  try {
    const response: AxiosResponse<{ cars: Car[] }> = await deleteCarRequest(deleteCarId.value);
    user.value.cars = response.data.cars;
    showConfirmDeleteModal.value = false;
  } catch (err: any) {
    deleteCarError.value = 'Failed to delete car.';
  }
}
</script>

<template>
  <div class="d-flex flex-column align-items-center pt-3 pb-5 pb-md-3">
    <p v-if="error" class="text-danger">{{ error }}</p>
    <ProfileCard :user="user" />
    <CarsCard :cars="user.cars" @add-car="onAddCar" @edit-car="onEditCar" @delete-car="onDeleteCar"/>
    <CarModal
      v-if="showAddCarModal"
      :error="addCarError"
      @cancel="showAddCarModal = false; addCarError = ''"
      @confirm="onConfirmAddCar"
    />
    <CarModal
      v-if="showEditCarModal"
      :currentCar="editCarData"
      :error="editCarError"
      @cancel="showEditCarModal = false; editCarError = ''"
      @confirm="onConfirmEditCar"
    />
    <ConfirmDeleteModal
      v-if="showConfirmDeleteModal"
      :subject="`car ${deleteCarPlate}`"
      :error="deleteCarError"
      @cancel="showConfirmDeleteModal = false; deleteCarError = ''"
      @confirm="onConfirmDeleteCar"
    />
  </div>
</template>
