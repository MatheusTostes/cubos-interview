/**
 * Application Routes Configuration
 * Centralized route management for the application
 */

export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  
  // Protected routes
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  
  // Feature routes
  USERS: {
    LIST: '/users',
    CREATE: '/users/create',
    EDIT: '/users/:id/edit',
    VIEW: '/users/:id',
  },
  
  PROJECTS: {
    LIST: '/projects',
    CREATE: '/projects/create',
    EDIT: '/projects/:id/edit',
    VIEW: '/projects/:id',
  },
  
  // API routes
  API: {
    AUTH: {
      LOGIN: '/api/auth/login',
      LOGOUT: '/api/auth/logout',
      REFRESH: '/api/auth/refresh',
      REGISTER: '/api/auth/register',
    },
    USERS: '/api/users',
    PROJECTS: '/api/projects',
  },
} as const

/**
 * Route helper functions
 */
export const routeHelpers = {
  /**
   * Generate user edit route with ID
   */
  userEdit: (id: string) => ROUTES.USERS.EDIT.replace(':id', id),
  
  /**
   * Generate user view route with ID
   */
  userView: (id: string) => ROUTES.USERS.VIEW.replace(':id', id),
  
  /**
   * Generate project edit route with ID
   */
  projectEdit: (id: string) => ROUTES.PROJECTS.EDIT.replace(':id', id),
  
  /**
   * Generate project view route with ID
   */
  projectView: (id: string) => ROUTES.PROJECTS.VIEW.replace(':id', id),
}

/**
 * Route groups for navigation
 */
export const ROUTE_GROUPS = {
  PUBLIC: [ROUTES.HOME, ROUTES.LOGIN, ROUTES.REGISTER],
  PROTECTED: [ROUTES.DASHBOARD, ROUTES.PROFILE, ROUTES.SETTINGS],
  USER_MANAGEMENT: [ROUTES.USERS.LIST, ROUTES.USERS.CREATE],
  PROJECT_MANAGEMENT: [ROUTES.PROJECTS.LIST, ROUTES.PROJECTS.CREATE],
} as const

/**
 * Route metadata for navigation
 */
export const ROUTE_METADATA = {
  [ROUTES.HOME]: {
    title: 'Home',
    description: 'Welcome to the application',
    requiresAuth: false,
  },
  [ROUTES.LOGIN]: {
    title: 'Login',
    description: 'Sign in to your account',
    requiresAuth: false,
  },
  [ROUTES.DASHBOARD]: {
    title: 'Dashboard',
    description: 'Your personal dashboard',
    requiresAuth: true,
  },
  [ROUTES.USERS.LIST]: {
    title: 'Users',
    description: 'Manage users',
    requiresAuth: true,
  },
  [ROUTES.PROJECTS.LIST]: {
    title: 'Projects',
    description: 'Manage projects',
    requiresAuth: true,
  },
} as const

export type RouteKey = keyof typeof ROUTES
export type RouteGroup = keyof typeof ROUTE_GROUPS
