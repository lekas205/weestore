//services/index.ts
import authController from './auth.ts'
import userController from './user.ts'
import productsController from './products.ts'

export const API = {
  auth: authController,
  user: userController,
  products: productsController,
}
