import http from '../https'
import type { APIResponse } from '../types'
import type { transferToPocketDTO } from '../types/dto'
import * as ENDPOINTS from '../https/endpoints'

async function transferToPocket(payload: transferToPocketDTO) {
  return await http.post<APIResponse>(ENDPOINTS.TRANSFER_POCKET, payload)
}

async function transferToBank(payload: transferToPocketDTO) {
  return await http.post<APIResponse>(ENDPOINTS.TRANSFER_BANK, payload)
}

async function getWalletBalance() {
  return await http.get<APIResponse>(ENDPOINTS.WALLET)
}

async function walletTopup(payload: transferToPocketDTO) {
  return await http.post<APIResponse>(ENDPOINTS.WALLET_TOPUP, payload)
}

async function transactions() {
  return await http.get<APIResponse>(ENDPOINTS.TRANSACTIONS)
}

export default {
  walletTopup,
  transactions,
  getWalletBalance,
  transferToBank,
  transferToPocket,
}
