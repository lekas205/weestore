<template>
  <div class="tw-mt-10">
    <!-- <div
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
    </div> -->

    <div class="tw-relative">
      <img src="@/assets/images/svgs/wallet-card.svg" class="tw-w-full" alt="" />
      <div
        class="tw-absolute tw-text-center tw-top-10 tw-text-white tw-left-1/2 tw--translate-x-1/2"
      >
        <h3 class="tw-text-[22px] tw-font-semibold">
          {{ visible ? formatAsMoney(getWalletBallance) : '*****' }}
        </h3>
        <p class="tw-text-[14px]">Reward Balance</p>
        <button @click="visible = !visible">
          <v-icon color="white" icon="mdi-eye" size="small"></v-icon>
        </button>
      </div>

      <p class="tw-text-primary tw tw-text-[12px] tw-absolute tw-top-2 tw-right-5">
        {{ formatDate(new Date()) }}
      </p>
    </div>

    <div class="tw-flex">
      <div
        class="tw-inline-flex tw-gap-x-4 tw-gap-y-5 mt-8 tw-bg-white tw-rounded-xl tw-rounded-x tw-w-inherit tw-mx-auto"
      >
        <div
          class="tw-p-3 text-center x tw-flex tw-flex-col tw-justify-center"
          v-for="(item, index) in actions"
          :key="index"
          @click="item.value === 'withdrawal' ? withdrawToBank() : (showPocketModal = true)"
        >
          <section
            class="tw-flex tw-justify-center tw-items-center tw-bg-[#ff82226c] tw-w-[55px] tw-h-[55px] tw-rounded-full mx-auto"
          >
            <img :src="extractImgUrl(item.icon)" alt="" class="mx-auto tw-w-[30px]" />
          </section>
          <p class="mt-2 tw-text-[14px]">{{ item.label }}</p>
        </div>
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
import { useRouter } from 'vue-router'
import { ROUTES } from '@/router/routes/routes'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const router = useRouter()

const { profile } = storeToRefs(userStore)

const toast = useToast()
const authStore = useAuthStore()

const transactionStore = useTransactionStore()

const { wallets } = storeToRefs(transactionStore)

const getWalletBallance = computed(() => {
  return (
    wallets.value?.rows?.find((elm: any) => elm.wallet_type.toLowerCase() === 'reward')?.amount || 0
  )
})

const visible = ref(true)
const showWithdrawal = ref(false)
const showPocketModal = ref(false)

const actions = ref([
  { icon: 'home-icon', label: 'To Bank', value: 'withdrawal' },
  { icon: 'mail-sender', label: 'To Pocket', value: 'transfer' },
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
const withdrawToBank = () => {
  if (!profile.value.bank.accountName) {
    toast.success('Please Add your bank details to proceed with withdrawal', {
      position: 'top',
      duration: 6000,
    })
    return router.push({ name: ROUTES.profile.name, query: { bank_account: 'true' } })
  }
  showWithdrawal.value = true
}

const transferToBank = async (amount: string | number) => {
  authStore.toggleLoader()
  const res = await transactionStore.rewardsTransferToBank({
    amount,
  })

  if (res) {
    await transactionStore.getWalletBalance()
    toast.success('Your withdrawal Request is submitted and will be processed within 24hrs', {
      position: 'top',
      duration: 6000,
    })
  }

  authStore.toggleLoader()
}
</script>
