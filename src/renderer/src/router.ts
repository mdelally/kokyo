import { createMemoryHistory, createRouter } from 'vue-router'

import useAuth from './composables/useAuth'
const { hasSession } = useAuth()

import index from './views/index.vue'
import Dashboard from './views/Dashboard.vue'

const routes = [
  { path: '/', component: index },
  {
    path: '/dashboard',
    component: Dashboard,
    beforeEnter: () => hasSession()
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
