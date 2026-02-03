<script setup lang="ts">
const emit = defineEmits(['search']);
const search = () => emit('search');
</script>

<template>
  <div>
    <div class="input-group">
      <slot name="text-input"></slot>
      <button type="button" class="btn btn-light border z-0" @click.prevent="search">
        <i class="bi bi-search"></i>
      </button>
    </div>
  </div>
</template>
