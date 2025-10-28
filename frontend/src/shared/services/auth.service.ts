import { api } from './api'
import Cookies from 'js-cookie'
import { User } from '../contexts/auth-context'

export interface LoginRequest {
  identifier: string
  password: string
}

export interface RegisterRequest {
  email: string
  name: string
  password: string
}

export interface AuthResponse {
  user: User
  access_token: string
  refresh_token: string
}

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials)

    // Salva os tokens nos cookies
    Cookies.set('access_token', response.data.access_token, { expires: 1 / 96 }) // 15 minutos
    Cookies.set('refresh_token', response.data.refresh_token, { expires: 7 }) // 7 dias
    Cookies.set('user', JSON.stringify(response.data.user), { expires: 7 })

    return response.data
  },

  async register(credentials: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', credentials)

    // Salva os tokens nos cookies
    Cookies.set('access_token', response.data.access_token, { expires: 1 / 96 }) // 15 minutos
    Cookies.set('refresh_token', response.data.refresh_token, { expires: 7 }) // 7 dias
    Cookies.set('user', JSON.stringify(response.data.user), { expires: 7 })

    return response.data
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Remove os tokens dos cookies
      Cookies.remove('access_token')
      Cookies.remove('refresh_token')
      Cookies.remove('user')
    }
  },

  getCurrentUser(): User | null {
    const userCookie = Cookies.get('user')

    if (!userCookie) {
      return null
    }

    try {
      return JSON.parse(userCookie)
    } catch (error) {
      console.error('Error parsing user cookie:', error)
      return null
    }
  },

  isAuthenticated(): boolean {
    return !!Cookies.get('access_token')
  },

  async forgotPassword(data: {
    identifier: string
  }): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>(
      '/auth/forgot-password',
      data
    )
    return response.data
  },

  async resetPassword(data: {
    token: string
    password: string
    confirmPassword: string
  }): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>(
      '/auth/reset-password',
      data
    )
    return response.data
  },
}
