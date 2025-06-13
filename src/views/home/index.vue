<template>
  <div>
    <AppHeader />
    <div class="mt-5">
      <img
        src="@/assets/images/png/restock-banner.png"
        alt="Product Image"
        class="tw-object-cover tw-mx-auto tw-h-[70px] tw-w-full mb-4"
      />
      <!-- <h1 class="tw-text-[34px] mb-4">
        Fast Selling <br />
        FMCG for you
      </h1> -->

      <div class="mb-6">
        <input
          placeholder="Search"
          @keyup="searchProduct"
          v-model="search"
          class="tw-px-10 tw-py-4 tw-w-full tw-text-[20px] tw-rounded-full tw-shadow-lg tw-bg-white tw-outline-primary"
        />
      </div>

      <v-tabs v-model="tab" align-tabs="center" color="primary" slider-color="primary">
        <v-tab
          :value="category?.id"
          v-for="(category, index) in convertedCategories.filter(
            (cat) => cat?.name.toLowerCase() !== 'groceries',
          )"
          :key="index"
          class="tw-text-grey !tw-text-[17px] !tw-capitalize"
          >{{ category?.name }}</v-tab
        >
      </v-tabs>
      <template v-for="(category, index) in convertedCategories" :key="index">
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
              v-for="(product, index) in !loading ? convertedProducts : 2"
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
      <div
        class="tw-flex tw-flex-col tw-items-center tw-justify-center my-auto tw-h-[25vh]"
        v-if="!convertedCategories.length"
      >
        <img src="@/assets/images/svgs/gift.svg" alt="" width="150px" />
        <h2 class="tw-text-[28px] mt-4 mb-3">No Result</h2>
        <p class="tw-w-[90%] text-center mx-auto tw-text-[17px] tw-opacity-50">
          The is no product that match your search keyword.
        </p>
      </div>
    </div>
    <ProductDetails v-model:show="showDetails" :product="productDetails" />
  </div>
</template>

<script setup lang="ts">
import __ from 'lodash'
import { ref, watch, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import type { Products } from '@/types'
import { Swiper, SwiperSlide } from 'swiper/vue'
import ProductDetails from '@/components/Global/ProductDetails.vue'
import ProductCard from '@/components/Global/ProductCard.vue'
import AppHeader from '@/components/Global/AppHeader.vue'
import { useProductsStore } from '@/stores/products.ts'
import { useAuthStore } from '@/stores/auth'
import { Pagination } from 'swiper/modules'

const authStore = useAuthStore()
const productStore = useProductsStore()
const { products, categories } = storeToRefs(productStore)

const tab = ref('')
const loading = ref(false)
const showDetails = ref(false)
const searched = ref(false)
const productDetails = ref<Products>({} as Products)

const search = ref('')
const showProductDetails = (product: Products) => {
  productDetails.value = product
  showDetails.value = true
}

watch(tab, async (newTab, oldTab) => {
  if (newTab && oldTab !== '') {
    loading.value = true
    await productStore.fetchProducts({
      categoryId: newTab,
      search: search.value,
    })
    loading.value = false
  }
})

const convertedCategories = computed(() => {
  return search.value.length && searched.value
    ? products.value
        .map((product) => {
          if (product.category.toLowerCase() != 'groceries') {
            return {
              name: product.category,
              id: product.category_id,
            }
          }
        })
        .filter((elm) => elm != undefined)
    : categories.value
})

const convertedProducts = computed(() => {
  return convertedCategories.value.length && searched.value
    ? products.value.filter((product) => product.category_id === convertedCategories.value[0].id)
    : products.value
})

const fetchData = async () => {
  if (!categories.value.length) {
    await productStore.fetchCategories()
  }

  const getFirstCategory = categories.value.filter(
    (category) => category.name.toLowerCase() !== 'groceries',
  )
  await productStore.fetchProducts({
    categoryId: getFirstCategory[0].id,
  })

  tab.value = getFirstCategory[0].id
}

const searchProduct = __.debounce(async function () {
  authStore.toggleLoader()
  if (search.value.length) {
    await productStore.fetchProducts({
      search: search.value,
    })

    if (search.value.length > 0) {
      searched.value = true
    } else {
      searched.value = false
    }
  } else {
    searched.value = false
    await fetchData()
  }

  authStore.toggleLoader()
}, 500)

onMounted(async () => {
  authStore.toggleLoader()
  await fetchData()
  authStore.toggleLoader()
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
