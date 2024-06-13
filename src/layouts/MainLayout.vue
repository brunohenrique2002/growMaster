<template>
    <div class="mainLayout">
        <DashBoard />
        <div class="mainLayout__home">
            <main>
                <RouterView />
            </main>
        </div>
        <NavBar />
    </div>
</template>
<script lang="ts">
import NavBar from '@/components/organisms/NavBar.vue'
import DashBoard from '@/components/organisms/DashBoard.vue'
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
export default defineComponent({
    name: 'MainLayout',
    components: { NavBar, DashBoard }

});
</script>

<style scoped lang="scss">
.mainLayout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    &__home {
        flex: 1;
    }
}
</style>
