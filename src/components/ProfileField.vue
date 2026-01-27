<script setup lang="ts">
const showPassword = defineModel('showPassword', { type: Boolean });
const props = defineProps({
  label: String,
  inputType: {
    type: String,
    default: 'text'
  },
  inputValue: String,
  readonly: {
    type: Boolean,
    default: true
  }
});
</script>

<template>
  <div class="row align-items-center py-2">
    <span class="col-4 fw-semibold">{{ label }}</span>
    <div class="col-8 d-flex">
      <input
          :type="(inputType === 'password' && showPassword) ? 'text' : inputType"
          class="form-control"
          :value="inputValue"
          :readonly="readonly"
      />
      <slot name="extra"></slot>
    </div>
  </div>
</template>
