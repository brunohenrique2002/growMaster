import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
    state: () => ({
        isActive: false,
    }),
    actions: {
        showSide() {
            this.isActive = !this.isActive;
        },
    },
});
