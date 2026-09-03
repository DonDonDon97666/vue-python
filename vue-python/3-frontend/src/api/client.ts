import axios from 'axios'
import { useAuthStore } from '../stores/auth'

export const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api/v1' })
api.interceptors.request.use(config => { const token = localStorage.getItem('accessToken'); if (token) config.headers.Authorization = `Bearer ${token}`; return config })
api.interceptors.response.use(response => response, error => { if (error.response?.status === 401) useAuthStore().logout(); return Promise.reject(error) })
