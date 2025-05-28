<template>
  <div class="tw-mt-10">
    <div
      class="text-white tw-bg-gradient-to-r tw-from-[#FF8D19] tw-to-[#FF375F] tw-p-4 tw-rounded-xl"
    >
      <div class="tw-flex tw-justify-between tw-mb-2">
        <p class="tw-text-[20px]">My Reward</p>
        <h3 class="tw-text-[22px] tw-font-semibold">{{ formatAsMoney(getWalletBallance) }}</h3>
      </div>
      <div class="tw-flex tw-justify-between">
        <p>{{ formatDate(new Date()) }}</p>
        <img src="@/assets/images/svgs/mastercard.svg" alt="" />
      </div>
    </div>

    <div class="tw-flex tw-flex-wrap tw-justify-between tw-gap-x-4 tw-gap-y-5 mt-8">
      <div
        class="tw-bg-white tw-rounded-xl tw-p-3 text-center tw-shadow-md tw-w-[47%] tw-flex tw-flex-col tw-h-[110px] tw-justify-center"
        v-for="(item, index) in actions"
        :key="index"
        @click="item.value === 'withdrawal' ? (showWithdrawal = true) : (showPocketModal = true)"
      >
        <img :src="extractImgUrl(item.icon)" alt="" class="mx-auto" />
        <p class="tw-text-primary mt-2">{{ item.label }}</p>
      </div>
    </div>

    <Withdrawal v-model:show="showWithdrawal" @proceed="transferToBank" rewards />
    <PocketTransfer v-model:show="showPocketModal" @proceed="transferToPocket" rewards />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTransactionStore } from '@/stores//transaction.ts'
import { storeToRefs } from 'pinia'
import { formatAsMoney, formatDate } from '@/utils/helpers.ts'
import Withdrawal from '@/components/Modals/Withdrawal.vue'
import PocketTransfer from '@/components/Modals/PocketTransfer.vue'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toast-notification'

const toast = useToast()
const authStore = useAuthStore()

const transactionStore = useTransactionStore()

const { wallets } = storeToRefs(transactionStore)

const getWalletBallance = computed(() => {
  return (
    wallets.value?.rows?.find((elm: any) => elm.wallet_type.toLowerCase() === 'reward')?.amount || 0
  )
})

const showWithdrawal = ref(false)
const showPocketModal = ref(false)

const actions = ref([
  { icon: 'money', label: 'Withdraw to Bank', value: 'withdrawal' },
  { icon: 'money', label: 'Transfer to Pocket', value: 'transfer' },
])

const extractImgUrl = (icon: string) => {
  return new URL(`/src/assets/images/svgs/${icon}.svg`, import.meta.url).href
}

const transferToPocket = async (amount: string | number) => {
  authStore.toggleLoader()
  const res = await transactionStore.rewardsTransferToPocket({
    amount,
  })

  if (res) {
    await transactionStore.getWalletBalance()
    toast.success('Transfer to pocket successful', {
      position: 'top',
      duration: 6000,
    })
  }

  authStore.toggleLoader()
}

const transferToBank = async (amount: string | number) => {
  authStore.toggleLoader()
  const res = await transactionStore.rewardsTransferToBank({
    amount,
  })

  if (res) {
    await transactionStore.getWalletBalance()
    toast.success('Transfer to Bank request has been sent', {
      position: 'top',
      duration: 6000,
    })
  }

  authStore.toggleLoader()
}
</script>
