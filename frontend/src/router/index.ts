//@ts-nocheck
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('../views/auth/AuthPage.vue'),
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('../views/auth/LoginPage.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('../views/auth/RegisterPage.vue')
        }
      ]
    },
    // path: '/admin',
    // name: 'admin',
    // component: () => import('../views/admin/AdminPage.vue'),
    // children: [
    // ]
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/admin/DashboardPage.vue')
    },
    {
      path: '/create-post',
      name: 'create-post',
      component: () => import('../views/admin/CreatePostPage.vue')
    },
    {
      path: '/list-post',
      name: 'list-post',
      component: () => import('../views/admin/ListPostPage.vue')
    }
  ]
})

export default router
