import { lazy, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { ROUTES } from '@/shared/constants'
import { MoviesListSkeleton } from '@/shared/components/organisms/movies-list-skeleton'
import { AuthPageSkeleton } from '@/shared/components/molecules/auth-page-skeleton'

// Lazy loading das páginas
const LoginPage = lazy(() => import('@/pages/auth/login-page'))
const RegisterPage = lazy(() => import('@/pages/auth/register-page'))
const ForgotPasswordPage = lazy(
  () => import('@/pages/auth/forgot-password-page')
)
const ResetPasswordPage = lazy(() => import('@/pages/auth/reset-password-page'))
const MoviesPage = lazy(() => import('@/pages/movies/movies-page'))
const MoviePage = lazy(() => import('@/pages/movies/[id]'))

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path={ROUTES.HOME}
        element={<Navigate to={ROUTES.PROTECTED.MOVIES.LIST} replace />}
      />

      <Route
        path={ROUTES.AUTH.LOGIN}
        element={
          <Suspense fallback={<AuthPageSkeleton />}>
            <LoginPage />
          </Suspense>
        }
      />
      <Route
        path={ROUTES.AUTH.REGISTER}
        element={
          <Suspense fallback={<AuthPageSkeleton />}>
            <RegisterPage />
          </Suspense>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <Suspense fallback={<AuthPageSkeleton />}>
            <ForgotPasswordPage />
          </Suspense>
        }
      />
      <Route
        path="/reset-password"
        element={
          <Suspense fallback={<AuthPageSkeleton />}>
            <ResetPasswordPage />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.PROTECTED.MOVIES.LIST}
        element={
          <Suspense fallback={<MoviesListSkeleton />}>
            <MoviesPage />
          </Suspense>
        }
      />
      <Route
        path={ROUTES.PROTECTED.MOVIES.VIEW}
        element={
          <Suspense fallback={<AuthPageSkeleton />}>
            <MoviePage />
          </Suspense>
        }
      />
    </Routes>
  )
}
