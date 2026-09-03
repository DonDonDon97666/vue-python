import { defineStore } from 'pinia'
import { api } from '../api/client'

type Role = 'buyer' | 'manager' | 'admin' | ''
export const useAuthStore = defineStore('auth', {
  state: () => ({ role: (localStorage.getItem('role') ?? '') as Role, token: localStorage.getItem('accessToken') ?? '' }),
  actions: {
    async login(username: string, password: string) { const { data } = await api.post('/auth/login', { username, password }); this.token = data.accessToken; this.role = data.role; localStorage.setItem('accessToken', data.accessToken); localStorage.setItem('role', data.role) },
    logout() { this.token = ''; this.role = ''; localStorage.removeItem('accessToken'); localStorage.removeItem('role') },
    can(permissions?: string[]) { return !permissions?.length || permissions.includes(this.role) }
  }
})
