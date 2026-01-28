<script setup lang="ts">
const emit = defineEmits(['open-modal']);

const openModal = () => emit("open-modal");
</script>

<template>
  <div class="position-fixed bottom-0 end-0 p-5 mb-5 mb-md-0 z-2">
    <button type="button" class="btn btn-primary shadow-lg rounded-4" @click.prevent="openModal">
      <i class="bi bi-plus fs-3"></i>
    </button>
  </div>
</template>
