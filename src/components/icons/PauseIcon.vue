<template>
  <svg xmlns="http://www.w3.org/2000/svg" v-bind:width="props.size ?? 24" v-bind:height="props.size ?? 24"
    viewBox="0 0 24 24" v-bind:fill="props.solid ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round"
    stroke-linejoin="round" class="feather feather-pause">
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{ size?: number, solid?: boolean }>()
</script>

<style lang="css" scoped></style>
