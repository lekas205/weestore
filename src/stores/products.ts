import { ref } from 'vue'
import { defineStore } from 'pinia'
import { API } from '../services'
import { AxiosError } from 'axios'
import type { APIResponse } from '../types'

export const useProductsStore = defineStore('products', () => {
  const products = ref<object>({})

  async function fetchProducts(): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.products.fetchProduct()
      if (status === 201) {
        products.value = data.payload
        return {
          success: true,
          payload: null,
        }
      }
    } catch (error) {
      const _error = error as AxiosError
      console.log(_error)
    }
  }

  return {
    products,
    fetchProducts,
  }
})
