export type APIResponse = {
  success: boolean
  payload: any
  status?: number
}

export type APIResponsePayload = {
  success: boolean
  payload: string[] | number | object | null
  status?: number
}

export type BankList = {
  code: string
  name: string
}

export type userProfile = {
  id: number
  fullname: string
  email: string
  phone: string
  address: string
  bank: {
    accountNumber: string
    accountName: string
    bankCode: string | null
    bankName: string
  }
}
