<template>
  <div class="grow">
    <h1 class="grow__title">Grows</h1>
    <div class="grow__container">
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
        <MolTable :titles="tableHeaders" :items="tableRows" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import MolTable from '@/components/molecules/MolTable.vue'
import MolModal from '@/components/molecules/MolModal.vue'
import authService from '@/services/ApiService'
import AtButton from '@/components/atoms/AtButton.vue'
import AtInput from '@/components/atoms/AtInput.vue'
import { useStoreModals } from '@/store/StoreModals'

export default defineComponent({
  name: 'grows',
  components: { MolTable, AtButton, MolModal, AtInput },
  setup() {
    const name = ref('')
    const description = ref('')
    const activeModal = useStoreModals()
    const tableHeaders = ['Nome grow', 'Descrição', 'Ações']
    const tableRows = ref([])
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
      authService.addGrow(data)
    }
    const getGrows = () => {
      authService.listGrow().then((response) => {
        const listGrow = response.data
        tableRows.value = listGrow.map((item: any) => ({
          'Nome grow': item.name || 'Vazio',
          Descrição: item.description || 'Vazio'
        }))
      })
    }
    onMounted(getGrows)
    return {
      showModal,
      handleShowModal,
      sendForm,
      tableRows,
      tableHeaders,
      activeModal,
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
