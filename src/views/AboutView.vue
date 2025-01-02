<template>
  <div id="about">
    <h1>About Conference Timer</h1>
    <p>
      <RouterLink v-bind:to="'/'">Home</RouterLink>
    </p>
    <p>
      Conference timer is a small tool for visualizing presentation time for
      speakers at conferences or workshops. Simply choose or create a template,
      and start the timer.
    </p>
    <h2>Step 1: Choose a Template</h2>
    <p>
      On the homepage, you have a set of pre-defined templates for common
      presentation formats available. Each card tells you its name and how long
      the presentation and Q&amp;A sections are. All templates come with several
      reminders pre-defined that will tell presenters either how many minutes
      are left, or a custom message.
    </p>
    <p>
      Click "Use" to switch to the presentation mode. You can immediately start
      a timer.
    </p>
    <p>
      If none of the available templates match your needs, you can create a
      custom template. A wizard will lead you through the settings and allow you
      to customize everything. Afterwards, you can use your custom template.
    </p>
    <h2>Step 2: Use the Timer</h2>
    <p>
      Once you have entered the timer view, there are a few controls. Each timer
      begins in a "stopped" state. To start the timer, click the play button.
      This will trigger three things:
    </p>
    <ol>
      <li>The timer will start immediately.</li>
      <li>
        The app will request to go into fullscreen mode so that all that is
        shown is the timer app. This will not happen if your security settings
        prevent apps from requesting to go fullscreen.
      </li>
      <li>
        The app will request a so-called "wake lock" to prevent your computer
        from going to sleep while the timer is running. If the app could not
        acquire this lock, a warning message will appear in the top-center.
      </li>
    </ol>
    <p>
      While the presentation is running, you can at any time pause the
      presentation (and then resume), or prematurely stop the timer.
    </p>
    <h2>How the Timer Works</h2>
    <p>
      As the timer runs, the presenter has two visual indications as to how much
      time the speaker has left: First, the app will prominently show a
      countdown. Second, and more importantly, the background behind the app
      will slowly fill with color from left to right as the presentation
      proceeds. Once the background color has changed completely, time is up.
    </p>
    <p>
      For timer templates that include a dedicated Q&amp;A section, once the
      app's background has completely filled, the color will leave, again from
      left to right, to indicate the time left for the Q&amp;A section.
    </p>
    <p>
      While the timer runs down, any reminders that are defined on the template
      will be shown at the corresponding time marks. Each reminder will be shown
      for 10 seconds.
    </p>
    <hr>
    <p>
      View the full instructions for conference organizers, session chairs, and
      speakers <a href="https://github.com/nathanlesage/conference-timer/README.md">in the README file</a>.
    </p>
    <hr>
    <p>
      <RouterLink v-bind:to="'/'">Home</RouterLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style>
#about {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  padding: 40px 0;
  margin: 0 auto;
  justify-content: center;
  gap: 10px;
}
</style>
