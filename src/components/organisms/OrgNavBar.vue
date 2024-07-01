<template>
    <div class="org-navBar">
        <MolBottomModal></MolBottomModal>
        <div class="org-navBar__container">
            <ul class="org-navBar__list-container">
                <li v-for="(item, index) in navItens" :key="index" class="org-navBar__itens">
                    <AtIcons class="org-navBar__icon" :icon="item.icon" @click="handleAction(item)" />
                    <p>{{ item.text }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import AtIcons from '@/components/atoms/AtIcons.vue'
import MolBottomModal from '@/components/molecules/MolBottomModal.vue'
import { useStoreModals } from '@/store/StoreModals'
export default defineComponent({
    name: 'NavBar',
    components: { AtIcons, MolBottomModal },
    setup() {
        const showModal = useStoreModals();
        const navItens = [
            {
                icon: ['fas', 'house'],
                text: 'Home'
            },
            {
                icon: ['fas', 'magnifying-glass'],
                text: 'Search'
            },
            {
                icon: ['far', 'square-plus'],
                text: 'New',
                action: () => {
                    showModal.toggleModal()
                    console.log(showModal.isActive);
                }
            },
            {
                icon: ['far', 'comment'],
                text: 'Messages'
            },
            {
                icon: ['far', 'user'],
                text: 'Profile'
            },
        ]

        const handleAction = (item: any) => {
            if (item.action) {
                item.action()
            }
        }

        return {
            navItens, handleAction, showModal
        };
    },
});
</script>
<style scoped lang="scss">
.org-navBar {
    background-color: white;
    padding: 1em 0em;
    display: flex;
    justify-content: center;
    position: relative;

    &__list-container {
        display: flex;
        justify-content: space-between;
        padding: 0;
        color: var(--color-primary);
    }

    &__itens {
        list-style: none;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__icon {
        font-size: 2em;
        margin-bottom: .5em;
    }

    p {
        font-size: 1.2em;
    }

    &__container {
        width: 90%;
    }

    @media (min-width: 600px) {
        display: flex;
        justify-content: center;
        padding: 0;

        &__container {
            width: 90%;
        }
    }

}
</style>