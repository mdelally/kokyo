<template>
  <div
    class="p-2 pl-4 flex justify-between items-center bg-amber-800 text-amber-100 font-bold tracking-wider text-md"
  >
    <div class="flex gap-2 items-center">
      <Icon icon="solar:chat-round-bold-duotone" width="2em" />
      <p>kōkyō</p>
    </div>
    <div v-if="hasSession()" class="flex items-center gap-2">
      <div class="font-light">{{ user?.user_metadata.alias }}</div>
      <BaseButton label="Sign out" icon="solar:logout-2-bold-duotone" @click="handleSignOut" />
    </div>
  </div>

  <main class="p-6">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useAuth from '@renderer/composables/useAuth'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

const { getSession, hasSession, signOut, user } = useAuth()
const router = useRouter()

onMounted(async () => {
  await getSession()

  if (hasSession()) router.push('/dashboard')
})

async function handleSignOut(): Promise<void> {
  await signOut()
  router.push('/')
}

// const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
</script>
