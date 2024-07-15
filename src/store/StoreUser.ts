import { defineStore } from 'pinia'
import { UserState } from '@/types/User'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: null,
    name: null,
    email: null
  }),
  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },
    setName(name: string) {
      this.name = name
    },
    setEmail(email: string) {
      this.email = email
    },
    clear() {
      this.token = null
      this.name = null
      this.email = null
      localStorage.removeItem('token')
    }
  }
})
