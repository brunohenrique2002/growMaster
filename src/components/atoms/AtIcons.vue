<template>
  <font-awesome-icon class="icon" :icon="icon" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    icon: {
      type: Array,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>
<style scoped lang="scss">
.icon {
  cursor: pointer;
}
</style>
