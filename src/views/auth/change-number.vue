<template>
  <div class="tw-relative tw-mt-[-40px] tw-z-10 tw-h-full tw-flex tw-flex-col">
    <h3 class="tw-text-white tw-text-center tw-text-[16px]">Change Mobile Number</h3>
    <section class="tw-text-center tw-mt-[70px] tw-mb-5">
      <p class="tw-text-[20px] tw-mb-4">Please enter mobile number to receive the 6-Digits Otp</p>

      <v-text-field
        label="Enter Mobile Number"
        type="tel"
        hide-details="auto"
        maxLength="11"
        v-model="form.new_phone_no"
      ></v-text-field>
      <v-otp-input
        v-model="form.otp"
        v-if="show_otp"
        variant="filled"
        class="tw-mt-5"
      ></v-otp-input>

      <p class="tw-text-[14px] mt-5">Didn’t receive any code?</p>

      <p @click="resendOtp" class="tw-text-primary tw-text-[16px] tw-block tw-mt-3">Resend Code</p>
    </section>

    <v-btn
      class="tw-mt-auto !tw-h-[70px] !tw-rounded-full"
      color="primary"
      :loading="loading"
      @click="show_otp ? submit() : resendOtp()"
    >
      {{ show_otp ? ' Change Number' : 'Send OTP' }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'
import { ROUTES } from '@/router/routes/routes'
import { useToast } from 'vue-toast-notification'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const form = ref({
  otp: '',
  auth_id: '',
  new_phone_no: '',
})

const loading = ref(false)
const show_otp = ref(false)

const user_auth_id = computed(() => localStorage.getItem('USER_ID') || '')

const submit = async () => {
  loading.value = true
  const res = await authStore.changeNumber(form.value)

  if (res) {
    toast.success('Phone number has been updated', {
      position: 'top',
      duration: 6000,
    })

    router.push({
      name: ROUTES.home.name,
    })
  }
  loading.value = false
}

const resendOtp = async () => {
  loading.value = true
  const res = await authStore.resendPhoneOtp({
    new_phone_no: form.value.new_phone_no,
    auth_id: user_auth_id.value,
  })

  if (res) {
    toast.success('OTP has ben sent', {
      position: 'top',
      duration: 6000,
    })
    show_otp.value = true
    localStorage.setItem('CHANGE_PHONE', form.value.new_phone_no)
  }
  loading.value = false
}

onMounted(() => {
  form.value.auth_id = user_auth_id.value

  if (localStorage.getItem('CHANGE_PHONE')) {
    show_otp.value = true
    form.value.new_phone_no = localStorage.getItem('CHANGE_PHONE') || ''
  }
})
</script>
