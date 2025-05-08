<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gray-900 text-white py-20">
      <div class="container mx-auto flex flex-col items-center text-center px-4">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Bienvenue sur Fliiply</h1>
        <p class="text-lg md:text-xl mb-6 max-w-2xl">
          Achetez et vendez vos cartes TCG préférées en toute simplicité. Explorez nos catégories et trouvez les meilleures offres pour Pokémon, Yu-Gi-Oh, Magic: The Gathering et bien plus encore.
        </p>
        <NuxtLink to="/offers" class="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600">
          Explorer les offres
        </NuxtLink>
      </div>
    </section>

    <!-- Section Catégories populaires (statique) -->
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-8 text-center">Catégories populaires</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-2">Pokémon</h3>
            <NuxtLink to="/categories/1" class="text-green-500 hover:underline">
              Voir les offres
            </NuxtLink>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-2">Yu-Gi-Oh</h3>
            <NuxtLink to="/categories/2" class="text-green-500 hover:underline">
              Voir les offres
            </NuxtLink>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-2">Magic: The Gathering</h3>
            <NuxtLink to="/categories/3" class="text-green-500 hover:underline">
              Voir les offres
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Bienvenue sur Fliiply',
  meta: [
    { name: 'description', content: 'Plateforme de vente de produits TCG - Cartes Pokémon, Yu-Gi-Oh, Magic et plus encore' }
  ]
})
</script>