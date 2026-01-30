<script setup lang="ts">
import type { ChargingStation } from '@/types/chargingStation';
import type { Address } from '@/types/location';

const props = defineProps<{
  chargingStation: ChargingStation,
  chargingStationAddress: Address
}>();
</script>

<template>
  <div class="d-flex justify-content-between align-items-center border rounded p-3 mb-2">
    <div class="d-flex align-items-center">
      <div class="ms-3">
        <div class="fw-semibold">
          {{ props.chargingStationAddress.street }}, {{ props.chargingStationAddress.city }}
        </div>
        <small class="text-muted">Power: {{ props.chargingStation.power }}</small>
      </div>
    </div>
    <i class="bi bi-ev-station fs-4"></i>
  </div>
</template>
