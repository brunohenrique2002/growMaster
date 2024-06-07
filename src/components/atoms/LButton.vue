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

        &__btn {
            background-color: #7bc897;
            color: #fff;
            text-decoration: none;
            padding: 0.7em 1.2em;
            border: none;
            border-radius: 7px;
            transition: 0.7s;
            cursor: pointer;
            width: 100%;
        }
    }
}
</style>
