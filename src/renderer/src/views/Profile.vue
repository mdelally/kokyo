<template>
  <UDashboardPanel>
    <UPage class="px-4 pt-4">
      <section class="flex items-center gap-6">
        <div class="bg-white w-32 h-32 rounded-full"></div>
        <UPageHeader
          :title="user?.user_metadata.alias"
          headline="he/him"
          class="flex-grow"
          :links="links"
        />
      </section>

      <UPageBody>
        <UPageCard title="About Me" description="Some text for the bio...">
          <strong>Member Since</strong>
          <p class="font-light italic">{{ new Date(user?.created_at).toDateString() }}</p>
        </UPageCard>
      </UPageBody>

      <template #right>
        <UNavigationMenu
          orientation="vertical"
          :items="items"
          class="data-[orientation=vertical]:w-48"
        />
      </template>
    </UPage>
  </UDashboardPanel>
</template>

<script setup lang="ts">
import useAuth from '@renderer/composables/useAuth'
import { ref } from 'vue'

const { user } = useAuth()

const items = ref([
  {
    label: 'Actions',
    type: 'label'
  },
  {
    label: 'Edit Profile',
    icon: 'solar:pen-2-bold-duotone'
  },
  {
    label: 'Friends',
    icon: 'solar:user-heart-bold-duotone'
  },
  {
    label: 'Activity',
    icon: 'solar:clock-square-bold-duotone'
  }
])

const links = ref([
  { label: 'Spotify', icon: 'simple-icons:spotify' },
  { label: 'Steam', icon: 'simple-icons:steam' },
  { label: 'Bluesky', icon: 'simple-icons:bluesky' }
])
</script>
