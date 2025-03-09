<template>
  <AppHeader />

  <section class="mt-5">
    <h1 class="tw-text-[26px]">My Products</h1>

    <ProductItem
      v-for="i in 4"
      :key="i"
      @click="showProductDetails"
      url="https://plus.unsplash.com/premium_photo-1740708549031-fd00d8821c5b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8"
    >
      <div class="tw-flex tw-justify-between tw-w-full tw-items-center">
        <p class="tw-text-[18px] tw-w-[100px]">Spagettini Fat</p>

        <div class="tw-text-primary text-center">
          <p class="tw-text-[17px]">Value</p>
          <p class="tw-text-[18px] tw-font-semibold">N20,700</p>
        </div>

        <div class="tw-text-primary text-center">
          <p class="tw-text-[17px]">Unit</p>
          <p class="tw-text-[18px] tw-font-semibold">3</p>
        </div>
      </div>
    </ProductItem>
    <ProductDetails v-model:show="showDetails" :product="productDetails" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/Global/AppHeader.vue'
import ProductItem from '@/components/Global/ProductItem.vue'
import ProductDetails from '@/components/Global/ProductDetails.vue'

const showDetails = ref(false)
const productDetails = ref({})

const showProductDetails = (product: any) => {
  productDetails.value = product
  showDetails.value = true
}
</script>
