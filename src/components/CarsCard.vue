<script setup lang="ts">
import type { Car } from '@/types/car';
import CarItem from './CarItem.vue';

const props = defineProps<{ cars: Car[] }>();
const emit = defineEmits<{
  (e: 'add-car'): void,
  (e: 'edit-car', carId: string): void
}>();
</script>

<template>
  <div class="container-fluid pt-2 pb-5 pb-md-0">
    <div class="row justify-content-center">
      <div class="card shadow col-12 col-md-6 d-flex flex-column">
        <div class="card-body d-flex flex-column">
          <!-- Cars header -->
          <div class="d-flex justify-content-between align-items-center pb-2">
            <h5 class="card-title">Cars</h5>
            <button type="button" class="btn btn-primary rounded-circle" @click="emit('add-car')">
              <i class="bi bi-plus fs-4"></i>
            </button>
          </div>

          <!-- Cars list -->
          <div class="flex-grow-1 overflow-auto">
            <p v-if="props.cars.length === 0">No cars registered.</p>
            <CarItem v-for="car in props.cars" :key="car.plate" :car="car" @edit="emit('edit-car', $event)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
