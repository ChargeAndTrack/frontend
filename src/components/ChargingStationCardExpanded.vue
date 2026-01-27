<script setup lang="ts">
</script>

<template>
  <div class="card col-8 col-md-5 mb-3 p-0 shadow">
    <div class="card-header">Charging station</div>
    <div class="card-body mb-3">
        <h2 class="card-title">Address</h2>
        <div class="row row-cols-auto g-4 align-items-center mb-3">
          <div class="col-auto">
            <label for="update-power" class="col-form-label">Power</label>
          </div>
          <div class="col-5">
            <input type="text" id="update-power" class="form-control" aria-describedby="passwordHelpInline">
          </div>
          <div class="col-auto">
            <span id="power-unit-of-measurement" class="form-text">kW</span>
          </div>
        </div>
        <div class="row row-cols-auto g-4 align-items-center mb-3">
          <div class="col-auto">
            <label for="update-enabled" class="col-form-label">Enabled</label>
          </div>
          <div class="col-auto form-switch px-3">
            <input class="form-check-input mx-0 fs-3" type="checkbox" role="switch" id="switch-enabled" checked>
          </div>
        </div>
        <div class="row p-3 row-cols-auto justify-content-between">
          <button type="button" class="btn btn-danger col">Remove</button>
          <button type="button" class="btn btn-primary col">Update</button>
        </div>
    </div>
  </div>
</template>


<style scoped>
.form-check-input {
  cursor: pointer;
}
</style>
