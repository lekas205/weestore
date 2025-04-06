import http from '../https'
import type { APIResponse } from '../types'
import type { changePinDTO, changeAddressDTO, bankAccountDTO } from '../types/dto'
import * as ENDPOINTS from '../https/endpoints'

async function getProfile() {
  return await http.get<APIResponse>(ENDPOINTS.PROFILE)
}

async function changePin(payload: changePinDTO) {
  return await http.patch<APIResponse>(ENDPOINTS.CHANGE_PIN, payload)
}

async function changeAddress(payload: changeAddressDTO) {
  return await http.patch<APIResponse>(ENDPOINTS.CHANGE_ADDRESS, payload)
}

async function fetchBanks() {
  return await http.get<APIResponse>(ENDPOINTS.BANK_LIST)
}

async function getAccountDetails(payload: bankAccountDTO) {
  return await http.post<APIResponse>(ENDPOINTS.GET_ACCOUNT_DETAILS, payload)
}

async function addBankDetails(payload: bankAccountDTO) {
  return await http.post<APIResponse>(ENDPOINTS.ADD_BANK_ACCOUNT, payload)
}

async function updateBankDetails(payload: bankAccountDTO) {
  return await http.patch<APIResponse>(ENDPOINTS.UPDATE_BANK_ACCOUNT, payload)
}

export default {
  changePin,
  getProfile,
  fetchBanks,
  changeAddress,
  addBankDetails,
  getAccountDetails,
  updateBankDetails,
}
