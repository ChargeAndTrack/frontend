<script setup lang="ts">
import { DEFAULT_RADIUS_IN_METERS, getChargingStationRequest, getClosestChargingStationRequest, getNearbyChargingStationsRequest, startRechargeRequest } from '@/api/chargingStations';
import { resolveAddressToCoordinatesRequest, reverseCoordinatesToAddressRequest } from '@/api/location';
import ShowChargingStationModal from '@/components/ShowChargingStationModal.vue';
import FloatingActionButton from '@/components/FloatingActionButton.vue';
import SearchBar from '@/components/SearchBar.vue';
import type { ChargingStation, ChargingStationWithAddress } from '@/types/chargingStation';
import type { Address, Coordinates } from '@/types/location';
import L from 'leaflet';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { getCarsRequest } from '@/api/cars';
import type { Car } from '@/types/car';
import type { AxiosResponse } from 'axios';

const currentCoordinates = ref<Coordinates>({ lng: 0, lat: 25 });
const showFindClosestButton = ref(false);

let map: L.Map;
let markersLayer: L.LayerGroup = L.layerGroup();
let markers: Map<string, L.Marker> = new Map();

onMounted(() => {
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

const onSearchClosestChargingStation = async () => {
  console.log('Searching closest charging station');
  try {
    const closestChargingStation: ChargingStation = (await getClosestChargingStationRequest(currentCoordinates.value)).data;
    console.log('Closest charging station: ', JSON.stringify(closestChargingStation));
    addMarkers([closestChargingStation]);
    showFindClosestButton.value = false;
  } catch {}
};

const onSearchNearbyChargingStations = async (input: string) => {
  console.log('Searching nearby charging stations for: ', input);
  try {
    const coordinates: Coordinates = (await resolveAddressToCoordinatesRequest(input)).data;
    currentCoordinates.value = coordinates;
    showFindClosestButton.value = true;
    const chargingStations: ChargingStation[] = (await getNearbyChargingStationsRequest(coordinates)).data;
    console.log('Nearby charging stations: ', JSON.stringify(chargingStations));
    centerViewAt(coordinates.lng, coordinates.lat);
    addMarkers(chargingStations);
  } catch {}
};

const centerViewAt = async (longitude: number, latitude: number): Promise<void> => {
  map.fitBounds(L.latLng([latitude, longitude]).toBounds(DEFAULT_RADIUS_IN_METERS));
};

const addMarkers = (chargingStations: ChargingStation[]): void => {
  markersLayer.clearLayers();
  markers.clear();
  chargingStations.forEach(chargingStation => {
    const coordinates: Coordinates = {
      lng: chargingStation.location.coordinates[0],
      lat: chargingStation.location.coordinates[1]
    };
    const marker = setMarker(L.marker([coordinates.lat, coordinates.lng]), chargingStation)
      .on('click', () => {
        console.log('Marker clicked');
        document.getElementById(`viewButton${chargingStation._id}`)?.addEventListener('click', async () => {
          await onViewChargingStation(chargingStation, coordinates);
        });
      })
      .addTo(markersLayer);
    markers.set(chargingStation._id, marker);
  });
};

const setMarker = (marker: L.Marker, chargingStation: ChargingStation): L.Marker => {
  const color: string = chargingStation.available ? 'text-success' : 'text-danger';
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
    <span class="${color}">${chargingStation.available ? 'Available' : 'Not Available'}</span>
    <div class="d-flex justify-content-center mt-1">
      <button type="button" id="viewButton${chargingStation._id}" class="border px-2">View</button>
    </div>`;
  return marker.setIcon(icon).bindPopup(popupContent);
};

const showChargingStationModal = ref(false);
const chargingStationToView = ref<ChargingStationWithAddress>({
  _id: '',
  power: 0,
  available: true,
  enabled: true,
  location: { type: 'Point', coordinates: [0, 0] },
  address: { street: '', city: '', country: '' }
});
const cars = ref<Car[]>([]);

const onViewChargingStation = async (chargingStation: ChargingStation, coordinates: Coordinates) => {
  console.log('Viewing details');
  try {
    const address: Address = (await reverseCoordinatesToAddressRequest(coordinates)).data.address;
    chargingStationToView.value = {
      ...chargingStation,
      "address": address
    };
    const response: AxiosResponse<Car[]> = await getCarsRequest();
    cars.value = response.data;
    showChargingStationModal.value = true;
  } catch {}
};

const onPlugInCar = async (selectedCarId: string) => {
  console.log('Plugging in car ', selectedCarId);
  await startRechargeRequest(chargingStationToView.value._id, selectedCarId);

  // TODO update on push notification (other charging stations could have been updated as well)
  const updatedChargingStation: ChargingStation =
    (await getChargingStationRequest(chargingStationToView.value._id)).data;
  setMarker(markers.get(updatedChargingStation._id)!, updatedChargingStation);

  showChargingStationModal.value = false;
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
      :cars="cars"
      @cancel="showChargingStationModal = false"
      @plug-in="onPlugInCar"
    />
  </div>
</template>
