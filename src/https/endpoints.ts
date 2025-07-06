const customer = '/customer'
const bank = '/v1/bank-account'

export const CART = `/v1${customer}/cart`
export const ORDER = `/v2${customer}/order`

export const LOGIN = `/v1${customer}/login`
export const REGISTER = `/v1${customer}/register`
export const VERIFY_ACCOUNT = `/v1${customer}/verify-account/`
export const CHANGE_NUMBER = `/v1${customer}/phone-number/`
export const RESET_PIN = `/v1${customer}/reset-password`
export const FORGOT_PASSWORD = `/v1${customer}/forgot-password`
export const PROFILE = `/v1${customer}/profile`
export const PURCHASED_PRODUCTS = `/v1${customer}/purchased/product`

export const CHANGE_PIN = `/v1${customer}/password`
export const RESEND_OTP = `/v1${customer}/resend-otp`
export const RESEND_PHONE_OTP = `/v1${customer}/phone/otp`
export const PRODUCTS = `/v1${customer}/product`
export const CATEGORIES = `/v1${customer}/categories`
export const CHANGE_ADDRESS = `/v1${customer}/address`

export const GET_ACCOUNT_DETAILS = `${bank}/lookup-account`
export const BANK_LIST = `${bank}/supported-banks`
export const ADD_BANK_ACCOUNT = `/v1${customer}/add-bank-account`
export const UPDATE_BANK_ACCOUNT = `/v1${customer}/update-bank-account`

export const STATE = `/v1/utility/states`
export const STORE = `/v1/utility/state/store/`

export const WALLET = `/v1${customer}/wallet`
export const TRANSFER_POCKET = `/v1${customer}/transfer`
export const TRANSFER_BANK = `/v1${customer}/withdrawal`
export const WALLET_TOPUP = `/v2${customer}/wallet/topup`
export const TRANSACTIONS = `/v1${customer}/transactions`

export const REWARDS_TRANSFER_TO_POCKET = `/v1${customer}/reward/transfer`
export const REWARDS_TRANSFER_TO_BANK = `/v1${customer}/reward/withdraw`

export const DELETE_ACCOUNT = `/v1${customer}`
