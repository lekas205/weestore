<template>
  <AppHeader />
  <div class="tw-flex mt-2 tw-justify-between tw-gap-5 mt-5">
    <div
      v-for="tab in tabs"
      :key="tab"
      class="tw-py-3 tw-rounded-lg tw-bg-white tw-w-full tw-text-center tw-duration-300 tw-transition tw-capitalize tw-ease-in-out"
      :class="{
        'tw-bg-gradient-to-r tw-from-[#FF8D19] tw-to-[#FF375F] tw-text-white': activeTab === tab,
      }"
      @click="activeTab = tab"
    >
      {{ tab }}
    </div>
  </div>

  <PocketView v-if="activeTab === 'pocket'" />
  <RewardView v-else />

  <swiper
    :slidesPerView="'auto'"
    :centeredSlides="true"
    :modules="[Pagination]"
    class="mySwiper mt-10"
  >
    <swiper-slide v-for="(image, index) in bannerImages" :key="index">
      <img
        :src="imagePath(image)"
        alt="Product Image"
        class="tw-object-cover tw-mx-auto tw-h-[250px] tw-w-full"
      />
    </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PocketView from './components/PocketView.vue'
import RewardView from './components/RewardView.vue'
import AppHeader from '@/components/Global/AppHeader.vue'
import { useAuthStore } from '@/stores/auth'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import { useTransactionStore } from '@/stores//transaction.ts'

const authStore = useAuthStore()
const transactionStore = useTransactionStore()

const bannerImages = ['wallet-banner-1', 'wallet-banner-2', 'wallet-banner-3']

const imagePath = (path: string) => {
  return new URL(`../../assets/images/png/${path}.jpeg`, import.meta.url).href
}
const tabs = ref(['pocket', 'reward'])
const activeTab = ref('pocket')

const getWalletBallance = async () => {
  authStore.toggleLoader()
  await transactionStore.getWalletBalance()
  authStore.toggleLoader()
}

onMounted(() => {
  getWalletBallance()
})
</script>

<style scoped>
.swiper {
  height: 300px !important;
}
.swiper-slide {
  height: 250px;
}
</style>
