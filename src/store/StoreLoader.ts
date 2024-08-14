import { defineStore } from 'pinia'

export const useLoaderStore = defineStore('loader', {
  state: () => ({
    isLoaderActive: false
  }),
  actions: {
    setLoaderActive(active: boolean) {
      this.isLoaderActive = active
    }
  }
})
