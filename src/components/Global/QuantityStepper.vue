<template>
  <div class="tw-flex tw-gap-3 tw-bg-primary tw-text-white px-2 py-1 tw-rounded-full">
    <button
      @click="count--"
      :disabled="count === 1 || props.minQty == count"
      class="disabled:tw-opacity-50"
    >
      <img src="@/assets/images/svgs/minus.svg" alt="" />
    </button>
    <p class="tw-font-semibold">{{ count }}</p>
    <button @click="count++" :disabled="count === props.maxQty" class="disabled:tw-opacity-50">
      <img src="@/assets/images/svgs/plus.svg" alt="" />
    </button>
  </div>
</template>

<script setup lang="ts">
const count: any = defineModel()

const props = defineProps<{
  maxQty: number
  minQty: number
}>()
</script>
