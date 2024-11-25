import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import PathPlayback from '../views/PathPlayback.vue'
import About from '../views/About.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/playback',
      name: 'playback',
      component: PathPlayback,
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
  ]
})

export default router
