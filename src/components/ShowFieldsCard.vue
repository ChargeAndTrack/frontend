<script setup lang="ts">
</script>

<template>
  <div class="card shadow mb-5">
    <div class="card-header">
      <slot name="card-header"></slot>
    </div>
    <div class="card-body">
      <slot name="card-body"></slot>
    </div>
  </div>
</template>
