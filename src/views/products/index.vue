<template>
  <AppHeader />

  <section class="mt-5">
    <section v-if="orders?.row?.length">
      <h1 class="tw-text-[26px]">My Products</h1>
      <template v-for="(item, index) in orders?.rows" :key="index">
        <ProductItem
          v-for="(order, idx) in item?.orderItems"
          :key="idx + 'aaa'"
          @click="showProductDetails(item)"
          url="https://plus.unsplash.com/premium_photo-1740708549031-fd00d8821c5b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8"
        >
          <div class="tw-flex tw-justify-between tw-w-full tw-items-center">
            <p class="tw-text-[18px] tw-w-[100px]">{{ order.product_name }}</p>

            <div class="tw-text-primary text-center">
              <p class="tw-text-[17px]">Value</p>
              <p class="tw-text-[18px] tw-font-semibold">{{ formatAsMoney(order.amount) }}</p>
            </div>

            <div class="tw-text-primary text-center">
              <p class="tw-text-[17px]">Unit</p>
              <p class="tw-text-[18px] tw-font-semibold">{{ order.quantity }}</p>
            </div>
          </div>
        </ProductItem>
      </template>
    </section>
    <div class="tw-flex tw-flex-col tw-items-center tw-justify-center my-auto tw-h-[75vh]" v-else>
      <img src="@/assets/images/svgs/large-calendar.svg" alt="" />
      <h2 class="tw-text-[28px] mt-4 mb-3">No Products yet</h2>
      <p class="tw-w-[60%] text-center mx-auto tw-text-[17px] tw-opacity-50">
        Hit the button below to Create an order
      </p>
      <v-btn
        class="!tw-h-[70px] !tw-rounded-full tw-w-full mt-4"
        color="primary"
        @click="router.push('/home')"
      >
        Place Order</v-btn
      >
    </div>
    <ProductDetails v-model:show="showDetails" :product="productDetails" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import type { Products } from '@/types'
import { useRouter } from 'vue-router'
import { formatAsMoney } from '@/utils/helpers.ts'
import AppHeader from '@/components/Global/AppHeader.vue'
import ProductItem from '@/components/Global/ProductItem.vue'
import ProductDetails from '@/components/Global/ProductDetails.vue'
import { useProductsStore } from '@/stores/products.ts'

const router = useRouter()
const productStore = useProductsStore()
const { orders } = storeToRefs(productStore)

const showDetails = ref(false)
const productDetails = ref<Products>({} as Products)

const showProductDetails = (product: Products) => {
  productDetails.value = product
  showDetails.value = true
}

onMounted(async () => {
  await productStore.fetchCustomerOrder()
})
</script>
