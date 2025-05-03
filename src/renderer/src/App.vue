<template>
  <FullscreenLoader :is-loading="isAuthenticating" />
  <UApp v-if="!isAuthenticating">
    <UDashboardGroup unit="rem">
      <SideNavigation />

      <RouterView />
    </UDashboardGroup>
  </UApp>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useAuth from '@renderer/composables/useAuth'
import { useRouter } from 'vue-router'
import SideNavigation from './components/layout/SideNavigation.vue'
import FullscreenLoader from './components/layout/FullscreenLoader.vue'

const { getSession, hasSession } = useAuth()
const router = useRouter()

const isAuthenticating = ref(true)

onMounted(async () => {
  await getSession()

  if (hasSession()) {
    router.push('/dashboard')
  }

  isAuthenticating.value = false
})
</script>

<style>
/* div#app {
  height: 100vh;
} */
</style>
