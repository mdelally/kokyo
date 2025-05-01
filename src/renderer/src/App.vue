<template>
  <section
    v-if="isAuthenticating"
    class="h-screen flex flex-col items-center justify-center text-amber-600"
  >
    <Icon icon="svg-spinners:pulse-rings-multiple" width="30%" />
    <p class="text-lg font-bold animate-pulse">Connecting...</p>
  </section>

  <section v-else class="h-screen flex">
    <nav
      class="resize-x flex h-full flex-col min-w-2xs justify-between bg-amber-800 text-amber-100 font-bold tracking-wider text-md"
    >
      <section>
        <div class="flex gap-2 items-center bg-amber-900 p-2">
          <Icon icon="solar:chat-round-bold-duotone" width="2em" />
          <p>kōkyō</p>
        </div>

        <div class="flex flex-col">
          <RouterLink to="/dashboard" class="px-2 py-1 hover:bg-amber-950">Global Chat</RouterLink>
          <RouterLink to="/profile" class="px-2 py-1 hover:bg-amber-950">Profile</RouterLink>
        </div>
      </section>

      <div v-if="hasSession()" class="flex justify-between items-center gap-2 p-2">
        <div class="flex items-center gap-2">
          <div class="bg-white rounded-full w-8 h-8"></div>
          <div class="font-light">{{ user?.user_metadata.alias }}</div>
        </div>
        <BaseButton label="Logout" icon="solar:logout-2-bold-duotone" @click="handleSignOut" />
      </div>
    </nav>

    <main class="flex-1 overflow-auto">
      <RouterView />
    </main>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useAuth from '@renderer/composables/useAuth'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

const { getSession, hasSession, signOut, user } = useAuth()
const router = useRouter()

const isAuthenticating = ref(true)

onMounted(async () => {
  await getSession()

  if (hasSession()) {
    router.push('/dashboard')
  }

  isAuthenticating.value = false
})

async function handleSignOut(): Promise<void> {
  await signOut()
  router.push('/')
}

// const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
</script>

<style>
div#app {
  height: 100vh;
}
</style>
