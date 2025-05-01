<template>
  <div>
    <button
      class="flex justify-between items-center px-4 py-2 bg-amber-800 hover:bg-amber-700 text-amber-100 rounded-md cursor-pointer transition-all"
      :type="type"
      @click="emit('click')"
    >
      <div v-if="icon" class="text-amber-100">
        <Icon :icon="icon" width="1.5em" class="mr-2" />
      </div>
      {{ label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface ButtonProps {
  label?: string
  type?: 'button' | 'submit' | 'reset'
  icon?: string
}

const { label = 'Button', type = 'button' } = defineProps<ButtonProps>()

const emit = defineEmits(['click'])
</script>
