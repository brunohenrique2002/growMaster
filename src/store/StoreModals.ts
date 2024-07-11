import { defineStore } from 'pinia';

export const useStoreModals = defineStore('modals', {
    state: () => ({
        isActive: false,
        isActiveSideBottom: false,
        showModal: false,
        activeWarning: false,
    }),
    actions: {
        showSide() {
            this.isActive = !this.isActive;
        },
        toggleModal() {
            this.isActiveSideBottom = !this.isActiveSideBottom;
        },
    },
    getters: {
        
    }   
});
