<template>
  <div
    class="tw-bg-white tw-items-center tw-w-full py-5 px-4 tw-rounded-[20px] tw-p-6 tw-flex tw-gap-3 tw-mb-3 tw-shadow-sm"
  >
    <img :src="url" alt="Product Item" class="tw-rounded-full tw-h-[60px] tw-w-[60px]" />
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  url: string
}>()
</script>
