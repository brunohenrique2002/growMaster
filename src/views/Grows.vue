<template>
  <div class="grow">
    <h1 class="grow__title">Grows</h1>
    <div class="grow__container">
      <AtLoader :isLoaderActive="isActiveLoader" />
      <MolModal
        text="Adicionar planta"
        v-if="activeModal.showModalListGrow"
        @closeModal="handleShowModal"
        @send="sendForm"
      >
        <AtInput
          type="text"
          text="Nome do grow"
          placeholder="Grow flora..."
          id="name"
          name="name"
          v-model="name"
        />
        <AtInput
          type="text"
          text="Descrição"
          placeholder="Alguma descrição..."
          id="description"
          name="description"
          v-model="description"
        />
      </MolModal>
      <div class="grow__add-grow">
        <AtButton class="grow__button-add" text="Adicionar grow" @click="showModal" />
      </div>
      <div class="grow__list-grows">
        <MolTable :titles="tableHeaders" :items="tableRows" @deleteItem="deleteGrow" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue'
import MolTable from '@/components/molecules/MolTable.vue'
import MolModal from '@/components/molecules/MolModal.vue'
import AtButton from '@/components/atoms/AtButton.vue'
import AtInput from '@/components/atoms/AtInput.vue'
import AtLoader from '@/components/atoms/AtLoader.vue'
import { useStoreModals } from '@/store/StoreModals'
import { useGrowsStore } from '@/store/StoreGrows'
import { dataGrows } from '@/types/Grows'
export default defineComponent({
  name: 'grows',
  components: { MolTable, AtButton, MolModal, AtInput, AtLoader },
  setup() {
    const name = ref('')
    const description = ref('')
    const growStore = useGrowsStore()
    const activeModal = useStoreModals()
    const tableHeaders = ['Nome grow', 'Descrição', 'Ações']

    const showModal = () => {
      activeModal.showModalGrow()
    }
    const handleShowModal = (value: boolean) => {
      activeModal.showModalListGrow = value
    }
    const sendForm = () => {
      const data = {
        name: name.value,
        description: description.value
      }
      growStore.createGrow(data)
    }
    const tableRows = computed(() =>
      growStore.grows.map((item: dataGrows) => ({
        'Nome grow': item.name || 'Vazio',
        Descrição: item.description || 'Vazio',
        id: item.id
      }))
    )
    const isActiveLoader = computed(() => growStore.isLoaderActive)

    const deleteGrow = (id: number) => {
      growStore.deleteGrow({ id })
    }

    onMounted(() => {
      growStore.fetchListGrows()
    })
    return {
      showModal,
      handleShowModal,
      isActiveLoader,
      sendForm,
      deleteGrow,
      tableRows,
      tableHeaders,
      activeModal,
      growStore,
      name,
      description
    }
  }
})
</script>
<style lang="scss" scoped>
.grow {
  margin: 15px;
  &__list-grows {
    width: 100%;
  }
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &__button-add {
    width: 130px;
  }
  &__add-grow {
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    justify-content: end;
    align-items: center;
  }
  &__title {
    padding: 2rem 0;
  }
}
</style>
