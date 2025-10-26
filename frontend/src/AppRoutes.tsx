import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '@/shared/constants'
import Home from '@/features/Home/Home'
import Login from '@/features/Login/Login'
import Register from '@/features/Register/Register'

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
    </Routes>
  )
}
