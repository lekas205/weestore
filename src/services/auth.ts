import http from '../https'
import type { APIResponse } from '../types'
import * as ENDPOINTS from '../https/endpoints'
import type { forgotPinDTS, resetPinDTO, verifyAccountDTO, resendPhoneOtpDTO } from '../types/dto'

async function loginUser(payload: any) {
  return await http.post<APIResponse>(ENDPOINTS.LOGIN, payload)
}

async function registerUser(payload: any) {
  return await http.post<APIResponse>(ENDPOINTS.REGISTER, payload)
}

async function getStates() {
  return await http.get<APIResponse>(ENDPOINTS.STATE)
}

async function getStores(id: string) {
  return await http.get<APIResponse>(ENDPOINTS.STORE + `${id}`)
}

async function verifyAccount({ auth_id, otp }: verifyAccountDTO) {
  return await http.get<APIResponse>(ENDPOINTS.VERIFY_ACCOUNT + `${auth_id}/${otp}`)
}

async function changeNumber(payload: any) {
  return await http.post<APIResponse>(ENDPOINTS.CHANGE_NUMBER, payload)
}

async function setNewPin(payload: resetPinDTO) {
  return await http.post<APIResponse>(ENDPOINTS.RESET_PIN, payload)
}

async function forgotPassword(payload: forgotPinDTS) {
  return await http.post<APIResponse>(ENDPOINTS.FORGOT_PASSWORD, payload)
}

async function resendOtp(payload: forgotPinDTS) {
  return await http.post<APIResponse>(ENDPOINTS.RESEND_OTP, payload)
}

async function resendPhoneOtp(payload: resendPhoneOtpDTO) {
  return await http.post<APIResponse>(ENDPOINTS.RESEND_PHONE_OTP, payload)
}

export default {
  loginUser,
  getStores,
  getStates,
  setNewPin,
  resendOtp,
  registerUser,
  verifyAccount,
  changeNumber,
  forgotPassword,
  resendPhoneOtp,
}
