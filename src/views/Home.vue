<template>
    <div class="home">
        <h1 class="home__title">Dashboard</h1>
        <AtCard :total="totalPlant" class="home__card" />
        <AtHistoricRecent :historicRecent="historic" />
        <div class="home__table">
            <MolTable :titles="tableHeaders" :items="tableRows" />
        </div>
    </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import MolTable from '@/components/molecules/MolTable.vue';
import AtCard from '@/components/atoms/AtCard.vue'
import AtHistoricRecent from '@/components/atoms/AtHistoricRecent.vue'
export default defineComponent({
    name: 'Home',
    components: { MolTable, AtCard, AtHistoricRecent },
    setup() {
        const totalPlant = ref(45)
        const historic = [
            { name: 'Purple', description: 'Criação de nova planta.' },
            { name: 'Zombie', description: 'Rega com 100ml de água.' },
        ]
        const tableHeaders = ['Grow', 'Planta', 'Última rega', 'Ações']
        const tableRows = [
            { Grow: 'Box 1', Planta: 'Grow', 'Última rega': '17/02/2024', icon: ['fas', 'house'] },
            { Grow: 'Box 1', Planta: 'Grow', 'Última rega': '17/02/2024', icon: ['fas', 'house'] },
            { Grow: 'Box 1', Planta: 'Grow', 'Última rega': '17/02/2024', icon: ['fas', 'house'] },
            { Grow: 'Box 1', Planta: 'Grow', 'Última rega': '17/02/2024', icon: ['fas', 'house'] },
            { Grow: 'Box 1', Planta: 'Grow', 'Última rega': '17/02/2024', icon: ['fas', 'house'] },
        ]
        return { tableRows, tableHeaders, totalPlant, historic };
    },
});
</script>
<style lang="scss" scoped>
.home {
    margin: 1.5rem;

    &__table {
        border: 1px solid var(--color-lightgreen);
        padding: 1rem;
        border-radius: 1rem;
        min-height: 290px;
    }

    &__title {
        padding: 2rem 0;
    }

    @media (min-width: 600px) {
        padding: 1rem 8rem;
        min-height: 410px;
        width: 90%;
    }
}
</style>