<script setup lang="ts">
import FloatingActionButton from '@/components/FloatingActionButton.vue';
import MapView from '@/components/MapView.vue';
import SearchBar from '@/components/SearchBar.vue';
</script>

<template>
  <div class="flex-grow-1 d-flex flex-column position-relative">
    <div class="flex-grow-1">
      <MapView />
    </div>

    <div class="position-absolute top-0 start-0 end-0 pt-3" style="z-index: 1000;">
      <div class="container-fluid row justify-content-center m-0 p-0">
        <SearchBar class="col-11 col-md-8 shadow p-0" placeholder="Search for an address"/>
      </div>
    </div>

    <FloatingActionButton @click="console.log('Click');">
      <template #content>
        <span class="fs-5">Find closest</span>
      </template>
    </FloatingActionButton>
  </div>
</template>
