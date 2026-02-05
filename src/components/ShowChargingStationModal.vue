<script setup lang="ts">
import FormField from '@/components/FormField.vue';
import type { Car } from '@/types/car';
import type { ShowableChargingStation } from '@/types/chargingStation';
import type { Address } from '@/types/location';
import { ref } from 'vue';

const props = defineProps<{
  chargingStation: ShowableChargingStation,
  cars: Car[]
}>();
const emit = defineEmits<{
  (e: 'cancel'): void,
  (e: 'plug-in', carPlate: string): void
}>();

const selectedCarId = ref<string>('');

const onCancel = () => emit('cancel');
const onPlugIn = () => emit('plug-in', selectedCarId.value);

const formatAddress = (address: Address): string => {
  return `${address.street}, ${address.houseNumber ? address.houseNumber + ', ' : ''}${address.city}`;
};
</script>

<template>
  <div class="modal fade show d-block" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">

        <div class="modal-header">
          <h1 class="modal-title fs-5">
            Charging Station -
            <span v-if="chargingStation.currentCarPlate" class="text-yellow">
              Charging car {{ chargingStation.currentCarPlate }}
            </span>
            <span v-else :class="chargingStation.available ? 'text-success' : 'text-danger'">
              {{ chargingStation.available ? 'Available' : 'Not Available' }}
            </span>
          </h1>
          <button type="button" class="btn-close" @click="onCancel"></button>
        </div>

        <div class="modal-body">
          <FormField
            label="Address"
            id="charging-station-address"
            :value="formatAddress(chargingStation.address)"
            :readonly="true"
          />
          <FormField
            label="Power"
            id="charging-station-power"
            :value="chargingStation.power"
            :readonly="true"
          >
            <template #extra>
              <span class="input-group-text bg-transparent">kW</span>
            </template>
          </FormField>
        </div>

        <div v-if="chargingStation.available" class="modal-footer d-flex flex-column justify-content-center">
          <label class="form-label" for="select-car">Select the car you want to plug in</label>
          <span v-if="props.cars.length === 0" class="alert alert-danger p-2">No cars available</span>
          <select v-else id="select-car" class="form-select" v-model="selectedCarId">
            <option
              v-for="car in props.cars"
              :key="car._id"
              :value="car._id"
            >
              {{ car.plate }} - {{ car.maxBattery }} kWh
            </option>
          </select>
          <button type="button" class="btn btn-primary mt-3" @click="onPlugIn" :disabled="!selectedCarId">
            <div class="d-flex align-items-center">
              <i class="bi bi-plug fs-4 me-2"></i>
              <span class="fs-5 me-1">Plug in</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show"></div>
</template>
