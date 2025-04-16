<template>
  <div>
    <AppHeader />
    <div class="mt-10">
      <h1 class="tw-text-[34px] mb-4">
        Fast Selling <br />
        FMCG for you
      </h1>

      <div class="mb-6">
        <input
          placeholder="Search"
          class="tw-px-10 tw-py-4 tw-w-full tw-text-[20px] tw-rounded-full tw-shadow-lg tw-bg-white tw-outline-primary"
        />
      </div>

      <v-tabs v-model="tab" align-tabs="center" color="primary" slider-color="primary">
        <v-tab
          :value="category.id"
          v-for="(category, index) in categories"
          :key="index"
          class="tw-text-grey !tw-text-[17px] !tw-capitalize"
          >{{ category.name }}</v-tab
        >
      </v-tabs>
      <template v-for="(category, index) in categories" :key="index">
        <v-tab-item v-if="tab === category.id">
          <swiper
            :loop="true"
            :slidesPerView="2"
            :spaceBetween="70"
            :pagination="{
              clickable: true,
            }"
            :modules="[Pagination]"
            class="mySwiper"
          >
            <swiper-slide class="product-slide" v-for="(product, index) in products" :key="index">
              <div class="tw-h-[310px] tw-w-[182px]">
                <ProductCard
                  size="large"
                  :product="product"
                  @show-product-details="showProductDetails"
                />
              </div>
            </swiper-slide>
          </swiper>
        </v-tab-item>
      </template>
    </div>
    <AppBottomBar />
    <ProductDetails v-model:show="showDetails" :product="productDetails" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import type { Products } from '@/types'
import { Swiper, SwiperSlide } from 'swiper/vue'
import ProductDetails from '@/components/Global/ProductDetails.vue'
import ProductCard from '@/components/Global/ProductCard.vue'
import AppHeader from '@/components/Global/AppHeader.vue'
import AppBottomBar from '@/components/Global/AppBottomBar.vue'
import { useProductsStore } from '@/stores/products.ts'

const productStore = useProductsStore()
const { products, categories } = storeToRefs(productStore)

const tab = ref('')
const showDetails = ref(false)
const productDetails = ref<Products>({} as Products)

import { Pagination } from 'swiper/modules'

const showProductDetails = (product: Products) => {
  productDetails.value = product
  showDetails.value = true
}

onMounted(async () => {
  if (!categories.value.length) {
    await productStore.fetchCategories()
    await productStore.fetchProducts({
      categoryId: categories.value[0].id,
    })
  }
})
</script>

<style>
.v-slide-group {
  margin-bottom: 30px !important;
}

.swiper {
  height: 400px;
}
.product-slide {
  width: 200px;
}
</style>
