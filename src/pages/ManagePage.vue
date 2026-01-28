<script setup lang="ts">
import { addChargingStationRequest, getClosestChargingStationRequest } from '@/api/chargingStations';
import { resolveAddressToCoordinatesRequest, reverseCoordinatesToAddressRequest } from '@/api/location';
import ChargingStationCardExpanded from '@/components/ChargingStationCardExpanded.vue';
import ChargingStationModal from '@/components/ChargingStationModal.vue';
import FloatingActionButton from '@/components/FloatingActionButton.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import SearchBar from '@/components/SearchBar.vue';
import type { ChargingStation } from '@/types/chargingStation';
import { createGeoPoint, type Address, type Coordinates } from '@/types/location';
import { reactive, ref } from 'vue';

const isModalVisible = ref<boolean>(false);
const showChargingStation = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const chargingStation = reactive<{
  id: string,
  station: ChargingStation,
  address: Address
}>({
  id: '',
  station: { power: 0 },
  address: { street: '', city: '' }
});

const openModal = () => isModalVisible.value = true;
const closeModal = () => isModalVisible.value = false;

const searchClosestChargingStation = async (input: string) => {
  isLoading.value = true;
  showChargingStation.value = false;
  try {
    const res = (await getClosestChargingStationRequest(input)).data;
    showChargingStation.value = true;
    chargingStation.id = res._id;
    const coords: Coordinates = {
      longitude: res.location.coordinates[0],
      latitude: res.location.coordinates[1]
    };
    chargingStation.station = {
      power: res.power,
      enabled: res.enabled ?? true,
      location: {
        type: res.location.type,
        coordinates: [coords.longitude, coords.latitude]
      }
    };
    const address = (await reverseCoordinatesToAddressRequest(coords)).data.address;
    chargingStation.address = {
      street: address.street,
      city: address.city
    };
    showChargingStation.value = true;
  } finally {
    isLoading.value = false;
  }
}

const addChargingStation = async (power: number, address: string) => {
  const coordinates = (await resolveAddressToCoordinatesRequest(address)).data;
  console.log("Coordinates: " + coordinates.lat);
  const chargingStationToAdd: ChargingStation = {
    "power": power,
    location: createGeoPoint({ latitude: coordinates.lat, longitude: coordinates.lng})
  }
  console.log(await addChargingStationRequest(chargingStationToAdd));
  closeModal();
};

</script>

<template>
  <div class="container-fluid justify-content-center overflow-y-hidden">
    <SearchBar @search="searchClosestChargingStation" />
    <div class="row justify-content-center">
      <LoadingSpinner v-if="isLoading" />
      <ChargingStationCardExpanded
        v-else-if="showChargingStation"
        :charging-station-id="chargingStation.id"
        :chargingStation="chargingStation.station"
        :chargingStationAddress="chargingStation.address"
      />
    </div>
    <ChargingStationModal
      v-if="isModalVisible"
      :show="isModalVisible"
      :charging-station="chargingStation.station"
      :chargingStationAddress="chargingStation.address"
      @add-charging-station="addChargingStation"
      @close="closeModal"
    />
    <FloatingActionButton @open-modal="openModal" />
  </div>
</template>

<style scoped>
</style>
