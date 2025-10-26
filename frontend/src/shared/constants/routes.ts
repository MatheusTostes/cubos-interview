/**
 * Application Routes Configuration
 * Centralized route management for the application
 */

export const ROUTES = {
  // Public routes
  HOME: '/',

  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
  },

  PROTECTED: {
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

    MOVIES: {
      LIST: '/movies',
      CREATE: '/movies/create',
      EDIT: '/movies/:id/edit',
      VIEW: '/movies/:id',
    },
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
  },
} as const

/**
 * Route helper functions
 */
export const routeHelpers = {
  userView: (id: string) => ROUTES.PROTECTED.USERS.VIEW.replace(':id', id),
  userEdit: (id: string) => ROUTES.PROTECTED.USERS.EDIT.replace(':id', id),

  movieView: (id: string) => ROUTES.PROTECTED.MOVIES.VIEW.replace(':id', id),
  movieEdit: (id: string) => ROUTES.PROTECTED.MOVIES.EDIT.replace(':id', id),
}

/**
 * Route groups for navigation
 */
export const ROUTE_GROUPS = {
  PUBLIC: [ROUTES.HOME, ROUTES.AUTH.LOGIN, ROUTES.AUTH.REGISTER],
  PROTECTED: [
    ROUTES.PROTECTED.DASHBOARD,
    ROUTES.PROTECTED.PROFILE,
    ROUTES.PROTECTED.SETTINGS,
  ],
  USER_MANAGEMENT: [ROUTES.PROTECTED.USERS.LIST, ROUTES.PROTECTED.USERS.CREATE],
  MOVIES_MANAGEMENT: [
    ROUTES.PROTECTED.MOVIES.LIST,
    ROUTES.PROTECTED.MOVIES.CREATE,
  ],
} as const

/**
 * Route metadata for navigation
 */
export const ROUTE_METADATA = {
  [ROUTES.HOME]: {
    title: 'Home',
    description: 'Seja bem-vindo ao Cubos Movies',
    requiresAuth: false,
  },
  [ROUTES.AUTH.LOGIN]: {
    title: 'Login',
    description: 'Faça login para acessar o Cubos Movies',
    requiresAuth: false,
  },
  [ROUTES.AUTH.REGISTER]: {
    title: 'Register',
    description: 'Crie uma nova conta para acessar o Cubos Movies',
    requiresAuth: false,
  },
  [ROUTES.PROTECTED.DASHBOARD]: {
    title: 'Dashboard',
    description: 'Seu painel de controle',
    requiresAuth: true,
  },
  [ROUTES.PROTECTED.USERS.LIST]: {
    title: 'Users',
    description: 'Gerencie os usuários',
    requiresAuth: true,
  },
  [ROUTES.PROTECTED.MOVIES.LIST]: {
    title: 'Movies',
    description: 'Gerencie os filmes',
    requiresAuth: true,
  },
} as const

export type RouteKey = keyof typeof ROUTES
export type RouteGroup = keyof typeof ROUTE_GROUPS
