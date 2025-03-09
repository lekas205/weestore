<template>
  <div
    class="tw-bg-white tw-py-8 tw-px-2 tw-w-full tw-rounded-[25px] tw-relative tw-shadow-lg tw-text-center tw-flex tw-flex-col tw-justify-center tw-items-center tw-mt-[100px]"
    @click="openDetails"
  >
    <img
      src="https://plus.unsplash.com/premium_photo-1740708549031-fd00d8821c5b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8"
      alt="Product Image"
      class="tw-w-[152px] tw-h-[152px] tw-rounded-full tw-object-cover tw-mt-[-100px]"
    />
    <div class="">
      <p class="tw-text-[22px] mt-5 mx-auto tw-leading-7 tw-mb-2">Spagettini Fat</p>
      <p class="tw-text-primary tw-text-[17px]">N20,700</p>
      <p class="tw-text-success tw-mt-2 tw-text-[17px]">Available</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  product: any
}>()

const emit = defineEmits<{
  (e: 'showProductDetails', val: any): void
}>()

const openDetails = () => {
  emit('showProductDetails', props.product)
}
</script>
