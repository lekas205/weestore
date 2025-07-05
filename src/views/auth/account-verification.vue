<template>
  <button class="tw-text-white tw-absolute tw-top-5 tw-left-4d" @click="router.back()">
    <v-icon icon="mdi-chevron-left" class="!tw-text-[40px]"></v-icon>
  </button>
  <div class="rtw-elative tw-mt-[-40px] tw-z-10 tw-h-full tw-flex tw-flex-col">
    <h3 class="tw-text-white tw-text-center tw-text-[18px]">Account Verification</h3>
    <section class="tw-text-center tw-mt-[80px]">
      <p>Please enter the 6-digit code sent to your Mobile Number {{ encrypted_phone_number }}</p>

      <v-otp-input v-model="form.otp" variant="filled" class="tw-mt-5"></v-otp-input>

      <p class="text-[14px]">
        Not my phone number?
        <RouterLink :to="ROUTES.change_number.path" class="tw-underline"
          >Change Phone Number</RouterLink
        >
      </p>

      <p class="tw-text-primary tw-text-[20px] tw-mt-4 tw-block" @click="resendOtp">>Resend Code</p>
    </section>

    <v-btn
      class="tw-mt-auto !tw-h-[70px] !tw-rounded-full"
      color="#FA4A0C"
      @click="verify"
      :loading="loading"
    >
      Verify</v-btn
    >
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'
import { useRouter } from 'vue-router'
import { ROUTES } from '@/router/routes/routes'
import { useToast } from 'vue-toast-notification'

const toast = useToast()
const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  otp: '',
  auth_id: '',
})

const loading = ref(false)

const verify = async () => {
  loading.value = true
  const res = await authStore.verifyAccount(form.value)

  if (res) {
    toast.success('Account verification completed', {
      position: 'top',
      duration: 6000,
    })
    router.push({
      name: ROUTES.home.name,
    })

    localStorage.removeItem('CHANGE_PHONE')
  }
  loading.value = false
}

const resendOtp = async () => {
  loading.value = true
  const res = await authStore.resendOtp({
    username: username.value,
    purpose: 'ACCOUNT_VERIFICATION',
  })

  if (res) {
    toast.success(res.payload.message, {
      position: 'top',
      duration: 6000,
    })
  }
  loading.value = false
}

const username = computed<string>(() => localStorage.getItem('USER_ID') || '')
const phone_number = computed<string>(() => localStorage.getItem('USER_PHONE_NUMBER') || '')

const encrypted_phone_number = computed(
  () => phone_number.value.slice(0, 3) + phone_number.value.slice(-4).padStart(10, '*'),
)

onMounted(() => {
  form.value.auth_id = localStorage.getItem('USER_ID') || ''
})
</script>
