<script setup lang="ts">
import type { ChargingStation } from '@/types/chargingStation';
import type { Address } from '@/types/location';
import ShowFieldsCard from './ShowFieldsCard.vue';

const props = defineProps<{
  chargingStation: ChargingStation,
  chargingStationAddress: Address
}>();
const emit = defineEmits(['remove-charging-station', 'update-charging-station']);

</script>

<template>
  <div class="col-8 col-md-5">
    <ShowFieldsCard>
      <template #card-header>Charging station</template>
      <template #card-body>
        <form @submit.prevent="$emit('update-charging-station')">
          <h2 class="card-title">
            {{ chargingStationAddress.street }}, {{ chargingStationAddress.city }}
          </h2>
          <div class="row row-cols-auto g-4 align-items-center mb-3">
            <div class="col-auto">
              <label for="update-power" class="col-form-label">Power</label>
            </div>
            <div class="col-5">
              <input
                type="number"
                id="update-power"
                class="form-control"
                aria-describedby="Update charging station power"
                v-model.number="chargingStation.power"
                required
              >
            </div>
            <div class="col-auto">
              <span id="power-unit-of-measurement" class="form-text">kW</span>
            </div>
          </div>
          <div class="row row-cols-auto g-4 align-items-center mb-3">
            <div class="col-auto">
              <label for="update-enabled" class="col-form-label">Enabled</label>
            </div>
            <div class="col-auto form-switch px-3">
              <input
                class="form-check-input mx-0 fs-3"
                type="checkbox"
                role="switch"
                id="switch-enabled"
                v-model="chargingStation.enabled"
              >
            </div>
          </div>
          <div class="row p-3 row-cols-auto justify-content-between">
            <button type="button" class="btn btn-danger col" @click.prevent="$emit('remove-charging-station')">Remove</button>
            <button type="submit" class="btn btn-primary col">Update</button>
          </div>
        </form>
      </template>
    </ShowFieldsCard>
  </div>
</template>


<style scoped>
.form-check-input {
  cursor: pointer;
}
</style>
