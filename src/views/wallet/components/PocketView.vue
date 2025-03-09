<template>
  <div class="tw-mt-10">
    <div
      class="text-white tw-bg-gradient-to-r tw-from-[#FF8D19] tw-to-[#FF375F] tw-p-4 tw-rounded-xl"
    >
      <div class="tw-flex tw-justify-between tw-mb-2">
        <p class="tw-text-[20px]">Wallet Bal</p>
        <h3 class="tw-text-[22px] tw-font-semibold">N123,000</h3>
      </div>
      <div class="tw-flex tw-justify-between">
        <p>25 Jan, 2025</p>
        <img src="@/assets/images/svgs/mastercard.svg" alt="" />
      </div>
    </div>

    <div class="tw-flex tw-flex-wrap tw-justify-between tw-gap-x-4 tw-gap-y-5 mt-8">
      <div
        class="tw-bg-white tw-rounded-xl tw-p-3 text-center tw-shadow-md tw-w-[47%] tw-flex tw-flex-col tw-h-[110px] tw-justify-center"
        v-for="(item, index) in actions"
        :key="index"
      >
        <img :src="extractImgUrl(item.icon)" alt="" class="mx-auto" />
        <p class="tw-text-success mt-2">{{ item.label }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const actions = ref([
  { icon: 'money', label: 'Top up', value: 'top-up' },
  { icon: 'gift', label: 'Buy from Marketplace', value: 'buy-marketplace' },
  { icon: 'wallet', label: 'Buy Groceries', value: 'buy-groceries' },
])

const extractImgUrl = (icon: string) => {
  return new URL(`/src/assets/images/svgs/${icon}.svg`, import.meta.url).href
}
</script>
