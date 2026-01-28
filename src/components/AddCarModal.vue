<script setup lang="ts">
import FormField from '@/components/FormField.vue';
import type { AddCarBody } from '@/types/car';
import { ref } from 'vue';

const props = defineProps<{error: string}>();
const emit = defineEmits<{
  (e: 'cancel-add'): void
  (e: 'confirm-add', car: AddCarBody): void
}>();

const car = ref<AddCarBody>({
  plate: '',
  maxBattery: 0
});
const onCancel = () => emit('cancel-add');
const onAdd = () => emit('confirm-add', car.value);
</script>

<template>
  <div class="modal fade show d-block" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">

        <div class="modal-header">
          <h1 class="modal-title fs-5">Add car</h1>
          <button type="button" class="btn-close" @click="onCancel"></button>
        </div>

        <form @submit.prevent="onAdd">
          <div class="modal-body">
            <FormField label="Plate" id="add-car-plate" v-model:value="car.plate" />
            <FormField label="Max battery" id="add-car-max-battery" inputType="number" v-model:value="car.maxBattery" />
            <p v-if="props.error" class="text-danger m-0">{{ props.error }}</p>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="onCancel">Cancel</button>
            <button type="submit" class="btn btn-primary">Add</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show"></div>
</template>
