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
        <!-- Afficher les boutons "S'inscrire" et "Se connecter" si non connecté -->
        <template v-if="!authStore.isAuthenticated">
          <AppButton to="/login?tab=register" variant="outline">S'inscrire</AppButton>
          <AppButton to="/login?tab=login" variant="primary">Se connecter</AppButton>
        </template>

        <!-- Afficher l'icône d'avatar et le sous-menu si connecté -->
        <div v-else class="relative">
          <!-- Icône d'avatar avec le username -->
          <button @click="toggleMenu" class="flex items-center space-x-2 focus:outline-none">
            <Icon name="mdi:account-circle" size="32" class="text-white hover:text-purple-500 transition-colors" />
            <span class="text-white font-semibold">{{ authStore.currentUser?.username || 'Utilisateur' }}</span>
          </button>

          <!-- Sous-menu déroulant -->
          <div
              v-if="isMenuOpen"
              class="absolute right-0 mt-2 w-48 bg-dark-900 border border-gray-800 rounded-lg shadow-lg z-50"
          >
            <div class="px-4 py-2 text-white border-b border-gray-800">
              Connecté en tant que <strong>{{ authStore.currentUser?.username || 'Utilisateur' }}</strong>
            </div>
            <NuxtLink
                to="/profile"
                class="block px-4 py-2 text-white hover:bg-purple-500 hover:text-white transition-colors"
                @click="closeMenu"
            >
              Profil
            </NuxtLink>
            <NuxtLink
                to="/purchases"
                class="block px-4 py-2 text-white hover:bg-purple-500 hover:text-white transition-colors"
                @click="closeMenu"
            >
              Achats
            </NuxtLink>
            <button
                @click="logout"
                class="block w-full text-left px-4 py-2 text-white hover:bg-purple-500 hover:text-white transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import AppButton from '~/components/ui/AppButton.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

// Récupérer le store Pinia pour vérifier l'état de connexion
const authStore = useAuthStore()
const router = useRouter()

// Gérer l'ouverture/fermeture du sous-menu
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// Gérer la déconnexion
const logout = () => {
  authStore.clearAuthData()
  closeMenu()
  router.push('/')
}
</script>