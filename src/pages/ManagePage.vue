<script setup lang="ts">
import { getClosestChargingStationRequest } from '@/api/chargingStations';
import { reverseCoordinatesToAddressRequest } from '@/api/location';
import ChargingStationCardExpanded from '@/components/ChargingStationCardExpanded.vue';
import ChargingStationModal from '@/components/ChargingStationModal.vue';
import FloatingActionButton from '@/components/FloatingActionButton.vue';
import SearchBar from '@/components/SearchBar.vue';
import type { ChargingStation } from '@/types/chargingStation';
import type { Address, Coordinates } from '@/types/location';
import { reactive, ref } from 'vue';

const isModalVisible = ref(false);
const chargingStation = reactive<{
  id: string,
  station: ChargingStation,
  address: Address
}>({
  id: '',
  station: { power: 0 },
  address: { street: '', houseNumber: 0, city: '' }
});

const openModal = () => isModalVisible.value = true;
const closeModal = () => isModalVisible.value = false;

const searchClosestChargingStation = async (input: string) => {
  const res = (await getClosestChargingStationRequest(input)).data;
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
      coordinates: coords
    }
  };
  const address = (await reverseCoordinatesToAddressRequest(coords)).data.address;
  chargingStation.address = {
    street: address.street,
    houseNumber: Number(address.houseNumber),
    city: address.city
  };
}

const addChargingStation = async () => {};

</script>

<template>
  <div class="container-fluid justify-content-center overflow-y-hidden">
    <SearchBar @search="searchClosestChargingStation" />
    <div class="row justify-content-center">
      <ChargingStationCardExpanded
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