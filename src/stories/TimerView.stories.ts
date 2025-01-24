// import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3'
import { DEFAULT_TIMERS, type TimerConfig } from '../stores/timer-config'

import TimerView from '../views/TimerView.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<typeof TimerView> = {
  title: 'Conference Timer/TimerView',
  component: TimerView,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    useTemplate: {
      control: 'select',
      options: DEFAULT_TIMERS.map(t => t.name),
      mapping: Object.fromEntries(DEFAULT_TIMERS.map(t => [t.name, t])),
      description: 'The timer view usually uses the URL slug to determine the template to use, but with this slider you can override this.',
      table: {
        defaultValue: { summary: 'undefined', detail: 'This component reads the current route\'s slug to determine which template to use.' }
      }
    },
  },
  args: {},
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
  finishMessage: 'This is the finish message!',
  presentationDuration: 3,
  qaDuration: 1,
  showCountdown: true,
  countUp: false,
  reminders: [
    { time: 1 },
    { time: 2, label: 'Custom Message Label' }
  ]
}

export const View404: StoryObj<typeof meta> = {
  args: {}
}

export const FullPresentation: StoryObj<typeof meta> = {
  args: {
    useTemplate: TEST_CONFIG
  }
}
