<template>
  <template v-if="template === undefined">
    <h1>404</h1> <!-- TODO: Better 404 template! -->
  </template>

  <template v-else>
    <!-- First the background animation -->
    <div id="progress-background" v-bind:style="progressStyle"></div>

    <!-- Then the main timer grid -->
    <div id="timer-grid">
      <!-- Timer Controls -->
      <div class="header-left">
        <div id="timer-controls">
          <a href="#" v-on:click="resetTimer()">⏮</a>
          <a href="#" v-on:click="pauseTimer()" v-bind:class="{ active: currentTimerState.state === 'paused' }">⏸</a>
          <a href="#" v-on:click="resumeTimer()" v-bind:class="{ active: currentTimerState.state === 'started' }">▶</a>
          <a href="#" v-on:click="stopTimer()" v-bind:class="{ active: currentTimerState.state === 'stopped' }">⏹</a>
        </div>
      </div>

      <div class="header-center">
        <!--
          We use this slot to display an error if the screen couldn't be locked.
          This is helpful to announce to users because the display may go to
          sleep before the timer is finished.
        -->
          <p v-if="currentTimerState.state !== 'stopped' && wakeLock === undefined" class="contrast-text">
            <strong>Warning</strong>: Display may go to sleep
          </p>
      </div>

      <div class="header-right">
        <!-- Exit the timer view -->
        <RouterLink to="/">Exit</RouterLink>
      </div>

      <div class="content-center main-display">
        <template v-if="currentTimerState.state === 'stopped'">
          <!-- The timer hasn't started -> show welcome message -->
          <a href="#" v-on:click="resumeTimer">▶</a>
          <p class="info-text contrast-text">
            <strong>You're all set!</strong>
            <br>
            Click start to begin the presentation. If you intend to show the
            timer to the presenter, first drag this browser window onto the
            corresponding screen if applicable. The app will automatically
            enter fullscreen mode.
          </p>
        </template>
        <template v-else-if="currentTimerState.state === 'paused'">
          <!-- The timer has paused -> Show resume -->
          <a href="#" v-on:click="resumeTimer">▶</a>
          <p class="info-text contrast-text">Resume timer</p>
        </template>
        <p class="contrast-text" v-else-if="currentTimerState.state === 'ended'">
          <!-- The timer has finished -> Show finish message -->
          <strong>{{ template.finishMessage }}</strong>
        </p>
        <template v-else>
          <!-- Nothing else applies: Show the countdown -->
          <Transition name="blur">
            <span v-if="currentReminderLabel === undefined" class="timer time-display contrast-text">
              <template v-if="template.showCountdown === false">
                {{ currentPhase }}
              </template>
              <template v-else>
                {{ phaseCountdown }}
              </template>
            </span>
            <span v-else class="timer time-display contrast-text">
              {{ currentReminderLabel }}
            </span>
          </Transition>
        </template>
      </div>

      <div class="footer-left contrast-text">{{ template.name }}</div>
      <div class="footer-center time-display contrast-text">{{ totalCountdown }}</div>
      <div class="footer-right contrast-text">{{ currentPhase }}</div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useTimerConfigStore, type TimerConfig } from '../stores/timer-config'

const route = useRoute()
const slug = computed<string>(() => route.params.slug as string)

const templateStore = useTimerConfigStore()

const template = computed<TimerConfig|undefined>(() => {
  return templateStore.templates.find(x => x.slug === slug.value)
})

const presentationLength = computed(() => {
  return (template.value?.presentationDuration ?? 0) * 60
})
const qaLength = computed(() => {
  return (template.value?.qaDuration ?? 0) * 60
})

// ***

interface LocalTimerState {
  timeStarted: number
  timeNow: number // Updating this property will update the entire state
  state: 'started'|'paused'|'stopped'|'ended'
}

const currentTimerState = ref<LocalTimerState>({
  timeStarted: getNowSeconds(),
  timeNow: getNowSeconds(),
  state: 'stopped'
})

const secondsElapsed = computed(() => {
  return currentTimerState.value.timeNow - currentTimerState.value.timeStarted
})
const secondsRemaining = computed(() => {
  return presentationLength.value + qaLength.value - secondsElapsed.value
})
const secondsRemainingPhase = computed(() => {
  if (secondsElapsed.value < presentationLength.value) {
    return presentationLength.value - secondsElapsed.value
  } else {
    const phaseElapsed = secondsElapsed.value - presentationLength.value
    return qaLength.value - phaseElapsed
  }
})

