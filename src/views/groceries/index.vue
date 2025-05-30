<template>
  <div>
    <AppHeader />
    <template v-if="products.length">
      <div class="mt-2">
        <h1 class="tw-text-[34px] mb-4">
          Explore our <br />
          Farm Produce
        </h1>

        <div class="mb-6">
          <input
            placeholder="Search"
            class="tw-px-10 tw-py-4 tw-w-full tw-text-[20px] tw-rounded-full tw-shadow-lg tw-bg-white !tw-outline-primary"
          />
        </div>
      </div>

      <v-row>
        <v-col cols="6" v-for="(prod, index) in products" :key="index">
          <ProductCard size="small" :product="prod" @show-product-details="showProductDetails" />
        </v-col>
      </v-row>

      <ProductDetails v-model:show="showDetails" :product="productDetails" />
    </template>
    <div class="tw-flex tw-flex-col tw-items-center tw-justify-center my-auto tw-h-[75vh]" v-else>
      <img src="@/assets/images/svgs/gift.svg" alt="" width="150px" />
      <h2 class="tw-text-[28px] mt-4 mb-3">No Groceries created yet</h2>
      <p class="text-center mx-auto tw-text-[17px] tw-opacity-50">
        When groceries is created, it will be displayed here
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { Products } from '@/types'
import AppHeader from '@/components/Global/AppHeader.vue'
import ProductCard from '@/components/Global/ProductCard.vue'
import ProductDetails from '@/components/Global/ProductDetails.vue'
import { useProductsStore } from '@/stores/products.ts'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const productStore = useProductsStore()
const { products, categories } = storeToRefs(productStore)
const showDetails = ref(false)
const productDetails = ref<Products>({} as Products)

const showProductDetails = (product: Products) => {
  productDetails.value = product
  showDetails.value = true
}

const fetchCategories = async () => {
  const categoryId = categories.value.find((elm) => elm.name.toLowerCase() === 'groceries')?.id
  if (categoryId) {
    authStore.toggleLoader()
    await productStore.fetchProducts({
      categoryId: categoryId,
    })
    authStore.toggleLoader()
  }
}

onMounted(async () => {
  if (categories.value.length) {
    fetchCategories()
  } else {
    authStore.toggleLoader()
    await productStore.fetchCategories()
    fetchCategories()
    authStore.toggleLoader()
  }
})
</script>
