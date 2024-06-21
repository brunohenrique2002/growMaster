<template>
    <div class="grow-input">
        <label class="grow-input__label" :for="name">{{ text }}</label>
        <input class="grow-input__input" :type="type" :placeholder="placeholder" :id="name" :name="name"
            :value="value" />
    </div>
</template>
<script setup lang="ts">
type InputType = "text" | "number" | "email" | "password"

const props = defineProps<{
    text: string,
    type: InputType,
    name: string,
    placeholder: string,
    id: string,
    value: string

}>()

</script>
<style scoped lang="scss">
.grow-input {
    display: flex;
    flex-direction: column;
    margin-top: 2em;

    &__label {
        margin-bottom: 0.6em;
        font-weight: bold;
        color: var(--color-primary);
    }

    &__input {
        padding: 0.9em;
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