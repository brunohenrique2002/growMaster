<template>
  <div class="table__container">
    <div class="table-box">
      <table class="table">
        <thead>
          <tr>
            <th v-for="(title, index) in titles" :key="index">{{ title }}</th>
          </tr>
        </thead>

        <AtLoader :isLoaderActive="isActiveLoader" />
        <tbody v-if="items.length > 0">
          <tr v-for="(item, index) in items" :key="index">
            <td v-for="(title, index) in titles" :key="index">
              <span v-if="title === 'Ações'">
                <AtIcons class="table__icons" :icon="['fas', 'eye']" @click="editItem(item.id)" />
                <AtIcons
                  class="table__icons table__icon-margin"
                  :icon="['fas', 'trash']"
                  @click="deleteItem(item.id)"
                />
              </span>
              <span v-else>
                {{ item[title] }}
              </span>
            </td>
          </tr>
        </tbody>
        <p v-else class="table__empty-message">Lista vazia...</p>
      </table>
      <div class="table__arrow-icons">
        <AtIcons class="table__icon-pages" :icon="['fas', 'angles-left']" />
        <div class="table__icon-space"></div>
        <AtIcons class="table__icon-pages" :icon="['fas', 'angles-right']" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import AtIcons from '@/components/atoms/AtIcons.vue'
import AtLoader from '@/components/atoms/AtLoader.vue'
import { useLoaderStore } from '@/store/StoreLoader'
interface TableRow {
  [key: string]: any
}
export default defineComponent({
  name: 'MolTable',
  components: { AtIcons, AtLoader },
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
  emits: ['deleteItem', 'editItem'],

  setup(props, { emit }) {
    const loaderStore = useLoaderStore()
    const isActiveLoader = computed(() => loaderStore.isLoaderActive)
    const editItem = (id: number) => {
      emit('editItem', id)
    }
    const deleteItem = (id: number) => {
      emit('deleteItem', id)
    }
    return { deleteItem, editItem, isActiveLoader }
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

  &__empty-message {
    display: flex;
    justify-content: center;
    font-size: 1.1rem;
    padding-top: 10px;
    font-weight: bold;
    color: var(--color-primary);
  }
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
    margin-left: 3px;
  }
  &__icon-margin {
    margin-left: 12px;
  }
  @media (min-width: 600px) {
    &__container {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    td {
      padding: 1.5em;
    }
    &__icon-margin:hover {
      color: #ff4d4deb;
    }
  }
}
</style>
