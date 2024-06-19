<template>
    <div class="Lbutton">
        <button class="Lbutton__btn">{{ text }}</button>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'LTable',
    props: {
        text: {
            type: String,
            default: ''
        },
    }
});

// const props = defineProps<{
//     text: string,
// }>()

</script>

<style scoped lang="scss">
.Lbutton {
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
    @media (min-width: 600px) {
        &__btn:hover{
            transition: .6s;
            background-color: #3fa993;
        }
    }
}
</style>
