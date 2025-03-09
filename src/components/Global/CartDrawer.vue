<template>
  <v-layout>
    <v-navigation-drawer v-model="showDrawer" temporary :width="450" color="#F4F4F8">
      <section class="tw-p-5">
        <div class="tw-flex">
          <button @click="showDrawer = false">
            <img src="@/assets/images/svgs/back.svg" alt="hamburger" />
          </button>
          <p class="mx-auto tw-text-[18px]">Cart</p>
        </div>

        <section class="tw-mt-10">
          <ProductItem
            v-for="i in 3"
            :key="i"
            url="https://plus.unsplash.com/premium_photo-1740708549031-fd00d8821c5b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8"
          >
            <section class="tw-flex tw-justify-between tw-w-full">
              <div>
                <label class="tw-text-[18px]"> Spagettini Fat </label>
                <p class="tw-text-success">Qty 3</p>
                <div class="tw-flex tw-gap-6 tw-text-[16px] tw-text-success">
                  <p>Total Price</p>
                  <p>N20,700</p>
                </div>
              </div>
              <div class="tw-text-[18px] text-center">
                <p class="tw-text-[16px]">WHP</p>
                <p class="tw-text-success">5</p>
                <button class="tw-text-primary">Delete</button>
              </div>
            </section>
          </ProductItem>

          <div class="tw-bg-white py-5 tw-text-center tw-rounded-xl">
            <p class="tw-underline tw-mb-3">Total Cart Order</p>
            <h3 class="tw-text-success tw-text-[25px]">N41,400</h3>
          </div>

          <section class="my-4">
            <p class="tw-text-[18px] mb-3">Enter Delivery Address</p>
            <input
              placeholder="Ender Address"
              class="tw-px-10 tw-py-4 tw-w-full tw-text-[20px] tw-rounded-full tw-shadow-sm tw-bg-white tw-outline-primary"
            />
          </section>

          <PaymentMethods />
        </section>

        <div class="tw-flex tw-justify-between tw-mt-8 tw-pb-7">
          <v-btn
            class="tw-mt-auto !tw-h-[50px] !tw-rounded-full"
            color="#FA4A0C"
            @click="showOrderSuccess = true"
          >
            Complete Order</v-btn
          >
          <v-btn class="tw-mt-auto !tw-h-[50px] !tw-rounded-full" color="#FA4A0C">
            Continue Shopping</v-btn
          >
        </div>
      </section>
    </v-navigation-drawer>
  </v-layout>

  <OrderSuccess v-model:show="showOrderSuccess" />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import ProductItem from './ProductItem.vue'
import PaymentMethods from './PaymentMethods.vue'
import OrderSuccess from '../Modals/OrderSuccess.vue'

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

const showOrderSuccess = ref(false)
</script>

<style>
.swiper-slide {
  height: 300px;
}
</style>
