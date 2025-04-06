<template>
  <div class="tw-relative tw-mt-[-40px] tw-z-10 tw-h-full tw-flex tw-flex-col">
    <h3 class="tw-text-white tw-text-center tw-text-[16px]">Change Mobile Number</h3>
    <section class="tw-text-center tw-mt-[70px]">
      <p class="tw-text-[20px] tw-mb-4">Please enter mobile number to receive the 6-Digits Otp</p>

      <v-text-field
        label="Enter Mobile Number"
        type="tel"
        hide-details="auto"
        v-model="form.new_phone_no"
      ></v-text-field>
      <v-otp-input :model-value="form.otp" variant="filled" class="tw-mt-5"></v-otp-input>

      <p class="tw-text-[14px]">Didn’t receive any code?</p>

      <p @click="resendOtp" class="tw-text-primary tw-text-[20px] tw-block tw-mt-3">Resend Code</p>
    </section>

    <v-btn class="tw-mt-auto !tw-h-[70px] !tw-rounded-full" color="primary" @click="submit">
      Change Number</v-btn
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'
// import { useRouter } from 'vue-router'
// import { ROUTES } from '@/router/routes/routes'
import { useToast } from 'vue-toast-notification'

const toast = useToast()
// const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  otp: '',
  auth_id: '',
  new_phone_no: '',
})

const loading = ref(false)

const submit = async () => {
  loading.value = true
  const res = await authStore.changeNumber(form)

  if (res) {
    toast.success('Phone number has been updated', {
      position: 'top-right',
      duration: 6000,
    })
  }
  loading.value = false
}

const resendOtp = async () => {
  loading.value = true
  const user_phone_number = localStorage.getItem('USER_PHONE_NUMBER') || ''
  const user_auth_id = localStorage.getItem('USER_AUTH_ID') || ''
  const res = await authStore.resendPhoneOtp({
    new_phone_no: user_phone_number,
    auth_id: user_auth_id,
  })

  if (res) {
    toast.success('OTP has ben sent', {
      position: 'top-right',
      duration: 6000,
    })
  }
  loading.value = false
}
</script>
