import { apiService } from './apiServices'

// Définir une interface pour la réponse de login/register
interface AuthResponse {
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

// Définir une interface pour les informations utilisateur
interface UserResponse {
    id: number
    username: string
    email: string
    phone_number: string | null
    is_buyer: boolean
    is_seller: boolean
    is_verifier: boolean
    is_email_verified: boolean
}

export const authService = {
    async login(username: string, password: string): Promise<AuthResponse> {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await apiService.fetch('/auth/login/', {
                method: 'POST',
                body: {
                    username,
                    password
                }
            })
            return response as AuthResponse
        } catch (error) {
            throw error
        }
    },

    async register(
        username: string,
        email: string,
        password: string,
        confirmPassword: string,
        acceptTerms: boolean,
        subscribedToNewsletter: boolean
    ): Promise<AuthResponse> {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await apiService.fetch('/auth/register/', {
                method: 'POST',
                body: {
                    username,
                    email,
                    password,
                    confirm_password: confirmPassword,
                    accept_terms: acceptTerms,
                    subscribed_to_newsletter: subscribedToNewsletter
                }
            })
            return response as AuthResponse
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
    },

    async getCurrentUser(): Promise<UserResponse> {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await apiService.fetch('/users/me/', {
                method: 'GET'
            })
            return response as UserResponse
        } catch (error) {
            throw error
        }
    }
}