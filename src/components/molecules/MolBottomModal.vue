<template>
  <!-- <AtWarnings v-show="activeModals.activeWarning" @warning="triggerWarnings" type="error" /> -->
  <MolModal
    text="Adicionar planta"
    v-if="activeModals.showModalListPlant"
    @closeModal="handleShowModal"
    @send="createPlants"
  >
    <AtInput
      type="text"
      text="Nome da planta"
      placeholder="Planta Biquinho..."
      id="namePlant"
      name="namePlant"
      v-model="namePlant"
    />

    <AtSelect
      title="Selecione o status"
      :options="optionsStatus"
      placeholder="VEG..."
      v-model="selectedStatus"
    />
    <AtSelect
      title="Selecione o grow"
      :options="optionsId"
      placeholder="Grow 1..."
      v-model="selectedGrow"
    />
    <AtInput
      type="text"
      text="Data de criação"
      placeholder="12/05/2024"
      id="date"
      name="date"
      v-model="date"
      v-mask="'##/##/####'"
    />
    <div class="message-error">
      <p>{{ messageError }}</p>
    </div>
  </MolModal>
  <div
    class="background"
    @click="toggleModal"
    :class="{ active: activeModals.isActiveSideBottom }"
  ></div>
  <div class="modal-bottom" :class="{ active: activeModals.isActiveSideBottom }">
    <div class="modal-bottom__container">
      <div class="modal-bottom__header">
        <h1 class="modal-bottom__title">O que você quer adicionar?</h1>
        <AtIcons class="modal-bottom__close" :icon="['fas', 'xmark']" @click="toggleModal" />
      </div>
      <div class="modal-bottom__content">
        <div
          class="modal-bottom__items"
          v-for="(icon, index) in icons"
          :key="index"
          @click="handleAction(icon)"
        >
          <AtIcons class="modal-bottom__icon" :icon="icon.icon" />
          <p class="modal-bottom__text-add">{{ icon.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed, onMounted } from 'vue'
import AtIcons from '@/components/atoms/AtIcons.vue'
import AtSelect from '@/components/atoms/AtSelect.vue'
import { useStoreModals } from '@/store/StoreModals'
import { usePlantsStore } from '@/store/StorePlants'
import { useGrowsStore } from '@/store/StoreGrows'
import { Grow } from '@/types/Grows'
import MolModal from '@/components/molecules/MolModal.vue'
import AtInput from '@/components/atoms/AtInput.vue'
// import AtWarnings from '@/components/atoms/AtWarnings.vue'
export default defineComponent({
  name: 'MolmodalStore',
  components: {
    AtIcons,
    MolModal,
    AtInput,
    AtSelect
    // AtWarnings
  },

  setup() {
    const activeModals = useStoreModals()
    const plantStore = usePlantsStore()
    const growsStore = useGrowsStore()
    const messageError = ref('')
    const namePlant = ref('')
    const status = ref('')
    const grow = ref('')
    const date = ref('')
    const selectedGrow = ref<string | number | undefined>(undefined)
    const selectedStatus = ref('')
    const icons = ref([
      {
        icon: ['fas', 'cannabis'],
        text: 'Planta',
        action: () => {
          openModal()
        }
      },
      {
        icon: ['fas', 'campground'],
        text: 'Grow'
      },
      {
        icon: ['fas', 'droplet'],
        text: 'Rega rápida'
      }
    ])
    const optionsStatus = ['VEG', 'BLOOM']

    const optionsId = computed(() =>
      growsStore.grows.map((item: Grow) => ({
        value: item.name,
        label: `${item.name} - ( ${item.description} ) `,
        id: item.id
      }))
    )
    const validateDate = (dateStr: string): boolean => {
      const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/
      const match = dateStr.match(datePattern)

      if (!match) {
        messageError.value = 'Data inválida. Use o formato dd/mm/aaaa.'
        return false
      }
      const [, day, month, year] = match.map(Number)

      const date = new Date(year, month - 1, day)
      if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
        messageError.value = 'Data inválida.'
        return false
      }

      const limitDate = new Date(2024, 11, 31)

      if (date > limitDate) {
        messageError.value = 'A data não pode ser posterior a 31/12/2024.'
        return false
      }

      return true
    }
    const validationForm = () => {
      messageError.value = ''
      if (!namePlant.value.trim()) {
        messageError.value = 'Por favor, informe o NOME da planta'
      } else if (!selectedStatus.value) {
        messageError.value = 'Por favor, informe o STATUS da planta'
      } else if (selectedGrow.value === null || !selectedGrow.value) {
        messageError.value = 'Por favor, verifique se tem grow cadastrado ou selecionado'
      } else if (!validateDate(date.value.trim())) {
        return
      } else {
        return true
      }
      return false
    }
    const clearForm = () => {
      namePlant.value = ''
      status.value = ''
      date.value = ''
      selectedGrow.value = ''
      selectedStatus.value = ''
    }

    const createPlants = () => {
      if (validationForm()) {
        try {
          const data = {
            name: namePlant.value,
            status: selectedStatus.value,
            created: date.value,
            grow: selectedGrow.value
          }
          plantStore.createPlant(data)
          clearForm()
        } catch (error) {
          console.error(error)
        }
      }
    }
    const triggerWarnings = () => {
      activeModals.showModalPlant()
      // activeModals.activeWarning = true
    }
    const openModal = () => {
      activeModals.showModalPlant()

      // if (activeModals.showModalListPlant) {
      //   activeModals.toggleModal()
      // }
    }
    const handleShowModal = (value: boolean) => {
      activeModals.showModalListPlant = value
    }
    const toggleModal = () => {
      activeModals.toggleModal()
    }
    const handleAction = (icon: any) => {
      if (icon.action) {
        icon.action()
      }
    }

    watch(
      () => [activeModals.isActiveSideBottom, activeModals.showModalListPlant],

      ([newValue, otherValue]) => {
        const body = document.querySelector('body')
        if (body) {
          body.style.overflow = newValue || otherValue ? 'hidden' : ''
        }
      }
    )
    onMounted(() => {
      growsStore.fetchListGrows()
    })

    return {
      icons,
      toggleModal,
      createPlants,
      activeModals,
      handleAction,
      messageError,
      namePlant,
      status,
      grow,
      date,
      openModal,
      handleShowModal,
      triggerWarnings,
      plantStore,
      growsStore,
      optionsId,
      optionsStatus,
      selectedGrow,
      selectedStatus
    }
  }
})
</script>
<style scoped lang="scss">
.background {
  &.active {
    background-color: #818181c7;
    width: 100%;
    height: 85%;
    position: fixed;
    top: 0;
  }
}
.message-error {
  font-size: 1.2rem;
  margin: 10px 0;
  color: var(--color-error);
}

.modal-bottom {
  position: fixed;
  background-color: white;
  width: 100%;
  min-height: 160px;
  bottom: -30%;
  transition: bottom 0.2s ease;
  padding: 2rem;
  color: var(--color-primary);
  box-shadow: 0px -7px 9px -9px rgba(0, 0, 0, 0.75);
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid var(--color-primary);
  &.active {
    transition: bottom 0.2s ease;
    bottom: 86px;
    z-index: 1;
  }

  &__text-add {
    font-size: 1.2rem;
  }

  &__icon {
    font-size: 2rem;
    margin-bottom: 0.7rem;
    color: var(--color-primary);
  }

  &__container {
    display: flex;
    flex-direction: column;
  }

  &__content {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 3rem;
  }

  &__items {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    font-size: 1.8rem;
  }

  &__close {
    font-size: 2.4rem;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
