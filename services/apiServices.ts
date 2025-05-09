import {useAuthStore} from '~/stores/auth'
import {authService} from '~/services/authService'

// Crée une instance de $fetch avec intercepteur
export const apiService = {
    async fetch(url: string, options: never = {}) {
        const config = useRuntimeConfig()
        const backendUrl = config.public.backendUrl
        const authStore = useAuthStore()

        // Vérifier si l'access token est expiré
        if (authStore.isAccessTokenExpired() && authStore.refreshToken) {
            try {
                if (authStore.isRefreshTokenExpired()) {
                    // Si le refresh token est expiré, déconnecter l'utilisateur
                    authStore.clearAuthData()
                    throw new Error('Refresh token expired. Please log in again.')
                }

                // Rafraîchir l'access token
                const refreshResponse = await authService.refreshToken(authStore.refreshToken)
                authStore.setAuthData({
                    refresh: authStore.refreshToken,
                    access: refreshResponse.access,
                    accessExpiresIn: refreshResponse.access_expires_in
                })
            } catch (error) {
                // En cas d'erreur lors du rafraîchissement, déconnecter l'utilisateur
                authStore.clearAuthData()
                throw error
            }
        }

        // Ajouter l'access token dans les en-têtes
        const headers = {
            ...options.headers,
            Authorization: authStore.accessToken ? `Bearer ${authStore.accessToken}` : ''
        }

        try {
            return await $fetch(`${backendUrl}${url}`, {
                ...options,
                headers
            })
        } catch (error: never) {
            if (error.response?.status === 401) {
                // Si une erreur 401 est renvoyée, déconnecter l'utilisateur
                authStore.clearAuthData()
            }
            throw error
        }
    }
}