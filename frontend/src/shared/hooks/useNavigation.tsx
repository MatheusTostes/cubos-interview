import { useNavigate, useLocation } from 'react-router-dom'
import { ROUTES, routeHelpers } from '@/shared/constants'

/**
 * Custom navigation hook that provides type-safe navigation
 */
export const useNavigation = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return {
    // Navigation functions
    goTo: (path: string) => navigate(path),
    goBack: () => navigate(-1),
    goForward: () => navigate(1),
    replace: (path: string) => navigate(path, { replace: true }),

    // Route helpers
    goToUser: (id: string) => navigate(routeHelpers.userView(id)),
    goToUserEdit: (id: string) => navigate(routeHelpers.userEdit(id)),
    goToMovie: (id: string) => navigate(routeHelpers.movieView(id)),
    goToMovieEdit: (id: string) => navigate(routeHelpers.movieEdit(id)),

    // Predefined routes
    goToHome: () => navigate(ROUTES.HOME),
    goToLogin: () => navigate(ROUTES.AUTH.LOGIN),
    goToRegister: () => navigate(ROUTES.AUTH.REGISTER),
    goToDashboard: () => navigate(ROUTES.PROTECTED.DASHBOARD),
    goToProfile: () => navigate(ROUTES.PROTECTED.PROFILE),
    goToSettings: () => navigate(ROUTES.PROTECTED.SETTINGS),
    goToUsers: () => navigate(ROUTES.PROTECTED.USERS.LIST),
    goToMovies: () => navigate(ROUTES.PROTECTED.MOVIES.LIST),

    // Current location info
    currentPath: location.pathname,
    isCurrentRoute: (path: string) => location.pathname === path,
  }
}
