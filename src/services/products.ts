import http from '../https'
import type { APIResponse } from '../types'
import * as ENDPOINTS from '../https/endpoints'

async function fetchProduct(params: any) {
  return await http.get<APIResponse>(ENDPOINTS.PRODUCTS, { params })
}

async function fetchCategories() {
  return await http.get<APIResponse>(ENDPOINTS.CATEGORIES)
}

async function fetchCustomerOrder() {
  return await http.get<APIResponse>(ENDPOINTS.PURCHASED_PRODUCTS)
}

export default {
  fetchProduct,
  fetchCategories,
  fetchCustomerOrder,
}
