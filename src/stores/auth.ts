import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { API } from '../services'
import { AxiosError } from 'axios'
import axios from '../https'
import type {
  loginDTO,
  registerDTO,
  forgotPinDTS,
  resetPinDTO,
  verifyAccountDTO,
  resendOtpDTO,
  ChangePhoneNumberDTO,
  resendPhoneOtpDTO,
} from '../types/dto'
import type { APIResponse } from '../types'

import { useUserStore } from './user'

const userStore = useUserStore()
export const useAuthStore = defineStore('auth', () => {
  const count = ref(0)
  const states = ref<string[]>([])
  const stores = ref<string[]>([])
  const doubleCount = computed(() => count.value * 2)

  async function initiateLogin(payload: loginDTO): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.auth.loginUser(payload)
      if (status === 200 || status === 201) {
        localStorage.setItem(' ACCESS_TOKEN', data.payload.access_token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.payload.access_token}`

        userStore.getProfile()
        return {
          success: true,
          payload: data.payload,
        }
      }
    } catch (error) {
      const _error = error as AxiosError
      console.log(_error)
    }
  }

  async function initiateSignup(payload: registerDTO): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.auth.registerUser(payload)

      if (status === 200 || status === 201) {
        localStorage.setItem(' USER_ID', data.payload.username)
        localStorage.setItem(' USER_PHONE_NUMBER', payload.phoneNo)
        return {
          success: true,
          payload: data.payload,
        }
      }
    } catch (error) {
      const _error = error as AxiosError
      console.log(_error)
    }
  }

  async function fetchStates(): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.auth.getStates()
      if (status === 200 || status === 201) {
        console.log(data.payload)
        states.value = data.payload
        return {
          success: true,
          payload: [],
        }
      }
    } catch (error) {
      const _error = error as AxiosError
      console.log(_error)
    }
  }

  async function fetchStores(id: string): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.auth.getStores(id)
      if (status === 200 || status === 201) {
        console.log(data.payload)
        stores.value = data.payload
        return {
          success: true,
          payload: [],
        }
      }
    } catch (error) {
      const _error = error as AxiosError
      console.log(_error)
    }
  }

  async function verifyAccount(payload: verifyAccountDTO): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.auth.verifyAccount(payload)
      if (status === 200 || status === 201) {
        localStorage.setItem(' ACCESS_TOKEN', data.payload.access_token)

        return {
          success: true,
          payload: data.payload,
        }
      }
    } catch (error) {
      const _error = error as AxiosError
      console.log(_error)
    }
  }

  async function changeNumber(payload: ChangePhoneNumberDTO): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.auth.changeNumber(payload)
      if (status === 200 || status === 201) {
        console.log(data.payload)
        return {
          success: true,
          payload: [],
        }
      }
    } catch (error) {
      const _error = error as AxiosError
      console.log(_error)
    }
  }

  async function resendOtp(payload: resendOtpDTO): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.auth.resendOtp(payload)
      if (status === 200 || status === 201) {
        console.log(data.payload)
        return {
          success: true,
          payload: [],
        }
      }
    } catch (error) {
      const _error = error as AxiosError
      console.log(_error)
    }
  }

  async function setNewPin(payload: resetPinDTO): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.auth.setNewPin(payload)
      if (status === 200 || status === 201) {
        console.log(data.payload)
        return {
          success: true,
          payload: [],
        }
      }
    } catch (error) {
      const _error = error as AxiosError
      console.log(_error)
    }
  }

  async function forgotPassword(payload: forgotPinDTS): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.auth.forgotPassword(payload)
      if (status === 200 || status === 201) {
        return {
          success: true,
          payload: data.payload,
        }
      }
    } catch (error) {
      const _error = error as AxiosError
      console.log(_error)
    }
  }

  async function resendPhoneOtp(payload: resendPhoneOtpDTO): Promise<APIResponse | void> {
    try {
      const { status, data } = await API.auth.resendPhoneOtp(payload)
      if (status === 200 || status === 201) {
        console.log(data.payload)
        return {
          success: true,
          payload: [],
        }
      }
    } catch (error) {
      const _error = error as AxiosError
      console.log(_error)
    }
  }

  return {
    states,
    stores,
    doubleCount,
    setNewPin,
    changeNumber,
    fetchStates,
    fetchStores,
    resendOtp,
    resendPhoneOtp,
    initiateLogin,
    initiateSignup,
    verifyAccount,
    forgotPassword,
  }
})
