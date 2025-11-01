<template>
  <v-layout>
    <v-navigation-drawer v-model="showDrawer" temporary :width="450" color="#F4F4F8">
      <button class="tw-absolute tw-top-[40px]" @click="showDrawer = false">
        <v-icon icon="mdi-arrow-left" end></v-icon>
      </button>
      <div class="tw-flex tw-flex-col mt-10 tw-items-center">
        <h5 class="tw-text-[20px] tw-font-semibold mb-1">Interest</h5>
      </div>

      <div class="tw-text-center tw-mt-10 px-6">
        <h2 class="tw-text-[36px] tw-font-semibold">{{ formatAsMoney(100000) }}</h2>
        <p>Accumulated interest</p>

        <v-btn
          class="!tw-h-[45px] tw-w-full tw-mt-[30px] !tw-rounded-full !tw-capitalize"
          color="primary"
          @click="showWithdrawalSheet = true"
        >
          Withdraw
        </v-btn>

        <div
          class="tw-h-[60px] tw-w-[60px] tw-bg-[#FCC9B7] tw-flex tw-justify-center tw-items-center mx-auto mt-5"
        >
          <v-icon color="primary" icon="mdi-history" size="large"></v-icon>
        </div>
      </div>
    </v-navigation-drawer>
  </v-layout>

  <AppBottomSheet v-model:show="showWithdrawalSheet">
    <WithdrawInterest v-if="withdrawalStep === 1" @proceed="nextStop" />
    <SuccessDetail
      v-if="withdrawalStep === 2"
      title="Withdrawal Request Received"
      text="Withdrawal takes 24hrs to be processed. "
      class="tw-mt-[30px] tw-mx-auto"
    >
    </SuccessDetail>
  </AppBottomSheet>
</template>

<script setup lang="ts">
import { formatAsMoney } from '@/utils/helpers'
import { ref, computed } from 'vue'
import WithdrawInterest from './WithdrawInterest.vue'
import AppBottomSheet from './AppBottomSheet.vue'
import SuccessDetail from './SuccessDetail.vue'

const props = defineProps<{
  show: boolean
}>()
const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

const withdrawalStep = ref(1)
const showWithdrawalSheet = ref(false)

const showDrawer = computed({
  get() {
    return props.show
  },
  set(value) {
    emit('update:show', value)
  },
})

const nextStop = (amount?: string | number) => {
  withdrawalStep.value += 1
}
</script>
