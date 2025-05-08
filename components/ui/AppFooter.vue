<template>
  <footer class="bg-dark-900 text-white py-8">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
      <!-- Branding -->
      <div>
        <h3 class="text-xl font-bold mb-4">Fliiply</h3>
        <p class="text-white">Votre plateforme de vente de produits TCG.</p>
      </div>

      <!-- Liens utiles -->
      <div>
        <h4 class="text-lg font-semibold mb-4">Liens utiles</h4>
        <ul class="space-y-2">
          <li><NuxtLink to="/categories" class="text-white hover:text-gray-800">Catégories</NuxtLink></li>
          <li><NuxtLink to="/offers" class="text-white hover:text-gray-800">Offres</NuxtLink></li>
          <li><NuxtLink to="/about" class="text-white hover:text-gray-800">À propos</NuxtLink></li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h4 class="text-lg font-semibold mb-4">Contact</h4>
        <p class="text-white">Email: support@fliiply.com</p>
        <p class="text-white">© 2025 Fliiply. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</template>