const progressStyle = computed(() => {
  if (qaLength.value === 0) {
    return `width: ${secondsElapsed.value / presentationLength.value * 100}%;`
  } else if (secondsElapsed.value < presentationLength.value) {
    return `width: ${secondsElapsed.value / presentationLength.value * 100}%;`
  } else if (secondsElapsed.value >= presentationLength.value) {
    const qaElapsed = secondsElapsed.value - presentationLength.value
    const percent = qaElapsed / qaLength.value * 100
    return `width: ${100 - percent}%; left: ${percent}%;`
  } else {
    return 'width: 0%'
  }

})

const totalCountdown = computed(() => {
  if (template.value === undefined) {
    return ''
  }

  const time = (template.value?.countUp === true)
    ? secondsElapsed.value
    : secondsRemaining.value

  const hours = Math.floor(time / 3600).toString()
  const withoutHours = time % 3600
  const minutes = Math.floor(withoutHours / 60).toString()
  const seconds = (withoutHours % 60).toString()

  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
})

const phaseCountdown = computed(() => {
  if (template.value === undefined) {
    return ''
  }

  const time = (template.value?.countUp === true)
    ? secondsElapsed.value
    : secondsRemainingPhase.value

  const hours = Math.floor(time / 3600).toString()
  const withoutHours = time % 3600
  const minutes = Math.floor(withoutHours / 60).toString()
  const seconds = (withoutHours % 60).toString()

  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
})

const currentPhase = computed(() => {
  if (template.value === undefined) {
    return 'Presentation'
  }

  // Then, determine the current phase
  if (secondsElapsed.value > presentationLength.value && qaLength.value > 0) {
    return 'Q&A'
  }

  return 'Presentation'
})

/**
 * Extracts the reminders set for the current template in a transformed way so
 * that it is easier to utilize (from second, to second, and label).
 */
const currentReminders = computed<Array<{ from: number, to: number, label?: string }>>(() => {
  if (template.value === undefined) {
    return []
  }
  return template.value.reminders
    .map(r => {
      const seconds = r.time * 60
      // Show each reminder for 10 seconds around the time mark
      return { from: seconds - 5, to: seconds + 5, label: r.label }
    })
})

/**
 * Outputs the current reminder label, if applicable.
 */
const currentReminderLabel = computed<string|undefined>(() => {
  if (currentReminders.value.length === 0) {
    console.log('No available reminders.')
    return undefined
  }

  const validReminder = currentReminders.value.find(r => secondsElapsed.value >= r.from && secondsElapsed.value <= r.to)

  if (validReminder === undefined) {
    return undefined
  }

  if (validReminder.label !== undefined) {
    return validReminder.label
  }

  // No label defined, so we have to make our own. Reminders without labels are
  // displayed as "x minutes remaining".
  const minutesRemaining = Math.round(secondsRemainingPhase.value / 60)

  return minutesRemaining > 1
    ? `${minutesRemaining} minutes remaining`
    : `1 minute remaining`
})

function tick () {
  if (template.value === undefined || currentTimerState.value.state === 'stopped' || currentTimerState.value.state === 'ended') {
    return
  }

  // Update the now state
  currentTimerState.value.timeNow = getNowSeconds()
  
  if (currentTimerState.value.state === 'paused') {
    currentTimerState.value.timeStarted += 1 // Prevent the timer from progressing while paused
  }

  if (currentTimerState.value.state === 'started' && secondsElapsed.value >= presentationLength.value + qaLength.value) {
    currentTimerState.value.state = 'ended'
  }
}

function onKeyboardEvent (event: KeyboardEvent) {
  if (event.key === ' ') {
    // Space key = start, pause, resume
    if (currentTimerState.value.state === 'started') {
      pauseTimer()
    } else if (currentTimerState.value.state === 'paused') {
      resumeTimer()
    } else if (currentTimerState.value.state === 'stopped') {
      startTimer()
    } else if (currentTimerState.value.state === 'ended') {
      startTimer()
    }
  }
}

let tickInterval: number|undefined
let wakeLock: WakeLockSentinel|undefined

