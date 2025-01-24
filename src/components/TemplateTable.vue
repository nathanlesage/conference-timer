<template>
  <div id="template-wrapper">
    <!-- Create Custom action -->
    <RouterLink to="/wizard" class="pillow">Add new custom template</RouterLink>

    <!-- "Table" header -->
    <div class="row pillow contrast">
      <strong class="name">Template Name</strong>
      <strong class="time">Time</strong>
      <strong class="qa">Q&amp;A</strong>
      <strong class="use">&nbsp;</strong>
    </div>

    <div class="row pillow" v-for="timer in timerConfig.templates" v-bind:key="timer.name">
      <strong class="name">{{ timer.name }}</strong>
      <p class="time">{{ timer.presentationDuration }}&thinsp;min</p>
      <p class="qa">
        <template v-if="timer.qaDuration > 0">{{ timer.qaDuration }}&thinsp;min</template>
        <template v-else>&nbsp;</template>
      </p>

      <RouterLink v-bind:to="'/' + timer.slug" class="use">Use &raquo;</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTimerConfigStore } from '../stores/timer-config'

const timerConfig = useTimerConfigStore()
</script>

<style lang="css" scoped>
#template-wrapper {
  font-size: 14px;
  padding: 20px 0;
  max-width: 600px;
  margin: 0 auto;
  overflow: auto;

  a { text-decoration: none; }

  .row {
    display: grid;
    text-align: center;
    align-items: center;
    min-width: 500px;
    grid-template-columns: minmax(160px, auto) 80px 80px 80px;
    grid-template-areas: "name time qa use";

    > * {
      padding: 5px;
    }

    > *:not(:last-child) {
      border-right: 1px dotted var(--color-text);
    }

    &.contrast > *:not(:last-child) {
      border-right-color: unset;
    }

    .name { grid-area: name; text-align: right; padding-right: 10px; }
    .time { grid-area: time; }
    .qa { grid-area: qa; }
    .time, .qa { white-space: nowrap; } /* Prevent breaking up the times */
    .use { grid-area: use; }
  }
}
</style>
