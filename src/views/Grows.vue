<template>
  <div class="grow">
    <h1 class="grow__title">Grows</h1>
    <AtCard :total="totalGrow" totalInfo="Total de grows" class="home__card" />
    <div class="grow__container">
      <AtLoader :isLoaderActive="isActiveLoader" />
      <MolModal
        v-if="activeModal.showModalListGrow"
        @closeModal="handleShowModal"
        @send="sendFormGrow"
        :text="isEdit ? 'Editar grow' : 'Adicionar grow'"
        :isEdit="isEdit"
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
        <MolTable
          :titles="tableHeaders"
          :items="tableRows"
          @deleteItem="deleteGrow"
          @editItem="toEdit"
        />
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
import { Grow, GrowEdit } from '@/types/Grows'
export default defineComponent({
  name: 'grows',
  components: { MolTable, AtButton, MolModal, AtInput, AtLoader, AtCard },
  setup() {
    const name = ref('')
    const description = ref('')
    const messageError = ref('')
    const isEdit = ref(false)
    const growId = ref<number | null>(null)
    const growStore = useGrowsStore()
    const activeModal = useStoreModals()
    const tableHeaders = ['Nome grow', 'Descrição', 'Ações']

    const showModal = () => {
      activeModal.showModalGrow()
    }
    const handleShowModal = (value: boolean) => {
      activeModal.showModalListGrow = value
      if (!value) {
        isEdit.value = false
        clearInfo()
      }
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
    const sendFormGrow = () => {
      if (isEdit.value) {
        editGrow()
      } else {
        createGrow()
      }
    }
    const toEdit = (id: number) => {
      const grow = growStore.grows.find((grow) => grow.id === id)
      if (grow) {
        name.value = grow.name
        description.value = grow.description
        growId.value = grow.id

        isEdit.value = true
        handleShowModal(true)
      }
    }
    const editGrow = async () => {
      if (validationForm() && growId.value !== null) {
        try {
          const data: GrowEdit = {
            id_update: growId.value,
            name: name.value,
            description: description.value
          }
          await growStore.editGrow(data)
          clearInfo()
          handleShowModal(false)
        } catch (error) {
          console.error(error)
        }
      }
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
      growStore.grows.map((item: Grow) => ({
        'Nome grow': item.name || 'Vazio',
        Descrição: item.description || 'Vazio',
        id: item.id
      }))
    )
    const totalGrow = computed(() => growStore.grows.length)

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
      messageError,
      isActiveLoader,
      createGrow,
      deleteGrow,
      toEdit,
      sendFormGrow,
      isEdit,
      editGrow,
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
