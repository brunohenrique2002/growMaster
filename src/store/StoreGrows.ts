import { defineStore } from 'pinia'
import authService from '@/services/ApiService'
import { GrowState, Grow, ChangeGrow, GrowEdit } from '@/types/Grows'
import { useStoreModals } from '@/store/StoreModals'
export const useGrowsStore = defineStore('grow', {
  state: (): GrowState => ({
    grows: [],
    error: null,
    isLoaderActive: false,
    requestProgress: false,
    isDeleting: false,
    deletePromise: null
  }),
  actions: {
    setLoaderActive(active: boolean) {
      this.isLoaderActive = active
    },
    async fetchListGrows() {
      this.error = null
      this.setLoaderActive(true)
      try {
        const response = await authService.listGrow()
        this.grows = response.data
        if (this.grows) {
          this.setLoaderActive(false)
        }
      } catch (error) {
        console.error(error)
      }
    },
    async createGrow(data: Grow) {
      if (this.requestProgress) return console.error('Espere!')

      const isActiveModal = useStoreModals()
      try {
        this.requestProgress = true
        this.setLoaderActive(true)

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
        this.setLoaderActive(false)
      }
    },
    async deleteGrow(data: ChangeGrow) {
      if (this.deletePromise) return this.deletePromise

      this.deletePromise = (async () => {
        try {
          await authService.deleteGrow(data)
          if (this.grows) {
            await this.fetchListGrows()
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
      try {
        this.setLoaderActive(true)

        await authService.editGrow(data)
        this.fetchListGrows()
      } catch (error) {
        console.log(error)
      } finally {
        this.setLoaderActive(false)
      }
    }
  }
})
