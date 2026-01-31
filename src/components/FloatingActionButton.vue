<script setup lang="ts">
const emit = defineEmits(['click']);

const click = () => emit("click");
</script>

<template>
  <div class="position-fixed bottom-0 end-0 py-5 px-4 p-md-5 mb-5 mb-md-0" style="z-index: 1000;">
    <button type="button" class="btn btn-primary shadow-lg rounded-4" @click.prevent="click">
      <slot name="content"></slot>
    </button>
  </div>
</template>
