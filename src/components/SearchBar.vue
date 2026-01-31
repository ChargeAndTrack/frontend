<script setup lang="ts">

const textInput = defineModel<string>('search-text', { default: '' });
const props = defineProps<{
  placeholder?: string
}>();
const emit = defineEmits<{
  search: [input: string]
}>();

const search = () => emit('search', textInput.value);
</script>

<template>
  <div>
    <div class="input-group mb-3">
      <slot name="text-input"></slot>
      <button type="button" class="btn btn-light border" @click.prevent="search">
        <i class="bi bi-search"></i>
      </button>
    </div>
  </div>
</template>
