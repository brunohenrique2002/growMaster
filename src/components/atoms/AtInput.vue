<template>
  <div class="grow-input">
    <label class="grow-input__label" :for="name">{{ text }}</label>
    <input
      class="grow-input__input"
      :type="currentType"
      :placeholder="placeholder"
      :id="name"
      :name="name"
      :value="modelValue"
      @input="onInput"
      @blur="handleBlur"
    />
    <div class="grow-input__icon-visibility">
      <div class="" @click="togglePasswordVisibility">
        <AtIcons
          :icon="['fas', isPasswordVisible ? 'eye-slash' : 'eye']"
          v-if="type === 'password'"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import AtIcons from '@/components/atoms/AtIcons.vue'
type InputType = 'text' | 'number' | 'email' | 'password' | 'file'
export default defineComponent({
  name: 'AtInput',
  components: { AtIcons },
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
  emits: ['update:modelValue', 'blur'],
  setup(props, { emit }) {
    const isPasswordVisible = ref(false)

    const currentType = computed(() =>
      props.type === 'password' && isPasswordVisible.value ? 'text' : props.type
    )

    const togglePasswordVisibility = () => {
      isPasswordVisible.value = !isPasswordVisible.value
    }
    const onInput = (event: Event) => {
      const target = event.target as HTMLInputElement
      if (target) {
        emit('update:modelValue', target.value)
      }
    }
    const handleBlur = () => {
      emit('blur')
    }
    return {
      onInput,
      handleBlur,
      togglePasswordVisibility,
      // iconEye,
      isPasswordVisible,
      currentType
    }
  }
})
</script>
<style scoped lang="scss">
.grow-input {
  &__icon-visibility {
    position: absolute;
    right: 10px;
    bottom: 9px;
    color: var(--color-primary);
    font-size: 1.3rem;
  }
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  position: relative;

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
