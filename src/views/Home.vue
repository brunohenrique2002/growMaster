<template>
  <div class="home">
    <div class="home__container">
      <div class="home__totalPlant">
        <h1 class="home__title">Dashboard</h1>
        <AtCard :total="totalPlant" totalInfo="Total de plantas" class="home__card" />
      </div>
      <div class="home__home-historic">
        <AtHistoricRecent :historicRecent="historic" />
      </div>
      <div class="home__home-plants">
        <h1 class="home__title">Plantas</h1>
        <MolTable :titles="tableHeaders" :items="tableRows" @deleteItem="deletePlant" />
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, computed } from 'vue'
import MolTable from '@/components/molecules/MolTable.vue'
import AtCard from '@/components/atoms/AtCard.vue'
import AtHistoricRecent from '@/components/atoms/AtHistoricRecent.vue'
import { useUserStore } from '@/store/StoreUser'
import { usePlantsStore } from '@/store/StorePlants'
export default defineComponent({
  name: 'Home',
  components: { MolTable, AtCard, AtHistoricRecent },
  setup() {
    const userStore = useUserStore()
    const plantStore = usePlantsStore()

    const historic = [
      { name: 'Purple', description: 'Criação de nova planta.' },
      { name: 'Zombie', description: 'Rega com 100ml de água.' }
    ]
    const tableHeaders = ['Grow', 'Planta', 'Status', 'Criada', 'Ações']

    // const convertTimestampToDate = (timestamp) => {
    //   const date = new Date(parseInt(timestamp) * 1000)
    //   return date.toLocaleDateString()
    // }
    const totalPlant = computed(() => plantStore.plants.length)

    const tableRows = computed(() =>
      plantStore.plants.map((item) => ({
        Grow: item.grow || 'Vazio',
        Planta: item.name || 'Vazio',
        Criada: item.created || 'Vazio',
        Status: item.status || 'Vazio',
        id: item.id
      }))
    )
    console.log(plantStore.plants.length)

    const deletePlant = (id) => {
      plantStore.deletePlant({ id })
    }
    const isActiveLoader = computed(() => plantStore.isLoaderActive)
    onMounted(() => {
      plantStore.fetchListPlants()
    })
    return {
      tableRows,
      tableHeaders,
      historic,
      userStore,
      plantStore,
      deletePlant,
      isActiveLoader,
      totalPlant
    }
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
    &__container {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    &__totalPlant,
    &__home-plants,
    &__home-historic {
      width: 500px;
    }
  }
}
</style>
