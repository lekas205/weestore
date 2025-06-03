<template>
  <div class="tw-mt-10">
    <div
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
    </div>

    <div class="tw-flex tw-flex-wrap tw-justify-between tw-gap-x-4 tw-gap-y-5 mt-8">
      <div
        class="tw-bg-white tw-rounded-xl tw-p-3 text-center tw-shadow-md tw-w-[47%] tw-flex tw-flex-col tw-h-[110px] tw-justify-center"
        v-for="(item, index) in actions"
        :key="index"
        @click="handleAction(item.value)"
      >
        <img :src="extractImgUrl(item.icon)" alt="" class="mx-auto" />
        <p class="tw-text-success mt-2">{{ item.label }}</p>
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

const showTopupModal = ref(false)
const actions = ref([
  { icon: 'money', label: 'Top up', value: 'top-up' },
  { icon: 'gift', label: 'Restock', value: 'buy-marketplace' },
  { icon: 'wallet', label: 'Buy Groceries', value: 'buy-groceries' },
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
  }
}
</script>
