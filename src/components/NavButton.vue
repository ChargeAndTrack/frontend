<script setup lang="ts">
const props = defineProps(["routeName", "iconName"])
</script>

<template>
  <li class="nav-item text-center">
    <RouterLink 
      :to="{ name: props.routeName }"
      class="nav-link p-0 d-flex flex-column align-items-center"
      :exact-active-class="'focus'"
    >
      <i :class="['bi', `bi-${ props.iconName }`, 'd-md-none', 'text-white']"></i>
      <span>{{ props.routeName }}</span>
    </RouterLink>
  </li>
</template>

<style scoped>
li {
  cursor: pointer;
}
</style>
