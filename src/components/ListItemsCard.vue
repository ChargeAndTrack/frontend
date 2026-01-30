<script setup lang="ts">
</script>

<template>
  <div class="container-fluid pt-2 pb-5 pb-md-0">
    <div class="row justify-content-center">
      <div class="card shadow col-8 col-md-6 d-flex flex-column">
        <div class="card-body d-flex flex-column">
          <div class="card-header">
            <slot name="card-header"></slot>
          </div>
          <div class="card-body">
            <slot name="card-body"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
