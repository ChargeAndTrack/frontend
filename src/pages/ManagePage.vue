<script setup lang="ts">
import { addChargingStationRequest, getClosestChargingStationRequest, removeChargingStationRequest, updateChargingStationRequest } from '@/api/chargingStations';
import { resolveAddressToCoordinatesRequest, reverseCoordinatesToAddressRequest } from '@/api/location';
import ChargingStationCardExpanded from '@/components/ChargingStationCardExpanded.vue';
import ChargingStationModal from '@/components/ChargingStationModal.vue';
import FloatingActionButton from '@/components/FloatingActionButton.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import SearchBar from '@/components/SearchBar.vue';
import type { ChargingStation, ChargingStationBody } from '@/types/chargingStation';
import { createGeoPoint, type Address, type Coordinates } from '@/types/location';
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
  station: ChargingStation,
  address: Address
}>({
  station: { _id: '', power: 0 },
  address: { street: '', city: '' }
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
      longitude: res.location.coordinates[0],
      latitude: res.location.coordinates[1]
    };
    chargingStation.station = {
      _id: res._id,
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
    showChargingStationCard();
  } catch {
  } finally {
    isLoading.value = false;
  }
}

const addChargingStation = async (power: number, address: string) => {
  try {
    const coordinates = (await resolveAddressToCoordinatesRequest(address)).data;
    const chargingStationToAdd: ChargingStationBody = {
      "power": power,
      location: createGeoPoint({ latitude: coordinates.lat, longitude: coordinates.lng})
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
    <SearchBar v-model:search-text="searchText" @search="searchClosestChargingStation">
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
    <div class="row justify-content-center">
      <LoadingSpinner v-if="isLoading" />
      <ChargingStationCardExpanded
        v-else-if="showChargingStation"
        :chargingStation="chargingStation.station"
        :chargingStationAddress="chargingStation.address"
        @remove-charging-station="showConfirmModal = true"
        @update-charging-station="updateChargingStation"
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
    <ConfirmDeleteModal
      v-if="showConfirmModal"
      :subject="'this charging station'"
      @cancel="showConfirmModal = false"
      @confirm="removeChargingStation"
    />
    <FloatingActionButton @open-modal="openModal" />
  </div>
</template>

<style scoped>
</style>
