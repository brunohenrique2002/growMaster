import { defineStore } from 'pinia'
import authService from '@/services/ApiService'
import { GrowState, dataGrows, deleteGrow } from '@/types/Grows'
import { useStoreModals } from '@/store/StoreModals'
export const useGrowsStore = defineStore('grow', {
  state: (): GrowState => ({
    grows: [],
    error: null,
    isLoaderActive: false,
    requestProgress: false
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
        // console.log(this.grows)
      } catch (error) {
        console.error(error)
      } finally {
        this.setLoaderActive(false)
      }
    },
    async createGrow(data: dataGrows) {
      if (this.requestProgress) {
        return console.error('Espere!')
      }
      const isActiveModal = useStoreModals()
      try {
        this.requestProgress = true
        await authService.addGrow(data)
        if (this.grows) {
          this.setLoaderActive(true)
          this.fetchListGrows()
          setTimeout(() => {
            this.requestProgress = false
            isActiveModal.showModalGrow()
          }, 500)
        }
      } catch (error) {
        this.requestProgress = false
        console.log(error)
      }
    },
    async deleteGrow(data: deleteGrow) {
      try {
        await authService.deleteGrow(data)
        if (this.grows) {
          this.fetchListGrows()
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
})
