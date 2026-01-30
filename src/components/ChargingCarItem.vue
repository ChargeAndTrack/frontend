<script setup lang="ts">
import type { Car } from '@/types/car';
import ShowFieldsCard from './ShowFieldsCard.vue';

const props = defineProps<{ car: Car }>();
</script>

<template>
  <ShowFieldsCard>
      <template #card-header>
      <div class="d-flex justify-content-between align-items-center my-2">
        <h5 class="card-title m-0">Car {{ car.plate }}</h5>
        <i class="bi bi-battery-charging fs-4"></i>
      </div>
    </template>
    <template #card-body>
      <small>Recharge at charging station at address</small>
      <div class="row row-cols-auto g-4 align-items-center justify-content-start my-2">
        <div class="col-2">
          <label for="current-battery" class="col-form-label fw-semibold">
            Battery
          </label>
        </div>
        <div class="col-2">
          <input
            type="number"
            id="current-battery"
            class="form-control"
            aria-describedby="Car current battery"
            v-model.number="car.currentBattery"
            readonly
          >
        </div>
        <div class="col-2 px-0">
          <span id="percentage" class="form-text">%</span>
        </div>
      </div>
    </template>
  </ShowFieldsCard>
</template>
