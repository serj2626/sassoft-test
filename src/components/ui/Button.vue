<script setup lang="ts">
defineProps<{
  icon: string;
  size: string | number;
}>();
</script>
<template>
  <button class="ui-button">
    <UIIcon :name="icon" :size="size" />
  </button>
</template>
<style scoped lang="scss">
.ui-button {
  border: none;
  background-color: transparent;
  cursor: pointer;

  transition: all 0.3s ease-in-out;
  &:hover {
    scale: 1.1;
  }
}
</style>
