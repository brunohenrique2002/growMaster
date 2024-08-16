import { defineStore } from 'pinia'
import authService from '@/services/ApiService'
import { GrowState, Grow, ChangeGrow, GrowEdit } from '@/types/Grows'
import { useStoreModals } from '@/store/StoreModals'
import { useLoaderStore } from '@/store/StoreLoader'
export const useGrowsStore = defineStore('grow', {
  state: (): GrowState => ({
    grows: [],
    error: null,
    requestProgress: false,
    isDeleting: false,
    deletePromise: null
  }),
  actions: {
    async fetchListGrows() {
      this.error = null
      const isLoader = useLoaderStore()
      if (this.grows.length === 0) {
        isLoader.setLoaderActive(true)
      }
      try {
        const response = await authService.listGrow()
        this.grows = response.data
        if (this.grows) {
          isLoader.setLoaderActive(false)
        }
      } catch (error) {
        console.error(error)
      }
    },
    async createGrow(data: Grow) {
      if (this.requestProgress) return console.error('Espere!')

      const isActiveModal = useStoreModals()
      const isLoader = useLoaderStore()

      try {
        this.requestProgress = true
        isActiveModal.activeBakground()
        isLoader.setLoaderActive(true)

        await authService.addGrow(data)

        if (this.grows) {
          isActiveModal.showModalGrow()

          this.fetchListGrows()
          this.requestProgress = false
        }
      } catch (error) {
        this.requestProgress = false
        console.log(error)
      } finally {
        this.requestProgress = false
        isLoader.setLoaderActive(false)
      }
    },
    async deleteGrow(data: ChangeGrow) {
      if (this.deletePromise) return this.deletePromise

      this.deletePromise = (async () => {
        const isLoader = useLoaderStore()
        try {
          await authService.deleteGrow(data)
          isLoader.setLoaderActive(true)
          if (this.grows) {
            await this.fetchListGrows()
            isLoader.setLoaderActive(false)
          }
        } catch (error) {
          console.log(error)
        } finally {
          this.deletePromise = null
        }
      })()

      return this.deletePromise
    },
    async editGrow(data: GrowEdit) {
      const isLoader = useLoaderStore()
      try {
        isLoader.setLoaderActive(true)

        await authService.editGrow(data)
        this.fetchListGrows()
      } catch (error) {
        console.log(error)
      } finally {
        isLoader.setLoaderActive(false)
      }
    }
  }
})
