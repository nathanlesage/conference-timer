import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TimerView from '@/views/TimerView.vue'
import AboutView from '@/views/AboutView.vue'
import WizardView from '@/views/WizardView.vue'
import { useTimerConfigStore } from '@/stores/timer-config'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/wizard',
      name: 'wizard',
      component: WizardView
    },
    {
      path: '/create-template/:data',
      redirect (to) {
        // data contains first the slug, and then the base64 encoded data.
        const fragment = to.params.data as string
        const maybeBase64 = fragment.split('-').pop()
        console.log({ fragment, maybeBase64, split: fragment.split('-') })
        if (maybeBase64 === undefined || !/^[-A-Za-z0-9+/]*={0,3}$/.test(maybeBase64)) {
          return '/'
        }

        // It's valid base64
        const json = atob(maybeBase64)
        // Parse
        try {
          const data = JSON.parse(json)
          const store = useTimerConfigStore()
          const result = store.createTemplateFromAny(data)
          return result === undefined ? '/' : '/' + result.slug
        } catch (err) {
          console.error(err)
          return '/'
        }
      }
    },
    {
      path: '/:slug',
      name: 'timer',
      component: TimerView
    }
  ],
})

export default router
