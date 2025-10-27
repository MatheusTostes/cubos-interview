import { Route, Routes, Navigate } from 'react-router-dom'
import { ROUTES } from '@/shared/constants'
import LoginPage from '@/pages/auth/login-page'
import RegisterPage from '@/pages/auth/register-page'
import MoviesPage from './pages/movies/movies-page'
import MoviePage from './pages/movies/[id]'

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path={ROUTES.HOME}
        element={<Navigate to={ROUTES.PROTECTED.MOVIES.LIST} replace />}
      />

      <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.AUTH.REGISTER} element={<RegisterPage />} />

      <Route path={ROUTES.PROTECTED.MOVIES.LIST} element={<MoviesPage />} />
      <Route path={ROUTES.PROTECTED.MOVIES.VIEW} element={<MoviePage />} />
    </Routes>
  )
}
