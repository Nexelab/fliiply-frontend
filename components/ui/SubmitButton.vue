<template>
  <button
      type="submit"
      class="inline-block transition-colors"
      :class="buttonClasses"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  variant?: 'primary' | 'outline'
}>()

// Classes dynamiques pour le bouton
const buttonClasses = computed(() => ({
  'px-6 py-2 rounded-full text-md font-semibold flex items-center justify-center': true,
  'bg-white text-dark-900 hover:bg-gray-800 hover:text-white': props.variant === 'primary',
  'bg-transparent border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white': props.variant === 'outline'
}))
</script>