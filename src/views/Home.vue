<template>
  <div class="home">
    <h1 class="home__title">Dashboard, {{ userStore.name }}</h1>
    <AtCard :total="totalPlant" class="home__card" />
    <AtHistoricRecent :historicRecent="historic" />
    <div class="home__table">
      <MolTable :titles="tableHeaders" :items="tableRows" />
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'
import MolTable from '@/components/molecules/MolTable.vue'
import AtCard from '@/components/atoms/AtCard.vue'
import AtHistoricRecent from '@/components/atoms/AtHistoricRecent.vue'
import { useUserStore } from '@/store/StoreUser'
import authService from '@/services/ApiService'
export default defineComponent({
  name: 'Home',
  components: { MolTable, AtCard, AtHistoricRecent },
  setup() {
    const userStore = useUserStore()
    const totalPlant = ref(0)
    const historic = [
      { name: 'Purple', description: 'Criação de nova planta.' },
      { name: 'Zombie', description: 'Rega com 100ml de água.' }
    ]
    const tableHeaders = ['Grow', 'Planta', 'Última rega', 'Ações']
    const tableRows = ref([])

    const convertTimestampToDate = (timestamp) => {
      const date = new Date(parseInt(timestamp) * 1000)
      return date.toLocaleDateString()
    }
    const getApi = () => {
      authService.ListPlant().then((response) => {
        tableRows.value = response.data.map((item) => ({
          Grow: item.space,
          Planta: item.name,
          'Última rega': convertTimestampToDate(item.last_water),
          id: item.id
        }))
        totalPlant.value = response.data.length
      })
    }
    onMounted(getApi)
    return { tableRows, tableHeaders, totalPlant, historic, userStore }
  }
})
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
