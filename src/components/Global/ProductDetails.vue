<template>
  <v-layout>
    <v-navigation-drawer v-model="showDrawer" temporary :width="450" color="#F4F4F8">
      <section class="tw-p-5 tw-flex tw-flex-col">
        <AppHeader back @go-back="showDrawer = false" />

        <swiper
          :slidesPerView="'auto'"
          :centeredSlides="true"
          :spaceBetween="70"
          :pagination="{
            clickable: true,
          }"
          :modules="[Pagination]"
          class="mySwiper mt-10"
        >
          <swiper-slide v-for="i in 5" :key="i">
            <img
              src="https://plus.unsplash.com/premium_photo-1740708549031-fd00d8821c5b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8"
              alt="Product Image"
              class="tw-object-cover tw-mx-auto tw-h-[250px]"
            />
          </swiper-slide>
        </swiper>
        <div class="tw-w-full tw-px-10 tw-py-8 text-center bg-white tw-rounded-2xl">
          <h3 class="tw-text-[25px]">Spagettini Fat</h3>
          <p class="tw-text-primary tw-text-[20px]">As at today</p>

          <section class="tw-flex tw-flex-col tw-gap-3 mt-2">
            <div class="tw-flex tw-justify-between tw-items-center">
              <p class="text">Unit Price</p>
              <p class="tw-text-success tw-text-[20px]">N20,700</p>
            </div>
            <div class="tw-flex tw-justify-between tw-items-center">
              <p>Min. Qty</p>
              <QuantityStepper />
            </div>
            <div class="tw-flex tw-justify-between tw-items-center">
              <p>Total Price</p>
              <p class="tw-text-primary tw-text-[20px]">N20,700</p>
            </div>
          </section>
        </div>

        <section>
          <section class="tw-mt-5">
            <h4 class="tw-text-[20px]">Product Description</h4>
            <small class="tw-text-[16px] tw-opacity-50"
              >WHP is estimated at minimum of 5 months with 10% dividends.</small
            >
          </section>
          <div class="tw-flex tw-flex-col tw-mt-10">
            <v-btn class="tw-mt-auto !tw-h-[70px] !tw-rounded-full" color="#FA4A0C">
              Add to cart</v-btn
            >
          </div>
        </section>

        <section class="tw-flex tw-flex-col tw-gap-4">
          <div class="tw-flex tw-justify-between tw-w-full">
            <p class="tw-text-[18px]">Purchase Amount</p>
            <p class="tw-text-[18px]">N21,700</p>
          </div>

          <div class="tw-flex tw-justify-between tw-w-full">
            <p class="tw-text-[18px]">Procurement Date</p>
            <p class="tw-text-[18px]">12/1/2025</p>
          </div>

          <div class="tw-flex tw-justify-between tw-w-full">
            <p class="tw-text-[18px]">WHP</p>
            <p class="tw-text-[18px]">5</p>
          </div>
        </section>

        <section class="tw-flex tw-flex-col tw-gap-5 mt-5 pb-6">
          <v-btn
            @click="showPocketModal = true"
            class="tw-mt-auto !tw-h-[70px] !tw-text-[14px] !tw-leading-6 !tw-rounded-full"
            color="#FA4A0C"
          >
            Transfer To Pocket for Restocking. <br />
            Balance - N21,700
          </v-btn>

          <v-btn
            @click="showWithdrawal = true"
            class="tw-mt-auto !tw-h-[70px] !tw-text-[14px] !tw-leading-6 !tw-rounded-full"
            color="#FADBD094"
          >
            Withdraw To Bank. <br />
            Balance - N21,700
          </v-btn>
        </section>
      </section>
    </v-navigation-drawer>
  </v-layout>

  <Withdrawal v-model:show="showWithdrawal" />
  <PocketTransfer v-model:show="showPocketModal" />
</template>

<script lang="ts" setup>
import AppHeader from '@/components/Global/AppHeader.vue'
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import QuantityStepper from './QuantityStepper.vue'
import Withdrawal from '@/components/Modals/Withdrawal.vue'
import PocketTransfer from '@/components/Modals/PocketTransfer.vue'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

const showDrawer = computed({
  get() {
    return props.show
  },
  set(value) {
    emit('update:show', value)
  },
})

const showWithdrawal = ref(false)
const showPocketModal = ref(false)
</script>

<style>
.swiper-slide {
  height: 300px;
}
</style>
