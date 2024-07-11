<template>
  <div class="AtButton">
    <button class="AtButton__btn" :disabled="disabled">{{ text }}</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AtButton',
  props: {
    text: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="scss">
.AtButton {
  width: 100%;
  margin-top: 1em;

  &__btn {
    background-color: var(--color-primary);
    color: var(--color-white);
    text-decoration: none;
    padding: 9px 12px;
    border: none;
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
    font-weight: bold;
  }
  &__btn:disabled {
    opacity: 0.3;
  }

  @media (min-width: 600px) {
    &__btn:hover {
      transition: 0.6s;
      background-color: #3fa993;
    }
  }
}
</style>
