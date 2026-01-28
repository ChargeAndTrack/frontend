<script setup lang="ts">
import ChargingStationCardExpanded from '@/components/ChargingStationCardExpanded.vue';
import ChargingStationModal from '@/components/ChargingStationModal.vue';
import FloatingActionButton from '@/components/FloatingActionButton.vue';
import SearchBar from '@/components/SearchBar.vue';
import { ref } from 'vue';

const isModalVisible = ref(false);

const openModal = () => isModalVisible.value = true;
const closeModal = () => isModalVisible.value = false;

</script>

<template>
  <div class="container-fluid justify-content-center overflow-y-hidden">
    <SearchBar />
    <div class="row justify-content-center">
      <ChargingStationCardExpanded />
    </div>
    <ChargingStationModal v-if="isModalVisible" :show="isModalVisible" @close="closeModal"/>
    <FloatingActionButton @open-modal="openModal" />
  </div>
</template>

<style scoped>
</style>