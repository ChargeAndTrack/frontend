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
import MessageToast from '@/components/MessageToast.vue';
import { MessageType } from '@/types/message';
import { useErrorHandler } from '@/api/errorHandling';

const { showSuccess } = useErrorHandler();

const user = ref<User>({
  username: '',
  password: '',
  role: '',
  cars: []
});

const getUser = async (): Promise<void> => {
  try {
    const response: AxiosResponse<User> = await getUserRequest();
    user.value = response.data;
  } catch {}
}

onMounted(async () => { await getUser(); });

// Add car logic
const showAddCarModal = ref(false);
const onAddCar = (): void => {
  showAddCarModal.value = true;
}
const onConfirmAddCar = async (car: CarBody): Promise<void> => {
  try {
    const response = await addCarRequest(car);
    user.value.cars.push(response.data);
    showAddCarModal.value = false;
    showSuccess('Car added successfully');
  } catch {}
}

// Edit car logic
const showEditCarModal = ref(false);
const editCarId = ref<string>('');
const editCarData = ref<CarBody>({ plate: '', maxBattery: 0 });
const onEditCar = async (carId: string): Promise<void> => {
  editCarId.value = carId;
  try {
    const response: AxiosResponse<Car> = await getCarRequest(carId);
    editCarData.value = response.data;
    showEditCarModal.value = true;
  } catch {}
}
const onConfirmEditCar = async (car: CarBody): Promise<void> => {
  try {
    const response: AxiosResponse<Car> = await updateCarRequest(editCarId.value, car);
    user.value.cars[user.value.cars.findIndex(c => c._id === editCarId.value)] = response.data;
    showEditCarModal.value = false;
    showSuccess('Car updated successfully');
  } catch {}
}

// Delete car logic
const showConfirmDeleteModal = ref(false);
const deleteCarId = ref<string>('');
const deleteCarPlate = ref<string>('');
const onDeleteCar = async (carData: { id: string, plate: string }): Promise<void> => {
  deleteCarId.value = carData.id;
  deleteCarPlate.value = carData.plate;
  showConfirmDeleteModal.value = true;
}
const onConfirmDeleteCar = async (): Promise<void> => {
  try {
    const response: AxiosResponse<{ cars: Car[] }> = await deleteCarRequest(deleteCarId.value);
    user.value.cars = response.data.cars;
    showConfirmDeleteModal.value = false;
    showSuccess('Car deleted successfully');
  } catch {}
}

const toast = ref<{show: boolean, msg: string, type: MessageType }>({ show: false, msg: '', type: MessageType.Info });
</script>

<template>
  <div class="d-flex flex-column align-items-center pt-3 pb-5 pb-md-3">
    <ProfileCard :user="user" />
    <CarsCard :cars="user.cars" @add-car="onAddCar" @edit-car="onEditCar" @delete-car="onDeleteCar"/>
    <CarModal
      v-if="showAddCarModal"
      @cancel="showAddCarModal = false"
      @confirm="onConfirmAddCar"
    />
    <CarModal
      v-if="showEditCarModal"
      :currentCar="editCarData"
      @cancel="showEditCarModal = false"
      @confirm="onConfirmEditCar"
    />
    <ConfirmDeleteModal
      v-if="showConfirmDeleteModal"
      :subject="`car ${deleteCarPlate}`"
      @cancel="showConfirmDeleteModal = false"
      @confirm="onConfirmDeleteCar"
    />
    <MessageToast
      :show="toast.show"
      :msg="toast.msg"
      :msg-type="toast.type"
      @close="toast.show = false"
    />
  </div>
</template>
