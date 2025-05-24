<template>
  <AppHeader />

  <section>
    <section v-if="orders?.rows?.length">
      <h1 class="tw-text-[26px] tw-mb-3">My Products</h1>
      <ProductItem
        v-for="(order, idx) in orders?.rows"
        :key="idx + 'aaa'"
        @click="showProductDetails(order)"
        :url="order.image"
      >
        <div class="tw-flex tw-justify-between tw-w-full tw-items-center">
          <p class="tw-text-[18px] tw-w-[100px]">{{ order.product_name }}</p>

          <div class="tw-text-primary text-center">
            <p class="tw-text-[17px]">Value</p>
            <p class="tw-text-[18px] tw-font-semibold">{{ formatAsMoney(order.total) }}</p>
          </div>

          <div class="tw-text-primary text-center">
            <p class="tw-text-[17px]">Unit</p>
            <p class="tw-text-[18px] tw-font-semibold">{{ order.quantity }}</p>
          </div>
        </div>
      </ProductItem>
    </section>
    <div class="tw-flex tw-flex-col tw-items-center tw-justify-center my-auto tw-h-[75vh]" v-else>
      <img src="@/assets/images/svgs/gift.svg" alt="" width="150px" />
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
    <ProductDetails v-model:show="showDetails" :product="productDetails" isPurchased />
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
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

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
  authStore.toggleLoader()
  await productStore.fetchCustomerOrder()
  authStore.toggleLoader()
})
</script>
