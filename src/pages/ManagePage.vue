<script setup lang="ts">
import { addChargingStationRequest, getClosestChargingStationRequest, removeChargingStationRequest, updateChargingStationRequest } from '@/api/chargingStations';
import { resolveAddressToCoordinatesRequest, reverseCoordinatesToAddressRequest } from '@/api/location';
import ChargingStationCardExpanded from '@/components/ChargingStationCardExpanded.vue';
import AddChargingStationModal from '@/components/AddChargingStationModal.vue';
import FloatingActionButton from '@/components/FloatingActionButton.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import SearchBar from '@/components/SearchBar.vue';
import type { AddChargingStationBody, UpdatableChargingStation } from '@/types/chargingStation';
import { formatAddress, type Address, type Location } from '@/types/location';
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
  station: { _id: '', power: 0, enabled: true, location: { longitude: 0, latitude: 0 } },
  address: { street: '', city: '', country: '' }
});

const openModal = () => isModalVisible.value = true;
const closeModal = () => isModalVisible.value = false;
const showChargingStationCard = () => showChargingStation.value = true;
const hideChargingStationCard = () => showChargingStation.value = false;

const searchClosestChargingStation = async () => {
  isLoading.value = true;
  hideChargingStationCard()
  try {
    const res = (await getClosestChargingStationRequest(searchText.value)).data;
    showChargingStationCard();
    const location: Location = {
      longitude: res.location.longitude,
      latitude: res.location.latitude
    };
    chargingStation.station = {
      _id: res._id,
      power: res.power,
      enabled: res.enabled,
      location: {
        longitude: location.longitude,
        latitude: location.latitude
      }
    };
    const address = (await reverseCoordinatesToAddressRequest(location)).data;
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
      location: {
        longitude: coordinates.longitude,
        latitude: coordinates.latitude
      }
    }
    await addChargingStationRequest(chargingStationToAdd);
    closeModal();
    showSuccess("Charging station added successfully");
  } catch {}
};

const updateChargingStation = async () => {
  try {
    await updateChargingStationRequest(chargingStation.station);
    showSuccess("Charging station updated successfully");
  } catch {}
};

const removeChargingStation = async () => {
  try {
    await removeChargingStationRequest(chargingStation.station._id);
    showSuccess("Charging station removed successfully");
    hideChargingStationCard();
    showConfirmModal.value = false;
  } catch {}
};
</script>

<template>
  <div class="container-fluid justify-content-center overflow-y-hidden">
    <SearchBar class="row py-4 px-2" @search="searchClosestChargingStation">
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
