<template>
  <div id="wizard-wrapper">
    <h1>Create a new template</h1>
    <p>
      Generate a custom timer template here. At the end, you will receive a link
      that you can use to share this template. This can be useful when you
      organize a conference: Create a template that fits your conference, and
      share it will your session chairs.
    </p>
    <p>
      <RouterLink to="/" class="pillow">Back to the homepage</RouterLink>
    </p>
    <form>
      <fieldset>
        <legend>General Properties</legend>
        <!-- Name, slug, finish message -->
        <div class="form-line">
          <label for="form-name">Template Name</label>
          <input type="text" v-model="config.name" name="name" id="form-name" placeholder="A human-readable name">
        </div>
        <div class="form-line">
          <label for="form-slug">Slug <small>(automatically generated)</small></label>
          <input type="text" v-model="config.slug" name="slug" id="form-slug" placeholder="A URL-safe version of the name" readonly>
        </div>
        <div class="form-line">
          <label for="form-finish-message">Finish message</label>
          <input type="text" v-model="config.finishMessage" id="form-finish-message" placeholder="A message to show at the end">
        </div>
      </fieldset>
      <fieldset>
        <legend>Duration</legend>
        <!-- Presentation and Q&A -->
        <div class="time-grid">
          <label for="form-presentation-duration">Presentation duration:</label>
          <div style="display: flex; gap: 5px; white-space: nowrap ;">
            <a href="#" v-on:click.prevent="config.presentationDuration = 10" v-bind:class="{'active': config.presentationDuration === 10 }">10&thinsp;min</a>
            <a href="#" v-on:click.prevent="config.presentationDuration = 15" v-bind:class="{'active': config.presentationDuration === 15 }">15&thinsp;min</a>
            <a href="#" v-on:click.prevent="config.presentationDuration = 20" v-bind:class="{'active': config.presentationDuration === 20 }">20&thinsp;min</a>
            <a href="#" v-on:click.prevent="config.presentationDuration = 30" v-bind:class="{'active': config.presentationDuration === 30 }">30&thinsp;min</a>
          </div>
          <input type="number" v-model="config.presentationDuration" id="form-presentation-duration" placeholder="How long should the presentation be?" min="1">
          <span>minutes</span>
        </div>
        <div class="time-grid">
          <label for="form-qa-duration">Q&amp;A session duration:</label>
          <div style="display: flex; gap: 5px; white-space: nowrap ;">
            <a href="#" v-on:click.prevent="config.qaDuration = 0" v-bind:class="{'active': config.qaDuration === 0 }">0&thinsp;min</a>
            <a href="#" v-on:click.prevent="config.qaDuration = 5" v-bind:class="{'active': config.qaDuration === 5 }">5&thinsp;min</a>
            <a href="#" v-on:click.prevent="config.qaDuration = 10" v-bind:class="{'active': config.qaDuration === 10 }">10&thinsp;min</a>
            <a href="#" v-on:click.prevent="config.qaDuration = 15" v-bind:class="{'active': config.qaDuration === 15 }">15&thinsp;min</a>
          </div>
          <input type="number" v-model="config.qaDuration" id="form-qa-duration" placeholder="How long should the Q&A session be?" min="0">
          <span>minutes</span>
        </div>
        <div class="form-line">
          The total time of this template is <strong>{{ config.presentationDuration + config.qaDuration }}</strong> minutes.
        </div>
      </fieldset>

      <fieldset>
        <legend>Other settings</legend>
        <div class="form-checkbox-line">
          <label for="form-count-up">Count up</label>
          <input type="checkbox" v-model="config.countUp" name="count-up" id="form-count-up">
        </div>
        <div class="form-checkbox-line">
          <label for="form-show-countdown">Show timer</label>
          <input type="checkbox" v-model="config.showCountdown" name="show-countdown" id="form-show-countdown">
        </div>
      </fieldset>

      <fieldset>
        <legend>Reminders</legend>
        <p>
          The circles on this timeline indicate at which time points reminders
          will be shown to the presenter.
        </p>
        <DynamicTimeline
          width="100%"
          v-bind:elapsed-seconds="0"
          v-bind:template="config"
        ></DynamicTimeline>
        <!-- Reminders -->
        <table>
          <thead>
            <tr>
              <th>Mark</th>
              <th>Label</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(r, idx) in config.reminders" v-bind:key="idx">
              <td>At minute <strong>{{ r.time }}</strong></td>
              <td>{{ r.label ?? 'No custom label' }}</td>
              <td><a href="#" v-on:click.prevent="removeReminder(idx)">Remove</a></td>
            </tr>
            <tr v-if="config.reminders.length === 0">
              <td colspan="3" style="font-style: italic; text-align: center;">No reminders set</td>
            </tr>
          </tbody>
        </table>

        <div class="form-line">
          <label for="form-reminder-time">Time mark</label>
          <input type="number" name="time" v-model="reminderTime" id="form-reminder-time" placeholder="At which minute?" min="1" v-bind:max="totalDuration">
        </div>
        <div class="form-line">
          <label for="form-reminder-label">Custom label (optional)</label>
          <input type="text" name="label" v-model="reminderLabel" id="form-reminder-label" placeholder="By default, the remaining time is announced">
        </div>
        <div class="form-line">
          <input type="button" v-on:click.prevent="addReminder" value="Add new reminder">
        </div>
      </fieldset>
      <fieldset>
        <legend>Next Steps</legend>
        <div class="form-line">
          <label>Copy the template link to your clipboard to share:</label>
          <textarea
            id="link-field"
            type="text"
            spellcheck="false"
            v-bind:value="fullCreateLink"
            v-on:click="(($event as MouseEvent).target as HTMLInputElement).select(); copyLink()"
          ></textarea>
          <span v-if="copyMessage">{{ copyMessage }}</span>
        </div>
        <div class="form-line">
          <RouterLink v-bind:to="createLink" class="pillow">Create Template &amp; Use</RouterLink>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
