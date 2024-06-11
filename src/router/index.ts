import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'login',
          component: Login,
        },
      ],
    },
    {
      path: '/dashboard',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
        },
      ],
    },
  ]
})

export default router
