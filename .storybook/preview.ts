import { setup, type Preview } from "@storybook/vue3"
// Our app uses Pinia, so we need to include it here.
import { createPinia } from "pinia"
// Same with the router.
import router from '../src/router'
// And, lastly, our custom CSS rules.
import '../src/assets/main.css'

const pinia = createPinia()

setup(app => {
  app.use(pinia)
  app.use(router)
})

const preview: Preview = {
  tags: ['autodocs'], // Generate automatic documentation
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      }
    }
  }
}

export default preview
