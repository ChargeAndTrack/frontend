<script setup lang="ts">
const props = defineProps({
  car: {
    type: Object, // TODO interface
    required: true
  }
});
</script>

<template>
  <div class="d-flex justify-content-between align-items-center border rounded p-3 mb-2">
    <div>
      <div class="fw-semibold">{{ car.plate }}</div>
      <small class="text-muted">Capacity: {{ car.capacity }}</small>
    </div>
    <button class="btn btn-primary">Edit</button>
  </div>
</template>
