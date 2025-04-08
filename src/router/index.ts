import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from './routes/route_modules/auth'
import appRoutes from './routes/route_modules/app'
import { ROUTES } from './routes/routes'
// import  * as ROUTES={} from "./routes/routes";
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [...appRoutes, ...authRoutes],
})

router.beforeEach((to, _from, next) => {
  let validRoute = false
  const isUserLoggedIn = !!localStorage.getItem('ACCESS_TOKEN')
  // const adminRole = localStorage.getItem(SAVED_ADMIN_ROLE);

  for (const key in ROUTES) {
    if (ROUTES[key as keyof typeof ROUTES].name === to.name) validRoute = true
  }

  const { requiresAuth } = to.meta as any
  if (!validRoute) {
    next({ name: ROUTES.login.name })
  } else if (requiresAuth && !isUserLoggedIn) {
    next(`${ROUTES.login.path}?next=${to.path}`)
  } else if (!requiresAuth && isUserLoggedIn) {
    if (to.name == ROUTES.home.name) {
      next()
    } else {
      next({ name: ROUTES.home.name })
    }
  } else {
    next()
  }
})

export default router
