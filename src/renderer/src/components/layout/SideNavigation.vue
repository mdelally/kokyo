<template>
  <UDashboardSidebar v-if="hasSession()" id="default" :ui="{ footer: 'border-t border-default' }">
    <template #header>
      <div class="flex gap-2 items-center">
        <Icon icon="solar:chat-round-bold-duotone" width="2em" />
        <p>kōkyō</p>
      </div>
    </template>

    <template #default>
      <UNavigationMenu :items="items" orientation="vertical" class="mt-auto" />
    </template>

    <template #footer>
      <UTooltip text="Click to Sign Out">
        <UButton
          :avatar="{
            src: '/Krombopulus.png'
          }"
          :label="user?.user_metadata.alias"
          color="neutral"
          variant="ghost"
          size="xl"
          block
          @click="handleSignOut()"
        />
      </UTooltip>
    </template>
  </UDashboardSidebar>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import useAuth from '@renderer/composables/useAuth'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

const { hasSession, signOut, user } = useAuth()
const router = useRouter()

async function handleSignOut(): Promise<void> {
  await signOut()
  router.push('/')
}

const items: NavigationMenuItem[] = [
  {
    label: 'Global Chat',
    icon: 'solar:chat-dots-bold-duotone',
    to: '/dashboard'
  },
  { label: 'Profile', icon: 'solar:user-circle-bold-duotone', to: '/profile' },
  { label: 'Settings', icon: 'solar:settings-bold-duotone', to: '/settings/account' }
]
</script>
