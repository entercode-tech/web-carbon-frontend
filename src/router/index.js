import { createRouter, createWebHashHistory } from 'vue-router'
// import { createRouter, createWebHistory } from 'vue-router';
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
    path: '/home',
    name: 'home',
    component: () => import('@/views/LandingPageView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/admin/dashboard/Dashboard.vue'),
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
    path: '/',
    name: 'carbon',
    component: () => import('@/views/HomepageView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/carbon-calc',
    name: 'carbon-calc',
    component: () => import('@/views/carbon/Carbon.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/form-user',
    name: 'form-user',
    component: () => import('@/views/formUser/FormUser.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/postcard',
    name: 'postcard',
    component: () => import('@/views/postcard/PostCard.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/share-postcard/:code',
    name: 'sharePostcard',
    component: () => import('@/views/postcard/SharePostcard.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/all-postcard',
    name: 'allPostcard',
    component: () => import('@/views/postcard/CarouselPostCard.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/admin/list-user',
    name: 'listUser',
    component: () => import('@/views/admin/listUser/ListUser.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/donation',
    name: 'donation',
    component: () => import('@/views/donation/Donation.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/admin/included-file',
    name: 'includedFile',
    component: () => import('@/views/admin/includedFile/IncludedFile.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/template-postcard',
    name: 'templatePostcard',
    component: () => import('@/views/admin/templatePostcard/TemplatePostcard.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/list-donation',
    name: 'listDonation',
    component: () => import('@/views/admin/listDonation/ListDonation.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/list-transaction',
    name: 'listTransaction',
    component: () => import('@/views/admin/listTransaction/ListTransaction.vue'),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
//   scrollBehavior(to, from, savedPosition) {
//     return savedPosition || { top: 0 };
//   },
// });


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
