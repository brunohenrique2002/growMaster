<template>
  <div class="home">
    <h1 class="home__title">Dashboard</h1>
    <AtCard :total="totalPlant" class="home__card" />
    <AtHistoricRecent :historicRecent="historic" />
    <MolTable :titles="tableHeaders" :items="tableRows" />
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
    const getListPlant = () => {
      authService.listPlant().then((response) => {
        const listPlants = response.data
        tableRows.value = listPlants.map((item) => ({
          Grow: item.space || 'Vazio',
          Planta: item.name || 'Vazio',
          'Última rega': convertTimestampToDate(item.last_water)
        }))
        totalPlant.value = listPlants.length
      })
    }
    onMounted(getListPlant)
    return { tableRows, tableHeaders, totalPlant, historic, userStore }
  }
})
</script>
<style lang="scss" scoped>
.home {
  margin: 1.5rem;

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
