import { apiService } from "./apiServices"

// Définir une interface pour la réponse de login
interface LoginResponse {
    refresh: string
    access: string
    refresh_expires_in?: number // Durée de validité du refresh token (en secondes)
    access_expires_in?: number // Durée de validité de l'access token (en secondes)
}

// Définir une interface pour la réponse de refresh
interface RefreshResponse {
    access: string
    access_expires_in?: number // Durée de validité du nouvel access token (en secondes)
}

export const authService = {
    async login(username: string, password: string): Promise<LoginResponse> {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await apiService.fetch('/auth/login/', {
                method: 'POST',
                body: {
                    username,
                    password
                }
            })
            return response as LoginResponse
        } catch (error) {
            throw error
        }
    },

    async refreshToken(refreshToken: string): Promise<RefreshResponse> {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await apiService.fetch('/auth/refresh/', {
                method: 'POST',
                body: {
                    refresh: refreshToken
                }
            })
            return response as RefreshResponse
        } catch (error) {
            throw error
        }
    }
}