<template>
  <div class="grow">
    <h1 class="grow__title">Grows</h1>
    <AtCard :total="totalGrow" totalInfo="Total de grows" class="home__card" />
    <div class="grow__container">
      <AtLoader :isLoaderActive="isActiveLoader" />
      <MolModal
        text="Adicionar planta"
        v-if="activeModal.showModalListGrow"
        @closeModal="handleShowModal"
        @send="createGrow"
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

        <div class="grow__message-error">
          <p>{{ messageError }}</p>
        </div>
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
import AtCard from '@/components/atoms/AtCard.vue'
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
  components: { MolTable, AtButton, MolModal, AtInput, AtLoader, AtCard },
  setup() {
    const name = ref('')
    const description = ref('')
    const messageError = ref('')
    const growStore = useGrowsStore()
    const activeModal = useStoreModals()
    const tableHeaders = ['Nome grow', 'Descrição', 'Ações']

    const showModal = () => {
      activeModal.showModalGrow()
    }
    const handleShowModal = (value: boolean) => {
      activeModal.showModalListGrow = value
    }
    const clearInfo = () => {
      name.value = ''
      description.value = ''
    }
    const validationForm = () => {
      messageError.value = ''
      if (!name.value) {
        messageError.value = 'Por favor informe o nome do grow'
      } else {
        return true
      }
      return false
    }
    const createGrow = () => {
      if (validationForm()) {
        try {
          const data = {
            name: name.value,
            description: description.value
          }
          growStore.createGrow(data)
          clearInfo()
        } catch (error) {
          console.error(error)
        }
      }
    }
    const tableRows = computed(() =>
      growStore.grows.map((item: dataGrows) => ({
        'Nome grow': item.name || 'Vazio',
        Descrição: item.description || 'Vazio',
        id: item.id
      }))
    )
    const totalGrow = computed(() => growStore.grows.length)
    const isActiveLoader = computed(() => growStore.isLoaderActive)

    const deleteGrow = (id) => {
      growStore.deleteGrow({ id })
    }

    onMounted(() => {
      growStore.fetchListGrows()
    })
    return {
      showModal,
      handleShowModal,
      messageError,
      isActiveLoader,
      createGrow,
      deleteGrow,
      tableRows,
      tableHeaders,
      activeModal,
      growStore,
      name,
      description,
      totalGrow,
      clearInfo
    }
  }
})
</script>
<style lang="scss" scoped>
.grow {
  margin: 15px;
  &__message-error {
    font-size: 1.2rem;
    margin: 10px 0;
    color: var(--color-error);
  }
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
