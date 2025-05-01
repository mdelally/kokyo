<template>
  <div class="flex flex-col">
    <label v-if="label" :for="name || id" class="mt-2">
      <span>{{ label }}</span>
      <span v-if="required" class="text-red-600">*</span>
    </label>
    <input
      :id="id ? id : label"
      v-model="modelValue"
      class="p-2 border border-neutral-600 bg-neutral-800 rounded-md transition-all focus:border-amber-600 placeholder-neutral-600 focus:bg-neutral-700 outline-0"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :type="type"
      :disabled="isDisabled"
    />
  </div>
</template>

<script setup lang="ts">
interface TextInputProps {
  name: string
  label?: string
  id?: string
  placeholder?: string
  type?: string
  required?: boolean
  isDisabled?: boolean
}

const {
  name,
  label,
  id,
  placeholder,
  type = 'text',
  required,
  isDisabled
} = defineProps<TextInputProps>()
const modelValue = defineModel<string>()
</script>
