<template>
  <div class="grow-input">
    <label class="grow-input__label" :for="name">{{ text }}</label>
    <input
      class="grow-input__input"
      :type="type"
      :placeholder="placeholder"
      :id="name"
      :name="name"
      :value="modelValue"
      @input="onInput"
      @blur="handleBlur"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
type InputType = 'text' | 'number' | 'email' | 'password' | 'file'
export default defineComponent({
  name: 'AtInput',
  props: {
    text: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    modelValue: {
      type: String,
      default: ''
    },
    type: {
      type: String as () => InputType,
      default: 'text'
    }
  },
  setup(props, { emit }) {
    const onInput = (event: Event) => {
      const target = event.target as HTMLInputElement
      if (target) {
        emit('update:modelValue', target.value)
      }
    }
    const handleBlur = () => {
      emit('blur')
    }
    return { onInput, handleBlur }
  }
})
</script>
<style scoped lang="scss">
.grow-input {
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  &__label {
    margin-bottom: 6px;
    font-weight: bold;
    color: var(--color-primary);
    font-size: 1.4rem;
  }

  &__input {
    padding: 9px;
    border-radius: 0;
    border: none;
    border-bottom: 2px solid var(--color-lightgreen);
  }

  &__input:focus-visible {
    outline: none;
    box-shadow: none;
  }
}
</style>
