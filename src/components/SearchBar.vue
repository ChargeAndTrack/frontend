<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  search: [input: string]
}>();
const textInput = ref('');

const search = () => emit('search', textInput.value);
</script>

<template>
  <div class="row py-4 px-2 sticky-top">
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control text-truncate"
        placeholder="Search closest charging station to an address"
        aria-label="Search closest charging station to an address"
        id="searchbar-closest"
        v-model="textInput"
      >
      <button type="button" class="btn btn-outline-secondary" @click.prevent="search">
        <i class="bi bi-search"></i>
      </button>
    </div>
  </div>
</template>