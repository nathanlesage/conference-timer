<template>
  <svg xmlns="http://www.w3.org/2000/svg"
    v-bind:width="props.size ?? 48" height="props.size ?? 48" viewBox="0 0 48 48"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
  >
    <g id="clock">
      <path d="M24 8 a16 16 0 1 1 -16 16" />
      <path d="M24 16 L24 24" /><!-- Hour -->
      <path d="M12 24 L24 24" /><!-- Minute -->
      <path d="M24 24 L24 32" /><!-- Second -->
    </g>
    <g id="wedge">
      <path d="M6 16 L20 20 l-4 -14 a16 16 0 0 0 -10 10" />
    </g>
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{ size?: number }>()
</script>

<style scoped lang="css">
#clock {
  stroke: #33333f;
  fill: none;
}

#wedge {
  stroke: #db0d5c;
  fill: #db0d5c;
}

@media (prefers-color-scheme: dark) {
  #clock {
    stroke: #eef;
  }
}
</style>
