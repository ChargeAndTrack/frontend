<script setup lang="ts">
import type { Car } from '@/types/car';
import ShowFieldsCard from './ShowFieldsCard.vue';
import { onMounted, ref } from 'vue';
import type { ChargingStation } from '@/types/chargingStation';
import { reverseCoordinatesToAddressRequest } from '@/api/location';

const props = defineProps<{ car: Car, chargingStation: ChargingStation }>();
const emit = defineEmits<{
  (e: 'stop-recharge', carId: string, chargingStationId: string): void
}>();

const chargingStationAddress = ref<string>('');

const stopRecharge = () => emit('stop-recharge', props.car._id, props.chargingStation._id);

onMounted(async () => {
  try {
    const address = await reverseCoordinatesToAddressRequest({
      longitude: props.chargingStation.location?.coordinates[0]!,
      latitude: props.chargingStation.location?.coordinates[1]!
    });
    chargingStationAddress.value = `${address.data.address.street}, ${address.data.address.city}`;
  } catch {}
});
</script>

<template>
  <ShowFieldsCard>
    <template #card-header>
      <div class="d-flex justify-content-between align-items-center my-2">
        <h5 class="card-title m-0">Car {{ props.car.plate }}</h5>
        <i class="bi bi-battery-charging fs-4"></i>
      </div>
    </template>
    <template #card-body>
      <p class="card-text">Recharge at charging station at
        <span class="col-auto fw-medium">{{ chargingStationAddress }}</span>
      </p>
      <div class="row row-cols-auto g-4 align-items-center justify-content-start my-2">
        <div class="col-3">
          <label for="current-battery" class="col-form-label fw-semibold">
            Battery
          </label>
        </div>
        <div class="col-4">
          <input
            type="number"
            id="current-battery"
            class="form-control"
            aria-describedby="Car current battery"
            v-model.number="props.car.currentBattery"
            readonly
          >
        </div>
        <div class="col-2 px-0">
          <span id="percentage" class="form-text">%</span>
        </div>
      </div>
      <div class="row p-3 row-cols-auto justify-content-end">
        <button type="button" class="btn btn-primary col" @click.prevent="stopRecharge">Stop recharge</button>
      </div>
    </template>
  </ShowFieldsCard>
</template>
