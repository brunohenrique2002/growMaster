<template>
   <div class="menu">
      <AtIcons @click="showSide" :icon="['fas', 'bars']" size="2x" />
      <div class="menu__sidebar" :class="{ active: menuStore.isActive }">
         <div class="menu__sidebar-header">
            <h1>Side Grow</h1>
            <AtIcons @click="showSide" :icon="['fas', 'angles-left']" size="2x" />
         </div>
         <div class="menu__sidebar-content">
            <ul class="menu__sidebar-list">
               <li class="menu__sidebar-items" v-for="(item, index) in sideList" :key="index">
                  <AtIcons :icon="item.icon" />
                  <p class="menu__sidebar-text" @click="handleAction(item)">{{ item.text }}</p>
               </li>
            </ul>
         </div>
      </div>
   </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router';
import { useMenuStore } from '@/store/Menu'
import AtIcons from '@/components/atoms/AtIcons.vue'
export default defineComponent({
   components: { AtIcons },
   setup() {
      const router = useRouter();
      const menuStore = useMenuStore();

      const sideList = ref([
         {
            icon: ['fas', 'house'],
            text: 'Home',

         },
         {
            icon: ['fas', 'arrow-right-from-bracket'],
            text: 'Logout',
            action: () => {
               router.push('/');
            }
         },
      ])

      const showSide = () => {
         menuStore.showSide();
      }
      const handleAction = (item: any) => {
         if (item.action) {
            item.action();
         }
      };

      watch(
         () => menuStore.isActive,

         (newValue) => {
            const body = document.querySelector('body');
            if (body) {
               body.style.overflow = 'hidden';
            }
         }
      );

      return { menuStore, showSide, sideList, handleAction }
   }
})
</script>
<style scoped lang="scss">
.menu {
   &__sidebar {
      width: 100%;
      height: 100vh;
      background-color: var(--color-darkgreen);
      position: absolute;
      left: -100%;
      top: 67px;
      transition: left 0.3s ease;
      padding: 0 4rem;

      &.active {
         transition: left 0.3s ease;
         left: 0;
         padding: 0 4rem;
      }
   }

   &__sidebar-content {
      margin-top: 5rem
   }

   &__sidebar-header {
      display: flex;
      justify-content: space-between;
      margin-top: 2rem;
      color: var(--color-secundary)
   }

   &__sidebar-items {
      display: flex;
      margin-bottom: 2rem;
      padding: 1.5rem 0;
      font-weight: bold;

   }

   &__sidebar-list {
      list-style: none;
      color: var(--color-secundary);
      font-size: 1.6rem;
      padding: 0;
   }

   &__sidebar-text {
      margin-left: 3rem;
   }
}
</style>