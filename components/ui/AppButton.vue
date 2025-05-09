<template>
  <NuxtLink :to="to" class="inline-block transition-colors" :class="buttonClasses">
    <slot />
  </NuxtLink>
</template>

<script setup>
const { to, variant } = defineProps({
  to: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'outline'].includes(value)
  }
})

// Classes dynamiques pour le bouton
const buttonClasses = computed(() => ({
  'px-6 py-2 rounded-full text-lg font-semibold flex items-center justify-center': true,
  'bg-white text-dark-900 hover:bg-gray-800 hover:text-white': variant === 'primary',
  'bg-transparent border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white': variant === 'outline'
}))
</script>