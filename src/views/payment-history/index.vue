<template>
  <AppHeader title="Payment History" />

  <div class="mt-6 tw-h-[calc(100vh-9rem)] tw-flex tw-flex-col">
    <!-- <section
      class="tw-bg-white tw-flex tw-justify-between tw-rounded-tr-3xl tw-rounded-tl-3xl tw-p-4"
    >
      <h2 class="tw-text-[24px] tw-font-semibold">07 Apr, 2025</h2>
      <img src="@/assets/images/svgs/calendar.svg" alt="" />
    </section> -->

    <section class="tw-bg-white px-4 py-6 mt-4" v-if="transactions?.rows?.length">
      <div
        class="tw-flex tw-justify-between tw-mb-5 !tw-last:mb-0"
        v-for="(trans, index) in transactions.rows"
        :key="index"
      >
        <div class="">
          <h3 class="tw-font-medium tw-text-[18px]">{{ trans.purpose }}</h3>
          <p class="tw-text-[16px] tw-opacity-50">{{ trans.date }}</p>
        </div>
        <div class="">
          <h3 class="tw-font-medium tw-text-[18px]">{{ formatAsMoney(trans.amount) }}</h3>
          <p class="tw-text-[16px] tw-opacity-50">{{ trans.position }}</p>
        </div>
      </div>
    </section>

    <!-- empty state -->
    <template v-else>
      <div class="tw-flex tw-flex-col tw-items-center tw-justify-center my-auto">
        <img src="@/assets/images/svgs/large-calendar.svg" alt="" />
        <h2 class="tw-text-[28px] mt-4 mb-3">No history yet</h2>
        <p class="tw-w-[60%] text-center mx-auto tw-text-[17px] tw-opacity-50">
          Hit the button below to Create an order
        </p>
      </div>

      <v-btn class="!tw-h-[70px] !tw-rounded-full mt-auto" color="primary">
        Continue Ordering</v-btn
      >
    </template>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import AppHeader from '@/components/Global/AppHeader.vue'

import { useTransactionStore } from '@/stores//transaction.ts'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { formatAsMoney, formatDate } from '@/utils/helpers'

const authStore = useAuthStore()
const transactionStore = useTransactionStore()
const { transactions } = storeToRefs(transactionStore)

onMounted(async () => {
  authStore.toggleLoader()

  await transactionStore.fetchTransactions()
  console.log(transactions)

  authStore.toggleLoader()
})
</script>
