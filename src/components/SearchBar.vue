<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  placeholder?: string
}>();
const emit = defineEmits<{
  search: [input: string]
}>();
const textInput = ref('');

const search = () => emit('search', textInput.value);
</script>

<template>
  <div>
    <div class="input-group">
      <input
        type="text"
        class="form-control text-truncate"
        :placeholder="placeholder"
        :aria-label="placeholder"
        id="searchbar-closest"
        v-model="textInput"
      >
      <button type="button" class="btn btn-light border" @click.prevent="search">
        <i class="bi bi-search"></i>
      </button>
    </div>
  </div>
</template>