<template>
  <header class="bg-dark-900 text-white py-4 sticky top-0 z-50 shadow-md">
    <div class="container mx-auto flex items-center justify-between px-4">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center">
        <span class="text-2xl font-bold">Fliiply</span>
      </NuxtLink>

      <!-- Navigation -->
      <nav class="hidden md:flex space-x-6">
        <NuxtLink to="/categories" class="hover:text-gray-800 transition-colors">Catégories</NuxtLink>
        <NuxtLink to="/offers" class="hover:text-gray-800 transition-colors">Offres</NuxtLink>
        <NuxtLink to="/about" class="hover:text-gray-800 transition-colors">À propos</NuxtLink>
      </nav>

      <!-- Actions -->
      <div class="flex items-center space-x-4">
        <AppButton to="/login?tab=register" variant="outline">S'inscrire</AppButton>
        <AppButton to="/login?tab=login" variant="primary">Se connecter</AppButton>
      </div>
    </div>
  </header>
</template>

<script setup>
import AppButton from '~/components/ui/AppButton.vue'
</script>