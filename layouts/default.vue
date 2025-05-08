<template>
  <div>
    <AppHeader />
    <main class="min-h-screen">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '~/components/ui/AppHeader.vue'
import AppFooter from '~/components/ui/AppFooter.vue'
</script>