import { defineStore } from 'pinia'
import { PlantsState, deletePlant, dataPlants } from '@/types/Plants'
import authService from '@/services/ApiService'
import { useStoreModals } from '@/store/StoreModals'
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
      } catch (error) {
        console.error(error)
      } finally {
        this.setLoaderActive(false)
      }
    },

    async createPlant(data: dataPlants) {
      const isActiveModal = useStoreModals()
      try {
        await authService.addPlant(data)
        if (this.plants) {
          isActiveModal.showModalPlant()
          isActiveModal.toggleModal()
          this.fetchListPlants()
        }
      } catch (error) {
        console.log(error)
      }
    },
    async deletePlant(data: deletePlant) {
      try {
        await authService.deletePlant(data)
        if (this.plants) {
          this.fetchListPlants()
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
})
