import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import { useUserStore } from '@/store/StoreUser'

function isAuthenticated() {
  const authStore = useUserStore()
  const token = authStore.token || localStorage.getItem('token')

  if (!authStore.token && localStorage.getItem('token')) {
    authStore.setToken(localStorage.getItem('token') ?? '')
  }
  return !!token
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AuthLayout,
      meta: { isLogin: true },
      children: [
        {
          path: '',
          name: 'login',
          component: Login
        }
      ]
    },
    {
      path: '/dashboard',
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/')
  } else if (to.meta.isLogin && isAuthenticated()) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
