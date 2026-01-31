<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue';
import ChargingStationItem from '@/components/ChargingStationItem.vue';
import type { ChargingStation } from '@/types/chargingStation';
import type { Address } from '@/types/location';
import { reactive, ref } from 'vue';
import ListItemsCard from '@/components/ListItemsCard.vue';
import type { Car } from '@/types/car';
import ChargingCarItem from '@/components/ChargingCarItem.vue';
import { llmSearchRequest } from '@/api/llm';
import { reverseCoordinatesToAddressRequest } from '@/api/location';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const prompt = ref<string>('');
const showChargingStationsList = ref<boolean>(false);
const isChargingStationsListLoading = ref<boolean>(false);

const cars = ref<Car[]>([
  {
    _id: "c1",
    plate: "AB123CD",
    maxBattery: 800,
    currentBattery: 55
  },
  {
    _id: "c2",
    plate: "FE456GH",
    maxBattery: 500,
    currentBattery: 78
  }
]);

const chargingStations = reactive<{
  id: string,
  station: ChargingStation,
  address: Address
}[]>([]);

const clearChargingStationsList = async () => {
  showChargingStationsList.value = false;
  while (chargingStations.pop() !== undefined);
}

async function addChargingStationToList(chargingStation: any) {
  const addr = (await reverseCoordinatesToAddressRequest({
    longitude: chargingStation.location.coordinates[0],
    latitude: chargingStation.location.coordinates[1] }
  )).data;
  chargingStations.push({
    id: chargingStation._id,
    station: { power: chargingStation.power },
    address: { street: addr.address.street, city: addr.address.city }
  });
}

const llmSearch = async (promptText: string) => {
  try {
    await clearChargingStationsList();
    isChargingStationsListLoading.value = true;
    const response = (await llmSearchRequest(promptText)).data;
    (response instanceof Array)
      ? response.forEach(async (cs) => await addChargingStationToList(cs))
      : await addChargingStationToList(response);
    showChargingStationsList.value = true;
  } catch {
  } finally {
    isChargingStationsListLoading.value = false;
  }
};
</script>

<template>
  <div class="container-fluid justify-content-center">
    <SearchBar v-model:search-text="prompt" @search="llmSearch">
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

    <ListItemsCard v-if="showChargingStationsList" class="pb-5">
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
          :key="chargingStation.id"
          :charging-station="chargingStation.station"
          :charging-station-address="chargingStation.address"
        />
      </template>
    </ListItemsCard>

    <div class="container-fluid pb-2 pt-5">
      <div class="row row-cols-1 row-cols-md-2 justify-content-center mb-5">
        <ChargingCarItem
          v-for="car in cars"
          :key="car.plate"
          :car="car"
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