onMounted(() => {
  tickInterval = setInterval(tick, 1000)
  document.addEventListener('keypress', onKeyboardEvent)
})

onBeforeUnmount(() => {
  clearInterval(tickInterval)
  document.removeEventListener('keypress', onKeyboardEvent)
  stopTimer()
})

function startTimer () {
  makeFullscreen()
  lockScreen()
  resetTimer()
  currentTimerState.value.state = 'started'
}

function pauseTimer () {
  currentTimerState.value.state = 'paused'
}

function resumeTimer () {
  if (currentTimerState.value.state === 'paused') {
    currentTimerState.value.state = 'started'
  } else {
    startTimer()
  }
}

function resetTimer () {
  currentTimerState.value.timeStarted = getNowSeconds()
  currentTimerState.value.timeNow = getNowSeconds()
  currentTimerState.value.state = 'stopped'
}

function stopTimer () {
  resetTimer()
  releaseScreen()
  exitFullscreen()
}

function makeFullscreen () {
  if (document.fullscreenElement !== null) {
    return
  }

  const elem = document.documentElement
  elem.requestFullscreen().catch(err => console.error(err))
}

function exitFullscreen () {
  if (document.fullscreenElement === null) {
    return
  }

  document.exitFullscreen().catch(err => console.error(err))
}

function lockScreen () {
  if (wakeLock !== undefined) {
    return // Wake lock already acquired
  }

  navigator.wakeLock.request('screen')
    .catch(err => {
      console.error(err)
    })
    .then(lock => {
      if (lock == null) {
        // TODO: Error
      } else {
        // Save for later
        console.log('WakeLock acquired. Display will not go to sleep.')
        wakeLock = lock
      }
    })
}

function releaseScreen () {
  if (wakeLock === undefined) {
    return
  }

  wakeLock.release()
    .catch(err => console.error(err))
    .then(() => {
      console.log('WakeLock released successfully.')
      wakeLock = undefined
    })
}

function getNowSeconds () {
  return Math.floor(Date.now() / 1000)
}
</script>

<style lang="css" scoped>
#timer-grid {
  width: 100vw;
  height: 100vh;
  display: grid;
  padding: 20px 20px;
  grid-template-areas:
    "header-left header-center header-right"
    "content-center content-center content-center"
    "footer-left footer-center footer-right";
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 40px auto 40px;
  align-items: center;
  overflow: hidden;

  .header-left { grid-area: header-left; text-align: left; }
  .header-center { grid-area: header-center; text-align: center; }
  .header-right { grid-area: header-right;  text-align: right; }
  .content-left { grid-area: content-left; text-align: left; }
  .content-center { grid-area: content-center; text-align: center; }
  .content-right { grid-area: content-right; text-align: right; }
  .footer-left { grid-area: footer-left; text-align: left; }
  .footer-center { grid-area: footer-center; text-align: center; }
  .footer-right { grid-area: footer-right; text-align: right; }
}

#progress-background {
  height: 100vh;
  position: absolute;
  z-index: -1;
  background-color: var(--vt-c-indigo);
  transition: 1s linear width, 1s linear left;
}

#timer-controls {
  display: grid;
  grid-template-columns: 20px 20px 20px 20px;
  width: 80px;
  grid-template-rows: 20px;
  align-items: center;
  border-radius: 20px;
  border-radius: 20px;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    width: 20px;
    height: 20px;
    &:hover, &.active {
      background-color: var(--color-background-mute);
    }
  }
}

.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }

.main-display {
  font-size: 20vh;
  font-weight: 700;
  /* Display grid and grid-row/grid-column make all span.timer-elements overlay in the center */
  display: grid;
  align-items: center;
  span.timer {
    line-height: 100%;
    grid-row: 1;
    grid-column: 1;
    font-weight: bold;
    display: block;
  }
}

.time-display {
  /* This ensures that numbers are always fixed width */
  font-variant-numeric: tabular-nums;
}

p.info-text {
  font-size: 20px;
  max-width: 600px;
  margin: 0 auto;
}

/* Transition styles */
.blur-enter-active {
  animation: blur 1s ease reverse;
}

.blur-leave-active {
  animation: blur 1s ease;
}

@keyframes blur {
  0% {
    filter: blur(0px);
    opacity: 1;
  }
  100% {
    filter: blur(40px);
    opacity: 0;
  }
}
</style>
