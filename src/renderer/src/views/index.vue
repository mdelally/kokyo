<template>
  <section v-if="!hasSession()" class="mx-auto max-w-3xl grid grid-cols-2 gap-4">
    <div>
      <form class="p-4 bg-neutral-900 rounded-md" @submit.prevent="handleSignIn">
        <h3 class="mb-2 pb-2 text-md font-bold border-b-2 border-neutral-800">Sign In</h3>
        <div>
          <!-- <input class="inputField" required type="email" placeholder="Your email" v-model="email" /> -->
          <InputText
            v-model="email"
            label="Email"
            placeholder="Your email"
            name="email"
            type="email"
            required
          />
          <InputText
            v-model="password"
            label="Password"
            placeholder="Your password"
            name="password"
            type="password"
            required
          />
          <div class="pt-3 flex justify-end">
            <BaseButton label="Sign In" type="submit" icon="solar:login-2-bold-duotone" />
          </div>
        </div>
      </form>
    </div>

    <div>
      <form class="p-4 bg-neutral-900 rounded-md" @submit.prevent="handleSignUp">
        <h3 class="mb-2 pb-2 text-md font-bold border-b-2 border-neutral-800">
          New here? Sign Up!
        </h3>
        <div>
          <!-- <input class="inputField" required type="email" placeholder="Your email" v-model="email" /> -->
          <InputText
            v-model="newEmail"
            label="Email"
            placeholder="Your email"
            name="email"
            type="email"
            required
          />
          <InputText
            v-model="newAlias"
            label="Alias"
            placeholder="Desired alias"
            name="alias"
            type="text"
            required
          />
          <InputText
            v-model="newPassword"
            label="Password"
            placeholder="Your password"
            name="password"
            type="password"
            required
          />
          <InputText
            v-model="newPasswordConfirm"
            label="Confirm Password"
            placeholder="Confirm your password"
            name="passwordConfirm"
            type="password"
            required
          />
          <div class="pt-3 flex justify-end">
            <BaseButton
              label="Create New Account"
              type="submit"
              icon="solar:add-square-bold-duotone"
            />
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useAuth from '../composables/useAuth'
import { useRouter } from 'vue-router'

const { signUp, signIn, hasSession } = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')

const newEmail = ref('')
const newAlias = ref('')
const newPassword = ref('')
const newPasswordConfirm = ref('')

async function handleSignIn(): Promise<void> {
  console.log('Sign in?')
  await signIn(email.value, password.value)

  if (hasSession()) {
    router.push('/dashboard')
  }
}

async function handleSignUp(): Promise<void> {
  console.log('Sign up?')
  await signUp(newEmail.value, newPassword.value, newAlias.value)

  if (hasSession()) {
    router.push('/dashboard')
  }
}
</script>
