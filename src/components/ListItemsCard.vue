<script setup lang="ts">
</script>

<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="card shadow col-10 col-md-8 d-flex flex-column">
        <div class="card-body d-flex flex-column">
          <div class="card-header">
            <slot name="card-header"></slot>
          </div>
          <div class="card-body">
            <slot name="card-body"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
