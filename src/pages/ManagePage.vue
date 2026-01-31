<script setup lang="ts">
import { addChargingStationRequest, getClosestChargingStationRequest, removeChargingStationRequest, updateChargingStationRequest } from '@/api/chargingStations';
import { resolveAddressToCoordinatesRequest, reverseCoordinatesToAddressRequest } from '@/api/location';
import ChargingStationCardExpanded from '@/components/ChargingStationCardExpanded.vue';
import AddChargingStationModal from '@/components/AddChargingStationModal.vue';
import FloatingActionButton from '@/components/FloatingActionButton.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import SearchBar from '@/components/SearchBar.vue';
import type { AddChargingStationBody, UpdatableChargingStation } from '@/types/chargingStation';
import { createGeoPoint, formatAddress, type Address, type Coordinates } from '@/types/location';
import { reactive, ref } from 'vue';
import { useErrorHandler } from '@/api/errorHandling';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue';

const { showSuccess } = useErrorHandler();

const searchText = ref<string>('');
const isModalVisible = ref<boolean>(false);
const showChargingStation = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const showConfirmModal = ref<boolean>(false);

const chargingStation = reactive<{
  station: UpdatableChargingStation,
  address: Address
}>({
  station: { _id: '', power: 0, enabled: true, location: { type: 'Point', coordinates: [0, 0] } },
  address: { street: '', city: '', country: '' }
});

const openModal = () => isModalVisible.value = true;
const closeModal = () => isModalVisible.value = false;
const showChargingStationCard = () => showChargingStation.value = true;
const hideChargingStationCard = () => showChargingStation.value = false;

const searchClosestChargingStation = async (input: string) => {
  isLoading.value = true;
  hideChargingStationCard()
  try {
    const res = (await getClosestChargingStationRequest(input)).data;
    showChargingStationCard();
    const coords: Coordinates = {
      lng: res.location.coordinates[0],
      lat: res.location.coordinates[1]
    };
    chargingStation.station = {
      _id: res._id,
      power: res.power,
      enabled: res.enabled,
      location: {
        type: res.location.type,
        coordinates: [coords.lng, coords.lat]
      }
    };
    const address = (await reverseCoordinatesToAddressRequest(coords)).data.address;
    chargingStation.address = {
      street: address.street,
      houseNumber: address.houseNumber,
      city: address.city,
      country: address.country
    };
    showChargingStationCard();
  } catch {
  } finally {
    isLoading.value = false;
  }
}

const addChargingStation = async (power: number, address: string) => {
  try {
    const coordinates = (await resolveAddressToCoordinatesRequest(address)).data;
    const chargingStationToAdd: AddChargingStationBody = {
      "power": power,
      location: createGeoPoint(coordinates)
    }
    await addChargingStationRequest(chargingStationToAdd);
    closeModal();
    showSuccess("Add charging station successfully");
  } catch {}
};

const updateChargingStation = async () => {
  try {
    await updateChargingStationRequest(chargingStation.station);
    showSuccess("Update the charging station successfully");
  } catch {}
};

const removeChargingStation = async () => {
  try {
    await removeChargingStationRequest(chargingStation.station._id);
    showSuccess("Removed successfully the charging station!");
    hideChargingStationCard();
    showConfirmModal.value = false;
  } catch {}
};
</script>

<template>
  <div class="container-fluid justify-content-center overflow-y-hidden">
    <SearchBar class="row py-4 px-2 sticky-top" v-model:search-text="searchText" @search="searchClosestChargingStation">
      <template #text-input>
        <input
          type="text"
          class="form-control text-truncate"
          placeholder="Search closest charging station to an address"
          aria-label="Search closest charging station to an address"
          id="searchbar-closest"
          v-model="searchText"
        >
      </template>
    </SearchBar>
    <div class="row justify-content-center mt-3">
      <LoadingSpinner v-if="isLoading" />
      <ChargingStationCardExpanded
        v-else-if="showChargingStation"
        :chargingStation="chargingStation.station"
        :chargingStationAddress="formatAddress(chargingStation.address)"
        @remove-charging-station="showConfirmModal = true"
        @update-charging-station="updateChargingStation"
      />
    </div>
    <AddChargingStationModal
      v-if="isModalVisible"
      :show="isModalVisible"
      :chargingStationAddress="chargingStation.address"
      @add-charging-station="addChargingStation"
      @close="closeModal"
    />
    <ConfirmDeleteModal
      v-if="showConfirmModal"
      :subject="'this charging station'"
      @cancel="showConfirmModal = false"
      @confirm="removeChargingStation"
    />
    <FloatingActionButton @click="openModal">
      <template #content>
        <i class="bi bi-plus fs-3"></i>
      </template>
    </FloatingActionButton>
  </div>
</template>

<style scoped>
</style>
