<template>
  <div
    class="tw-bg-white tw-w-full py-5 px-4 tw-rounded-[20px] tw-p-6 tw-flex tw-gap-3 tw-mb-3 tw-shadow-sm"
  >
    <img :src="url" alt="Product Item" class="tw-rounded-full tw-h-[80px] tw-w-[80px]" />
    <slot />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  url: string
}>()
</script>
