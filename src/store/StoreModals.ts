import { defineStore } from 'pinia';

export const useStoreModals = defineStore('modals', {
    state: () => ({
        isActive: false,
        isActiveModal: false
    }),
    actions: {
        showSide() {
            this.isActive = !this.isActive;
        },
        toggleModal() {
            this.isActiveModal = !this.isActiveModal;
        },
    },
});
