// import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3'
import { DEFAULT_TIMERS, type TimerConfig } from '../stores/timer-config'

import DynamicTimeline from '../components/DynamicTimeline.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<typeof DynamicTimeline> = {
  title: 'Conference Timer/DynamicTimeline',
  component: DynamicTimeline,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    elapsedSeconds: {
      control: 'range',
      // Dynamically determine the max duration
      min: 0,
      max: Math.max(...DEFAULT_TIMERS.map(t => (t.presentationDuration + t.qaDuration) * 60)),
      step: 1,
      description: 'Influences the render state of the DynamicTimeline, i.e. how far the progress bar will render.'
    },
    template: {
      control: 'select',
      options: DEFAULT_TIMERS.map(t => t.name),
      mapping: Object.fromEntries(DEFAULT_TIMERS.map(t => [t.name, t])),
      description: 'The template to render in the timeline. The options include the defaults for the app.'
    }
  },
  args: {
    elapsedSeconds: 0,
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    // onClick: fn(),
  },
}

export default meta;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

const TEST_CONFIG: TimerConfig = {
  name: 'Test Config',
  slug: 'test-config',
  finishMessage: 'Thank you!',
  presentationDuration: 5,
  qaDuration: 0,
  showCountdown: true,
  countUp: false,
  reminders: [
    { time: 3 },
    { time: 4, label: 'Please wrap up' }
  ]
}

export const LoadedAndStopped: StoryObj<typeof meta> = {
  args: {
    elapsedSeconds: 0,
    template: TEST_CONFIG
  },
}

export const HalfwayThrough: StoryObj<typeof meta> = {
  args: {
    elapsedSeconds: TEST_CONFIG.presentationDuration * 30,
    template: TEST_CONFIG
  }
}

export const OnFirstReminder: StoryObj<typeof meta> = {
  args: {
    elapsedSeconds: TEST_CONFIG.reminders[0].time * 60,
    template: TEST_CONFIG
  }
}

export const Finished: StoryObj<typeof meta> = {
  args: {
    elapsedSeconds: (TEST_CONFIG.presentationDuration + TEST_CONFIG.qaDuration) * 60,
    template: TEST_CONFIG
  }
}
