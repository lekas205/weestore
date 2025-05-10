//services/index.ts
import authController from './auth.ts'
import userController from './user.ts'
import cartController from './cart.ts'
import productsController from './products.ts'
import transactionsController from './transactions.ts'

export const API = {
  cart: cartController,
  auth: authController,
  user: userController,
  products: productsController,
  transactions: transactionsController,
}
