<script setup lang="ts">
const props = defineProps(["routeName"])
</script>

<template>
  <li class="nav-item">
    <RouterLink 
      :to="{ name: props.routeName }"
      class="nav-link">
      {{ props.routeName }}
    </RouterLink>
  </li>
</template>

<style scoped>
li {
  cursor: pointer;
}
</style>
