import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { API } from '../services'
import { AxiosError } from 'axios'
import type { cartDTO } from '../types/dto'
import type { APIResponse } from '../types'
import { handleStoreRequestError } from '@/utils/errorHandler'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<any>({})

  async function addToCart(payload: cartDTO): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.cart.addToCart(payload)

      if (status === 200 || status === 201) {
        fetchCartItems()
        return {
          success: true,
          payload: data.payload,
        }
      }
    } catch (error) {
      const _error = error as AxiosError
      handleStoreRequestError(_error)
    }
  }

  async function fetchCartItems(): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.cart.fetchCartItems()

      if (status === 200 || status === 201) {
        cartItems.value = data.payload
        return {
          success: true,
          payload: data.payload,
        }
      }
    } catch (error) {
      const _error = error as AxiosError
      handleStoreRequestError(_error)
    }
  }

  async function deleteICartItem(itemId: string): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.cart.deleteICartItem(itemId)

      if (status === 200 || status === 201) {
        cartItems.value = data.payload
        return {
          success: true,
          payload: data.payload,
        }
      }
    } catch (error) {
      const _error = error as AxiosError
      handleStoreRequestError(_error)
    }
  }

  async function createOrder(payload: any): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.cart.createOrder(payload)

      if (status === 200 || status === 201) {
        return {
          success: true,
          payload: data.payload,
        }
      }
    } catch (error) {
      const _error = error as AxiosError
      handleStoreRequestError(_error)
    }
  }

  return {
    cartItems,
    addToCart,
    createOrder,
    fetchCartItems,
    deleteICartItem,
  }
})
