<script setup lang="ts">
import FormField from '@/components/FormField.vue';
import type { ShowableChargingStation } from '@/types/chargingStation';
import type { Address } from '@/types/location';

const props = defineProps<{ chargingStation: ShowableChargingStation }>();
const emit = defineEmits<{
  (e: 'cancel'): void,
  (e: 'plug-in'): void,
}>();

const onCancel = () => emit('cancel');
const onPlugIn = () => emit('plug-in');

const formatAddress = (address: Address): string => {
  return `${address.street}, ${address.houseNumber ? address.houseNumber + ', ' : ''}${address.city}`;
};
</script>

<template>
  <div class="modal fade show d-block" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">

        <div class="modal-header">
          <h1 class="modal-title fs-5">Charging Station</h1>
          <button type="button" class="btn-close" @click="onCancel"></button>
        </div>

        <div class="modal-body">
          <FormField
            label="Address"
            id="charging-station-address"
            :value="formatAddress(chargingStation.address)"
            :readonly="true"
          />
          <FormField
            label="Power"
            id="charging-station-power"
            v-model:value="chargingStation.power"
            :readonly="true"
          />
        </div>

        <div class="modal-footer d-flex justify-content-center">
          <button type="button" class="btn btn-primary" @click="onPlugIn">
            <div class="d-flex align-items-center">
              <i class="bi bi-plug fs-4 me-2"></i>
              <span class="fs-5 me-1">Plug in</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show"></div>
</template>
