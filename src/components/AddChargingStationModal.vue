<script setup lang="ts">
import { reactive } from 'vue';

const props = defineProps<{show: boolean}>();
const emit = defineEmits<{
  "close": [],
  "add-charging-station": [power: number, address: string]
}>();

const chargingStation = reactive<{
  power: number | null,
  address: string
}>({ power: null, address: '' });

const closeModal = () => emit('close');

const addChargingStation = async () => {
  emit("add-charging-station", chargingStation.power!, chargingStation.address);
  emit("close");
};
</script>

<template>
  <div>
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
            <form @submit.prevent="addChargingStation">
              <div class="modal-body">
                <div class="container-fluid">
                  <div class="row row-cols-auto g-4 align-items-center mb-3">
                    <div class="col-auto">
                      <label for="add-power" class="col-form-label fw-medium">Power:</label>
                    </div>
                    <div class="col-5">
                      <input
                        type="number"
                        min="1"
                        id="add-power"
                        class="form-control"
                        aria-describedby="Set charging station to add power"
                        v-model="chargingStation.power"
                        required
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
                        v-model.trim="chargingStation.address"
                        required
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" @click.prevent="closeModal">Close</button>
                <button type="submit" class="btn btn-primary">Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    <div v-if="show" class="modal-backdrop fade show"></div>
  </div>
</template>