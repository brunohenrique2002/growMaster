import { defineStore } from 'pinia'

export const useStoreModals = defineStore('modals', {
  state: () => ({
    isActiveMenu: false,
    isActiveSideBottom: false,
    showModalListPlant: false,
    showModalListGrow: false,
    isActiveBackground: false
    // activeWarning: false
  }),
  actions: {
    activeBakground() {
      this.isActiveBackground = !this.isActiveBackground
    },
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
