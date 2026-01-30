<script setup lang="ts">
</script>

<template>
  <div class="container-fluid pb-2">
    <div class="row justify-content-center">
      <div class="card shadow col-10 col-md-8">
        <div class="card-header">
          <slot name="card-header"></slot>
        </div>
        <div class="card-body">
          <slot name="card-body"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
