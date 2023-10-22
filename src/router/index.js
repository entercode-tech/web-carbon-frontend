import { createRouter, createWebHashHistory } from 'vue-router'
import Style from '@/views/StyleView.vue'
import Home from '@/views/HomeView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/HomepageView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/tables',
    name: 'tables',
    component: () => import('@/views/TablesView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/forms',
    name: 'forms',
    component: () => import('@/views/FormsView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/ui',
    name: 'ui',
    component: () => import('@/views/UiView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/responsive',
    name: 'responsive',
    component: () => import('@/views/ResponsiveView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('@/views/ErrorView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/carbon',
    name: 'carbon',
    component: () => import('@/views/carbon/Carbon.vue'),
    meta: { requiresAuth: false },
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token');
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
