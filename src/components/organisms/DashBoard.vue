<template>
    <div class="dashboard">
        <div class="dashboard__header">
            <font-awesome-icon class="dashboard__bars" :icon="['fas', 'bars']" size="2x" />
            <img class="dashboard__logo" src="@/assets/img/grow-master-logo-transparent.png" alt="Logo Grow">
            <div class="dashboard__gearIcon">
                <font-awesome-icon class="dashboard__gear" :icon="['fas', 'gear']" />
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'NavBar',
    setup() {
        return {};
    },
});
</script>
<style scoped lang="scss">
.dashboard {
    @media (max-width: 600px) {
        background-color: var(--color-primary);

        &__header {
            display: flex;
            align-items: center;
            margin: 0 1em;
            padding: 1em 0;
        }

        &__logo {
            width: 200px;
            margin-left: 1em;
            border-radius: 6px;
        }

        &__gearIcon {
            width: 100%;
            display: flex;
            justify-content: flex-end;
        }

        &__gear {
            font-size: 1.2em;
            color: var(--color-white);
        }

        &__bars {
            color: var(--color-white);
        }
    }
}
</style>