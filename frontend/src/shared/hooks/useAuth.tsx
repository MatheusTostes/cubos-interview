// Re-export types and hook from auth context
export type {
  User,
  LoginCredentials,
  AuthState,
} from '@/shared/contexts/auth-context'
export { useAuth } from '@/shared/contexts/auth-context'
