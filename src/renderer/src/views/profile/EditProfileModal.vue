<template>
  <UModal
    title="Edit My Profile"
    description="Make changes to your public profile"
    :ui="{ footer: 'justify-end', content: 'max-w-2xl' }"
  >
    <template #body>
      <div class="flex gap-4">
        <div class="relative group">
          <div
            class="absolute opacity-0 group-hover:opacity-100 cursor-pointer bg-[rgba(0,0,0,0)] transition-all hover:bg-[rgba(0,0,0,0.4)] w-24 h-24 rounded-full flex flex-col items-center justify-center"
          >
            <Icon icon="solar:gallery-add-bold-duotone" width="2rem" />
            <span class="text-xs">Change avatar</span>
          </div>
          <UAvatar src="/Krombopulus.png" class="w-24 h-24" />
        </div>

        <form
          id="editProfile"
          class="flex-grow flex flex-col gap-4"
          @submit.prevent="saveProfile()"
        >
          <UFormField label="Alias">
            <UInput class="w-full" />
          </UFormField>
          <UFormField label="Pronouns">
            <UInput class="w-full" />
          </UFormField>
          <UFormField label="Bio">
            <UTextarea class="w-full" />
          </UFormField>

          <h3 class="font-bold">Social Links</h3>
          <UButtonGroup>
            <USelectMenu
              v-model="newLinkPlatform"
              :items="socialLinkOptions"
              value-key="type"
              :search-input="false"
              placeholder="Platform"
              class="min-w-30"
            />
            <UInput v-model="newLinkUrl" placeholder="URL to profile" class="min-w-80" />
            <UButton
              label="Add"
              variant="soft"
              icon="solar:add-circle-bold-duotone"
              @click="addLocalSocialLink"
            />
          </UButtonGroup>
          <UCard variant="soft">
            <div
              v-for="link in localSocialLinks"
              :key="link.type"
              class="flex items-center py-2 justify-between"
            >
              <UBadge>
                <Icon :icon="`simple-icons:${link.type}`" />
                <span class="capitalize">{{ link.type }}</span>
              </UBadge>
              <a :href="link.url" class="text-sm hover:text-amber-500">{{ link.url }}</a>
              <UTooltip text="Remove link" :content="{ side: 'top' }">
                <UButton icon="solar:trash-bin-2-bold-duotone" variant="ghost" color="error" />
              </UTooltip>
            </div>
            <span v-if="localSocialLinks.length === 0" class="text-sm text-neutral-400 italic">
              Add a link above...
            </span>
          </UCard>
        </form>
      </div>
    </template>

    <template #footer>
      <UButton type="submit" form="editProfile" label="Save" />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

type SocialLink = 'steam' | 'spotify' | 'bluesky' | 'mastodon' | 'website'

interface SocialLinkOption {
  type: SocialLink
  label: string
  icon: string
  url: string
}

const socialLinkOptions = ref<SocialLinkOption[]>([
  { type: 'steam', label: 'Steam', icon: 'simple-icons:steam', url: 'https://steampowered.com' },
  { type: 'spotify', label: 'Spotify', icon: 'simple-icons:spotify', url: 'https://spotify.com' },
  {
    type: 'bluesky',
    label: 'Bluesky',
    icon: 'simple-icons:bluesky',
    url: 'https://bsky.app'
  },
  {
    type: 'mastodon',
    label: 'Mastodon',
    icon: 'simple-icons:mastodon',
    url: 'https://joinmastodon.com'
  }
])

const localSocialLinks = ref<SocialLinkOption[]>([])

const newLinkPlatform = ref<SocialLink>()
const newLinkUrl = ref<string>()

function addLocalSocialLink() {
  localSocialLinks.value.push({ type: newLinkPlatform.value, url: newLinkUrl.value })
}

function saveProfile(): void {
  alert('Wooo')
}
</script>
