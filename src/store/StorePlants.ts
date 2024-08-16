import { defineStore } from 'pinia'
import { PlantsState, deletePlant, plant } from '@/types/Plants'
import authService from '@/services/ApiService'
import { useStoreModals } from '@/store/StoreModals'
import { useLoaderStore } from '@/store/StoreLoader'
export const usePlantsStore = defineStore('plants', {
  state: (): PlantsState => ({
    plants: [],
    error: null,

    requestProgress: false,
    deletePromise: null
  }),
  actions: {
    async fetchListPlants() {
      this.error = null
      const isLoader = useLoaderStore()
      if (this.plants.length === 0) {
        isLoader.setLoaderActive(true)
      }
      try {
        const response = await authService.listPlant()
        this.plants = response.data
        if (this.plants) {
          isLoader.setLoaderActive(false)
        }
      } catch (error) {
        console.error(error)
      }
    },

    async createPlant(data: plant) {
      if (this.requestProgress) return console.error('Espere!')

      const isActiveModal = useStoreModals()
      const isLoader = useLoaderStore()
      try {
        this.requestProgress = true
        isLoader.setLoaderActive(true)

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
        isLoader.setLoaderActive(false)
      }
    },
    async deletePlant(data: deletePlant) {
      if (this.deletePromise) return this.deletePromise
      this.deletePromise = (async () => {
        const isLoader = useLoaderStore()
        try {
          await authService.deletePlant(data)
          isLoader.setLoaderActive(true)
          if (this.plants) {
            await this.fetchListPlants()
            isLoader.setLoaderActive(false)
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