import DynamicTimeline from '@/components/DynamicTimeline.vue'
import { type TimerConfig } from '../stores/timer-config'
import { slugify } from '../util/slugify'
import { reactive, ref, computed, watch } from 'vue'

const config = reactive<TimerConfig>({
  name: 'Custom Template',
  slug: slugify('Custom Template'),
  finishMessage: 'Thank you!',
  presentationDuration: 10,
  qaDuration: 5,
  showCountdown: true,
  countUp: false,
  reminders: []
})

const reminderTime = ref(1)
const reminderLabel = ref('')
const copyMessage = ref('')
const totalDuration = computed(() => config.presentationDuration + config.qaDuration)

const createLink = computed(() => {
  const json = JSON.stringify(config)
  const base64 = btoa(json)
  return `/create-template/${config.slug}-${base64}`
})

const fullCreateLink = computed(() => window.location.origin + createLink.value)

watch(config, () => {
  config.slug = slugify(config.name)
})

function addReminder () {
  // Check that the reminder is unique
  const existingReminder = config.reminders.find(r => r.time === reminderTime.value)
  if (existingReminder !== undefined) {
    console.error('Cannot add reminder: There is already a reminder at that point.')
    return
  }

  const label = reminderLabel.value.trim()
  if (label !== '') {
    config.reminders.push({ time: reminderTime.value, label })
  } else {
    config.reminders.push({ time: reminderTime.value })
  }

  config.reminders.sort((a, b) => a.time - b.time)

  reminderTime.value = 1
  reminderLabel.value = ''
}

function removeReminder (idx: number) {
  config.reminders.splice(idx, 1)
}

function copyLink () {
  navigator.clipboard.writeText(fullCreateLink.value)
    .then(() => {
      copyMessage.value = 'Link copied to clipboard!'
      setTimeout(() => { copyMessage.value = '' }, 3000)
    })
    .catch(err => {
      console.error(err)
      copyMessage.value = 'Could not copy link to clipboard.'
      setTimeout(() => { copyMessage.value = '' }, 3000)
    })
}
</script>

<style scoped lang="css">
#wizard-wrapper {
  width: 100vw;
  height: 100vh;
  padding: 40px 200px;
  overflow: auto;
}

@media (max-width: 1000px) {
  #wizard-wrapper {
    padding: 40px;
  }
}

.time-grid {
  display: grid;
  align-items: center;
  grid-template-columns: auto auto 80px 80px;
  gap: 10px;

  a.active {
    color: inherit; /* Signal the current active time duration */
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  
  td, th {
    text-align: left;
    border: 1px solid #333;
    padding: 5px;
  }

  th { font-weight: bold; }
}

#link-field {
  word-break: break-all;
  font-family: monospace;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-background-soft);
  color: inherit;
  padding: 10px;
  font-size: inherit;
  width: 100%;
  resize: none;
}
</style>
