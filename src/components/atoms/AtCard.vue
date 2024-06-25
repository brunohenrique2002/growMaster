<template>
    <div class="card">
        <p class="card__total-plants">Total de plantas</p>
        <h2 class="card__total">{{ total }}</h2>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'AtCard',
    props: {
        total: {
            type: Number,
            default: 0
        }
    },
    setup() {
        return {}
    }
})
</script>
<style scoped lang="scss">
.card {
    border: 1px solid var(--color-primary);
    border-radius: 3px;
    width: 200px;
    color: var(--color-white);
    background-color: var(--color-primary);
    padding: 1.6rem;
    margin-bottom: 1rem;

    &__total {
        font-size: 3.6rem;
    }

    &__total-plants {
        font-size: 1.4rem;
        font-weight: bold;
        margin-bottom: .5rem;
    }
}
</style>