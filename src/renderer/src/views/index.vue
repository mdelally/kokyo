<template>
  <section
    v-if="!hasSession()"
    class="mx-auto min-w-2/3 xl:min-w-3/5 2xl:min-w-2/5 h-full flex flex-col justify-center"
  >
    <div class="flex gap-2 items-center p-8 justify-center text-2xl text-amber-600">
      <Icon icon="solar:chat-round-bold-duotone" width="2em" />
      <p class="font-bold tracking-wider text-white">kōkyō</p>
    </div>

    <div class="flex justify-center gap-4">
      <div class="flex-grow">
        <UCard variant="soft">
          <template #header> Sign In </template>
          <form @submit.prevent="handleSignIn">
            <div>
              <UFormField label="Email">
                <UInput
                  v-model="email"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  class="w-full"
                  required
                />
              </UFormField>
              <UFormField label="Password" class="mt-2">
                <UInput
                  v-model="password"
                  placeholder="Password"
                  :type="showPassword ? 'text' : 'password'"
                  class="w-full"
                  :ui="{ trailing: 'pe-1' }"
                >
                  <template #trailing>
                    <UButton
                      color="neutral"
                      variant="link"
                      size="sm"
                      :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                      :aria-label="showPassword ? 'Hide password' : 'Show password'"
                      :aria-pressed="showPassword"
                      aria-controls="password"
                      @click="showPassword = !showPassword"
                    />
                  </template>
                </UInput>
              </UFormField>
              <div class="pt-3 flex justify-end">
                <UButton
                  label="Sign In"
                  type="submit"
                  icon="solar:login-2-bold-duotone"
                  block
                  :loading="isLoggingIn"
                />
              </div>
            </div>
          </form>
        </UCard>
      </div>

      <USeparator orientation="vertical" label="OR" class="h-48" />

      <UCard class="flex-grow">
        <template #header>New here? Sign up!</template>

        <form @submit.prevent="handleSignUp">
          <UFormField label="Email">
            <UInput
              v-model="newEmail"
              placeholder="Your email"
              name="email"
              type="email"
              class="w-full"
              required
            />
          </UFormField>

          <UFormField label="Alias/Username" class="mt-2">
            <UInput
              v-model="newAlias"
              placeholder="Desired alias"
              name="alias"
              type="text"
              class="w-full"
              required
            />
          </UFormField>

          <UFormField label="Password" class="mt-2">
            <UInput
              v-model="newPassword"
              placeholder="Password"
              :type="showNewPassword ? 'text' : 'password'"
              class="w-full"
              :ui="{ trailing: 'pe-1' }"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="showNewPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="showNewPassword ? 'Hide password' : 'Show password'"
                  :aria-pressed="showNewPassword"
                  aria-controls="password"
                  @click="showNewPassword = !showNewPassword"
                />
              </template>
            </UInput>
          </UFormField>
          <div class="pt-3 flex justify-end">
            <UButton
              label="Create Account"
              type="submit"
              icon="solar:add-square-bold-duotone"
              :loading="isCreatingAccount"
              block
            />
          </div>
        </form>
      </UCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useAuth from '../composables/useAuth'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

const { signUp, signIn, hasSession } = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')

const newEmail = ref('')
const newAlias = ref('')
const newPassword = ref('')

const showPassword = ref(false)
const showNewPassword = ref(false)

const isCreatingAccount = ref(false)
const isLoggingIn = ref(false)

async function handleSignIn(): Promise<void> {
  isLoggingIn.value = true
  await signIn(email.value, password.value)
  isLoggingIn.value = false

  if (hasSession()) {
    router.push('/dashboard')
  }
}

async function handleSignUp(): Promise<void> {
  isCreatingAccount.value = true
  await signUp(newEmail.value, newPassword.value, newAlias.value)
  isCreatingAccount.value = false

  if (hasSession()) {
    router.push('/dashboard')
  }
}
</script>
