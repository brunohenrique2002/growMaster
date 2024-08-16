<template>
  <div class="history">
    <div class="history__header">
      <h3 class="history__recent">Recentes...</h3>
      <p class="history__see-all">Ver todas</p>
    </div>
    <div class="history__container">
      <div v-for="(historic, index) in historicRecent" :key="index">
        <div class="history__content">
          <h3 class="history__name">{{ historic.name }}</h3>
          <p class="history__date">12/02/2023 - 12-00 PM</p>
        </div>
        <p class="history__description">{{ historic.description }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface HistoricItem {
  name: string
  description: string
}

export default defineComponent({
  name: 'AtHistoricRecent',
  props: {
    historicRecent: {
      type: Array as PropType<HistoricItem[]>
    }
  },
  setup() {
    return {}
  }
})
</script>
<style scoped lang="scss">
.history {
  width: 100%;
  margin-bottom: 5rem;

  &__description {
    color: var(--color-grey);
    font-size: 1.2rem;
  }

  &__name {
    font-size: 1.4rem;
    color: var(--color-primary);
  }

  &__date {
    font-size: 1.2rem;
    color: var(--color-grey);
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__container {
    border: 1px solid var(--color-primary);
    border-radius: 4px;
    padding: 0 2rem;
    padding-bottom: 2rem;
  }

  &__recent {
    font-size: 1.6rem;
  }

  &__see-all {
    font-size: 1.4rem;
    color: var(--color-grey);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
