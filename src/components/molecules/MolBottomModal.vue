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
    <AtInput
      type="text"
      text="Status"
      placeholder="VEG..."
      id="status"
      name="status"
      v-model="status"
    />
    <AtInput type="text" text="Grow" placeholder="Grow 1.." id="grow" name="grow" v-model="grow" />
    <AtInput
      type="text"
      text="Data de criação"
      placeholder="12/05/2024"
      id="date"
      name="date"
      v-model="date"
      v-mask="'##/##/####'"
    />
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
import { defineComponent, ref, watch } from 'vue'
import AtIcons from '@/components/atoms/AtIcons.vue'
import { useStoreModals } from '@/store/StoreModals'
import { usePlantsStore } from '@/store/StorePlants'
import MolModal from '@/components/molecules/MolModal.vue'
import AtInput from '@/components/atoms/AtInput.vue'
// import AtWarnings from '@/components/atoms/AtWarnings.vue'
export default defineComponent({
  name: 'MolmodalStore',
  components: {
    AtIcons,
    MolModal,
    AtInput
    // AtWarnings
  },

  setup() {
    const activeModals = useStoreModals()
    const plantStore = usePlantsStore()
    const namePlant = ref('')
    const status = ref('')
    const grow = ref('')
    const date = ref('')
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
    const createPlants = () => {
      const data = {
        name: namePlant.value,
        status: status.value,
        created: date.value,
        grow: grow.value
      }
      plantStore.createPlant(data)
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

    return {
      icons,
      toggleModal,
      createPlants,
      activeModals,
      handleAction,
      namePlant,
      status,
      grow,
      date,
      openModal,
      handleShowModal,
      triggerWarnings,
      plantStore
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
