<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue';
import ChargingStationItem from '@/components/ChargingStationItem.vue';
import type { ChargingStation } from '@/types/chargingStation';
import type { Address } from '@/types/location';
import { reactive, ref } from 'vue';
import ListItemsCard from '@/components/ListItemsCard.vue';

const searchText = ref<string>('');
const chargingStations = reactive<[{
  id: string,
  station: ChargingStation,
  address: Address
}]>([{
  id: "cs-1",
  station: { power: 2000 },
  address: { street: "Via Veneto", city: "Cesena" }
}]);

const llmSearch = async () => {};
</script>

<template>
  <div class="container-fluid justify-content-center">
    <SearchBar v-model:search-text="searchText" @search="llmSearch">
      <template #text-input>
        <div class="form-floating">
          <label for="llm-search-textarea">Ask to an LLM to find charging stations</label>
          <textarea
            class="form-control"
            id="llm-search-textarea"
          ></textarea>
        </div>
      </template>
    </SearchBar>

    <ListItemsCard>
      <template #card-header>
        <h5 class="card-title">Charging stations</h5>
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
  </div>
</template>

<style scoped>
textarea {
  height: 100% !important
}
</style>