<template>
  <header class="bg-gray-900 text-white py-4 sticky top-0 z-50 shadow-md">
    <div class="container mx-auto flex items-center justify-between px-4">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center">
        <span class="text-2xl font-bold">Fliiply</span>
      </NuxtLink>

      <!-- Navigation -->
      <nav class="hidden md:flex space-x-6">
        <NuxtLink to="/categories" class="hover:text-green-500 transition-colors">Catégories</NuxtLink>
        <NuxtLink to="/offers" class="hover:text-green-500 transition-colors">Offres</NuxtLink>
        <NuxtLink to="/about" class="hover:text-green-500 transition-colors">À propos</NuxtLink>
      </nav>

      <!-- Actions -->
      <div class="flex items-center space-x-4">
        <NuxtLink to="/auth/register" class="bg-transparent border border-green-500 text-green-500 px-4 py-2 rounded-full hover:bg-green-500 hover:text-white transition-colors">
          S'inscrire
        </NuxtLink>
        <NuxtLink to="/auth/login" class="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors">
          Se connecter
        </NuxtLink>
      </div>
    </div>
  </header>
</template>