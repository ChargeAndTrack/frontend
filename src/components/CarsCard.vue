<script setup lang="ts">
import type { Car } from '@/types/car';
import CarItem from './CarItem.vue';
import ListItemsCard from './ListItemsCard.vue';

const props = defineProps<{ cars: Car[] }>();
const emit = defineEmits<{
  (e: 'add-car'): void,
  (e: 'edit-car', carId: string): void,
  (e: 'delete-car', carData: { id: string, plate: string }): void
}>();
</script>

<template>
  <ListItemsCard>
    <template #card-header>
      <div class="d-flex justify-content-between align-items-center pb-2">
        <h5 class="card-title">Cars</h5>
        <button type="button" class="btn btn-primary rounded-circle" @click="emit('add-car')">
          <i class="bi bi-plus fs-4"></i>
        </button>
      </div>
    </template>

    <template #card-body>
      <div class="flex-grow-1 overflow-auto">
        <p v-if="props.cars.length === 0">No cars registered.</p>
        <CarItem
          v-for="car in props.cars"
          :key="car.plate"
          :car="car"
          @edit="emit('edit-car', $event)"
          @delete="emit('delete-car', $event)"
        />
      </div>
    </template>
  </ListItemsCard>
</template>
