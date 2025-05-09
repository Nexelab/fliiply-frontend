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
      <form class="space-y-4" @submit.prevent="handleLogin">
        <div>
          <label for="username-login" class="block text-sm font-medium mb-1">Nom d'utilisateur</label>
          <input
              type="text"
              id="username-login"
              v-model="loginForm.username"
              placeholder="Entrez votre nom d'utilisateur"
              class="w-full px-4 py-2 bg-dark-900 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
        </div>
        <div class="relative">
          <label for="password-login" class="block text-sm font-medium mb-1">Mot de passe</label>
          <input
              :type="showLoginPassword ? 'text' : 'password'"
              id="password-login"
              v-model="loginForm.password"
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
        <!-- Messages d'erreur ou de succès -->
        <p v-if="errorMessage" class="text-xs text-red-500 text-center">{{ errorMessage }}</p>
        <p v-if="successMessage" class="text-xs text-purple-500 text-center">{{ successMessage }}</p>
        <SubmitButton variant="primary" class="w-full">Se connecter</SubmitButton>
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

<script lang="ts" setup>
import AppButton from '~/components/ui/AppButton.vue'
import SubmitButton from '~/components/ui/SubmitButton.vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { authService } from '~/services/authService'

// Définir les types pour le formulaire de connexion
interface LoginForm {
  username: string
  password: string
}

// Lire la query string pour définir l'onglet actif
const route = useRoute()
const router = useRouter()
const activeTab = ref<'register' | 'login'>(route.query.tab === 'register' ? 'register' : 'login')

const showRegisterPassword = ref(false) // Visibilité du mot de passe (inscription)
const showConfirmPassword = ref(false) // Visibilité de la confirmation (inscription)
const showLoginPassword = ref(false) // Visibilité du mot de passe (connexion)
const acceptTerms = ref(false) // Checkbox pour accepter les conditions
const subscribeNewsletter = ref(false) // Checkbox pour s'abonner à la newsletter

// Données du formulaire de connexion
const loginForm = ref<LoginForm>({
  username: '',
  password: ''
})

// Messages d'erreur ou de succès
const errorMessage = ref<string>('')
const successMessage = ref<string>('')

// Utiliser le store Pinia pour gérer l'état d'authentification
const authStore = useAuthStore()

// Gestion de la soumission du formulaire de connexion
const handleLogin = async () => {
  console.log('handleLogin called') // Log pour vérifier que la méthode est appelée
  errorMessage.value = ''
  successMessage.value = ''

  // Validation simple
  if (!loginForm.value.username || !loginForm.value.password) {
    errorMessage.value = 'Veuillez remplir tous les champs.'
    console.log('Validation failed: champs vides')
    return
  }

  try {
    console.log('Attempting login with:', loginForm.value)
    const response = await authService.login(loginForm.value.username, loginForm.value.password)
    console.log('API response:', response)

    // Stocker les tokens dans le store Pinia
    authStore.setAuthData({
      refresh: response.refresh,
      access: response.access,
      refreshExpiresIn: response.refresh_expires_in,
      accessExpiresIn: response.access_expires_in
    })

    // Afficher un message de succès
    successMessage.value = 'Connexion réussie !'

    // Réinitialiser le formulaire
    loginForm.value.username = ''
    loginForm.value.password = ''

    // Rediriger vers la page d'accueil
    router.push('/')
  } catch (error: any) {
    console.error('Erreur lors de la connexion:', error)
    // Gérer les erreurs
    if (error.message === 'Refresh token expired. Please log in again.') {
      errorMessage.value = 'Session expirée. Veuillez vous reconnecter.'
      // Rediriger vers la page de connexion
      router.push('/auth?tab=login')
    } else if (error.response) {
      errorMessage.value = error.response._data?.message || 'Erreur lors de la connexion.'
    } else {
      errorMessage.value = 'Erreur réseau. Veuillez réessayer.'
    }
  }
}

useHead({
  title: 'Connexion / Inscription - Fliiply',
  meta: [
    { name: 'description', content: 'Connectez-vous ou créez un compte sur Fliiply pour acheter et vendre des cartes TCG.' }
  ]
})
</script>

<style scoped>
/* Personnalisation des checkboxes */
.custom-checkbox {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #0A0A0A; /* dark-900 */
  border: 1px solid #1F2A44; /* gray-800 */
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
}

.custom-checkbox:checked {
  background-color: #6D28D9; /* purple-500 */
  border-color: #6D28D9; /* purple-500 */
}

.custom-checkbox:hover:not(:checked) {
  border-color: #6D28D9; /* purple-500 */
}

.custom-checkbox:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(109, 40, 217, 0.5); /* purple-500 avec opacité */
}

/* Style de la coche (checkmark) */
.custom-checkbox:checked::before {
  content: '\2713'; /* Symbole de coche */
  display: block;
  text-align: center;
  color: #FFFFFF; /* Blanc */
  font-size: 12px;
  line-height: 16px;
}
</style>