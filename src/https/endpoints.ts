const customer = '/customer'
const bank = '/bank-account'

export const LOGIN = `${customer}/login`
export const REGISTER = `${customer}/register`
export const VERIFY_ACCOUNT = `${customer}/verify-account/`
export const CHANGE_NUMBER = `${customer}/phone-number/`
export const RESET_PIN = `${customer}/reset-password`
export const FORGOT_PASSWORD = `${customer}/forgot-password`
export const PROFILE = `${customer}/profile`

export const CHANGE_PIN = `${customer}/password`
export const RESEND_OTP = `${customer}/resend-otp`
export const RESEND_PHONE_OTP = `${customer}/phone/otp`
export const PRODUCTS = `${customer}/product`
export const CHANGE_ADDRESS = `${customer}/address`

export const GET_ACCOUNT_DETAILS = `${bank}/lookup-account`
export const BANK_LIST = `${bank}/supported-banks`
export const ADD_BANK_ACCOUNT = `/${customer}/add-bank-account`
export const UPDATE_BANK_ACCOUNT = `${customer}/update-bank-account`

export const STATE = `utility/states`
export const STORE = `utility/state/store/`
