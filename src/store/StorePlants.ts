import { defineStore } from 'pinia'
import { PlantsState } from '@/types/Plants'
import authService from '@/services/ApiService'
export const usePlantsStore = defineStore('plants', {
  state: (): PlantsState => ({
    plants: [],
    error: null,
    isLoaderActive: false
  }),
  actions: {
    setLoaderActive(active: boolean) {
      this.isLoaderActive = active
    },

    async fetchListPlants() {
      this.error = null
      this.setLoaderActive(true)
      try {
        const response = await authService.listPlant()
        this.plants = response.data
        // console.log(this.plants)
      } catch (error) {
        console.error(error)
      } finally {
        this.setLoaderActive(false)
      }
    }
  }
})
