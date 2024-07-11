<template>
  <div class="warning">
    <div class="warning__content">
      <div :class="warningClass">
        <AtIcons :class="warningIcon" :icon="iconType" />
      </div>
      <div class="warning__content-rigth">
        <div class="warning__close">
          <AtIcons class="warning__icon-close" :icon="['fas', 'xmark']" @click="closeWarning" />
        </div>
        <div class="warning__success">
          <h1>{{ infoType }}</h1>
          <p class="warning__text">{{ textType }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import AtIcons from '@/components/atoms/AtIcons.vue'
import { useStoreModals } from '@/store/StoreModals'

export default defineComponent({
  name: 'AtWarnings',
  components: { AtIcons },
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const activeWarning = useStoreModals()
    const closeWarning = () => {
      activeWarning.activeWarning = false
    }

    const warningClass = computed(() => {
      return {
        'warning__content-left': true,
        'warning__content-left--success': props.type === 'success',
        'warning__content-left--warning': props.type === 'warning',
        'warning__content-left--error': props.type === 'error'
      }
    })
    const warningIcon = computed(() => {
      return {
        warning__icon: true,
        'warning__icon--success': props.type === 'success',
        'warning__icon--warning': props.type === 'warning',
        'warning__icon--error': props.type === 'error'
      }
    })
    const iconType = computed(() => {
      return props.type === 'success'
        ? ['far', 'circle-check']
        : props.type === 'warning'
          ? ['fas', 'triangle-exclamation']
          : ['fas', 'circle-exclamation']
    })

    const infoType = computed(() => {
      return props.type === 'success' ? 'Sucesso' : props.type === 'warning' ? 'Alerta' : 'Erro'
    })
    const textType = computed(() => {
      return props.type === 'success'
        ? 'Sua planta foi adicionada.'
        : props.type === 'warning'
          ? 'Todos os campos devem ser preenchidos.'
          : 'Erro ao processar a solicitação.'
    })
    return { closeWarning, warningClass, iconType, warningIcon, infoType, textType }
  }
})
</script>
<style scooped lang="scss">
.warning {
  position: fixed;
  top: 160px;
  width: 346px;
  background-color: white;
  border-radius: 7px;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.75);

  &__content-left {
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 7px;
    padding: 29px;

    &--success {
      background-color: #b8f5cd;
    }
    &--warning {
      background-color: #fff0af;
    }
    &--error {
      background-color: #fa876b;
    }
  }

  &__icon-close {
    font-size: 2.4rem;
  }
  &__close {
    width: 100%;
    display: flex;
    justify-content: end;
    font-size: 2.4rem;
    padding-top: 5px;
  }
  &__success {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    h1 {
      margin-bottom: 5px;
    }
    p {
      font-size: 1.4rem;
      color: var(--color-grey);
      margin-bottom: 8px;
    }
  }
  &__content-rigth {
    width: 85%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0 15px;
  }
  &__content {
    display: flex;
  }

  &__icon {
    font-size: 3.2rem;
    color: var(--color-primary);
    &--error {
      color: #922105;
    }
    &--warning {
      color: #9c7f00;
    }
  }
}
</style>
