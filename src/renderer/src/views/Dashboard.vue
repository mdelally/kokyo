<template>
  <section class="px-12 mx-auto">
    <h2 class="text-emerald-500 font-bold text-4xl">You are signed in! 😍</h2>

    <section class="p-3 bg-neutral-900 mt-8 rounded-md">
      <BaseButton
        :label="showDebug ? 'Hide Debug Panel' : 'Show Debug Panel'"
        @click="showDebug = !showDebug"
      />

      <div v-if="showDebug" class="grid grid-cols-2 gap-4 mt-4 text-amber-500">
        <div class="bg-amber-950 p-3 rounded-md">
          <h3>User Data</h3>
          <pre class="max-h-[340px] overflow-y-scroll">
          <code>{{ user }}</code>
        </pre>
        </div>

        <div class="bg-amber-950 p-3 rounded-md">
          <h3>Session Data</h3>
          <pre class="max-h-[340px] overflow-y-scroll">
          <code>{{ session }}</code>
        </pre>
        </div>
      </div>
    </section>

    <section class="mt-12 p-3 bg-neutral-900 rounded-md h-[60vh] flex flex-col justify-between">
      <div class="p-3 flex flex-col gap-2">
        <div
          v-for="message in globalTextRenderedMessages"
          :key="message"
          class="px-3 py-2 bg-neutral-800 flex flex-col rounded-xl"
          :class="{ '!bg-neutral-700': isSelf(message.author) }"
        >
          <div class="font-bold tracking-wider text-neutral-400">{{ message.author }}</div>
          {{ message.message }}
        </div>
      </div>
    </section>
    <form class="flex items-center" @submit.prevent="handleGlobalMessage">
      <InputText
        v-model="newMessage"
        name="message"
        placeholder="Type your message..."
        class="flex-grow"
      />
      <div class="flex-grow-0">
        <BaseButton label="Send" icon="solar:plain-bold-duotone" type="submit" />
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useAuth from '../composables/useAuth'
import { supabase } from '../composables/useSupabase'

const { session, user } = useAuth()
const newMessage = ref('')
const showDebug = ref(false)

const globalTextChannel = supabase.channel('globalChat', {
  config: {
    broadcast: { self: true }
  }
})

interface GlobalMessage {
  author: string
  message: string
}

const globalTextRenderedMessages = ref<GlobalMessage[]>([])

globalTextChannel
  .on('broadcast', { event: '*' }, ({ payload }) => {
    globalTextRenderedMessages.value.push(payload)
  })
  .subscribe()

const isSelf = (author: string): boolean => {
  return user?.value.user_metadata.alias === author
}

function handleGlobalMessage(): void {
  if (newMessage.value) {
    globalTextChannel
      .send({
        type: 'broadcast',
        event: 'Test message',
        payload: {
          message: newMessage.value,
          author: user?.value.user_metadata.alias || '???'
        }
      })
      .then((response) => console.log(response))

    newMessage.value = ''
  }
}
</script>
