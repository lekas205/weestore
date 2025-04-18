<template>
  <div class="tw-h-full">
    <v-form class="tw-gap-10 tw-h-full tw-pt-[50px]" @submit.prevent="register">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              hide-details="auto"
              label="First Name"
              type="text"
              v-model="form.firstName"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              hide-details="auto"
              label="Last Name"
              type="text"
              v-model="form.lastName"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              hide-details="auto"
              label="Email address"
              type="email"
              required
              v-model="form.email"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              hide-details="auto"
              label="Business address"
              type="text"
              v-model="form.address"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-combobox
              label="State"
              hide-details="auto"
              item-title="name"
              item-value="code"
              v-model="form.state"
              :items="states"
              :return-object="false"
            ></v-combobox>
          </v-col>
          <v-col cols="12">
            <v-combobox
              label="Store"
              hide-details="auto"
              item-title="name"
              item-value="id"
              v-model="form.store"
              :items="stores"
              :return-object="false"
            ></v-combobox>
          </v-col>
          <v-col cols="12">
            <v-text-field
              hide-details="auto"
              label="Phone number"
              type="tel"
              maxlength="11"
              v-model="form.phoneNo"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              hide-details="auto"
              label="Pin"
              v-model="form.pin"
              maxLength="6"
              :type="showPin ? 'text' : 'password'"
              @click:append-inner="showPin = !showPin"
              :append-inner-icon="!showPin ? 'mdi-eye' : 'mdi-eye-off'"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              hide-details="auto"
              label="Confirm PIN"
              :type="showConfirmPin ? 'text' : 'password'"
              v-model="form.confirmPin"
              maxLength="6"
              @click:append-inner="showConfirmPin = !showConfirmPin"
              :append-inner-icon="!showConfirmPin ? 'mdi-eye' : 'mdi-eye-off'"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-select
              label="How do you hear about us?"
              hide-details="auto"
              item-title="name"
              item-value="value"
              v-model="form.referral"
              :items="referralOptions"
            ></v-select>
          </v-col>
          <v-col cols="12" v-if="form.referral === 'referral'">
            <v-text-field
              hide-details="auto"
              label="Referral Code"
              type="text"
              maxlength="11"
              v-model="form.referralCode"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-col cols="12" class="tw-flex tw-items-center">
          <v-checkbox
            hide-details="auto"
            color="primary"
            :value="true"
            v-model="terms"
          ></v-checkbox>
          <p>
            I Agree to
            <RouterLink to="/" class="tw-text-primary">Terms and Conditions</RouterLink>
          </p>
        </v-col>

        <v-btn
          class="!tw-h-[70px] !tw-rounded-full"
          color="primary"
          block
          :loading="loading"
          type="submit"
        >
          Signup</v-btn
        >
      </v-container>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { ref, watch, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'
import type { registerDTO } from '@/types/dto'
import { ROUTES } from '@/router/routes/routes'
import { useToast } from 'vue-toast-notification'

const toast = useToast()
const router = useRouter()
const authStore = useAuthStore()
const { states, stores } = storeToRefs(authStore)

const terms = ref(false)
const loading = ref(false)
const showPin = ref(false)
const showConfirmPin = ref(false)
const form = ref<registerDTO>({
  state: '',
  firstName: '',
  lastName: '',
  phoneNo: '',
  email: '',
  store: '',
  pin: '',
  address: '',
  confirmPin: '',
  referral: '',
  referralCode: '',
})

const referralOptions = ref([
  { value: 'facebook', name: 'Facebook' },
  { value: 'x', name: 'X (Formerly Twitter)' },
  { value: 'instagram', name: 'Instagram' },
  { value: 'whatsapp', name: 'WhatsApp' },
  { value: 'referral', name: 'Referral' },
])

watch(
  () => form.value.state,
  (newVal) => {
    authStore.fetchStores(newVal ?? '')
  },
  { deep: true },
)

const register = async () => {
  loading.value = true
  const res = await authStore.initiateSignup(form.value)
  if (res) {
    toast.success('registration successful', {
      position: 'top',
      duration: 6000,
    })

    router.push({
      name: ROUTES.account_verification.name,
    })
  }

  loading.value = false
}

onMounted(() => {
  authStore.fetchStates()
})
</script>
