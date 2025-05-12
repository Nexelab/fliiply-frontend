import { defineStore } from 'pinia'

// Définir une interface pour les informations utilisateur
interface User {
    id: number
    username: string
    email: string
    phone_number: string | null
    is_buyer: boolean
    is_seller: boolean
    is_verifier: boolean
    is_email_verified: boolean
}

// Définir une interface pour l'état du store
interface AuthState {
    refreshToken: string | null
    accessToken: string | null
    accessTokenExpiresAt: number | null
    refreshTokenExpiresAt: number | null
    isAuthenticated: boolean
    currentUser: User | null // Ajouter currentUser à l'état
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        refreshToken: null,
        accessToken: null,
        accessTokenExpiresAt: null,
        refreshTokenExpiresAt: null,
        isAuthenticated: false,
        currentUser: null // Initialiser currentUser à null
    }),
    actions: {
        setAuthData(payload: { refresh: string; access: string; refreshExpiresIn?: number; accessExpiresIn?: number }) {
            this.refreshToken = payload.refresh
            this.accessToken = payload.access
            this.isAuthenticated = true

            const now = Date.now()
            this.accessTokenExpiresAt = now + (payload.accessExpiresIn || 3300) * 1000
            this.refreshTokenExpiresAt = now + (payload.refreshExpiresIn || 86400) * 1000
        },
        setCurrentUser(user: User) { // Ajouter l'action setCurrentUser
            this.currentUser = user
        },
        clearAuthData() {
            this.refreshToken = null
            this.accessToken = null
            this.accessTokenExpiresAt = null
            this.refreshTokenExpiresAt = null
            this.isAuthenticated = false
            this.currentUser = null
        },
        isAccessTokenExpired(): boolean {
            if (!this.accessTokenExpiresAt) return true
            return Date.now() > this.accessTokenExpiresAt
        },
        isRefreshTokenExpired(): boolean {
            if (!this.refreshTokenExpiresAt) return true
            return Date.now() > this.refreshTokenExpiresAt
        }
    },
    persist: true
})