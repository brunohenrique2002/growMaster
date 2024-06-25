<template>
  <div class="mainLayout">
    <OrgHeader />
    <div class="mainLayout__home">
      <main class="mainLayout__content">
        <RouterView />
      </main>
    </div>
    <OrgNavBar />
  </div>
</template>
<script lang="ts">
import OrgNavBar from '@/components/organisms/OrgNavBar.vue'
import OrgHeader from '@/components/organisms/OrgHeader.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MainLayout',
  components: { OrgNavBar, OrgHeader }
})
</script>

<style scoped lang="scss">
.mainLayout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__home {
    display: flex;
    justify-content: center;
    flex: 1;
  }

  &__content {
    width: 100%;
  }

  @media (min-width: 600px) {
    &__content {
      width: 90%;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
