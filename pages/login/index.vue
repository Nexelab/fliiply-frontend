<template>
  <div class="min-h-screen flex font-sans">
    <div class="hidden md:flex w-3/5 bg-cover bg-center relative" style="background-image: url('https://images.unsplash.com/photo-1620336655174-32ccc95d0e2d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');">
      <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="text-center text-white">
          <h1 class="text-4xl font-bold mb-4">Bienvenue sur Fliiply</h1>
          <p class="text-lg">Achetez, vendez et collectionnez vos cartes TCG préférées !</p>
        </div>
      </div>
    </div>
    <div class="max-w-md w-2/5 mx-auto p-6">
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
        <form class="space-y-4" @submit.prevent="handleRegister">
          <div>
            <label for="username-register" class="block text-sm font-medium mb-1">Nom d'utilisateur</label>
            <input
                type="text"
                id="username-register"
                v-model="registerForm.username"
                placeholder="Entrez votre nom d'utilisateur"
                class="w-full px-4 py-2 bg-gray-300 border border-gray-300 rounded-full text-gray-800 placeholder-gray-700 focus:outline-none focus:border-purple-500"
            />
            <p v-if="errors.username" class="text-xs text-red-500 mt-1">{{ errors.username }}</p>
          </div>
          <div>
            <label for="email-register" class="block text-sm font-medium mb-1">Email</label>
            <input
                type="email"
                id="email-register"
                v-model="registerForm.email"
                placeholder="Entrez votre email"
                class="w-full px-4 py-2 bg-gray-300 border border-gray-300 rounded-full text-gray-800 placeholder-gray-700 focus:outline-none focus:border-purple-500"
            />
            <p v-if="errors.email" class="text-xs text-red-500 mt-1">{{ errors.email }}</p>
          </div>
          <div class="relative">
            <label for="password-register" class="block text-sm font-medium mb-1">Mot de passe</label>
            <input
                :type="showRegisterPassword ? 'text' : 'password'"
                id="password-register"
                v-model="registerForm.password"
                @input="updatePasswordStrength"
                placeholder="Entrez votre mot de passe"
                class="w-full px-4 py-2 bg-gray-300 border border-gray-300 rounded-full text-gray-800 placeholder-gray-700 focus:outline-none focus:border-purple-500"
            />
            <button
                type="button"
                @click="showRegisterPassword = !showRegisterPassword"
                class="absolute right-3 top-9 text-gray-400 hover:text-purple-500"
            >
              <Icon :name="showRegisterPassword ? 'mdi:eye-off' : 'mdi:eye'" size="20" />
            </button>
          </div>
          <!-- Indicateur de solidité du mot de passe -->
          <div class="mt-1">
            <div class="h-2 rounded-full overflow-hidden" :class="passwordStrengthColor">
              <div class="h-full bg-current" :style="{ width: passwordStrengthPercentage + '%' }"></div>
            </div>
            <p class="text-xs text-white mt-1">
              {{ passwordStrengthText }}
            </p>
          </div>
          <div class="relative">
            <label for="confirm-password" class="block text-sm font-medium mb-1">Confirmer le mot de passe</label>
            <input
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirm-password"
                v-model="registerForm.confirmPassword"
                placeholder="Confirmez votre mot de passe"
                class="w-full px-4 py-2 bg-gray-300 border border-gray-300 rounded-full text-gray-800 placeholder-gray-700 focus:outline-none focus:border-purple-500"
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
            <!-- Message de correspondance des mots de passe -->
            <p v-if="registerForm.password && registerForm.confirmPassword" class="text-xs mt-1" :class="passwordsMatch ? 'text-green-500' : 'text-red-500'">
              {{ passwordsMatch ? 'Les mots de passe correspondent.' : 'Les mots de passe ne correspondent pas.' }}
            </p>
          </div>
          <div class="space-y-3">
            <label class="flex items-start text-xs text-white">
              <input type="checkbox" v-model="acceptTerms" class="mr-3 w-4 h-4" />
              <span class="max-w-md">
              J'ai lu et j'accepte les
              <NuxtLink to="/terms" class="text-purple-500 hover:text-gray-800">Conditions générales</NuxtLink>
              et la
              <NuxtLink to="/privacy" class="text-purple-500 hover:text-gray-800">Politique de confidentialité</NuxtLink>.
            </span>
            </label>
            <label class="flex items-start text-xs text-white">
              <input type="checkbox" v-model="subscribeNewsletter" class="mr-3 w-4 h-4" />
              <span class="max-w-md">
              Vous recevrez régulièrement des e-mails d'information sur Fliiply et sur nos offres. Vous pouvez vous désinscrire à tout moment en cliquant sur le lien figurant dans les e-mails ou à partir des paramètres de votre compte.
            </span>
            </label>
          </div>
          <!-- Messages d'erreur ou de succès -->
          <p v-if="errorMessage" class="text-xs text-red-500 text-center">{{ errorMessage }}</p>
          <p v-if="successMessage" class="text-xs text-purple-500 text-center">{{ successMessage }}</p>
          <SubmitButton variant="primary" class="w-full">S'inscrire</SubmitButton>
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
                class="w-full px-4 py-2 bg-gray-300 border border-gray-300 rounded-full text-gray-800 placeholder-gray-700 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div class="relative">
            <label for="password-login" class="block text-sm font-medium mb-1">Mot de passe</label>
            <input
                :type="showLoginPassword ? 'text' : 'password'"
                id="password-login"
                v-model="loginForm.password"
                placeholder="Entrez votre mot de passe"
                class="w-full px-4 py-2 bg-gray-300 border border-gray-300 rounded-full text-gray-800 placeholder-gray-700 focus:outline-none focus:border-purple-500"
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
  </div>
