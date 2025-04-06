<template>
  <div class="tw-relative tw-mt-[-40px] tw-z-10 tw-h-full tw-flex tw-flex-col">
    <h3 class="tw-text-white tw-text-center tw-text-[16px]">PIN Reset</h3>
    <section class="tw-text-center tw-mt-[70px]">
      <p class="tw-text-[20px] tw-mb-6">
        Please enter mobile number to receive the Otp to reset PIN
      </p>

      <v-text-field label="Enter Mobile Number" type="tel" v-model="form.username"></v-text-field>
    </section>

    <v-btn
      class="tw-mt-auto !tw-h-[70px] !tw-rounded-full"
      color="#FA4A0C"
      @click="submit"
      :loading="loading"
    >
      Send Otp</v-btn
    >
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'
import { ROUTES } from '@/router/routes/routes'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'

const toast = useToast()
const router = useRouter()

const authStore = useAuthStore()
const form = ref({
  username: '',
})

const loading = ref(false)

const submit = async () => {
  loading.value = true
  const res = await authStore.forgotPassword(form.value)

  if (res) {
    toast.success('A reset OTP has been sent', {
      position: 'top-right',
      duration: 6000,
    })
    localStorage.setItem('USER_PHONE_NUMBER', form.value.username)
    router.push({
      name: ROUTES.new_pin.name,
    })
  }
  loading.value = false
}
</script>
