<template>
  <div class="tw-relative tw-mt-[-40px] tw-z-10 tw-h-full tw-flex tw-flex-col">
    <h3 class="tw-text-white tw-text-center tw-text-[18px]">Create New PIN</h3>
    <section class="tw-mt-[70px]">
      <p class="tw-text-[20px]">Enter Otp</p>
      <v-otp-input v-model="form.otp" variant="filled"></v-otp-input>
      <p class="tw-text-[20px]">Create New PIN</p>
      <v-otp-input v-model="form.password" variant="filled"></v-otp-input>
      <p class="tw-text-[20px]">Confirm New PIN</p>
      <v-otp-input v-model="form.confirm_password" variant="filled" class="tw-mt-2"></v-otp-input>
    </section>

    <v-btn
      class="!tw-h-[70px] !tw-rounded-full mt-9"
      color="#FA4A0C"
      @click="submit"
      :loading="loading"
    >
      Next</v-btn
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
  otp: '',
  password: '',
  username: '',
  confirm_password: '',
})

const loading = ref(false)

const submit = async () => {
  loading.value = true
  const res = await authStore.setNewPin({
    ...form.value,
    username: localStorage.getItem('USER_PHONE_NUMBER') || '',
  })

  if (res) {
    toast.success('Pin was changed successfully', {
      position: 'top',
      duration: 6000,
    })
    router.push({
      name: ROUTES.login.name,
    })
  }
  loading.value = false
}
</script>
