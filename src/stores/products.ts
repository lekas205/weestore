import { ref } from 'vue'
import { defineStore } from 'pinia'
import { API } from '../services'
import { AxiosError } from 'axios'
import type { APIResponse, Products, Categories } from '../types'
import { handleStoreRequestError } from '@/utils/errorHandler'

export const useProductsStore = defineStore('products', () => {
  const orders = ref<any>({})
  const products = ref<Products[]>([])
  const categories = ref<Categories[]>([])

  async function fetchProducts(params?: any): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.products.fetchProduct(params)
      if (status === 201 || status === 200) {
        products.value = data.payload.rows
        return {
          success: true,
          payload: null,
        }
      }
    } catch (error) {
      const _error = error as AxiosError
      handleStoreRequestError(_error)
    }
  }

  async function fetchCategories(): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.products.fetchCategories()
      if (status === 201 || status === 200) {
        categories.value = data.payload.rows
        return {
          success: true,
          payload: null,
        }
      }
    } catch (error) {
      const _error = error as AxiosError
      handleStoreRequestError(_error)
    }
  }

  async function fetchCustomerOrder(): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.products.fetchCustomerOrder()
      if (status === 201 || status === 200) {
        orders.value = data.payload

        console.log(data.payload)

        return {
          success: true,
          payload: null,
        }
      }
    } catch (error) {
      const _error = error as AxiosError
      handleStoreRequestError(_error)
    }
  }

  return {
    orders,
    products,
    categories,
    fetchProducts,
    fetchCategories,
    fetchCustomerOrder,
  }
})
