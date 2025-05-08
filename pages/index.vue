<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-dark-900 text-white py-20">
      <div class="container mx-auto flex flex-col items-center text-center px-4">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Bienvenue sur Fliiply</h1>
        <p class="text-lg md:text-xl mb-6 max-w-2xl">
          Achetez et vendez vos cartes TCG préférées en toute simplicité. Explorez nos catégories et trouvez les meilleures offres pour Pokémon, Yu-Gi-Oh, Magic: The Gathering et bien plus encore.
        </p>
        <AppButton to="/offers" variant="primary">Explorer les offres</AppButton>
      </div>
    </section>

    <!-- Section Catégories populaires (statique) -->
    <section class="py-16 bg-dark-900 text-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-8 text-center">Catégories populaires</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-dark-900 border border-gray-800 p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-2">Pokémon</h3>
            <NuxtLink to="/categories/1" class="text-purple-500 hover:text-gray-800">
              Voir les offres
            </NuxtLink>
          </div>
          <div class="bg-dark-900 border border-gray-800 p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-2">Yu-Gi-Oh</h3>
            <NuxtLink to="/categories/2" class="text-purple-500 hover:text-gray-800">
              Voir les offres
            </NuxtLink>
          </div>
          <div class="bg-dark-900 border border-gray-800 p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-2">Magic: The Gathering</h3>
            <NuxtLink to="/categories/3" class="text-purple-500 hover:text-gray-800">
              Voir les offres
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import AppButton from '~/components/ui/AppButton.vue'

useHead({
  title: 'Bienvenue sur Fliiply',
  meta: [
    { name: 'description', content: 'Plateforme de vente de produits TCG - Cartes Pokémon, Yu-Gi-Oh, Magic et plus encore' }
  ]
})
</script>