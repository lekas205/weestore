<template>
  <div class="tw-h-full">
    <v-form
      class="tw-gap-10 tw-h-full tw-pt-[50px]"
      ref="signupForm"
      @submit.prevent="register"
      v-model="valid"
    >
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              hide-details="auto"
              label="First Name"
              type="text"
              v-model="form.firstName"
              :rules="[required]"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              hide-details="auto"
              label="Last Name"
              type="text"
              v-model="form.lastName"
              :rules="[required]"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              hide-details="auto"
              label="Email address"
              type="email"
              required
              v-model="form.email"
              :rules="[required, emailRule]"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              hide-details="auto"
              label="Business address"
              type="text"
              v-model="form.address"
              :rules="[required]"
            ></v-text-field>
          </v-col>
          <!-- <v-col cols="12">
            <v-combobox
              label="State"
              hide-details="auto"
              item-title="name"
              item-value="code"
              v-model="form.state"
              :items="activeState"
              :return-object="false"
              readonly
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
              readonly
            ></v-combobox>
          </v-col> -->
          <v-col cols="12">
            <v-text-field
              hide-details="auto"
              label="Phone number"
              type="number"
              maxlength="11"
              v-model="form.phoneNo"
              :rules="[required, phoneNuRule]"
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
              :rules="[required, pinLength]"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              hide-details="auto"
              label="Confirm PIN"
              :type="showConfirmPin ? 'text' : 'password'"
              v-model="form.confirmPin"
              maxLength="6"
              :rules="[required, matchPin]"
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
              :rules="[required]"
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
          :disabled="!terms || loading"
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
import { ref, watch, onMounted, computed } from 'vue'
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
const signupForm = ref<any>(null)

const showConfirmPin = ref(false)
const form = ref<registerDTO>({
  state: '080',
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
const valid = ref(false)

const referralOptions = ref([
  { value: 'facebook', name: 'Facebook' },
  { value: 'x', name: 'X (Formerly Twitter)' },
  { value: 'instagram', name: 'Instagram' },
  { value: 'whatsapp', name: 'WhatsApp' },
  { value: 'referral', name: 'Referral' },
])

// Validation rules
const required = (value: string) => !!value || 'This field is required'
const emailRule = (value: string) => /.+@.+\..+/.test(value) || 'E-mail must be valid'
const pinLength = (value: string) => (value && value.length === 6) || 'Pin must be 6 digits'
const phoneNuRule = (value: string) =>
  (value && value.length === 11) || 'Phone number must be 11 digits'
const matchPin = (v: string) => v === form.value.pin || 'PINs do not match'

// const activeState = computed(() => {
//   return states.value.filter((state: any) => state.name.toLowerCase() == 'lagos')
// })

watch(
  () => form.value.state,
  (newVal) => {
    authStore.fetchStores(newVal ?? '')
  },
  { deep: true },
)

const register = async () => {
  const { valid } = await signupForm.value?.validate()

  if (!valid) return

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
  authStore.fetchStores(form.value.state)
})

watch(
  () => stores.value,
  (newStores: any) => {
    if (newStores.length > 0) {
      form.value.store = newStores[0]?.id
    }
  },
  { immediate: true },
)
</script>
