<template>
    <div class="modal">
        <div class="modal__header">
            <h1>O que você quer adicionar?</h1>
            <AtIcons :icon="['fas', 'house']" />
        </div>
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import AtIcons from '@/components/atoms/AtIcons.vue'

export default defineComponent({
    name: 'MolBottomModal',
    components: {
        AtIcons
    },
    setup() {
        return {}
    }
})
</script>
<style scoped lang="scss">
.modal {
    position: fixed;
    background-color: var(--color-primary);
    width: 100%;
    min-height: 150px;
    bottom: 84px;
    padding: 1rem 2rem;

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>