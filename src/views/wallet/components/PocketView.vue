<template>
  <div class="tw-mt-10">
    <!-- <div
      class="text-white tw-bg-gradient-to-r tw-from-[#FF8D19] tw-to-[#FF375F] tw-p-4 tw-rounded-xl"
    >
      <div class="tw-flex tw-justify-between tw-mb-2">
        <p class="tw-text-[20px]">Wallet Bal</p>

        <h3 class="tw-text-[22px] tw-font-semibold">{{ formatAsMoney(getWalletBallance) }}</h3>
      </div>
      <div class="tw-flex tw-justify-between">
        <p>{{ formatDate(new Date()) }}</p>
        <img src="@/assets/images/svgs/mastercard.svg" alt="" />
      </div>
    </div> -->

    <div class="tw-relative">
      <img src="../../../assets/images/svgs/wallet-card.svg" class="tw-w-full" alt="" />
      <div
        class="tw-absolute tw-text-center tw-top-10 tw-text-white tw-left-1/2 tw--translate-x-1/2"
      >
        <h3 class="tw-text-[22px] tw-font-semibold">
          {{ visible ? formatAsMoney(getWalletBallance) : '*****' }}
        </h3>
        <p class="tw-text-[14px]">Wallet Balance</p>
        <button @click="visible = !visible">
          <v-icon color="white" icon="mdi-eye" size="small"></v-icon>
        </button>
      </div>
      <p class="tw-text-primary tw tw-text-[12px] tw-absolute tw-top-2 tw-right-5">
        {{ formatDate(new Date()) }}
      </p>
    </div>

    <div class="tw-flex tw-gap-x-2 tw-gap-y-5 mt-8 tw-bg-white tw-rounded-xl tw-rounded-x">
      <div
        class="tw-p-3 text-center x tw-flex tw-flex-col tw-justify-center"
        v-for="(item, index) in actions"
        :key="index"
        @click="handleAction(item.value)"
      >
        <section
          class="tw-flex tw-justify-center tw-items-center tw-bg-[#ff822293] tw-w-[55px] tw-h-[55px] tw-rounded-full mx-auto"
        >
          <!-- <div
            class="tw-flex tw-justify-center tw-items-center tw-bg-[#FF8124] tw-w-[32px] tw-h-[32px] tw-rounded-md"
          > -->
          <img :src="extractImgUrl(item.icon)" alt="" class="mx-auto tw-w-[30px]" />
          <!-- </div> -->
        </section>
        <p class="mt-2 tw-text-[14px]">{{ item.label }}</p>
      </div>
    </div>

    <TopupModal v-model:show="showTopupModal" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTransactionStore } from '@/stores//transaction.ts'
import { storeToRefs } from 'pinia'
import { formatAsMoney, formatDate } from '@/utils/helpers.ts'
import TopupModal from '@/components/Modals/TopupModal.vue'
import router from '@/router'
import { ROUTES } from '@/router/routes/routes'

const transactionStore = useTransactionStore()

const { wallets } = storeToRefs(transactionStore)

const getWalletBallance = computed(() => {
  return (
    wallets.value?.rows?.find((elm: any) => elm.wallet_type.toLowerCase() === 'pocket')?.amount || 0
  )
})

const visible = ref(true)
const showTopupModal = ref(false)
const actions = ref([
  { icon: 'money', label: 'Top up', value: 'top-up' },
  // { icon: 'gift', label: 'Restock', value: 'buy-marketplace' },
  { icon: 'wallet', label: 'Buy Groceries', value: 'buy-groceries' },
  { icon: 'seth', label: 'Save to Buy', value: 'savings' },
])

const extractImgUrl = (icon: string) => {
  return new URL(`/src/assets/images/svgs/${icon}.svg`, import.meta.url).href
}

const handleAction = (item: string) => {
  if (item === 'top-up') {
    showTopupModal.value = true
  } else if (item === 'buy-marketplace') {
    router.push({ name: ROUTES.home.name })
  } else if (item === 'buy-groceries') {
    router.push({ name: ROUTES.groceries.name })
  } else if (item === 'savings') {
    router.push({ name: ROUTES.savings.name })
  }
}
</script>
