<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue';
import ChargingStationItem from '@/components/ChargingStationItem.vue';
import type { ChargingStation, UpdatableChargingStation } from '@/types/chargingStation';
import { formatAddress, type Address } from '@/types/location';
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import ListItemsCard from '@/components/ListItemsCard.vue';
import type { Car } from '@/types/car';
import ChargingCarItem from '@/components/ChargingCarItem.vue';
import { llmSearchRequest } from '@/api/llm';
import { reverseCoordinatesToAddressRequest } from '@/api/location';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { getChargingStationRequest, stopRechargeRequest } from '@/api/chargingStations';
import { getSocket } from '@/services/socket';
import { getCarRequest, getCarsRequest } from '@/api/cars';
import { useChargingStore } from '@/store/charging.store';
import { useErrorHandler } from '@/api/errorHandling';

const chargingStore = useChargingStore();
const { showSuccess } = useErrorHandler();

const prompt = ref<string>('');
const showChargingStationsList = ref<boolean>(false);
const isChargingStationsListLoading = ref<boolean>(false);

const carsCharging = ref<{ car: Car, chargingStation: ChargingStation, animation: boolean }[]>([]);

const chargingStations = reactive<{
  station: UpdatableChargingStation,
  address: Address
}[]>([]);

const clearChargingStationsList = async () => {
  showChargingStationsList.value = false;
  while (chargingStations.pop() !== undefined);
}

const addChargingCar = async (carId: string, chargingStationId: string) => {
  try {
    const car: Car = (await getCarRequest(carId)).data;
    const chargingStation: ChargingStation = (await getChargingStationRequest(chargingStationId)).data;
    carsCharging.value.push({ "car": car, "chargingStation": chargingStation, "animation": false });
  } catch {}
};

const rechargeUpdateCallback = (data: any) => {
  const itemToUpdate = carsCharging.value.find(c => c.car._id === data.id);
  if (itemToUpdate?.car !== undefined) {
    itemToUpdate.car.currentBattery = data.level;
    itemToUpdate.animation = true;
    setTimeout(() => (itemToUpdate.animation = false), 2000);
    if (data.level >= 100) {
      removeChargingCar(itemToUpdate.car._id);
      showSuccess(`Car ${itemToUpdate.car.plate} completed the recharge.`);
    }
  }
};

const removeChargingCar = (carId: string) => {
  getSocket().emit('stop-recharge', carId);
  const itemIndex = carsCharging.value.findIndex(c => c.car._id === carId);
  if (itemIndex !== -1) {
    carsCharging.value.splice(itemIndex, 1);
  }
  chargingStore.remove(carId);
}

const stopRecharge = async (carId: string, chargingStationId: string) => {
  try {
    await stopRechargeRequest(chargingStationId, carId);
    removeChargingCar(carId);
  } catch {}
}

async function addChargingStationToList(chargingStation: any) {
  const addr = (await reverseCoordinatesToAddressRequest({
    lng: chargingStation.location.coordinates[0],
    lat: chargingStation.location.coordinates[1] }
  )).data;
  chargingStations.push({
    station: { _id: chargingStation._id, power: chargingStation.power },
    address: {
      street: addr.address.street,
      houseNumber: addr.address.houseNumber,
      city: addr.address.city,
      country: addr.address.country
    }
  });
}

const llmSearch = async () => {
  try {
    await clearChargingStationsList();
    isChargingStationsListLoading.value = true;
    const response = (await llmSearchRequest(prompt.value)).data;
    (response instanceof Array)
      ? response.forEach(async (cs) => await addChargingStationToList(cs))
      : await addChargingStationToList(response);
    showChargingStationsList.value = true;
  } catch {
  } finally {
    isChargingStationsListLoading.value = false;
  }
};

onMounted(async () => {
  try {
    const cars = (await getCarsRequest()).data;
    cars.forEach(car => {
      if (car.currentChargingStationId) {
        getSocket().emit('start-recharge', car._id);
        chargingStore.add(car._id, car.currentChargingStationId!);
      } else {
        removeChargingCar(car._id);
      }
    });
  } catch {}
  getSocket().on('recharge-update', rechargeUpdateCallback);
  chargingStore.inCharge.forEach((item) => addChargingCar(item.carId, item.chargingStationId));
});
onBeforeUnmount(() => {
  getSocket().off('recharge-update', rechargeUpdateCallback);
});
</script>

<template>
  <div class="container-fluid justify-content-center">
    <SearchBar class="row py-4 px-2" @search="llmSearch">
      <template #text-input>
        <label for="llm-search-textarea" hidden>Ask to an LLM to find charging stations</label>
        <textarea
          class="form-control"
          id="llm-search-textarea"
          placeholder="Ask to an LLM to find charging stations"
          v-model="prompt"
        ></textarea>
      </template>
    </SearchBar>

    <LoadingSpinner v-if="isChargingStationsListLoading" />

    <ListItemsCard v-if="showChargingStationsList" class="pb-5 mt-3">
      <template #card-header>
        <div class="d-flex justify-content-between align-items-center pb-2">
          <h5 class="card-title">Charging stations</h5>
          <button type="button" class="btn btn-danger rounded-4" @click="clearChargingStationsList">
            Clear
          </button>
        </div>
      </template>
      <template #card-body>
        <ChargingStationItem
          v-for="chargingStation in chargingStations"
          :key="chargingStation.station._id"
          :charging-station="chargingStation.station"
          :charging-station-address="formatAddress(chargingStation.address)"
        />
      </template>
    </ListItemsCard>

    <div class="container-fluid pb-2 pt-5">
      <div class="row row-cols-1 row-cols-md-2 justify-content-center mb-5">
        <ChargingCarItem
          v-for="car in carsCharging"
          :key="car.car.plate"
          :car="car.car"
          :charging-station="car.chargingStation"
          :animation="car.animation"
          @stop-recharge="stopRecharge"
          class="col-10 col-md-5 m-2"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea {
  height: 100% !important
}
</style>
