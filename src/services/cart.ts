import http from '../https'
import type { APIResponse } from '../types'
import type { cartDTO } from '../types/dto'
import * as ENDPOINTS from '../https/endpoints'

async function addToCart(payload: cartDTO) {
  return await http.post<APIResponse>(ENDPOINTS.CART, payload)
}
async function fetchCartItems() {
  return await http.get<APIResponse>(ENDPOINTS.CART)
}
async function deleteICartItem(itemId: string) {
  return await http.delete<APIResponse>(ENDPOINTS.CART + `/${itemId}`)
}
async function createOrder(payload: any) {
  return await http.post<APIResponse>(ENDPOINTS.ORDER, payload)
}

export default {
  addToCart,
  createOrder,
  fetchCartItems,
  deleteICartItem,
}
