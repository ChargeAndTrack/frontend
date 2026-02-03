<script setup lang="ts">
import { DEFAULT_RADIUS_IN_METERS, getChargingStationRequest, getClosestChargingStationRequest, getNearbyChargingStationsRequest, startRechargeRequest } from '@/api/chargingStations';
import { resolveAddressToCoordinatesRequest, reverseCoordinatesToAddressRequest } from '@/api/location';
import ShowChargingStationModal from '@/components/ShowChargingStationModal.vue';
import FloatingActionButton from '@/components/FloatingActionButton.vue';
import SearchBar from '@/components/SearchBar.vue';
import type { ChargingStation, ChargingStationWithCarPlate, ShowableChargingStation } from '@/types/chargingStation';
import type { Address, Coordinates } from '@/types/location';
import L from 'leaflet';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { getCarsRequest } from '@/api/cars';
import type { Car } from '@/types/car';
import { getSocket } from '@/services/socket';
import { useErrorHandler } from '@/api/errorHandling';

const { showSuccess } = useErrorHandler();

const searchText = ref<string>('');
const currentCoordinates = ref<Coordinates>({ lng: 0, lat: 25 });
const showFindClosestButton = ref(false);

let map: L.Map;
let markersLayer: L.LayerGroup = L.layerGroup();
let markers: Map<string, L.Marker> = new Map();

onMounted(() => {
  getSocket().on('charging-station-updated', onUpdateChargingStation);
  map = L.map('map', { zoomControl: false })
    .setView([currentCoordinates.value.lat, currentCoordinates.value.lng], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    minZoom: 2,
    maxZoom: 19
  }).addTo(map);
  markersLayer.addTo(map);
});
onBeforeUnmount(() => map.remove());

const onUpdateChargingStation = async (payload: { id: string }) => {
  console.log("Update charging station ", payload.id);
  try {
    const updatedChargingStation: ChargingStation = (await getChargingStationRequest(payload.id)).data;
    const marker = markers.get(updatedChargingStation._id);
    if (!marker) {
      throw new Error('Marker not found');
    }
    console.log("Updated charging station data: ", updatedChargingStation);
    const cars = (await getCarsRequest()).data;
    setMarker(marker, updateChargingStationWithCarPlate(updatedChargingStation, cars));
  } catch {}
};

const updateChargingStationWithCarPlate = (chargingStation: ChargingStationWithCarPlate, cars: Car[])
    : ChargingStationWithCarPlate => {
  return { ...chargingStation, currentCarPlate:cars.find(car => car._id === chargingStation.currentCarId)?.plate };
};

const onSearchClosestChargingStation = async () => {
  try {
    const closestChargingStation: ChargingStation = (await getClosestChargingStationRequest(currentCoordinates.value)).data;
    const cars = (await getCarsRequest()).data;
    centerViewAt(currentCoordinates.value.lng, currentCoordinates.value.lat, true);
    addMarkers([updateChargingStationWithCarPlate(closestChargingStation, cars)]);
    showFindClosestButton.value = false;
  } catch {}
};

const onSearchNearbyChargingStations = async () => {
  try {
    const coordinates: Coordinates = (await resolveAddressToCoordinatesRequest(searchText.value)).data;
    currentCoordinates.value = coordinates;
    showFindClosestButton.value = true;
    const chargingStations: ChargingStation[] = (await getNearbyChargingStationsRequest(coordinates)).data;
    centerViewAt(coordinates.lng, coordinates.lat);
    const cars = (await getCarsRequest()).data;
    const updatedChargingStations: ChargingStationWithCarPlate[] = chargingStations.map(
      chargingStation => updateChargingStationWithCarPlate(chargingStation, cars)
    );
    addMarkers(updatedChargingStations);
  } catch {}
};

const centerViewAt = async (longitude: number, latitude: number, keepZoom?: boolean): Promise<void> => {
  keepZoom
    ? map.panTo(L.latLng(latitude, longitude))
    : map.fitBounds(L.latLng(latitude, longitude).toBounds(DEFAULT_RADIUS_IN_METERS));
};

const addMarkers = (chargingStations: ChargingStationWithCarPlate[]): void => {
  getSocket().emit('leave-charging-stations', Array.from(markers.keys()));
  markersLayer.clearLayers();
  markers.clear();
  chargingStations.forEach(chargingStation => {
    const coordinates: Coordinates = {
      lng: chargingStation.location.coordinates[0],
      lat: chargingStation.location.coordinates[1]
    };
    const marker = setMarker(L.marker([coordinates.lat, coordinates.lng]), chargingStation)
      .addTo(markersLayer);
    markers.set(chargingStation._id, marker);
  });
  getSocket().emit('join-charging-stations', Array.from(markers.keys()));
};

