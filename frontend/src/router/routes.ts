//@ts-nocheck
const routes = [
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
    component: () => import('../views/admin/dashboard/DashboardPage.vue')
  },
  {
    path: '/create-post',
    name: 'create-post',
    component: () => import('@/views/admin/posts/create/CreatePostPage.vue')
  },
  {
    path: '/list-post',
    name: 'list-post',
    component: () => import('../views/admin/posts/list/ListPostPage.vue')
  }
]

export default routes
