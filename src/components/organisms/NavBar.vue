<template>
    <div class="navBar">
        <h1>Nav</h1>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'NavBar',
    setup() {
        return {};
    },
});
</script>
<style scoped lang="scss">
.navBar {

    background: var(--color-primary);
    padding: 1em 0em;
}
</style>