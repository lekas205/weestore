<template>
  <div>
    <AppHeader />
    <template v-if="products.length || search.length">
      <swiper :slidesPerView="'auto'" :centeredSlides="true" class="mySwiper mt-6">
        <swiper-slide>
          <img
            src="@/assets/images/png/groceries-banner.png"
            alt="Product Image"
            class="tw-object-cover tw-mx-auto tw-h-[70px] tw-w-full"
          />
        </swiper-slide>
      </swiper>
      <div class="mt-5">
        <!-- <h1 class="tw-text-[34px] mb-4">Explore Our <br />Monthly Food Sharing</h1> -->

        <div class="mb-6">
          <input
            placeholder="Search"
            @keyup="searchGroceries"
            v-model="search"
            class="tw-px-10 tw-py-4 tw-w-full tw-text-[20px] tw-rounded-full tw-shadow-lg tw-bg-white !tw-outline-primary"
          />
        </div>
      </div>

      <v-row gutter="20">
        <v-col cols="6" v-for="(prod, index) in products" :key="index" class="!tw-p-2">
          <ProductCard size="small" :product="prod" @show-product-details="showProductDetails" />
        </v-col>
      </v-row>

      <div
        class="tw-flex tw-flex-col tw-items-center tw-justify-center my-auto tw-h-[40vh]"
        v-if="!products.length && search.length"
      >
        <img src="@/assets/images/svgs/gift.svg" alt="" width="150px" />
        <h2 class="tw-text-[28px] mt-4 mb-3">No Result</h2>
        <p class="tw-w-[90%] text-center mx-auto tw-text-[17px] tw-opacity-50">
          The is no product that match your search keyword.
        </p>
      </div>

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
import __ from 'lodash'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { Products } from '@/types'
import { Swiper, SwiperSlide } from 'swiper/vue'
import AppHeader from '@/components/Global/AppHeader.vue'
import ProductCard from '@/components/Global/ProductCard.vue'
import ProductDetails from '@/components/Global/ProductDetails.vue'
import { useProductsStore } from '@/stores/products.ts'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const productStore = useProductsStore()
const { products, categories } = storeToRefs(productStore)

const search = ref('')
const showDetails = ref(false)
const categoryId = ref()
const productDetails = ref<Products>({} as Products)

const showProductDetails = (product: Products) => {
  productDetails.value = product
  showDetails.value = true
}

const fetchProducts = async () => {
  categoryId.value = categories.value.find((elm) => elm.name.toLowerCase() === 'groceries')?.id
  if (categoryId.value) {
    authStore.toggleLoader()
    await productStore.fetchProducts({
      categoryId: categoryId.value,
      search: search.value,
    })
    authStore.toggleLoader()
  }
}

const searchGroceries = __.debounce(async function () {
  authStore.toggleLoader()
  fetchProducts()
  authStore.toggleLoader()
}, 500)

onMounted(async () => {
  if (categories.value.length) {
    fetchProducts()
  } else {
    authStore.toggleLoader()
    await productStore.fetchCategories()
    fetchProducts()
    authStore.toggleLoader()
  }
})
</script>
<style scoped>
.swiper {
  height: 70px !important;
}
.swiper-slide {
  height: 250px;
}
</style>