const setMarker = (marker: L.Marker, chargingStation: ChargingStationWithCarPlate): L.Marker => {
  const coordinates: Coordinates = {
    lng: chargingStation.location.coordinates[0],
    lat: chargingStation.location.coordinates[1]
  };
  const openPopup = marker.isPopupOpen();
  if (marker.isPopupOpen()) {
    marker.closePopup();
  }
  const color: string = chargingStation.currentCarPlate ? 'text-yellow'
    : chargingStation.available ? 'text-success' : 'text-danger';
  const icon: L.DivIcon = L.divIcon({
    html: `<i class="bi bi-geo-alt-fill ${color} fs-2"></i>`,
    className: '',
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [1, -34]
  });
  const popupContent: string = `
    <strong>Charging Station</strong><br>
    Power: ${chargingStation.power} kW<br>
    <span class="${color}">
      ${chargingStation.currentCarPlate ? `Charging car ${chargingStation.currentCarPlate}`
        : chargingStation.available ? 'Available' : 'Not Available'}
    </span>
    <div class="d-flex justify-content-center mt-1">
      <button type="button" id="viewButton${chargingStation._id}" class="border px-2">View</button>
    </div>`;
  const popupListener = async () => {
    const button = document.getElementById(`viewButton${chargingStation._id}`);
    if (!button) {
      throw new Error('View button not found in charging station ' + chargingStation._id + ' popup');
    }
    button.onclick = async () => await onViewChargingStation(chargingStation, coordinates);
  };
  const updatedMarker = marker.setIcon(icon).bindPopup(popupContent).on('popupopen', popupListener);
  if (openPopup) {
    updatedMarker.openPopup();
  }
  return updatedMarker;
};

const showChargingStationModal = ref(false);
const chargingStationToView = ref<ShowableChargingStation>({
  _id: '',
  power: 0,
  available: true,
  enabled: true,
  location: { type: 'Point', coordinates: [0, 0] },
  address: { street: '', city: '', country: '' }
});
const selectableCars = ref<Car[]>([]);

const onViewChargingStation = async (chargingStation: ChargingStationWithCarPlate, coordinates: Coordinates) => {
  try {
    const cars: Car[] = (await getCarsRequest()).data;
    const chargingCar: Car | undefined = cars.find(car => car._id === chargingStation.currentCarId);
    const address: Address = (await reverseCoordinatesToAddressRequest(coordinates)).data.address;
    chargingStationToView.value = {
      ...chargingStation,
      "address": address,
      "currentCarPlate": chargingCar?.plate
    };
    selectableCars.value = cars.filter(car => !car.isCharging);
    showChargingStationModal.value = true;
  } catch {}
};

const onPlugInCar = async (selectedCarId: string) => {
  try {
    await startRechargeRequest(chargingStationToView.value._id, selectedCarId);
    showChargingStationModal.value = false;
    showSuccess('Car plugged in successfully');
  } catch {}
};
</script>

<template>
  <div class="flex-grow-1 d-flex flex-column position-relative">
    <div class="flex-grow-1">
      <div id="map" class="h-100"></div>
    </div>
    <div class="position-absolute top-0 start-0 end-0 pt-3" style="z-index: 1000;">
      <div class="container-fluid row justify-content-center m-0 p-0">
        <SearchBar class="col-11 col-md-8 shadow p-0" @search="onSearchNearbyChargingStations">
          <template #text-input>
            <input
              type="text"
              class="form-control text-truncate"
              placeholder="Search for an address"        
              aria-label="Search for an address"
              id="searchbar-map"
              v-model="searchText"
            >
          </template>
        </SearchBar>
      </div>
    </div>
    <FloatingActionButton v-if="showFindClosestButton" @click="onSearchClosestChargingStation">
      <template #content>
        <span class="fs-5">Find closest</span>
      </template>
    </FloatingActionButton>
    <ShowChargingStationModal
      v-if="showChargingStationModal"
      :chargingStation="chargingStationToView"
      :cars="selectableCars"
      @cancel="showChargingStationModal = false"
      @plug-in="onPlugInCar"
    />
  </div>
</template>
