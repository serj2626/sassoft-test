<script setup lang="ts">
import { computed } from "vue";
import type { IIconProps } from "../../types";

const props = defineProps<IIconProps>();

const iconPath = computed(() => {
  return new URL(`/src/assets/icons/${props.name}.svg`, import.meta.url).href;
});

const classes = computed(() => [
  "ui-icon",
  `ui-icon--${props.name}`,
  props.class,
]);
</script>

<template>
  <img 
    :src="iconPath" 
    :class="classes"
    :width="size"
    :height="size"
    :alt="name + ' icon'"
    :style="{ color: color }"
  />
</template>

<style scoped>
.ui-icon {
  display: inline-block;
  vertical-align: middle;
}
</style>