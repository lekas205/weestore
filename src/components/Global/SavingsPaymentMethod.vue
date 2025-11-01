<template>
  <v-layout>
    <v-navigation-drawer v-model="showDrawer" temporary :width="450" color="#F4F4F8">
      <div class="tw-px-[30px] tw-mt-[50px]">
        <button class="tw-absolute tw-top-[40px]" @click="showDrawer = false">
          <v-icon icon="mdi-arrow-left" end></v-icon>
        </button>
        <div class="text-center tw-mb-[50px]">
          <h2 class="tw-text-[20px] mb-2 tw-font-semibold">Payment Method</h2>
          <p>Select your payment method</p>
        </div>

        <PaymentMethods v-model:method="method" @uploadedImageUrls="uploadedImage" hideTitle />

        <v-btn
          class="tw-mt-10 tw-w-full !tw-h-[50px] !tw-rounded-full"
          color="primary"
          @click="makePayment"
        >
          Pay
        </v-btn>
      </div>
    </v-navigation-drawer>
  </v-layout>

  <PaymentSuccessful v-model:show="showSuccessPaymentModal" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import PaymentMethods from './PaymentMethods.vue'
import PaymentSuccessful from './PaymentSuccessful.vue'

const props = defineProps<{
  show: boolean
}>()
const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'success'): void
}>()

const showDrawer = computed({
  get() {
    return props.show
  },
  set(value) {
    emit('update:show', value)
  },
})

const method = ref('paystack')
const showSuccessPaymentModal = ref(false)

const uploadedImage = (value: string[]) => {
  console.log(value)
}

const makePayment = () => {
  showSuccessPaymentModal.value = true
  emit('success')
}
</script>
