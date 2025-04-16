<template>
  <div class="">
    <p class="mb-3 tw-text-[18px]">Payment method</p>

    <section class="tw-p-6 tw-bg-white tw-shadow-md tw-rounded-xl">
      <v-container fluid>
        <v-radio-group v-model="method">
          <v-radio
            :value="option.value"
            color="red"
            v-for="(option, index) in paymentOptions"
            :key="index"
            @click="handlePaymentMethod(option.value)"
          >
            <template v-slot:label>
              <p class="tw-text-[17px] tw-py-5 tw-border-b tw-w-full">{{ option.label }}</p>
              <divider />
            </template>
          </v-radio>
        </v-radio-group>
      </v-container>
    </section>
  </div>
  <BankPayment v-model:show="showBankPayment" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BankPayment from '../Modals/BankPayment.vue'

const method = defineModel()

const showBankPayment = ref(false)
const paymentOptions = ref([
  { icon: '', label: 'Pay With Paystack', value: 'PAYSTACK' },
  { icon: '', label: 'Pay With Bank', value: 'BANK' },
  { icon: '', label: 'Pocket', value: 'POCKET' },
])

const handlePaymentMethod = (value: string) => {
  if (value === 'bank') {
    showBankPayment.value = true
  }
}
</script>

<style>
.v-label {
  width: 100% !important;
}
</style>
