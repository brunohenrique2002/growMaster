import { defineStore } from 'pinia'
import authService from '@/services/ApiService'
import { GrowState, dataGrows } from '@/types/Grows'
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
      try {
        await authService.addGrow(data)
        if (this.grows) {
          this.fetchListGrows()
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
})
