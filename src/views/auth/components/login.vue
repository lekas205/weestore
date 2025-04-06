<template>
  <div class="tw-h-full">
    <v-form class="tw-flex tw-flex-col tw-gap-10 tw-h-full tw-pt-[50px]">
      <div>
        <v-text-field
          hide-details="auto"
          label="Phone number"
          type="tel"
          v-model="form.username"
        ></v-text-field>
      </div>
      <div>
        <v-text-field
          hide-details="auto"
          label="Pin"
          type="password"
          v-model="form.password"
        ></v-text-field>
      </div>

      <v-btn
        class="tw-mt-auto !tw-h-[70px] !tw-rounded-full"
        color="#FA4A0C"
        @click="login"
        :loading="loading"
      >
        Login</v-btn
      >
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'
import { ROUTES } from '@/router/routes/routes'
import { useToast } from 'vue-toast-notification'

const toast = useToast()
const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  username: '',
  password: '',
})

const loading = ref(false)
const login = async () => {
  loading.value = true
  const res = await authStore.initiateLogin(form.value)

  if (res) {
    toast.success('Login successful', {
      position: 'top-right',
      duration: 6000,
    })
    router.push({
      name: ROUTES.home.name,
    })
  }
  loading.value = false
}
</script>
