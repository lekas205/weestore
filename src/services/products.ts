import http from '../https'
import type { APIResponse } from '../types'
import * as ENDPOINTS from '../https/endpoints'

async function fetchProduct() {
  return await http.get<APIResponse>(ENDPOINTS.PRODUCTS)
}

export default {
  fetchProduct,
}
