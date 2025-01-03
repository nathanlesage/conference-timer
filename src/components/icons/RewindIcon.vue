<template>
  <svg xmlns="http://www.w3.org/2000/svg" v-bind:width="props.size ?? 24" v-bind:height="props.size ?? 24"
    viewBox="0 0 24 24" v-bind:fill="props.solid ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round"
    stroke-linejoin="round" class="feather feather-rewind">
    <polygon points="11 19 2 12 11 5 11 19"></polygon>
    <polygon points="22 19 13 12 22 5 22 19"></polygon>
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{ size?: number, solid?: boolean }>()
</script>

<style lang="css" scoped></style>
