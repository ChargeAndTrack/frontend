<script setup lang="ts">
const props = defineProps<{
  subject: string
}>();
const emit = defineEmits<{
  (e: 'cancel'): void,
  (e: 'confirm'): void
}>();

const onCancel = () => emit('cancel');
</script>

<template>
  <div class="modal fade show d-block" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">

        <div class="modal-header">
          <h1 class="modal-title fs-5">Confirm delete</h1>
          <button type="button" class="btn-close" @click="onCancel"></button>
        </div>

        <div class="modal-body">
          <p class="m-0">Are you sure you want to delete <span class="fw-semibold">{{ props.subject }}</span>?</p>
        </div>

        <div class="modal-footer border-0">
          <button type="button" class="btn btn-secondary" @click="onCancel">No</button>
          <button type="button" class="btn btn-danger" @click="emit('confirm')">Yes</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show"></div>
</template>
