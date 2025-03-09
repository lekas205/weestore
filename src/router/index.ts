import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from './routes/route_modules/auth'
import appRoutes from './routes/route_modules/app'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...appRoutes, ...authRoutes],
})

export default router
