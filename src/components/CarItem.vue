<script setup lang="ts">
import type { Car } from '@/types/car';

const props = defineProps<{ car: Car }>();
const emit = defineEmits<{
  (e: 'edit', carId: string): void
}>();
</script>

<template>
  <div class="d-flex justify-content-between align-items-center border rounded p-3 mb-2">
    <div class="d-flex align-items-center">
      <button type="button" class="btn btn-danger">
        <i class="bi bi-trash"></i>
      </button>
      <div class="ms-3">
        <div class="fw-semibold">{{ props.car.plate }}</div>
        <small class="text-muted">Capacity: {{ props.car.maxBattery }}</small>
      </div>
    </div>
    <button type="button" class="btn btn-primary mx-1" @click="emit('edit', props.car._id)">Edit</button>
  </div>
</template>
