<template>
    <div class="Lbutton">
        <button class="Lbutton__btn">{{ text }}</button>
    </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    text: string,
}>()

</script>

<style scoped lang="scss">
.Lbutton {
    @media (max-width: 600px) {
        width: 100%;
        margin-top: 1em;

        &__btn {
            background-color: var(--color-primary);
            color: var(--color-white);
            text-decoration: none;
            padding: 0.9em 1.2em;
            border: none;
            border-radius: 7px;
            width: 100%;
            cursor: pointer;
            font-weight: bold;

        }
    }
}
</style>
