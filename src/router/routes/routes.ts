import type { RouteLayout } from './interface'
export const ROUTES: RouteLayout = {
  login: {
    path: '/login',
    name: 'Login',
    title: 'Login',
  },
  account_verification: {
    path: '/verify-account',
    name: 'Account Verification',
    title: 'Account Verification',
  },
  change_number: {
    path: '/change-number',
    name: 'Change Number',
    title: 'Change Number',
  },
  reset_pin: {
    path: '/reset-pin',
    name: 'Reset Pin',
    title: 'Reset Pin',
  },
  change_pin: {
    path: '/change-pin',
    name: 'Change Pin',
    title: 'Change Pin',
  },
  new_pin: {
    path: '/new-pin',
    name: 'New Pin',
    title: 'New Pin',
  },
  returning_user: {
    path: '/returning-user',
    name: 'Returning User',
    title: 'Returning User',
  },
  home: {
    path: '/home',
    name: 'Home',
    title: 'Home',
  },
  wallet: {
    path: '/wallet',
    name: 'Wallet',
    title: 'Wallet',
  },
  products: {
    path: '/products',
    name: 'Products',
    title: 'Products',
  },
  profile: {
    path: '/profile',
    name: 'Profile',
    title: 'Profile',
  },
  groceries: {
    path: '/groceries',
    name: 'Groceries',
    title: 'Groceries',
  },
  payment_history: {
    path: '/payment-history',
    name: 'Payment History',
    title: 'Payment History',
  },
}
