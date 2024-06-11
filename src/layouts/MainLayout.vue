<template>
    <div>
        <DashBoard />
        <main>
            <RouterView />
        </main>
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

<style scoped lang="scss"></style>
