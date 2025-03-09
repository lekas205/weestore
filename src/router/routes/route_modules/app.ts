import { ROUTES } from '../routes'
export default [
  {
    path: '/',
    redirect: '/home',
  },

  {
    path: ROUTES.home.path,
    name: ROUTES.home.name,
    component: () => import(/* webpackChunkName: "about" */ '@/views/home/index.vue'),
    meta: {
      title: ROUTES.home.title,
      layout: 'private',
    },
  },

  {
    path: ROUTES.products.path,
    name: ROUTES.products.name,
    component: () => import(/* webpackChunkName: "about" */ '@/views/products/index.vue'),
    meta: {
      title: ROUTES.products.title,
      layout: 'private',
    },
  },
  {
    path: ROUTES.payment_history.path,
    name: ROUTES.payment_history.name,
    component: () => import(/* webpackChunkName: "about" */ '@/views/payment-history/index.vue'),
    meta: {
      title: ROUTES.payment_history.title,
      layout: 'private',
    },
  },
  {
    path: ROUTES.wallet.path,
    name: ROUTES.wallet.name,
    component: () => import(/* webpackChunkName: "about" */ '@/views/wallet/index.vue'),
    meta: {
      title: ROUTES.wallet.title,
      layout: 'private',
    },
  },
  {
    path: ROUTES.profile.path,
    name: ROUTES.profile.name,
    component: () => import(/* webpackChunkName: "about" */ '@/views/profile/index.vue'),
    meta: {
      title: ROUTES.profile.title,
      layout: 'private',
    },
  },
  {
    path: ROUTES.groceries.path,
    name: ROUTES.groceries.name,
    component: () => import(/* webpackChunkName: "about" */ '@/views/groceries/index.vue'),
    meta: {
      title: ROUTES.groceries.title,
      layout: 'private',
    },
  },
]
