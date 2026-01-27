<script setup lang="ts">
import type { Car } from '@/types/car';

const props = defineProps<{ car: Car }>();
</script>

<template>
  <div class="d-flex justify-content-between align-items-center border rounded p-3 mb-2">
    <div>
      <div class="fw-semibold">{{ props.car.plate }}</div>
      <small class="text-muted">Capacity: {{ props.car.capacity }}</small>
    </div>
    <button class="btn btn-primary">Edit</button>
  </div>
</template>
