<template>
  <section
    v-if="isLoading"
    class="h-screen flex flex-col items-center justify-center text-amber-600"
  >
    <Icon icon="svg-spinners:pulse-rings-multiple" width="30%" />
    <p class="text-lg font-bold animate-pulse">Connecting...</p>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
const { isLoading } = defineProps<{ isLoading: boolean }>()
</script>
