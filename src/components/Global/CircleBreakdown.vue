<template>
  <v-layout>
    <v-navigation-drawer v-model="showDrawer" temporary :width="450" color="#F4F4F8">
      <img
        src="../../assets//images/png/app-background-image.png"
        alt=""
        class="tw-fixed tw-left-0 tw-w-[110vw] tw-h-[100%] tw-top-0 tw-z-0"
      />
      <div class="tw-px-[30px] tw-mt-[50px] tw-relative">
        <button class="tw-absolute tw-top-0" @click="showDrawer = false">
          <v-icon icon="mdi-arrow-left" end></v-icon>
        </button>

        <div class="text-center">
          <h2 class="tw-text-[20px] tw-font-semibold mb-2">{{ props.status }} Circle</h2>
          <p>{{ props.circle_type }}</p>
        </div>

        <section class="mt-10 tw-bg-white tw-p-3 tw-rounded-md">
          <div class="tw-flex py-4 tw-border-b tw-border-gray-300 tw-justify-between">
            <span class="tw-text-[14px]">Amount Saved so far</span>
            <span class="tw-font-semibold tw-text-[#372E52]"> {{ formatAsMoney(60000) }} </span>
          </div>
          <div class="tw-flex py-4 tw-border-b tw-border-gray-300 tw-justify-between">
            <span class="tw-text-[14px]">Interest Rate</span>
            <span class="tw-font-semibold tw-text-[#372E52]"> 5% </span>
          </div>
          <div class="tw-flex py-4 tw-border-b tw-border-gray-300 tw-justify-between">
            <span class="tw-text-[14px]">Target Amount</span>
            <span class="tw-font-semibold tw-text-[#372E52]"> {{ formatAsMoney(100000) }} </span>
          </div>
          <div
            class="tw-flex py-4 tw-border-b tw-border-gray-300 tw-justify-between tw-items-center"
          >
            <span class="tw-text-[14px]">Status</span>
            <span class="tw-font-semibold tw-text-[#372E52]">
              <v-chip color="green" label> {{ props.status }} </v-chip>
            </span>
          </div>
          <div class="tw-flex py-4 tw-border-b tw-border-gray-300 tw-justify-between">
            <span class="tw-text-[14px]">Withdrawal Date</span>
            <span class="tw-font-semibold tw-text-[#372E52]"> 12/11/2025 </span>
          </div>
          <div class="tw-flex py-4 tw-border-b tw-border-gray-300 tw-justify-between">
            <span class="tw-text-[14px]">Withdrawal Date</span>
            <span class="tw-font-semibold tw-text-[#372E52]"> 12/11/2025 </span>
          </div>
          <div class="tw-flex py-4 tw-border-b tw-border-gray-300 tw-justify-between">
            <span class="tw-text-[14px]">Next Contribution date </span>
            <span class="tw-font-semibold tw-text-[#372E52]"> 3rd April </span>
          </div>

          <div class="tw-flex tw-gap-3 tw-mt-[30px] tw-mb-7 tw-justify-center">
            <v-btn
              class="tw-mt-10 !tw-h-[40px] !tw-rounded-full !tw-capitalize !tw-underline"
              color="green"
              variant="text"
              @click="showSheet = true"
            >
              Pause Circle
            </v-btn>
            <v-btn
              class="tw-mt-10 !tw-h-[40px] !tw-rounded-full !tw-capitalize"
              color="primary"
              @click="showWithdrawalSheet = true"
            >
              Withdraw
            </v-btn>
          </div>
        </section>
      </div>
    </v-navigation-drawer>
  </v-layout>

  <AppBottomSheet v-model:show="showSheet" hideCloseIcon>
    <PauseCircle @close="showSheet = false" @pauseCircle="showPausedDrawer = true" />
  </AppBottomSheet>

  <AppBottomSheet v-model:show="showWithdrawalSheet" hideCloseIcon>
    <SavingsWithdrawalStart v-if="withdrawalStep === 1" @proceed="nextStop" />
    <SavingsWithdrawalPin v-if="withdrawalStep === 2" @proceed="nextStop" />
    <SuccessDetail
      v-if="withdrawalStep === 3"
      title="Withdrawal Request Received"
      text="Withdrawal takes 24hrs to be processed. "
      class="tw-mt-[30px] tw-mx-auto"
    >
      <v-btn
        class="!tw-h-[45px] tw-w-full !tw-rounded-full !tw-capitalize"
        color="primary"
        to="/home"
      >
        Back to Home
      </v-btn>
    </SuccessDetail>
  </AppBottomSheet>

  <v-layout>
    <v-navigation-drawer v-model="showPausedDrawer" temporary :width="450" color="#F4F4F8">
      <SuccessDetail
        title="Your Circle is Paused!"
        class="tw-mt-[70px] tw-mx-auto tw-w-[80%]"
        text="Your Bronze Circle has been successfully paused. You can resume anytime to continue saving."
      >
        <v-btn
          class="!tw-h-[45px] tw-w-full !tw-rounded-full !tw-capitalize"
          color="primary"
          to="/home"
        >
          Back to Home
        </v-btn>
      </SuccessDetail>
    </v-navigation-drawer>
  </v-layout>
</template>

<script setup lang="ts">
import { formatAsMoney } from '@/utils/helpers'
import { computed, ref } from 'vue'
import AppBottomSheet from './AppBottomSheet.vue'
import PauseCircle from './PauseCircle.vue'
import SuccessDetail from './SuccessDetail.vue'
import SavingsWithdrawalStart from './SavingsWithdrawalStart.vue'
import SavingsWithdrawalPin from './SavingsWithdrawalPin.vue'

const props = defineProps<{
  show: boolean
  status: string
  circle_type: string
}>()
const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'success'): void
}>()

const showSheet = ref(false)
const showPausedDrawer = ref(false)
const showWithdrawalSheet = ref(false)

const withdrawalStep = ref(1)

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
