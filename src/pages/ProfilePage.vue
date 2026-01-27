<script setup lang="ts">
import { ref } from 'vue';
import PasswordVisibilityButton from '@/components/PasswordVisibilityButton.vue';

const showPassword = ref(false);

const user = ref({
  username: 'user1',
  password: 'user11234',
  role: 'Base user',
});
const cars = ref([
  { plate: 'AB123CD', capacity: 2000 },
  { plate: 'EF456GH', capacity: 2000 },
  { plate: 'IJ789KL', capacity: 1500 },
  { plate: 'MN123OP', capacity: 1500 },
  { plate: 'QR456ST', capacity: 1800 },
  { plate: 'UV789WX', capacity: 1800 },
  { plate: 'YZ123AB', capacity: 1800 },
]);
</script>

<template>
  <div class="d-flex flex-column pt-3 pb-5 pb-md-3">

    <!-- PROFILE -->
    <div class="container-fluid pb-2">
      <div class="row justify-content-center">
        <div class="card shadow col-12 col-md-6">
          <div class="card-body">
            <h5 class="card-title text-center mb-4">Profile</h5>

            <!-- Username -->
            <div class="row align-items-center py-2">
              <span class="col-4 fw-semibold">Username</span>
              <div class="col-8">
                <input type="text" class="form-control" :value="user.username" readonly />
              </div>
            </div>

            <!-- Password -->
            <div class="row align-items-center py-2">
              <span class="col-4 fw-semibold">Password</span>
              <div class="col-8 d-flex">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  class="form-control"
                  :value="user.password"
                  readonly
                >
                <PasswordVisibilityButton v-model:show-password="showPassword" />
              </div>
            </div>

            <!-- Role -->
            <div class="row align-items-center py-2">
              <span class="col-4 fw-semibold">Role</span>
              <div class="col-8">
                <input class="form-control" :value="user.role" readonly />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CARS -->
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
              <div
                class="d-flex justify-content-between align-items-center border rounded p-3 mb-2"
                v-for="car in cars"
                :key="car.plate"
              >
                <div>
                  <div class="fw-semibold">{{ car.plate }}</div>
                  <small class="text-muted">Capacity: {{ car.capacity }}</small>
                </div>
                <button class="btn btn-primary">Edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>