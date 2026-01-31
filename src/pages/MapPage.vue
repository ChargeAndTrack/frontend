<script setup lang="ts">
import { DEFAULT_RADIUS_IN_METERS, getNearbyChargingStationsRequest } from '@/api/chargingStations';
import { resolveAddressToCoordinatesRequest, reverseCoordinatesToAddressRequest } from '@/api/location';
import ShowChargingStationModal from '@/components/ShowChargingStationModal.vue';
import FloatingActionButton from '@/components/FloatingActionButton.vue';
import SearchBar from '@/components/SearchBar.vue';
import type { ChargingStation, ShowableChargingStation } from '@/types/chargingStation';
import type { Address, Coordinates } from '@/types/location';
import L from 'leaflet';
import { onBeforeUnmount, onMounted, ref } from 'vue';

let map: L.Map;
let markersLayer: L.LayerGroup = L.layerGroup();

onMounted(() => {
  map = L.map('map', { zoomControl: false }).setView([25, 0], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    minZoom: 2,
    maxZoom: 19
  }).addTo(map);
  markersLayer.addTo(map);
});
onBeforeUnmount(() => map.remove());

const searchNearbyChargingStations = async (input: string) => {
  console.log('Searching nearby charging stations for:', input);
  try {
    const coordinates: Coordinates = (await resolveAddressToCoordinatesRequest(input)).data;
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
  chargingStations.forEach(chargingStation => {
    const coordinates: Coordinates = {
      lng: chargingStation.location.coordinates[0],
      lat: chargingStation.location.coordinates[1]
    };
    L.marker([coordinates.lat, coordinates.lng])
      .bindPopup(`
        <strong>Charging Station</strong><br>
        Power: ${chargingStation.power} kW<br>
        ${chargingStation.available ? 'Available' : 'Not Available'}
        <div class="d-flex justify-content-center">
          <button type="button" id="viewButton${chargingStation._id}">View</button>
        </div>`
      ).on('click', () => {
        console.log('Marker clicked');
        document.getElementById(`viewButton${chargingStation._id}`)?.addEventListener('click', async () => {
          console.log('Viewing details');
          const address: Address = (await reverseCoordinatesToAddressRequest(coordinates)).data.address;
          chargingStationToView.value.power = chargingStation.power;
          chargingStationToView.value.available = chargingStation.available;
          chargingStationToView.value.address = address;
          showChargingStationModal.value = true;
        });
      })
      .addTo(markersLayer);
  });
};

const showChargingStationModal = ref(false);
const chargingStationToView = ref<ShowableChargingStation>({
  power: 0,
  available: true,
  address: { street: '', city: '', country: '' }
});

const plugIn = () => {
  console.log('Plugging in to charging station: ', JSON.stringify(chargingStationToView.value));
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
        <SearchBar class="col-11 col-md-8 shadow p-0" @search="searchNearbyChargingStations">
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
    <FloatingActionButton @click="console.log('Click');">
      <template #content>
        <span class="fs-5">Find closest</span>
      </template>
    </FloatingActionButton>
    <ShowChargingStationModal
      v-if="showChargingStationModal"
      :chargingStation="chargingStationToView"
      @cancel="showChargingStationModal = false"
      @plug-in="plugIn"
    />
  </div>
</template>
