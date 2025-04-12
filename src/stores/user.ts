import { ref } from 'vue'
import { defineStore } from 'pinia'
import { API } from '../services'
import { AxiosError } from 'axios'
import type { userProfile, BankList, APIResponse } from '../types'
import type { changePinDTO, changeAddressDTO, bankAccountDTO } from '../types/dto'
import { handleStoreRequestError } from '@/utils/errorHandler'

export const useUserStore = defineStore('user', () => {
  const banks = ref<BankList[]>([])
  const profile = ref<userProfile>()

  async function getProfile(): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.user.getProfile()
      if (status === 200 || status === 201) {
        profile.value = data.payload
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

  async function changePin(payload: changePinDTO): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.user.changePin(payload)
      if (status === 200 || status === 201) {
        profile.value = data.payload
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

  async function changeAddress(payload: changeAddressDTO): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.user.changeAddress(payload)
      if (status === 200 || status === 201) {
        profile.value = data.payload
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

  async function fetchBanks(): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.user.fetchBanks()
      if (status === 200 || status === 201) {
        banks.value = data.payload
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

  async function getAccountDetails(payload: bankAccountDTO): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.user.getAccountDetails(payload)
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

  async function addBankDetails(payload: bankAccountDTO): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.user.addBankDetails(payload)
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
  async function updateBankDetails(payload: bankAccountDTO): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.user.updateBankDetails(payload)
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
    banks,
    profile,
    getProfile,
    changePin,
    fetchBanks,
    changeAddress,
    addBankDetails,
    getAccountDetails,
    updateBankDetails,
  }
})
