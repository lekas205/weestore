<template>
  <v-skeleton-loader
    :loading="loading"
    v-if="loading"
    height="200px"
    type="image, list-item-two-line"
  >
  </v-skeleton-loader>

  <div
    v-else
    class="tw-bg-white tw-py-8 tw-px-2 tw-w-full tw-rounded-[25px] tw-relative tw-shadow-lg tw-text-center tw-flex tw-flex-col tw-justify-center tw-items-center tw-mt-[100px]"
    @click="openDetails"
  >
    <img
      :src="productImage"
      alt="Product Image"
      class="tw-rounded-full tw-object-cover tw-mt-[-100px]"
      :class="{
        'tw-w-[152px] tw-h-[152px]': size === 'large',
        'tw-w-[120px] tw-h-[120px]': size === 'small',
      }"
    />
    <div class="">
      <p class="tw-text-[19px] mt-5 mx-auto tw-leading-7 tw-mb-2 tw-truncate tw-w-[150px]">
        {{ product?.product_name }}
      </p>
      <p class="tw-text-primary tw-text-[17px]">{{ formatAsMoney(product.price) }}</p>
      <p class="tw-text-success tw-mt-2 tw-text-[17px]">Available</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Products } from '@/types'
import { formatAsMoney } from '@/utils/helpers.ts'
import { computed } from 'vue'

const props = defineProps<{
  size: 'large' | 'small'
  product: Products | any
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'showProductDetails', val: Products): void
}>()

const openDetails = () => {
  if (!props.product) return
  emit('showProductDetails', props.product)
}

const productImage = computed(() => props.product.images.find((i: any) => i.isPrimary)?.imageUrl)
</script>

<style scoped>
.v-skeleton-loader {
  margin-top: 100px;
  border-radius: 18px;
}

:deep(.v-skeleton-loader__image) {
  height: 170px;
  border-radius: 50%;
  margin-top: -80px;
}
</style>
