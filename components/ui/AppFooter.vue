<template>
  <footer class="bg-gray-900 text-white py-8">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Branding -->
      <div>
        <h3 class="text-xl font-bold mb-4">Fliiply</h3>
        <p class="text-gray-400">Votre plateforme de vente de produits TCG.</p>
      </div>

      <!-- Liens utiles -->
      <div>
        <h4 class="text-lg font-semibold mb-4">Liens utiles</h4>
        <ul class="space-y-2">
          <li><NuxtLink to="/categories" class="text-gray-400 hover:text-green-500">Catégories</NuxtLink></li>
          <li><NuxtLink to="/offers" class="text-gray-400 hover:text-green-500">Offres</NuxtLink></li>
          <li><NuxtLink to="/about" class="text-gray-400 hover:text-green-500">À propos</NuxtLink></li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h4 class="text-lg font-semibold mb-4">Contact</h4>
        <p class="text-gray-400">Email: support@fliiply.com</p>
        <p class="text-gray-400">© 2025 Fliiply. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.bg-gray-900 {
  background-color: #111820;
}
.text-green-500 {
  color: #00C805;
}
.text-gray-400 {
  color: #A0AEC0;
}
</style>