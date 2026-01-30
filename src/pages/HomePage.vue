<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue';
import { ref } from 'vue';

const searchText = ref<string>('');

const llmSearch = async () => {};
</script>

<template>
  <div class="container-fluid justify-content-center">
    <SearchBar v-model:search-text="searchText" @search="llmSearch">
      <template #text-input>
        <div class="form-floating">
          <label for="llm-search-textarea">Ask to an LLM to find charging stations</label>
          <textarea
            class="form-control"
            id="llm-search-textarea"
          ></textarea>
        </div>
      </template>
    </SearchBar>
  </div>
</template>

<style scoped>
textarea {
  height: 100% !important
}
</style>