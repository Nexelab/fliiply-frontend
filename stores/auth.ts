import { defineStore } from 'pinia'

// Définir une interface pour l'état du store
interface AuthState {
    refreshToken: string | null
    accessToken: string | null
    accessTokenExpiresAt: number | null
    refreshTokenExpiresAt: number | null
    isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        refreshToken: null,
        accessToken: null,
        accessTokenExpiresAt: null,
        refreshTokenExpiresAt: null,
        isAuthenticated: false
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
        clearAuthData() {
            this.refreshToken = null
            this.accessToken = null
            this.accessTokenExpiresAt = null
            this.refreshTokenExpiresAt = null
            this.isAuthenticated = false
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