import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '@/shared/constants'
import HomePage from '@/pages/home-page'
import LoginPage from '@/pages/login-page'
import RegisterPage from '@/pages/register-page'

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
    </Routes>
  )
}
