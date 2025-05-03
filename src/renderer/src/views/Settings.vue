<template>
  <UDashboardPanel class="overflow-y-auto overflow-x-hidden">
    <UPage class="px-4 pt-4">
      <section class="flex gap-4">
        <UNavigationMenu orientation="vertical" class="fixed" :items="items" />
        <div class="flex-1 pl-48">
          <RouterView />
        </div>
      </section>
    </UPage>
  </UDashboardPanel>
</template>

<script setup lang="ts">
import useAuth from '@renderer/composables/useAuth'
import { ref } from 'vue'

const { user } = useAuth()

const items = ref([
  {
    label: 'User Settings',
    type: 'label'
  },
  {
    label: 'My Account',
    icon: 'solar:user-bold-duotone',
    to: '/settings/account'
  },
  {
    label: 'Data & Privacy',
    icon: 'solar:shield-keyhole-bold-duotone',
    to: '/settings/privacy'
  },
  {
    label: 'Appearance',
    icon: 'solar:paint-roller-bold-duotone'
  },
  {
    label: 'Accessibility',
    icon: 'solar:accessibility-bold-duotone'
  },
  {
    label: 'Chat',
    icon: 'solar:chat-line-bold-duotone'
  },
  {
    label: 'Keybinds',
    icon: 'solar:keyboard-bold-duotone'
  }
])
</script>
