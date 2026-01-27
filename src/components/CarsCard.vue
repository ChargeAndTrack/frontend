<script setup lang="ts">
import CarItem from './CarItem.vue';

const props = defineProps({
  cars: {
    type: Array<{ plate: string; capacity: number }>, // TODO interface
    required: true
  }
});
</script>

<template>
  <div class="container-fluid pt-2 pb-5 pb-md-0">
    <div class="row justify-content-center">
      <div class="card shadow col-12 col-md-6 d-flex flex-column">
        <div class="card-body d-flex flex-column">
          <!-- Cars header -->
          <div class="d-flex justify-content-between align-items-center pb-2">
            <h5 class="card-title">Cars</h5>
            <button class="btn btn-primary rounded-circle">+</button>
          </div>

          <!-- Cars list -->
          <div class="flex-grow-1 overflow-auto">
            <CarItem v-for="car in cars" :key="car.plate" :car="car" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
