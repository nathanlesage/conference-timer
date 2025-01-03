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
        <div class="template">
          <h4>Custom</h4>
          <p>Create a custom template</p>
          <RouterLink to="/wizard">Create</RouterLink>
        </div>

        <div class="template" v-for="timer in timerConfig.templates" v-bind:key="timer.name">
          <h4>{{ timer.name }}</h4>

          <p>
            {{ timer.presentationDuration }}min
            <template v-if="timer.qaDuration > 0">
              + {{ timer.qaDuration }}min Q&amp;A
            </template>
          </p>

          <RouterLink v-bind:to="'/' + timer.slug">Use</RouterLink>
        </div>
      </div>
    </main>
    <footer>
      <p class="contrast-text">
        &copy; Hendrik Erz {{ (new Date()).getFullYear() }} |
        <a href="https://github.com/nathanlesage/conference-timer">View on GitHub</a>
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useTimerConfigStore } from '../stores/timer-config'
import AppLogo from '../components/AppLogo.vue'
import { RouterLink } from 'vue-router'

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
  display: flex;
  padding: 20px 0;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  overflow: auto;

  .template {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 150px;
    aspect-ratio: 1;
    font-size: 14px;
    background-color: var(--color-background-soft);
    padding: 5px;
    border-radius: 5px;

    a {
      font-size: 20px;
    }
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
