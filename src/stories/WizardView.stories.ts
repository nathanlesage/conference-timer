// import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3'

import WizardView from '../views/WizardView.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<typeof WizardView> = {
  title: 'Conference Timer/WizardView',
  component: WizardView,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {},
  args: {},
}

export default meta;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Initial: StoryObj<typeof meta> = {
  args: {}
}
