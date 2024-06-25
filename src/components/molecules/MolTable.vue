<template>
    <table class="table">
        <thead>
            <tr>
                <th v-for="(title, index) in titles" :key="index">{{ title }}</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(item, index) in items" :key="index">
                <td v-for="(title, index) in titles" :key="index">
                    <span v-if="title === 'Ações'">
                        <AtIcons class="table__icons" :icon="['fas', 'eye']" />
                        <AtIcons class="table__icons" :icon="['fas', 'trash']" />
                    </span>
                    <span v-else>
                        {{ item[title] }}
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import AtIcons from '@/components/atoms/AtIcons.vue'
interface TableRow {
    [key: string]: any;
}
export default defineComponent({
    name: 'MolTable',
    components: { AtIcons },
    props: {
        titles: {
            type: Array as PropType<string[]>,
            required: true
        },
        items: {
            type: Array as PropType<TableRow[]>,
            required: true
        },


    }
});
</script>

<style scoped lang="scss">
.table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
        padding: 1em;
        text-align: center;
        font-size: 1.3em;
    }

    thead,
    tr {
        border-bottom: 1px solid var(--color-primary);
        display: flex;
        justify-content: space-around;
        width: 100%;
    }

    th {
        color: var(--color-primary);
        font-size: 1.3em;
    }

    &__icons {
        color: var(--color-primary);
        margin-left: 5px;
    }

    @media (min-width: 600px) {
        td {
            padding: 1.5em;
        }
    }
}
</style>