</template>

<script lang="ts" setup>
import SubmitButton from '~/components/ui/SubmitButton.vue'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { authService } from '~/services/authService'

// Définir les types pour le formulaire de connexion
interface LoginForm {
  username: string
  password: string
}

// Définir les types pour le formulaire d'inscription
interface RegisterForm {
  username: string
  email: string
  password: string
  confirmPassword: string
}

// Définir les types pour les erreurs
interface FormErrors {
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
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

// Données du formulaire d'inscription
const registerForm = ref<RegisterForm>({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// Messages d'erreur ou de succès
const errorMessage = ref<string>('')
const successMessage = ref<string>('')

// Gestion des erreurs spécifiques pour chaque champ
const errors = ref<FormErrors>({})

// Utiliser le store Pinia pour gérer l'état d'authentification
const authStore = useAuthStore()

// Calculer si les mots de passe correspondent
const passwordsMatch = computed(() => {
  return registerForm.value.password === registerForm.value.confirmPassword && registerForm.value.password !== ''
})

// Gestion de la solidité du mot de passe
const passwordStrength = ref<number>(0) // Score de solidité (0 à 4)
const passwordStrengthColor = computed(() => {
  if (passwordStrength.value === 0) return 'bg-red-500'
  if (passwordStrength.value <= 1) return 'bg-orange-500'
  if (passwordStrength.value === 2) return 'bg-yellow-500'
  if (passwordStrength.value === 3) return 'bg-green-500'
  return 'bg-green-500'
})

const passwordStrengthPercentage = computed(() => {
  return passwordStrength.value * 25 // 0 à 100%
})

const passwordStrengthText = computed(() => {
  if (passwordStrength.value === 0) return ''
  if (passwordStrength.value <= 1) return 'Mot de passe très faible'
  if (passwordStrength.value === 2) return 'Mot de passe faible'
  if (passwordStrength.value === 3) return 'Mot de passe moyen'
  return 'Mot de passe fort'
})

const updatePasswordStrength = () => {
  const password = registerForm.value.password
  let strength = 0

  // Critères de solidité
  if (password.length >= 8) strength += 1
  if (/[A-Z]/.test(password)) strength += 1
  if (/[0-9]/.test(password)) strength += 1
  if (/[^A-Za-z0-9]/.test(password)) strength += 1

  passwordStrength.value = strength
}

// Validation des champs avant soumission
const validateForm = () => {
  errors.value = {}

  // Validation du username
  if (!registerForm.value.username) {
    errors.value.username = 'Le nom d’utilisateur est requis.'
  } else if (registerForm.value.username.length < 3) {
    errors.value.username = 'Le nom d’utilisateur doit contenir au moins 3 caractères.'
  }

  // Validation de l'email
  if (!registerForm.value.email) {
    errors.value.email = 'L’email est requis.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.value.email)) {
    errors.value.email = 'L’email n’est pas valide.'
  }

  // Validation des mots de passe
  if (!registerForm.value.password) {
    errors.value.password = 'Le mot de passe est requis.'
  }

  if (!registerForm.value.confirmPassword) {
    errors.value.confirmPassword = 'La confirmation du mot de passe est requise.'
  }

  return Object.keys(errors.value).length === 0
}

// Gestion de la soumission du formulaire de connexion
const handleLogin = async () => {
  console.log('handleLogin called')
  errorMessage.value = ''
  successMessage.value = ''

  if (!loginForm.value.username || !loginForm.value.password) {
    errorMessage.value = 'Veuillez remplir tous les champs.'
    console.log('Validation failed: champs vides')
    return
  }

  try {
    console.log('Attempting login with:', loginForm.value)
    const response = await authService.login(loginForm.value.username, loginForm.value.password)
    console.log('API response:', response)

    authStore.setAuthData({
      refresh: response.refresh,
      access: response.access,
      refreshExpiresIn: response.refresh_expires_in,
      accessExpiresIn: response.access_expires_in
    })

    // Récupérer les informations de l'utilisateur connecté
    const userResponse = await authService.getCurrentUser()
    authStore.setCurrentUser(userResponse)

    if (userResponse.is_email_verified) {
      successMessage.value = 'Connexion réussie !'
      loginForm.value.username = ''
      loginForm.value.password = ''
      await router.push('/')
    } else {
      successMessage.value = 'Connexion réussie, mais veuillez vérifier votre e-mail.'
      await router.push('/email/verification')
    }
  } catch (error: never) {
    console.error('Erreur lors de la connexion:', error)
    if (error.message === 'Refresh token expired. Please log in again.') {
      errorMessage.value = 'Session expirée. Veuillez vous reconnecter.'
      await router.push('/auth?tab=login')
    } else if (error.response) {
      errorMessage.value = error.response._data?.message || 'Erreur lors de la connexion.'
    } else {
      errorMessage.value = 'Erreur réseau. Veuillez réessayer.'
    }
  }
}

// Gestion de la soumission du formulaire d'inscription
const handleRegister = async () => {
  console.log('handleRegister called')
  errorMessage.value = ''
  successMessage.value = ''
  errors.value = {}

  // Valider le formulaire
  if (!validateForm()) {
    errorMessage.value = 'Veuillez corriger les erreurs dans le formulaire.'
    return
  }

  if (!passwordsMatch.value) {
    errorMessage.value = 'Les mots de passe ne correspondent pas.'
    return
  }

  if (!acceptTerms.value) {
    errorMessage.value = 'Vous devez accepter les conditions générales.'
    return
  }

  try {
    console.log('Attempting registration with:', registerForm.value)
    const response = await authService.register(
        registerForm.value.username,
        registerForm.value.email,
        registerForm.value.password,
        registerForm.value.confirmPassword,
        acceptTerms.value,
        subscribeNewsletter.value
    )
    console.log('API response:', response)

    // Stocker les tokens dans le store Pinia
    authStore.setAuthData({
      refresh: response.refresh,
      access: response.access,
      refreshExpiresIn: response.refresh_expires_in,
      accessExpiresIn: response.access_expires_in
    })

    // Récupérer les informations de l'utilisateur connecté
    const userResponse = await authService.getCurrentUser()
    authStore.setCurrentUser(userResponse)

    // Afficher un message de succès
    successMessage.value = 'Inscription réussie ! Bienvenue sur Fliiply.'

    if (userResponse.is_email_verified) {
      successMessage.value = 'Inscription réussie ! Bienvenue sur Fliiply.'
      registerForm.value.username = ''
      registerForm.value.email = ''
      registerForm.value.password = ''
      registerForm.value.confirmPassword = ''
      acceptTerms.value = false
      subscribeNewsletter.value = false
      passwordStrength.value = 0
      await router.push('/')
    } else {
      successMessage.value = 'Inscription réussie ! Veuillez vérifier votre e-mail.'
      await router.push('/email/verification')
    }
  } catch (error: never) {
    console.error('Erreur lors de l\'inscription:', error)
    if (error.response) {
      errorMessage.value = error.response._data?.message || 'Erreur lors de l\'inscription.'
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
</style>