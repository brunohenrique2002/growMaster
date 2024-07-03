<template>
  <AtWarnings v-show="activeModals.activeWarning" @warning="triggerWarnings" type="error" />
  <MolModal
    text="Adicionar planta"
    v-if="activeModals.showModal"
    @showModal="handleShowModal"
    @warning="triggerWarnings"
  >
    <AtInput
      type="text"
      text="Nome da planta"
      placeholder="Planta Biquinho..."
      id="name"
      name="name"
      :value="name"
    />
    <AtInput
      type="text"
      text="Espécie"
      placeholder="Purple..."
      id="especie"
      name="especie"
      :value="especie"
    />
    <AtInput
      type="date"
      text="Data de criação"
      placeholder="12/05/2024"
      id="date"
      name="date"
      :value="date"
    />
    <AtInput
      type="file"
      text="Data de criação"
      placeholder="12/05/2024"
      id="date"
      name="date"
      :value="date"
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
import MolModal from '@/components/molecules/MolModal.vue'
import AtInput from '@/components/atoms/AtInput.vue'
import AtWarnings from '@/components/atoms/AtWarnings.vue'
export default defineComponent({
  name: 'MolmodalStore',
  components: {
    AtIcons,
    MolModal,
    AtInput,
    AtWarnings
  },

  setup(props, { emit }) {
    const activeModals = useStoreModals()
    const name = ref('')
    const especie = ref('')
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
    const triggerWarnings = () => {
      activeModals.showModal = false
      activeModals.activeWarning = true
    }
    const openModal = () => {
      activeModals.showModal = true

      if (activeModals.showModal) {
        activeModals.isActiveSideBottom = false
      }
    }
    const handleShowModal = (value: boolean) => {
      activeModals.showModal = value
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
      () => [activeModals.isActiveSideBottom, activeModals.showModal],

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
      activeModals,
      handleAction,
      name,
      especie,
      date,
      openModal,
      handleShowModal,
      triggerWarnings
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
