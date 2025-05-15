<template>
  <div class="min-h-screen bg-dark-900 flex items-center justify-center p-6">
    <div class="max-w-lg w-full bg-dark-800 rounded-lg shadow-xl border border-gray-800 p-8 text-center">
      <!-- Icône -->
      <div class="mb-6">
        <Icon
            :name="status === 'success' ? 'mdi:check-circle' : status === 'error' ? 'mdi:alert-circle' : 'mdi:loading'"
            size="48"
            :class="{
              'text-purple-500': status === 'success',
              'text-red-500': status === 'error',
              'text-gray-400 animate-spin': status === 'loading'
            }"
            class="mx-auto"
        />
      </div>

      <!-- Titre -->
      <h2 class="text-3xl font-bold text-white mb-4">
        {{ status === 'success' ? 'E-mail confirmé !' : status === 'error' ? 'Erreur de confirmation' : 'Vérification en cours...' }}
      </h2>

      <!-- Message -->
      <p class="text-gray-300 mb-6">
        <template v-if="status === 'success'">
          Votre e-mail est confirmé. Bienvenue sur Fliiply !
        </template>
        <template v-else-if="status === 'error'">
          {{ errorMessage || 'Le lien est invalide ou a expiré. Demandez un nouveau lien.' }}
        </template>
        <template v-else>
          Vérification de votre e-mail en cours...
        </template>
      </p>

      <!-- Boutons -->
      <div class="flex justify-center gap-6">
        <AppButton
            v-if="status === 'success'"
            variant="primary"
            class="px-8 py-2 text-base"
            to="/"
        >
          Aller à l'accueil
        </AppButton>
        <AppButton
            v-if="status === 'error'"
            variant="primary"
            class="px-8 py-2 text-base"
            @click="requestNewVerificationEmail"
            :disabled="isResending"
            :loading="isResending"
        >
          Recevoir un nouveau lien
        </AppButton>
        <AppButton
            variant="outline"
            class="px-8 py-2 text-base"
            @click="login"
        >
          Se connecter
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppButton from '~/components/ui/AppButton.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { authService } from '~/services/authService'

// Récupérer les paramètres de l'URL, le store et le router
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// État de la vérification
const status = ref<'loading' | 'success' | 'error'>('loading')
const errorMessage = ref<string>('')
const isResending = ref<boolean>(false)

// Vérifier l'e-mail au chargement de la page
onMounted(async () => {
  const { uidb64, token } = route.query

  if (!uidb64 || !token) {
    status.value = 'error'
    errorMessage.value = 'Lien de vérification incomplet.'
    return
  }

  try {
    await authService.verifyEmail(uidb64 as string, token as string)
    // Mettre à jour les informations de l'utilisateur si connecté
    if (authStore.isAuthenticated) {
      const userResponse = await authService.getCurrentUser()
      authStore.setCurrentUser(userResponse)
    }
    status.value = 'success'
  } catch (error: never) {
    status.value = 'error'
    // Personnaliser les messages d'erreur en fonction de la réponse du back-end
    if (error.response?.status === 400) {
      errorMessage.value = 'Lien de vérification invalide ou déjà utilisé.'
    } else if (error.response?.status === 403) {
      errorMessage.value = 'Lien expiré. Demandez un nouveau lien.'
    } else {
      errorMessage.value = error.response?._data?.message || 'Une erreur est survenue lors de la vérification.'
    }
  }
})

// Demander un nouvel e-mail de vérification
const requestNewVerificationEmail = async () => {
  if (!authStore.currentUser?.email) {
    status.value = 'error'
    errorMessage.value = 'Adresse e-mail introuvable.'
    return
  }

  isResending.value = true
  errorMessage.value = ''
  try {
    await authService.resendVerificationEmail(authStore.currentUser.email)
    status.value = 'success'
    errorMessage.value = 'Nouveau lien envoyé à votre e-mail.'
  } catch (error: never) {
    status.value = 'error'
    errorMessage.value = error.response?._data?.message || 'Erreur lors de l\'envoi du nouveau lien.'
  } finally {
    isResending.value = false
  }
}

// Se déconnecter
const login = () => {
  authStore.clearAuthData()
  router.push('/login?tab=login')
}

useHead({
  title: 'Confirmation de l\'e-mail - Fliiply',
  meta: [
    { name: 'description', content: 'Confirmez votre adresse e-mail pour activer votre compte Fliiply.' }
  ]
})
</script>

<style scoped>
/* Animation pour l'icône de chargement */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>