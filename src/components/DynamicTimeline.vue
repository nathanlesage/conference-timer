<template>
  <svg xmlns="http://www.w3.org/2000/svg"
    v-bind:width="SVG_WIDTH"
    v-bind:height="SVG_HEIGHT"
    v-bind:viewBox="`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`"
    v-bind:stroke-width="STROKE_WIDTH" stroke-linecap="round" stroke-linejoin="round"
  >
    <g id="timeline">
      <rect
        v-bind:x="STROKE_WIDTH"
        v-bind:y="(SVG_HEIGHT - BAR_HEIGHT) / 2 - STROKE_WIDTH"
        v-bind:rx="BAR_HEIGHT / 2" v-bind:ry="BAR_HEIGHT / 2"
        v-bind:height="BAR_HEIGHT"
        v-bind:width="SVG_WIDTH - 2 * STROKE_WIDTH"
        stroke="currentColor"
        fill="none"
      ></rect>
      <rect
        v-bind:x="STROKE_WIDTH"
        v-bind:y="(SVG_HEIGHT - BAR_HEIGHT) / 2 - STROKE_WIDTH"
        v-bind:rx="BAR_HEIGHT / 2" v-bind:ry="BAR_HEIGHT / 2"
        v-bind:height="BAR_HEIGHT"
        v-bind:width="(SVG_WIDTH - 2 * STROKE_WIDTH) * progress"
        stroke="none"
        fill="currentColor"
      ></rect>
    </g>
    <g id="reminders">
      <template v-for="reminder, idx in props.template.reminders">
        <circle
          v-if="reminder.time * 60 > (props.elapsedSeconds ?? 0)"
          v-bind:cy="SVG_HEIGHT / 2 - STROKE_WIDTH"
          v-bind:r="BAR_HEIGHT + 2"
          fill="currentColor"
          v-bind:cx="reminder.time * 60 / totalTimeSeconds * SVG_WIDTH"
          v-bind:key="idx"
        >
          <title>{{ reminder.label ?? `Reminder at minute ${reminder.time}` }}</title>
        </circle>
      </template>
    </g>
  </svg>
</template>

<script setup lang="ts">
import type { TimerConfig } from '@/stores/timer-config'
import { computed } from 'vue'

const SVG_WIDTH = 150
const SVG_HEIGHT = 30
const BAR_HEIGHT = 3
const STROKE_WIDTH = 1

const props = defineProps<{
  template: TimerConfig
  elapsedSeconds?: number
}>()

const totalTimeSeconds = computed(() => props.template.presentationDuration * 60 + props.template.qaDuration * 60)

const progress = computed(() => (props.elapsedSeconds ?? 0) / totalTimeSeconds.value)
</script>

<style lang="css" scoped>
</style>
