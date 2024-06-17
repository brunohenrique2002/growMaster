<template>
    <div class="home">
        <LTable :titles="tableHeaders" :items="tableRows" />
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import LTable from '@/components/atoms/LTable.vue';
export default defineComponent({
    name: 'Home',
    components: { LTable },
    setup() {

        const tableHeaders = ['Grow', 'Planta', 'Última rega', 'Ações']
        const tableRows = [
            { Grow: 'Box 1', Planta: 'Grow', 'Última rega': '17/02/2024', icon: ['fas', 'house'] },
            { Grow: 'Box 1', Planta: 'Grow', 'Última rega': '17/02/2024', icon: ['fas', 'house'] },
            { Grow: 'Box 1', Planta: 'Grow', 'Última rega': '17/02/2024', icon: ['fas', 'house'] },
            { Grow: 'Box 1', Planta: 'Grow', 'Última rega': '17/02/2024', icon: ['fas', 'house'] },
            { Grow: 'Box 1', Planta: 'Grow', 'Última rega': '17/02/2024', icon: ['fas', 'house'] },
        ]
        console.log(tableHeaders);
        console.log(tableRows);
        return { tableRows, tableHeaders };
    },
});
</script>
<style lang="scss" scoped>
.home {
    border: 1px solid var(--color-lightgreen);
    padding: 1em;
    margin: 0.5em;
    border-radius: 1em;
    min-height: 290px;

    @media (min-width: 600px) {
        padding: 1em 8em;
        min-height: 410px;
        width: 90%;
    }
}
</style>