import { defineStore } from 'pinia'
import authService from '@/services/ApiService'
import { GrowState, dataGrows, deleteGrow } from '@/types/Grows'
import { useStoreModals } from '@/store/StoreModals'
export const useGrowsStore = defineStore('grow', {
  state: (): GrowState => ({
    grows: [],
    error: null
  }),
  actions: {
    async fetchListGrows() {
      this.error = null

      try {
        const response = await authService.listGrow()
        this.grows = response.data
      } catch (error) {
        this.error = 'Erro'
      }
    },
    async createGrow(data: dataGrows) {
      const isActiveModal = useStoreModals()
      try {
        await authService.addGrow(data)
        if (this.grows) {
          isActiveModal.showModalGrow()
          this.fetchListGrows()
        }
      } catch (error) {
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
