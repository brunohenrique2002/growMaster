import { defineStore } from 'pinia'
import { PlantsState, deletePlant, plant } from '@/types/Plants'
import authService from '@/services/ApiService'
import { useStoreModals } from '@/store/StoreModals'
export const usePlantsStore = defineStore('plants', {
  state: (): PlantsState => ({
    plants: [],
    error: null,
    isLoaderActive: false,
    requestProgress: false,
    deletePromise: null
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

    async createPlant(data: plant) {
      if (this.requestProgress) return console.error('Espere!')

      const isActiveModal = useStoreModals()
      try {
        this.requestProgress = true
        this.setLoaderActive(true)

        await authService.addPlant(data)

        if (this.plants) {
          isActiveModal.toggleModal()
          this.fetchListPlants()
          this.requestProgress = false
          isActiveModal.showModalPlant()
        }
      } catch (error) {
        this.requestProgress = false
        console.log(error)
      } finally {
        this.requestProgress = false
        this.setLoaderActive(false)
      }
    },
    async deletePlant(data: deletePlant) {
      if (this.deletePromise) return this.deletePromise
      this.deletePromise = (async () => {
        try {
          await authService.deletePlant(data)
          if (this.plants) {
            await this.fetchListPlants()
          }
        } catch (error) {
          console.log(error)
        } finally {
          this.deletePromise = null
        }
      })()
      return this.deletePromise
    }
  }
})
