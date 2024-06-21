<template>
    <div class="side-bar" :class="{ active: isActive }">
        <div class="side-bar__header">
            <h1>Side Grow</h1>
            <font-awesome-icon @click="sideActive" class="side-bar__icon-header" :icon="['fas', 'angles-left']" />
        </div>
        <div class="side-bar__nav">
            <ul class="side-bar__list">
                <li class="side-bar__items" v-for="(item, index) in sideList" :key="index">
                    <font-awesome-icon class="navBar__icon" :icon="item.icon" />
                    <p class="side-bar__text">{{ item.text }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
    name: 'SideBar',
    emits: ['toggle'],
    setup(props, { emit }) {

        const sideList = ref([
            { icon: ['fas', 'house'], text: 'Home', },
            { icon: ['fas', 'house'], text: 'Home', },
            { icon: ['fas', 'house'], text: 'Home', },
            { icon: ['fas', 'house'], text: 'Home', },
        ])
        const isActive = ref(false);

        const sideActive = () => {
            console.log('Ativado');
            isActive.value = !isActive.value;
            emit('toggle', isActive.value);
        }
        return { sideList, isActive, sideActive, }
    }
})
</script>
<style scoped lang="scss">
.side-bar {
    width: 100%;
    height: 100vh;
    background-color: var(--color-darkgreen);
    position: fixed;
    top: 67px;

    &.active {
        background-color: var(--color-lightgreen);
        right: -9999px;
    }

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 2em;
        color: var(--color-secundary);
        padding: 0 2em;

    }

    &__icon-header {
        font-size: 1.7em;
    }

    &__list {
        list-style: none;
        color: var(--color-secundary);
        font-size: 1.4em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0;
    }

    &__items {
        display: flex;
        margin-bottom: 2em
    }

    &__text {
        margin-left: 5px
    }


}
</style>