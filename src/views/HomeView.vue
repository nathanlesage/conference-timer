<template>
  <div id="home-wrapper">
    <header>
      <h1 class="contrast-text">
        Conference Timer
        <!-- Make the AppLogo visually align centrally with the text -->
        <AppLogo v-bind:size="80" style="margin-bottom: -12px;"></AppLogo>
      </h1>

    </header>
    <main>
      <p class="contrast-text">
        Help your speakers visually manage their presentation time. To get
        started, select a template from below, or create your own in a few
        seconds.
        <RouterLink v-bind:to="'/about'">Read instructions</RouterLink>
      </p>
      <div id="template-wrapper">
        <!-- Create Custom action -->
        <RouterLink to="/wizard" class="template inline">Add new custom template</RouterLink>

        <!-- "Table" header -->
        <div class="template accent-background">
          <strong class="name">Template Name</strong>
          <strong class="time">Time</strong>
          <strong class="qa">Q&amp;A</strong>
          <strong class="use">&nbsp;</strong>
        </div>

        <div class="template" v-for="timer in timerConfig.templates" v-bind:key="timer.name">
          <strong class="name">{{ timer.name }}</strong>
          <p class="time">{{ timer.presentationDuration }}&thinsp;min</p>
          <p class="qa">
            <template v-if="timer.qaDuration > 0">{{ timer.qaDuration }}&thinsp;min</template>
            <template v-else>&nbsp;</template>
          </p>

          <RouterLink v-bind:to="'/' + timer.slug" class="use">Use &raquo;</RouterLink>
        </div>
      </div>
    </main>
    <footer>
      <p class="contrast-text">
        &copy; Hendrik Erz {{ (new Date()).getFullYear() }} |
        Conference Timer v{{ versionString }} |
        <a href="https://github.com/nathanlesage/conference-timer">View on GitHub</a>
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useTimerConfigStore } from '../stores/timer-config'
import AppLogo from '../components/AppLogo.vue'
import { RouterLink } from 'vue-router'

const versionString = __APP_VERSION__

const timerConfig = useTimerConfigStore()
</script>

<style lang="css" scoped>
@keyframes gradient {
  0% { background-position: 0% 0%; }
  25% { background-position: 0% 100%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 100% 0%; }
  100% { background-position: 0% 0%; }
}

#home-wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: safe center; /* Ensure the items don't get truncated on too-wide screens */
  overflow: auto;
  line-height: 1.3;
  /* Animated gradient background */
  background: linear-gradient(45deg, #ef9a80, #f3a4c2, #9bdff8, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 30s ease infinite;
}

#template-wrapper {
  padding: 20px 0;
  max-width: 600px;
  margin: 0 auto;
  overflow: auto;

  a { text-decoration: none; }

  .template {
    display: grid;
    grid-template-columns: auto 100px 100px 100px;
    grid-template-areas: "name time qa use";
    align-items: center;
    font-size: 14px;
    background-color: var(--color-background-soft);
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 5px;

    > * {
      padding: 5px;
    }

    > *:not(:last-child) {
      border-right: 1px dotted var(--color-text);
    }

    .name { grid-area: name; text-align: right; padding-right: 10px; }
    .time { grid-area: time; }
    .qa { grid-area: qa; }
    .time, .qa { white-space: nowrap; } /* Prevent breaking up the times */
    .use { grid-area: use; }

    &.accent-background {
      background-color: var(--vt-c-indigo);
      color: white;
      > *:not(:last-child) {
        border-right-color: white;
      }
    }

    &.inline { display: inline-block; }
  }
}

header {
  font-size: 48px;
  h1 {
    font-weight: bold;
    margin: 0;
  }
}

main {
  padding: 2em 0;
  max-width: 80vw;
  margin: 0 auto;
  font-size: 150%;
}

footer {
  margin-bottom: 40px;
}
</style>
