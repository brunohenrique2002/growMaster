<template>
  <div class="Atselect">
    <div class="Atselect__container">
      <label class="Atselect__label" for="select">{{ title }} </label>
      <Multiselect
        id="select"
        :options="options"
        class="Atselect__multi"
        :placeholder="placeholder"
        v-model="selectedOption"
        @update:modelValue="emitModelValue"
      />
    </div>
  </div>
</template>
<script lang="ts">
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  name: 'AtSelect',
  components: { Multiselect },
  props: {
    title: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    options: {
      type: Array
    },
    modelValue: {
      type: [String, Number, Object, Array],
      default: null
    }
  },
  setup(props, { emit }) {
    const selectedOption = ref(props.modelValue)
    watch(
      () => props.modelValue,
      (newValue) => {
        selectedOption.value = newValue
        console.log(selectedOption.value)
      }
    )
    const emitModelValue = (value: any) => {
      emit('update:modelValue', value)
    }
    return { selectedOption, emitModelValue }
  }
})
</script>
<style lang="scss" scoped>
.Atselect {
  width: 100%;
  margin-top: 20px;
  &__label {
    margin-bottom: 6px;
    font-weight: bold;
    color: var(--color-primary);
    font-size: 1.4rem;
  }
  &__multi {
    padding: 4px;
    border: none;
    margin-top: 6px;
    border-bottom: 2px solid var(--color-lightgreen);
  }
}

.multiselect {
  &.is-active {
    border: none;
    box-shadow: none;
  }
}
</style>
