import { createRouter, createWebHistory } from 'vue-router'
import GrowLogin from '@/components/GrowLogin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GrowLogin
    },
  ]
})

export default router

