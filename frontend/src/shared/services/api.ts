import axios from 'axios'
import Cookies from 'js-cookie'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Para enviar cookies nas requisições
})

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para lidar com erros de resposta e renovar token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Rotas que não devem tentar renovar o token
    const excludedRoutes = ['/auth/login', '/auth/register', '/auth/refresh']
    const isExcludedRoute = excludedRoutes.some((route) =>
      originalRequest.url?.includes(route)
    )

    // Se o erro for 401 e não for uma tentativa de renovação nem uma rota excluída
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isExcludedRoute
    ) {
      originalRequest._retry = true

      try {
        const refreshToken = Cookies.get('refresh_token')

        if (!refreshToken) {
          throw new Error('No refresh token available')
        }

        // Tenta renovar o token
        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          { refresh_token: refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        )

        const { access_token, refresh_token: newRefreshToken } = response.data

        // Salva os novos tokens
        Cookies.set('access_token', access_token, { expires: 1 / 96 }) // 15 minutos
        Cookies.set('refresh_token', newRefreshToken, { expires: 7 }) // 7 dias

        // Atualiza o header da requisição original
        originalRequest.headers.Authorization = `Bearer ${access_token}`

        return api(originalRequest)
      } catch (refreshError) {
        // Se falhar ao renovar, remove os tokens e redireciona para login
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        Cookies.remove('user')

        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)
