<script setup lang="ts">
const props = defineProps<{ msg: string; show: boolean }>();
const emit = defineEmits(['close']);

</script>

<template>
  <div class="toast-container position-fixed bottom-0 mb-5 mb-md-0 start-50 translate-middle-x p-5 z-5">
    <div
      class="toast align-items-center"
      :class="{ 'show': show }"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="d-flex">
          <div class="toast-body">{{ props.msg }}</div>
          <button
            type="button"
            class="btn-close me-2 m-auto"
            @click="$emit('close')"
            aria-label="Close"
          ></button>
      </div>
    </div>
  </div>
</template>
