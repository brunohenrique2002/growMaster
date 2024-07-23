<template>
  <div class="org-navBar">
    <MolBottomModal></MolBottomModal>
    <div class="org-navBar__container">
      <ul class="org-navBar__list-container">
        <li
          v-for="(item, navIndex) in navItens"
          :key="navIndex"
          class="org-navBar__itens"
          @click="handleAction(item)"
        >
          <AtIcons class="org-navBar__icon" :icon="item.icon" />
          <p>{{ item.text }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import AtIcons from '@/components/atoms/AtIcons.vue'
import MolBottomModal from '@/components/molecules/MolBottomModal.vue'
import { useStoreModals } from '@/store/StoreModals'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'NavBar',
  components: { AtIcons, MolBottomModal },
  setup() {
    const showModal = useStoreModals()
    const router = useRouter()
    const navItens = [
      {
        icon: ['fas', 'house'],
        text: 'Home',
        action: () => {
          router.push('/dashboard')
        }
      },
      {
        icon: ['fas', 'magnifying-glass'],
        text: 'Search'
      },
      {
        icon: ['far', 'square-plus'],
        text: 'New',
        action: () => {
          showModal.toggleModal()
        }
      },
      {
        icon: ['fas', 'seedling'],
        text: 'Grows',
        action: () => {
          router.push('/dashboard/grows')
        }
      }
    ]

    const handleAction = (item: any) => {
      if (item.action) {
        item.action()
      }
    }

    return {
      navItens,
      handleAction,
      showModal
    }
  }
})
</script>
<style scoped lang="scss">
.org-navBar {
  background-color: white;
  padding: 1em 0em;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  width: 100%;

  &__list-container {
    display: flex;
    justify-content: space-between;
    padding: 0;
    color: var(--color-primary);
  }

  &__itens {
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__icon {
    font-size: 2em;
    margin-bottom: 0.5em;
  }

  p {
    font-size: 1.2em;
  }

  &__container {
    width: 90%;
  }

  @media (min-width: 600px) {
    display: flex;
    justify-content: center;
    padding: 0;

    &__container {
      width: 90%;
    }
  }
}
</style>
