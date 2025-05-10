import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { API } from '../services'
import { AxiosError } from 'axios'
import type { transferToPocketDTO } from '../types/dto'
import type { APIResponse } from '../types'
import { handleStoreRequestError } from '@/utils/errorHandler'

export const useTransactionStore = defineStore('transactions', () => {
  const wallets = ref<any>({})
  const transactions = ref<any>({})
  async function transferToPocket(payload: transferToPocketDTO): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.transactions.transferToPocket(payload)

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

  async function transferToBank(payload: transferToPocketDTO): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.transactions.transferToBank(payload)

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

  async function getWalletBalance(): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.transactions.getWalletBalance()

      if (status === 200 || status === 201) {
        wallets.value = data.payload
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

  async function walletTopup(payload: any): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.transactions.walletTopup(payload)

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

  async function fetchTransactions(): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.transactions.transactions()

      if (status === 200 || status === 201) {
        transactions.value = data.payload

        console.log(transactions.value)

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
    wallets,
    transactions,
    walletTopup,
    fetchTransactions,
    getWalletBalance,
    transferToBank,
    transferToPocket,
  }
})
