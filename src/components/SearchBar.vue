<script setup lang="ts">

const textInput = defineModel<string>('search-text', { default: '' });
const emit = defineEmits<{
  search: [input: string]
}>();

const search = () => emit('search', textInput.value);
</script>

<template>
  <div class="row py-4 px-2 sticky-top">
    <div class="input-group mb-3">
      <slot name="text-input"></slot>
      <button type="button" class="btn btn-outline-secondary" @click.prevent="search">
        <i class="bi bi-search"></i>
      </button>
    </div>
  </div>
</template>
