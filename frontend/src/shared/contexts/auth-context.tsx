import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from 'react'
import { RegisterFormData } from '@/features/register/schemas/register.schema'
import { useNavigate } from 'react-router-dom'

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

interface AuthContextType extends AuthState {
  login: (
    credentials: LoginCredentials
  ) => Promise<{ success: boolean; user?: User; error?: string }>
  logout: () => void
  register: (
    credentials: RegisterFormData
  ) => Promise<{ success: boolean; error?: string }>
  checkAuth: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate()

  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  })

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setAuthState((prev) => ({ ...prev, isLoading: true }))

      try {
        // Simula chamada para API de login
        await new Promise((resolve) => setTimeout(resolve, 5000))

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

        navigate('/movies')

        return { success: true, user: mockUser }
      } catch (error) {
        setAuthState((prev) => ({ ...prev, isLoading: false }))
        console.error('Login error:', error)
        return { success: false, error: 'Erro ao fazer login' }
      }
    },
    [navigate]
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

    navigate('/login')
  }, [navigate])

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
      }
    }
  }, [])

  const register = useCallback(async (_credentials: RegisterFormData) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))

    try {
      await new Promise((resolve) => setTimeout(resolve, 5000))
      setAuthState((prev) => ({ ...prev, isLoading: false }))
      return { success: true }
    } catch (error) {
      console.error('Register error:', error)
      setAuthState((prev) => ({ ...prev, isLoading: false }))
      return { success: false, error: 'Erro ao fazer registro' }
    }
  }, [])

  const value = useMemo(
    () => ({
      ...authState,
      login,
      logout,
      register,
      checkAuth,
    }),
    [authState, login, logout, register, checkAuth]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
