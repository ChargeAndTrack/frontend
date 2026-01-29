<script setup lang="ts">
import FormField from '@/components/FormField.vue';
import type { CarBody } from '@/types/car';
import { ref } from 'vue';

const props = defineProps<{
  currentCar?: CarBody, // set when editing, undefined when adding
}>();
const emit = defineEmits<{
  (e: 'cancel'): void,
  (e: 'confirm', car: CarBody): void
}>();

const car = ref<CarBody>({
  plate: props.currentCar?.plate ?? '',
  maxBattery: props.currentCar?.maxBattery ?? 0
});
const onCancel = () => emit('cancel');
const onConfirm = () => emit('confirm', car.value);
</script>

<template>
  <div class="modal fade show d-block" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">

        <div class="modal-header">
          <h1 class="modal-title fs-5">{{ props.currentCar ? 'Edit' : 'Add' }} car</h1>
          <button type="button" class="btn-close" @click="onCancel"></button>
        </div>

        <form @submit.prevent="onConfirm">
          <div class="modal-body">
            <FormField label="Plate" id="add-car-plate" v-model:value="car.plate" />
            <FormField label="Max battery" id="add-car-max-battery" inputType="number" v-model:value="car.maxBattery" />
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="onCancel">Cancel</button>
            <button type="submit" class="btn btn-primary">{{ props.currentCar ? 'Save' : 'Add' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show"></div>
</template>
