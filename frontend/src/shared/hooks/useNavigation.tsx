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
    goToProject: (id: string) => navigate(routeHelpers.projectView(id)),
    goToProjectEdit: (id: string) => navigate(routeHelpers.projectEdit(id)),
    
    // Predefined routes
    goToHome: () => navigate(ROUTES.HOME),
    goToLogin: () => navigate(ROUTES.LOGIN),
    goToDashboard: () => navigate(ROUTES.DASHBOARD),
    goToProfile: () => navigate(ROUTES.PROFILE),
    goToSettings: () => navigate(ROUTES.SETTINGS),
    goToUsers: () => navigate(ROUTES.USERS.LIST),
    goToProjects: () => navigate(ROUTES.PROJECTS.LIST),
    
    // Current location info
    currentPath: location.pathname,
    isCurrentRoute: (path: string) => location.pathname === path,
  }
}
