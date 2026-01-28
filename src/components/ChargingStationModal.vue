<script setup lang="ts">
import type { ChargingStation } from '@/types/chargingStation';
import { ref } from 'vue';

const props = defineProps({ show: Boolean });
const emit = defineEmits(['close']);

const chargingStation = ref<ChargingStation>({ power: 0, location: '' });

const closeModal = () => emit("close");

const addChargingStation = async () => {
  emit("close");
};
</script>

<template>
  <div
    class="modal fade"
    :class="{ 'show': show, 'd-block': show }"
    id="add-charging-station-modal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="add-charging-station-modal-title">Add charging station</h1>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click.prevent="closeModal"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row row-cols-auto g-4 align-items-center mb-3">
              <div class="col-auto">
                <label for="add-power" class="col-form-label fw-medium">Power:</label>
              </div>
              <div class="col-5">
                <input
                  type="text"
                  id="add-power"
                  class="form-control"
                  aria-describedby="Set charging station to add power"
                  v-model.number="chargingStation.power"
                >
              </div>
              <div class="col-auto">
                <span id="power-unit-of-measurement" class="form-text">kW</span>
              </div>
            </div>
            <div class="row row-cols-auto g-4 align-items-center mb-3">
              <div class="col-auto">
                <label for="add-address" class="col-form-label fw-medium">Address:</label>
              </div>
              <div class="col-8">
                <input
                  type="text"
                  id="add-address"
                  class="form-control"
                  aria-describedby="Set charging station to add address"
                  v-model="chargingStation.location"
                >
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click.prevent="closeModal">Close</button>
          <button type="button" class="btn btn-primary" @click.prevent="addChargingStation">Add</button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="show" class="modal-backdrop fade show"></div>
</template>