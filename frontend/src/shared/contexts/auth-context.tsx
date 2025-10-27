import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  ReactNode,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '@/shared/services/auth.service'

export interface User {
  id: string
  name: string
  email: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface AuthContextType extends AuthState {
  setUser: (user: User | null) => void
  setIsAuthenticated: (isAuthenticated: boolean) => void
  logout: () => void
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

  const setUser = useCallback((user: User | null) => {
    setAuthState((prev) => ({ ...prev, user }))
  }, [])

  const setIsAuthenticated = useCallback((isAuthenticated: boolean) => {
    setAuthState((prev) => ({ ...prev, isAuthenticated }))
  }, [])

  const logout = useCallback(async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))

    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })

      navigate('/login')
    }
  }, [navigate])

  const checkAuth = useCallback(() => {
    const user = authService.getCurrentUser()
    const isAuthenticated = authService.isAuthenticated()

    if (user && isAuthenticated) {
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      })
    } else {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })
    }
  }, [])

  // Verifica autenticação ao montar o componente
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const value = useMemo(
    () => ({
      user: authState.user,
      isAuthenticated: authState.isAuthenticated,
      isLoading: authState.isLoading,
      setUser,
      setIsAuthenticated,
      logout,
      checkAuth,
    }),
    [
      authState.user,
      authState.isAuthenticated,
      authState.isLoading,
      setUser,
      setIsAuthenticated,
      logout,
      checkAuth,
    ]
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
