import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '@/shared/constants'
import HomePage from '@/pages/home-page'
import LoginPage from '@/pages/auth/login-page'
import RegisterPage from '@/pages/auth/register-page'
import MoviesPage from './pages/movies/movies-page'
import MoviePage from './pages/movies/[id]'

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />

      <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.AUTH.REGISTER} element={<RegisterPage />} />

      <Route path={ROUTES.PROTECTED.MOVIES.LIST} element={<MoviesPage />} />
      <Route path={ROUTES.PROTECTED.MOVIES.VIEW} element={<MoviePage />} />
    </Routes>
  )
}
