<template>
  <div>
    <AppHeader />
    <div>
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
          v-for="(category, index) in categories.filter(
            (cat) => cat.name.toLowerCase() !== 'groceries',
          )"
          :key="index"
          class="tw-text-grey !tw-text-[17px] !tw-capitalize"
          >{{ category.name }}</v-tab
        >
      </v-tabs>
      <template v-for="(category, index) in categories" :key="index">
        <v-tab-item v-if="tab === category.id">
          <swiper
            :slidesPerView="2"
            :spaceBetween="70"
            :autoplay="{
              delay: 2500,
              disableOnInteraction: false,
            }"
            :pagination="{
              clickable: true,
            }"
            :modules="[Pagination]"
            class="mySwiper"
          >
            <swiper-slide
              class="product-slide"
              v-for="(product, index) in !loading ? products : 2"
              :key="index"
            >
              <div class="tw-h-[310px] tw-w-[182px]">
                <ProductCard
                  size="large"
                  :product="!loading ? product : null"
                  :loading="loading"
                  @show-product-details="showProductDetails"
                />
              </div>
            </swiper-slide>
          </swiper>
        </v-tab-item>
      </template>
    </div>
    <ProductDetails v-model:show="showDetails" :product="productDetails" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import type { Products } from '@/types'
import { Swiper, SwiperSlide } from 'swiper/vue'
import ProductDetails from '@/components/Global/ProductDetails.vue'
import ProductCard from '@/components/Global/ProductCard.vue'
import AppHeader from '@/components/Global/AppHeader.vue'
import { useProductsStore } from '@/stores/products.ts'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const productStore = useProductsStore()
const { products, categories } = storeToRefs(productStore)

const tab = ref('')
const loading = ref(false)
const showDetails = ref(false)
const productDetails = ref<Products>({} as Products)

import { Pagination } from 'swiper/modules'

const showProductDetails = (product: Products) => {
  productDetails.value = product
  showDetails.value = true
}

watch(tab, async (newTab, oldTab) => {
  if (newTab && oldTab !== '') {
    loading.value = true
    await productStore.fetchProducts({
      categoryId: newTab,
    })
    loading.value = false
  }
})

onMounted(async () => {
  if (!categories.value.length) {
    authStore.toggleLoader()
    await productStore.fetchCategories()

    const getFirstCategory = categories.value.filter(
      (category) => category.name.toLowerCase() !== 'groceries',
    )
    await productStore.fetchProducts({
      categoryId: getFirstCategory[0].id,
    })

    tab.value = getFirstCategory[0].id
    authStore.toggleLoader()
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
