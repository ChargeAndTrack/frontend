<script setup lang="ts">
import type { UpdatableChargingStation } from '@/types/chargingStation';

const props = defineProps<{
  chargingStation: UpdatableChargingStation,
  chargingStationAddress: string
}>();
</script>

<template>
  <div class="d-flex justify-content-between align-items-center border rounded p-3 mb-2">
    <div class="d-flex align-items-center">
      <div class="ms-3">
        <div class="fw-semibold">{{ props.chargingStationAddress }}</div>
        <small class="text-muted">Power: {{ props.chargingStation.power }}</small>
      </div>
    </div>
    <i class="bi bi-ev-station fs-4"></i>
  </div>
</template>
