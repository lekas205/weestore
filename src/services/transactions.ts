import http from '../https'
import type { APIResponse } from '../types'
import type {
  transferToPocketDTO,
  rewardsTransferToBankDTO,
  rewardsTransferToPocketDTO,
} from '../types/dto'
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

async function rewardsTransferToPocket(payload: rewardsTransferToPocketDTO) {
  return await http.post<APIResponse>(ENDPOINTS.REWARDS_TRANSFER_TO_POCKET, payload)
}

async function rewardsTransferToBank(payload: rewardsTransferToBankDTO) {
  return await http.post<APIResponse>(ENDPOINTS.REWARDS_TRANSFER_TO_BANK, payload)
}

async function getPaystackReference(payload: { amount: string }) {
  return await http.post<APIResponse>(ENDPOINTS.PAYMENT_REFERENCE, payload)
}

export default {
  walletTopup,
  transactions,
  getWalletBalance,
  transferToBank,
  transferToPocket,
  rewardsTransferToBank,
  getPaystackReference,
  rewardsTransferToPocket,
}
