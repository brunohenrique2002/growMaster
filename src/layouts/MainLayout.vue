<template>
    <div class="teste">
        <DashBoard />
        <div class="teste2">
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
.teste2 {
    min-height: 87vh;
}
</style>
