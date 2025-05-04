<template>
  <UDashboardPanel>
    <section class="h-screen bg-neutral-900 flex flex-col justify-between">
      <div ref="chatWindow" class="w-full overflow-y-scroll">
        <article
          v-for="(entry, index) in globalTextRenderedMessages"
          :key="entry.message"
          class="px-2 py-4 bg-neutral-800 flex gap-2 whitespace-normal break-words"
          :class="{
            '!py-0': globalTextRenderedMessages[index - 1]?.author === entry.author,
            '!pb-0': globalTextRenderedMessages[index - 1]?.author !== entry.author,
            // '!pb-4': index === globalTextRenderedMessages.length - 1,
            'border-b border-neutral-700 !pb-4':
              globalTextRenderedMessages[index + 1]?.author != entry.author
          }"
        >
          <UAvatar
            v-if="globalTextRenderedMessages[index - 1]?.author != entry.author"
            src="/Krombopulus.png"
            size="3xl"
          ></UAvatar>
          <section class="w-5/6">
            <h5
              v-if="globalTextRenderedMessages[index - 1]?.author != entry.author"
              class="font-bold -mt-1 flex items-center gap-2"
              :class="{
                'text-primary-500': isSelf(entry.author),
                'text-secondary-400': !isSelf(entry.author)
              }"
            >
              <span>{{ entry.author }}</span>
              <span class="text-sm text-neutral-400 font-light">{{
                new Date(entry.posted).toLocaleString()
              }}</span>
            </h5>
            <p
              class="message"
              :class="{ 'pl-14': globalTextRenderedMessages[index - 1]?.author === entry.author }"
              v-html="entry.message"
            ></p>
          </section>
        </article>
      </div>
      <form class="p-1 flex items-center gap-1" @submit.prevent="handleGlobalMessage">
        <UInput
          v-model="newMessage"
          name="message"
          placeholder="Type your message..."
          class="flex-grow"
          size="xl"
          variant="subtle"
          icon="solar:chat-round-bold-duotone"
        />
        <div class="flex-grow-0">
          <UButton label="Send" size="xl" icon="solar:plain-bold-duotone" type="submit" />
        </div>
      </form>
    </section>

    <!-- <section class="p-3 bg-neutral-900 mt-8 rounded-md">
      <UButton
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
    </section> -->
  </UDashboardPanel>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import useAuth from '../composables/useAuth'
import { supabase } from '../composables/useSupabase'

import { marked } from 'marked'
import useProfile from '@renderer/composables/useProfile'

const { user } = useAuth()
const newMessage = ref('')
// const showDebug = ref(false)

const globalTextChannel = supabase.channel('globalChat', {
  config: {
    broadcast: { self: true }
  }
})

const { profile } = useProfile()
console.log(profile)
interface GlobalMessage {
  author: string
  message: string
  posted: string
}

const globalTextRenderedMessages = ref<GlobalMessage[]>([])

onMounted(async () => {
  const { data } = await supabase
    .from('globalChat')
    .select()
    .order('created_at', { ascending: true })

  data?.forEach((message) => {
    globalTextRenderedMessages.value.push({
      author: message.author,
      message: marked.parse(message.message),
      posted: message.created_at
    })
  })

  console.log(data)
})

globalTextChannel
  .on('postgres_changes', { event: '*', schema: 'public', table: 'globalChat' }, (payload) => {
    console.log(payload)

    if (!isSelf(payload.new.author)) {
      const messageReceivedSound = new Audio('/sound/message_received.ogg')
      messageReceivedSound.play()

      const NOTIFICATION_TITLE = 'Kokyo message received!'
      const NOTIFICATION_BODY = `You received a message from ${payload.new.author}`

      new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY, silent: true })
    }

    globalTextRenderedMessages.value.push({
      //@ts-ignore - asdasd
      author: payload.new.author,
      //@ts-ignore - asdasd
      message: marked.parse(payload.new.message),
      //@ts-ignore - asdasd
      posted: payload.new.created_at
    })
  })
  .subscribe()

const chatWindow = ref<HTMLElement>()

watch(globalTextRenderedMessages.value, () => {
  console.log(chatWindow.value?.scrollHeight)

  nextTick(() => {
    chatWindow.value?.scrollBy(0, chatWindow.value?.getBoundingClientRect().bottom + 1000)
  })
})

const isSelf = (author: string): boolean => {
  return user?.value?.user_metadata.alias === author
}

async function handleGlobalMessage(): Promise<void> {
  if (newMessage.value) {
    const { data } = await supabase
      .from('globalChat')
      .insert({
        author: user?.value?.user_metadata.alias,
        author_id: user?.value?.id,
        message: newMessage.value
      })
      .select()

    console.log(data)
    newMessage.value = ''
  }
}
</script>
