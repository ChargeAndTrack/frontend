<script setup lang="ts">
const props = defineProps(["routeName", "iconName"])
</script>

<template>
  <li class="nav-item text-center">
    <i :class="['bi', `bi-${ props.iconName }`, 'd-sm-none', 'text-white']"></i>
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
