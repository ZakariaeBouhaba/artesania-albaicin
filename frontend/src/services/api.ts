import axios from 'axios'
import { useAuthStore } from '../store/authStore'

const BASE = import.meta.env.VITE_API_URL ?? '/api/v1'

export const api = axios.create({ baseURL: BASE, withCredentials: true })

api.interceptors.request.use(config => {
  const token = useAuthStore.getState().accessToken
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let isRefreshing = false
let failedQueue: Array<{ resolve: (t: string) => void; reject: (e: unknown) => void }> = []

api.interceptors.response.use(
  res => res,
  async error => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      const refreshToken = useAuthStore.getState().refreshToken
      if (!refreshToken) {
        useAuthStore.getState().logout()
        return Promise.reject(error)
      }
      if (isRefreshing) {
        return new Promise((resolve, reject) => failedQueue.push({ resolve, reject }))
          .then(token => {
            original.headers.Authorization = `Bearer ${token}`
            return api(original)
          })
      }
      original._retry = true
      isRefreshing = true
      try {
        const { data } = await axios.post(`${BASE}/auth/refresh`, { refreshToken })
        const { accessToken, refreshToken: newRefresh } = data.data
        useAuthStore.getState().setTokens(accessToken, newRefresh)
        failedQueue.forEach(p => p.resolve(accessToken))
        failedQueue = []
        original.headers.Authorization = `Bearer ${accessToken}`
        return api(original)
      } catch (err) {
        failedQueue.forEach(p => p.reject(err))
        failedQueue = []
        useAuthStore.getState().logout()
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  }
)
