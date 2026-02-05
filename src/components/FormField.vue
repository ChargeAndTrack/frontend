<script setup lang="ts">
const value = defineModel('value');
const showPassword = defineModel('showPassword', { type: Boolean });
const props = defineProps({
  label: String,
  id: String,
  inputType: {
    type: String,
    default: 'text'
  },
  required: {
    type: Boolean,
    default: true
  },
  readonly: {
    type: Boolean,
    default: false
  },
  minNumberValue : Number
});
</script>

<template>
  <div class="form-group pb-2">
    <label class="form-label" :for="id">{{ label }}</label>
    <div class="input-group">
      <input
        :type="(inputType === 'password' && showPassword) ? 'text' : inputType"
        class="form-control"
        :id="id"
        v-model="value"
        :required="required"
        :readonly="readonly"
        :min="minNumberValue"
      />
      <slot name="extra"></slot>
    </div>
  </div>
</template>
