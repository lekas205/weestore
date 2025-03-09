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

      <v-tabs v-model="tab" align-tabs="center" color="#FA4A0C" slider-color="#FA4A0C">
        <v-tab
          :value="category"
          v-for="(category, index) in categories"
          :key="index"
          class="tw-text-grey !tw-text-[17px] !tw-capitalize"
          >{{ category }}</v-tab
        >
      </v-tabs>

      <v-tab-item v-if="tab === 'pasta'">
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
          <swiper-slide class="product-slide">
            <div class="tw-h-[310px] tw-w-[182px]">
              <ProductCard @show-product-details="showProductDetails" />
            </div>
          </swiper-slide>
          <swiper-slide class="product-slide">
            <div class="tw-h-[310px] tw-w-[182px]"><ProductCard /></div
          ></swiper-slide>
          <swiper-slide class="product-slide">
            <div class="tw-h-[310px] tw-w-[182px]"><ProductCard /></div
          ></swiper-slide>
          <swiper-slide class="product-slide">
            <div class="tw-h-[310px] tw-w-[182px]"><ProductCard /></div>
          </swiper-slide>
        </swiper>
      </v-tab-item>
    </div>
    <AppBottomBar />
    <ProductDetails v-model:show="showDetails" :product="productDetails" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import ProductDetails from '@/components/Global/ProductDetails.vue'
import ProductCard from '@/components/Global/ProductCard.vue'
import AppHeader from '@/components/Global/AppHeader.vue'
import AppBottomBar from '@/components/Global/AppBottomBar.vue'

const tab = ref('')
const showDetails = ref(false)
const productDetails = ref({})
const categories = ref(['pasta', 'noodles', 'semovita', 'oil'])

import { Pagination } from 'swiper/modules'

const showProductDetails = (product: any) => {
  productDetails.value = product
  showDetails.value = true
}
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
