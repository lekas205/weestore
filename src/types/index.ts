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

export type Categories = {
  icon: string
  id: string
  name: string
  productCount: number
}

export type Products = {
  category: string
  category_id: string
  description: string
  images: any
  image: string
  total: number
  start_date?: string
  interest_percent: number
  is_available: boolean
  manufacturer: string
  max_quantity: number
  min_quantity: number
  price: number
  quantity: number
  product_id: string
  product_name: string
  published: boolean
  quantity_bought: number
  sizes: string[]
  state_id: string
  state_name: string
  status: string
  stock_quantity: number
  warehouse_id: string
  warehouse_name: string
  whp: number
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
