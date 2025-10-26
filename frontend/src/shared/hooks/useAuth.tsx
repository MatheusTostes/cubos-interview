import { useState, useCallback } from 'react'
import { useNavigation } from './useNavigation'
import { RegisterFormData } from '@/features/register/schemas/register.schema'

export interface User {
  id: string
  name: string
  email: string
}

export interface LoginCredentials {
  nameOrEmail: string
  password: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  })

  const { goToHome, goToLogin } = useNavigation()

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setAuthState((prev) => ({ ...prev, isLoading: true }))

      try {
        // Simula chamada para API de login
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock de usuário logado (substitua pela lógica real)
        const mockUser: User = {
          id: '1',
          name: 'Usuário Teste',
          email: credentials.nameOrEmail.includes('@')
            ? credentials.nameOrEmail
            : 'usuario@teste.com',
        }

        setAuthState({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
        })

        // Salva no localStorage (opcional)
        localStorage.setItem('user', JSON.stringify(mockUser))
        localStorage.setItem('isAuthenticated', 'true')

        goToHome()

        return { success: true, user: mockUser }
      } catch (error) {
        setAuthState((prev) => ({ ...prev, isLoading: false }))
        console.error('Login error:', error)
        return { success: false, error: 'Erro ao fazer login' }
      }
    },
    [goToHome]
  )

  const logout = useCallback(() => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })

    // Remove do localStorage
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')

    goToLogin()
  }, [goToLogin])

  const checkAuth = useCallback(() => {
    const storedUser = localStorage.getItem('user')
    const storedAuth = localStorage.getItem('isAuthenticated')

    if (storedUser && storedAuth === 'true') {
      try {
        const user = JSON.parse(storedUser)
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        })
      } catch (error) {
        console.error('Error parsing stored user:', error)
        logout()
      }
    }
  }, [logout])

  const register = useCallback(async (credentials: RegisterFormData) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error('Register error:', error)
      return { success: false, error: 'Erro ao fazer registro' }
    }
  }, [])

  return {
    ...authState,
    login,
    register,
    logout,
    checkAuth,
  }
}
