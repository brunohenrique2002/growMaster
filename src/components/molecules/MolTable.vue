<template>
  <div class="table-box">
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
              <AtIcons class="table__icons" :icon="['fas', 'trash']" @click="deleteItem(item.id)" />
            </span>
            <span v-else>
              {{ item[title] }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="table__arrow-icons">
      <AtIcons class="table__icon-pages" :icon="['fas', 'angles-left']" />
      <div class="table__icon-space"></div>
      <AtIcons class="table__icon-pages" :icon="['fas', 'angles-right']" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AtIcons from '@/components/atoms/AtIcons.vue'
interface TableRow {
  [key: string]: any
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
    }
  },
  emits: ['deleteItem'],

  setup(props, { emit }) {
    const deleteItem = (id: number) => {
      emit('deleteItem', id)
    }
    return { deleteItem }
  }
})
</script>

<style scoped lang="scss">
.table-box {
  border: 1px solid var(--color-lightgreen);
  padding: 1rem;
  border-radius: 1rem;
}
.table {
  width: 100%;
  border-collapse: collapse;
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;

  &__arrow-icons {
    display: flex;
    justify-content: center;
    align-items: end;
  }

  &__icon-space {
    padding: 0 10px;
  }
  &__icon-pages {
    font-size: 1.3rem;
    color: var(--color-primary);
  }
  th,
  td {
    padding: 10px 0;
    text-align: center;
    font-size: 1.3em;
    width: 100%;
  }

  thead,
  tr {
    border-bottom: 1px solid var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: space-between;
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
