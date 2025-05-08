<template>
  <div class="max-w-md w-full mx-auto p-6">
    <!-- Onglets -->
    <div class="flex border-b border-gray-800 mb-6">
      <button
          @click="activeTab = 'register'"
          class="flex-1 py-3 text-lg font-semibold"
          :class="{ 'border-b-2 border-purple-500 text-purple-500': activeTab === 'register', 'text-white hover:text-gray-800': activeTab !== 'register' }"
      >
        S'inscrire
      </button>
      <button
          @click="activeTab = 'login'"
          class="flex-1 py-3 text-lg font-semibold"
          :class="{ 'border-b-2 border-purple-500 text-purple-500': activeTab === 'login', 'text-white hover:text-gray-800': activeTab !== 'login' }"
      >
        Se connecter
      </button>
    </div>

    <!-- Formulaire d'inscription -->
    <div v-if="activeTab === 'register'">
      <h2 class="text-2xl font-bold mb-6 text-center">Créer un compte</h2>
      <form class="space-y-4">
        <div>
          <label for="username-register" class="block text-sm font-medium mb-1">Nom d'utilisateur</label>
          <input
              type="text"
              id="username-register"
              placeholder="Entrez votre nom d'utilisateur"
              class="w-full px-4 py-2 bg-dark-900 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
        </div>
        <div>
          <label for="email-register" class="block text-sm font-medium mb-1">Email</label>
          <input
              type="email"
              id="email-register"
              placeholder="Entrez votre email"
              class="w-full px-4 py-2 bg-dark-900 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
        </div>
        <div class="relative">
          <label for="password-register" class="block text-sm font-medium mb-1">Mot de passe</label>
          <input
              :type="showRegisterPassword ? 'text' : 'password'"
              id="password-register"
              placeholder="Entrez votre mot de passe"
              class="w-full px-4 py-2 bg-dark-900 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
          <button
              type="button"
              @click="showRegisterPassword = !showRegisterPassword"
              class="absolute right-3 top-9 text-gray-400 hover:text-purple-500"
          >
            <Icon :name="showRegisterPassword ? 'mdi:eye-off' : 'mdi:eye'" size="20" />
          </button>
        </div>
        <div class="relative">
          <label for="confirm-password" class="block text-sm font-medium mb-1">Confirmer le mot de passe</label>
          <input
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirm-password"
              placeholder="Confirmez votre mot de passe"
              class="w-full px-4 py-2 bg-dark-900 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
          <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute right-3 top-9 text-gray-400 hover:text-purple-500"
          >
            <Icon :name="showConfirmPassword ? 'mdi:eye-off' : 'mdi:eye'" size="20" />
          </button>
          <p class="text-xs text-white mt-3 mb-2">
            Au moins 8 caractères (dont 1 lettre majuscule, 1 chiffre et 1 symbole)
          </p>
        </div>
        <div class="space-y-3">
          <label class="flex items-start text-xs text-white">
            <input type="checkbox" v-model="acceptTerms" class="mr-3 w-4 h-4 custom-checkbox" />
            <span class="max-w-md">
              J'ai lu et j'accepte les
              <NuxtLink to="/terms" class="text-purple-500 hover:text-gray-800">Conditions générales</NuxtLink>
              et la
              <NuxtLink to="/privacy" class="text-purple-500 hover:text-gray-800">Politique de confidentialité</NuxtLink>.
            </span>
          </label>
          <label class="flex items-start text-xs text-white">
            <input type="checkbox" v-model="subscribeNewsletter" class="mr-3 w-4 h-4 custom-checkbox" />
            <span class="max-w-md">
              Vous recevrez régulièrement des e-mails d'information sur Fliiply et sur nos offres. Vous pouvez vous désinscrire à tout moment en cliquant sur le lien figurant dans les e-mails ou à partir des paramètres de votre compte.
            </span>
          </label>
        </div>
        <AppButton to="#" variant="primary" class="w-full">S'inscrire</AppButton>
        <div class="text-center">
          <p class="text-xs text-white mt-2">
            Déjà un compte ?
            <button @click="activeTab = 'login'" class="text-purple-500 hover:text-gray-800">Connectez-vous !</button>
          </p>
        </div>
      </form>
    </div>

    <!-- Formulaire de connexion -->
    <div v-if="activeTab === 'login'">
      <h2 class="text-2xl font-bold mb-6 text-center">Se connecter</h2>
      <form class="space-y-4">
        <div>
          <label for="username-login" class="block text-sm font-medium mb-1">Nom d'utilisateur</label>
          <input
              type="text"
              id="username-login"
              placeholder="Entrez votre nom d'utilisateur"
              class="w-full px-4 py-2 bg-dark-900 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
        </div>
        <div class="relative">
          <label for="password-login" class="block text-sm font-medium mb-1">Mot de passe</label>
          <input
              :type="showLoginPassword ? 'text' : 'password'"
              id="password-login"
              placeholder="Entrez votre mot de passe"
              class="w-full px-4 py-2 bg-dark-900 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
          <button
              type="button"
              @click="showLoginPassword = !showLoginPassword"
              class="absolute right-3 top-9 text-gray-400 hover:text-purple-500"
          >
            <Icon :name="showLoginPassword ? 'mdi:eye-off' : 'mdi:eye'" size="20" />
          </button>
          <NuxtLink to="/forgot-password" class="block text-xs text-purple-500 hover:text-gray-800 mt-1">
            Mot de passe oublié ?
          </NuxtLink>
        </div>
        <AppButton to="#" variant="primary" class="w-full">Se connecter</AppButton>
        <div class="text-center">
          <p class="text-xs text-white mt-2">
            En vous connectant, vous acceptez les
            <NuxtLink to="/terms" class="text-purple-500 hover:text-gray-800">Conditions d'utilisation</NuxtLink>
            et la
            <NuxtLink to="/privacy" class="text-purple-500 hover:text-gray-800">Politique de confidentialité</NuxtLink>
          </p>
          <p class="text-xs text-white mt-2">
            Pas de compte ?
            <button @click="activeTab = 'register'" class="text-purple-500 hover:text-gray-800">Inscrivez-vous !</button>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import AppButton from '~/components/ui/AppButton.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

// Lire la query string pour définir l'onglet actif
const route = useRoute()
const activeTab = ref(route.query.tab === 'register' ? 'register' : 'login')

const showRegisterPassword = ref(false) // Visibilité du mot de passe (inscription)
const showConfirmPassword = ref(false) // Visibilité de la confirmation (inscription)
const showLoginPassword = ref(false) // Visibilité du mot de passe (connexion)
const acceptTerms = ref(false) // Checkbox pour accepter les conditions
const subscribeNewsletter = ref(false) // Checkbox pour s'abonner à la newsletter

useHead({
  title: 'Connexion / Inscription - Fliiply',
  meta: [
    { name: 'description', content: 'Connectez-vous ou créez un compte sur Fliiply pour acheter et vendre des cartes TCG.' }
  ]
})
</script>

<style scoped>
</style>