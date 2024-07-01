<template>
    <div class="background" :class="{ active: modalStore.isActiveModal }"></div>
    <div class="modal" :class="{ active: modalStore.isActiveModal }">
        <div class="modal__container">
            <div class="modal__header">
                <h1 class="modal__title">O que você quer adicionar?</h1>
                <AtIcons class="modal__close" :icon="['fas', 'xmark']" @click="toggleModal" />
            </div>
            <div class="modal__content">
                <div class="modal__items" v-for="(icon, index) in icons" :key="index">
                    <AtIcons class="modal__icon" :icon="icon.icon" />
                    <p class="modal__text-add">{{ icon.text }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import AtIcons from '@/components/atoms/AtIcons.vue'
import { useStoreModals } from '@/store/StoreModals'

export default defineComponent({
    name: 'MolmodalStore',
    components: {
        AtIcons
    },

    setup(props, { emit }) {
        const modalStore = useStoreModals();
        const icons = [
            { icon: ['fas', 'cannabis'], text: 'Planta' },
            { icon: ['fas', 'campground'], text: 'Grow' },
            { icon: ['fas', 'droplet'], text: 'Rega rápida' },
        ]


        const toggleModal = () => {
            modalStore.toggleModal();
            console.log(modalStore.isActiveModal);
        }
        watch(
            () => modalStore.isActiveModal,

            (newValue) => {
                const body = document.querySelector('body');
                if (body) {
                    body.style.overflow = newValue ? 'hidden' : '';
                }
            }
        );

        return {
            icons, toggleModal, modalStore

        }
    },
})
</script>
<style scoped lang="scss">
.background {

    &.active {
        background-color: #818181c7;
        width: 100%;
        height: 85%;
        position: fixed;
        top: 0;
    }
}

.modal {
    position: fixed;
    background-color: white;
    width: 100%;
    min-height: 160px;
    bottom: -30%;
    transition: bottom 0.2s ease;
    padding: 2rem;
    color: var(--color-primary);
    box-shadow: 0px -7px 9px -9px rgba(0, 0, 0, 0.75);
    border-radius: 10px 10px 0 0;
    border-bottom: 1px solid var(--color-primary);

    &.active {
        transition: bottom 0.2s ease;
        bottom: 86px;
    }

    &__text-add {
        font-size: 1.2rem;
    }

    &__icon {
        font-size: 2.0rem;
        margin-bottom: .7rem;
        color: var(--color-primary);
    }

    &__container {
        display: flex;
        flex-direction: column;
    }

    &__content {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 3rem;
    }

    &__items {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__title {
        font-size: 1.8rem
    }

    &__close {
        font-size: 2.4rem;
    }

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>