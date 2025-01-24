import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ensureUniqueSlugs, slugify } from '@/util/slugify'

export interface TimeReminder {
  /**
   * When to show the reminder (in minutes)
   */
  time: number

  /**
   * An optional label for this reminder. If undefined, only show the time.
   */
  label?: string
}

export interface TimerConfig {
  /**
   * A human-readable name for this config
   */
  name: string
  /**
   * A URL slug
   */
  slug: string
  /**
   * A message to be displayed when time is up
   */
  finishMessage: string
  /**
   * The duration of the presentation (in minutes)
   */
  presentationDuration: number
  /**
   * The duration of the Q&A section (in minutes)
   */
  qaDuration: number
  /**
   * Set to true to have the time count upward.
   */
  countUp: boolean
  /**
   * The countdown (or count-up) is shown by default. Set to false to hide it.
   * It will still be shown in the footer for reference, but won't show up
   * large.
   */
  showCountdown: boolean
  /**
   * A series of reminders with time marks when they will be shown
   */
  reminders: TimeReminder[]
}

export const DEFAULT_TIMERS: TimerConfig[] = [
  {
    name: 'Lighting Talk (no Q&A)',
    slug: slugify('Lighting Talk (no Q&A)'),
    finishMessage: 'Thank you!',
    presentationDuration: 5,
    qaDuration: 0,
    showCountdown: true,
    countUp: false,
    reminders: [
      { time: 3 },
      { time: 4, label: 'Please wrap up' }
    ]
  },
  {
    name: 'Short Presentation (no Q&A)',
    slug: slugify('Short Presentation (no Q&A)'),
    finishMessage: 'Thank you!',
    presentationDuration: 10,
    qaDuration: 0,
    showCountdown: true,
    countUp: false,
    reminders: [
      { time: 5 },
      { time: 9, label: 'Please wrap up' }
    ]
  },
  {
    name: 'Conference Presentation (with Q&A)',
    slug: slugify('Conference Presentation (with Q&A)'),
    finishMessage: 'Thank you!',
    presentationDuration: 10,
    qaDuration: 5,
    showCountdown: true,
    countUp: false,
    reminders: [
      { time: 5 },
      { time: 9, label: 'Please wrap up' },
      { time: 13 }
    ]
  },
  {
    name: 'Conference Presentation (with Q&A)',
    slug: slugify('Conference Presentation (with Q&A)'),
    finishMessage: 'Thank you!',
    presentationDuration: 15,
    qaDuration: 5,
    showCountdown: true,
    countUp: false,
    reminders: [
      { time: 8 },
      { time: 14, label: 'Please wrap up' },
      { time: 17 }
    ]
  },
  {
    name: 'Presentation (with Q&A)',
    slug: slugify('Presentation (with Q&A)'),
    finishMessage: 'Thank you!',
    presentationDuration: 20,
    qaDuration: 10,
    showCountdown: true,
    countUp: false,
    reminders: [
      { time: 5 },
      { time: 10 },
      { time: 15 },
      { time: 19, label: 'Please wrap up' },
      { time: 23 }
    ]
  },
  {
    name: 'Presentation (with Q&A)',
    slug: slugify('Presentation (with Q&A)'),
    finishMessage: 'Thank you!',
    presentationDuration: 30,
    qaDuration: 15,
    showCountdown: true,
    countUp: false,
    reminders: [
      { time: 15 },
      { time: 20 },
      { time: 25 },
      { time: 29, label: 'Please wrap up' },
      { time: 35 },
      { time: 40 }
    ]
  },
  {
    name: 'Keynote (no Q&A)',
    slug: slugify('Keynote (no Q&A)'),
    finishMessage: 'Thank you!',
    presentationDuration: 90,
    qaDuration: 0,
    showCountdown: true,
    countUp: false,
    reminders: [
      { time: 15 },
      { time: 30 },
      { time: 45 },
      { time: 60 },
      { time: 75 },
      { time: 80 },
      { time: 85, label: 'Please wrap up.' }
    ]
  },
  {
    name: 'Keynote (with Q&A)',
    slug: slugify('Keynote (with Q&A)'),
    finishMessage: 'Thank you!',
    presentationDuration: 60,
    qaDuration: 30,
    showCountdown: true,
    countUp: false,
    reminders: [
      { time: 15 },
      { time: 30 },
      { time: 45 },
      { time: 50 },
      { time: 55, label: 'Please wrap up.' },
      { time: 70 },
      { time: 85 }
    ]
  }
]

ensureUniqueSlugs(DEFAULT_TIMERS) // Ensure each timer has a unique slug

export const useTimerConfigStore = defineStore('timer-config', () => {
  const templates = ref<TimerConfig[]>(DEFAULT_TIMERS)

  function createTemplateFromAny (data: unknown): undefined|TimerConfig {
    if (typeof data !== 'object' || data == null) {
      return undefined
    }

    const requiredProperties = ['name', 'slug', 'finishMessage', 'presentationDuration', 'qaDuration', 'showCountdown', 'countUp', 'reminders']
    if (!requiredProperties.every(x => x in data)) {
      return undefined
    }

    const checkedData = data as TimerConfig

    // Some final typechecks
    if (typeof checkedData.name !== 'string') {
      return undefined
    }
    if (typeof checkedData.finishMessage !== 'string') {
      return undefined
    }
    if (typeof checkedData.presentationDuration !== 'number' || checkedData.presentationDuration < 1) {
      return undefined
    }
    if (typeof checkedData.qaDuration !== 'number' || checkedData.qaDuration < 0) {
      return undefined
    }
    if (typeof checkedData.showCountdown !== 'boolean') {
      return undefined
    }
    if (typeof checkedData.countUp !== 'boolean') {
      return undefined
    }
    if (!Array.isArray(checkedData.reminders)) {
      return undefined
    }

    const cleanTemplate: TimerConfig = {
      name: checkedData.name,
      slug: slugify(checkedData.name),
      finishMessage: checkedData.finishMessage,
      presentationDuration: checkedData.presentationDuration,
      qaDuration: checkedData.qaDuration,
      showCountdown: checkedData.showCountdown,
      countUp: checkedData.countUp,
      reminders: checkedData.reminders
        .filter(r => {
          return r.label === undefined || typeof r.label === 'string' && typeof r.time === 'number' && r.time > 0
        })
    }

    // Now add to the beginning (so users can quickly find it on the homepage) and return
    templates.value.unshift(cleanTemplate)
    ensureUniqueSlugs(templates.value) // Ensure the new slug is not a duplicate
    return cleanTemplate
  }

  return { templates, createTemplateFromAny }
})
