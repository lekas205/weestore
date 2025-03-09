import { ROUTES } from '../routes'
export default [
  {
    path: ROUTES.login.path,
    name: ROUTES.login.name,
    component: () => import(/* webpackChunkName: "about" */ '@/views/auth/login.vue'),
    meta: {
      title: ROUTES.login.title,
      layout: 'public',
    },
  },
  {
    path: ROUTES.account_verification.path,
    name: ROUTES.account_verification.name,
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/auth/account-verification.vue'),
    meta: {
      title: ROUTES.account_verification.title,
      layout: 'public',
    },
  },
  {
    path: ROUTES.account_verification.path,
    name: ROUTES.account_verification.name,
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/auth/account-verification.vue'),
    meta: {
      title: ROUTES.account_verification.title,
      layout: 'public',
    },
  },
  {
    path: ROUTES.change_number.path,
    name: ROUTES.change_number.name,
    component: () => import(/* webpackChunkName: "about" */ '@/views/auth/change-number.vue'),
    meta: {
      title: ROUTES.change_number.title,
      layout: 'public',
    },
  },
  {
    path: ROUTES.reset_pin.path,
    name: ROUTES.reset_pin.name,
    component: () => import(/* webpackChunkName: "about" */ '@/views/auth/reset-pin.vue'),
    meta: {
      title: ROUTES.reset_pin.title,
      layout: 'public',
    },
  },
  {
    path: ROUTES.new_pin.path,
    name: ROUTES.new_pin.name,
    component: () => import(/* webpackChunkName: "about" */ '@/views/auth/new-pin.vue'),
    meta: {
      title: ROUTES.new_pin.title,
      layout: 'public',
    },
  },

  {
    path: ROUTES.returning_user.path,
    name: ROUTES.returning_user.name,
    component: () => import(/* webpackChunkName: "about" */ '@/views/auth/returning-user.vue'),
    meta: {
      title: ROUTES.returning_user.title,
      layout: 'public',
    },
  },
]
