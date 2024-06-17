<template>
    <div class="navBar">
        <ul class="navBar__list-container">
            <li v-for="(item, index) in navItens" :key="index" class="navBar__itens">
                <font-awesome-icon class="navBar__icon" :icon="item.icon" />
                <p>{{ item.text }}</p>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'NavBar',
    setup() {
        const navItens = [
            { icon: ['fas', 'house'], text: 'Home' },
            { icon: ['fas', 'magnifying-glass'], text: 'Search' },
            { icon: ['far', 'square-plus'], text: 'New' },
            { icon: ['far', 'comment'], text: 'Messages' },
            { icon: ['far', 'user'], text: 'Profile' },
        ]
        return {
            navItens
        };
    },
});
</script>
<style scoped lang="scss">
.navBar {

    background: var(--color-primary);
    padding: 1em 0em;

    &__list-container {
        display: flex;
        justify-content: space-around;
        padding: 0;
        color: var(--color-white);
    }

    &__itens {

        list-style: none;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__icon {
        font-size: 1.7em;
        margin-bottom: .5em;
    }

    p {
        font-size: 1.2em;
    }

}
</style>