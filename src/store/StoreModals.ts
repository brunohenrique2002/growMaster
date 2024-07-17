import { defineStore } from 'pinia'

export const useStoreModals = defineStore('modals', {
  state: () => ({
    isActiveMenu: false,
    isActiveSideBottom: false,
    showModalListPlant: false,
    showModalListGrow: false
    // activeWarning: false
  }),
  actions: {
    showModalGrow() {
      this.showModalListGrow = !this.showModalListGrow
    },

    showModalPlant() {
      this.showModalListPlant = !this.showModalListPlant
    },
    showSide() {
      this.isActiveMenu = !this.isActiveMenu
    },
    toggleModal() {
      this.isActiveSideBottom = !this.isActiveSideBottom
    }
  },
  getters: {}
})
