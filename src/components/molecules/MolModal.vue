<template>
  <div
    class="background"
    @click="closeModal"
    :class="{ active: useActiveBackground.isActiveBackground }"
  ></div>
  <div class="modal">
    <div class="modal__header">
      <h1 class="modal__title">{{ text }}</h1>
      <AtIcons class="modal__close" :icon="['fas', 'xmark']" @click="closeModal" />
    </div>
    <div class="modal__content">
      <slot></slot>
    </div>
    <div class="modal__footer">
      <AtButton class="modal__icons" text="Cancelar" @click="closeModal" />
      <AtButton class="modal__icons" :text="isEdit ? 'Editar' : 'Adicionar'" @click="sendForm" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import AtIcons from '@/components/atoms/AtIcons.vue'
import AtButton from '../atoms/AtButton.vue'
import { useStoreModals } from '@/store/StoreModals'

export default defineComponent({
  name: 'MolModal',
  components: {
    AtIcons,
    AtButton
  },
  emits: ['closeModal', 'send'],
  props: {
    text: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const useActiveBackground = useStoreModals()

    const sendForm = () => {
      emit('send')
    }
    const closeModal = () => {
      emit('closeModal')
    }
    return { closeModal, sendForm, useActiveBackground }
  }
})
</script>
<style scoped lang="scss">
.modal {
  position: fixed;
  top: 13%;
  width: 93%;
  background-color: #f5f5f5;
  padding: 2rem 1.5rem;
  border-radius: 5px;
  z-index: 2;

  &__close {
    font-size: 2.4rem;
  }

  &__icons {
    width: 127px;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--color-primary);
  }
}

.background {
  background-color: #818181c7;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 2;
}
</style>
