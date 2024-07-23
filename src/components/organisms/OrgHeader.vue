<template>
  <div class="header">
    <div class="header__container">
      <div class="header__header">
        <MolMenu class="header__bars" />
        <img
          class="header__logo"
          src="@/assets/img/grow-master-logo-transparent.png"
          alt="Logo Grow"
        />
        <div class="header__gearIcon">
          <AtIcons class="header__gear" :icon="['fas', 'gear']" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import AtIcons from '@/components/atoms/AtIcons.vue'
import MolMenu from '@/components/molecules/MolMenu.vue'
export default defineComponent({
  name: 'OrgHeader',
  components: { AtIcons, MolMenu },
  setup() {
    return {}
  }
})
</script>
<style scoped lang="scss">
.header {
  background-color: var(--color-primary);
  display: flex;
  justify-content: center;
  // position: fixed;
  // width: 100%;
  // top: 0;

  &__header {
    display: flex;
    align-items: center;
    margin: 0 1em;
    padding: 1em 0;
  }

  &__logo {
    width: 200px;
    margin-left: 1em;
    border-radius: 6px;
  }

  &__gearIcon {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  &__gear {
    font-size: 1.2em;
    color: var(--color-white);
  }

  &__bars {
    color: var(--color-white);
  }

  &__container {
    width: 95%;
  }

  @media (min-width: 600px) {
    &__logo {
      margin-left: 6em;
    }

    &__gearIcon {
      font-size: 1.2em;
    }

    &__container {
      width: 90%;
    }
  }
}
</style>
