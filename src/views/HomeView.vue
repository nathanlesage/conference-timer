<template>
  <div id="home-wrapper">
    <header>
      <h1>
        Conference Timer
        <!-- Make the AppLogo visually align centrally with the text -->
        <AppLogo v-bind:size="80" style="margin-bottom: -12px;"></AppLogo>
      </h1>

    </header>
    <main>
      <p>
        Help your speakers visually manage their presentation time. To get
        started, select a template from below, or create your own in a few
        seconds.
        <RouterLink v-bind:to="'/about'">Read instructions</RouterLink>
      </p>
      <TemplateTable></TemplateTable>
    </main>
    <footer>
      <p>
        &copy; Hendrik Erz {{ (new Date()).getFullYear() }} |
        v{{ versionString }} |
        <a href="https://github.com/nathanlesage/conference-timer">View on GitHub</a> |
        <a href="https://github.com/nathanlesage/conference-timer/blob/main/CHANGELOG.md">What's changed?</a>
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import AppLogo from '../components/AppLogo.vue'
import { RouterLink } from 'vue-router'
import TemplateTable from '@/components/TemplateTable.vue'

const versionString = __APP_VERSION__
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
  color: var(--vt-c-text-light-1); /* Keep the text color regardless of light/dark mode */
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
