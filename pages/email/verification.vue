<template>
  <div class="min-h-screen bg-dark-900 flex items-center justify-center p-6">
    <div class="max-w-lg w-full bg-dark-800 rounded-lg shadow-xl border border-gray-800 p-8 text-center">
      <!-- Icône d'enveloppe -->
      <div class="mb-6">
        <Icon name="mdi:email" size="48" class="text-purple-500 mx-auto" />
      </div>

      <!-- Titre -->
      <h2 class="text-3xl font-bold text-white mb-4">Vérifiez votre adresse e-mail</h2>

      <!-- Message principal -->
      <p class="text-gray-300 mb-4">
        Un e-mail de vérification a été envoyé à
        <span class="font-semibold text-purple-400">{{ authStore.currentUser?.email || 'votre e-mail' }}</span>.
        Cliquez sur le lien dans cet e-mail pour activer votre compte.
      </p>

      <!-- Instructions supplémentaires -->
      <p class="text-gray-400 text-sm mb-6">
        Le lien est valide pendant 24 heures. Si vous n'avez pas reçu l'e-mail, vérifiez votre dossier de spam ou
        <button
            @click="resendVerificationEmail"
            class="text-purple-500 hover:text-purple-300 underline transition-colors"
            :disabled="isResending"
            :class="{ 'opacity-50 cursor-not-allowed': isResending }"
        >
          demandez un nouvel e-mail
        </button>.
      </p>

      <!-- Messages de succès ou d'erreur -->
      <p v-if="successMessage" class="text-purple-500 text-sm mb-4 animate-fade-in">{{ successMessage }}</p>
      <p v-if="errorMessage" class="text-red-500 text-sm mb-4 animate-fade-in">{{ errorMessage }}</p>

      <!-- Boutons -->
      <div class="flex justify-center gap-6">
        <AppButton
            variant="primary"
            class="px-8 py-2 text-base"
            @click="resendVerificationEmail"
            :disabled="isResending"
            :loading="isResending"
        >
          Renvoyer l'e-mail
        </AppButton>
        <AppButton
            variant="outline"
            class="px-8 py-2 text-base"
            @click="logout"
        >
          Se déconnecter
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppButton from '~/components/ui/AppButton.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { authService } from '~/services/authService'

// Récupérer le store et le router
const authStore = useAuthStore()
const router = useRouter()

// Messages d'erreur ou de succès
const successMessage = ref<string>('')
const errorMessage = ref<string>('')
const isResending = ref<boolean>(false)

// Fonction pour renvoyer l'e-mail de vérification
const resendVerificationEmail = async () => {
  if (!authStore.currentUser?.email) {
    errorMessage.value = 'Adresse e-mail non disponible.'
    return
  }

  isResending.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await authService.resendVerificationEmail(authStore.currentUser.email)
    successMessage.value = 'Un nouvel e-mail de vérification a été envoyé.'
  } catch (error: any) {
    errorMessage.value = error.response?._data?.message || 'Erreur lors de l\'envoi de l\'e-mail.'
  } finally {
    isResending.value = false
  }
}

// Fonction pour se déconnecter
const logout = () => {
  authStore.clearAuthData()
  router.push('/login?tab=login')
}

useHead({
  title: 'Vérification de l\'e-mail - Fliiply',
  meta: [
    { name: 'description', content: 'Vérifiez votre adresse e-mail pour activer votre compte Fliiply.' }
  ]
})
</script>

<style scoped>
/* Animation pour les messages */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
</style>