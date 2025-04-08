export type registerDTO = {
  firstName: string
  lastName: string
  email: string
  pin: string
  phoneNo: string
  state: string
  store: string
  confirmPin: string
  referral: string
  address: string
  referralCode: string
}

export type loginDTO = {
  password: string
  username: string
}

export type verifyAccountDTO = {
  auth_id: string
  otp: string
}

export type forgotPinDTS = {
  username: string
}

export type changeAddressDTO = {
  address: string
}

export type resendOtpDTO = {
  username: string
  purpose: string
}

export type resendPinOtpDTO = {
  new_phone_no: string
  purpose: string
}

export type resendPhoneOtpDTO = {
  auth_id: string
  new_phone_no: string
}

export type ChangePhoneNumberDTO = {
  otp: string
  auth_id: string
  new_phone_no: string
}

export type changePinDTO = {
  new_password: string
  old_password: string
  confirm_new_password?: string
}

export type resetPinDTO = {
  otp: string
  password: string
  username: string
  confirm_password: string
}

export type bankAccountDTO = {
  bankCode: string | null
  accountNumber: string
  bankName?: string
  accountName?: string
}
