import { createMemoryHistory, createRouter } from 'vue-router'

import useAuth from './composables/useAuth'
const { hasSession } = useAuth()

import index from './views/index.vue'
import Dashboard from './views/Dashboard.vue'
import Profile from './views/Profile.vue'
import Settings from './views/Settings.vue'
import Account from './views/settings/Account.vue'
import DataPrivacy from './views/settings/DataPrivacy.vue'

const routes = [
  { path: '/', component: index },
  {
    path: '/dashboard',
    component: Dashboard,
    beforeEnter: () => hasSession()
  },
  {
    path: '/profile',
    component: Profile,
    beforeEnter: () => hasSession()
  },
  {
    path: '/settings',
    component: Settings,
    beforeEnter: () => hasSession(),
    children: [
      { path: 'account', component: Account },
      { path: 'privacy', component: DataPrivacy }
    ]
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
