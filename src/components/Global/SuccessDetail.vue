<template>
  <div class="text-center">
    <img src="../../assets/images/svgs/check-icon.svg" alt="" width="80px" class="mx-auto mb-3" />
    <h2 class="tw-text-[20px] tw-font-semibold mb-1">{{ props.title }}!</h2>
    <p v-if="$props.text" class="tw-text-[14px]">{{ props.text }}</p>

    <div class="tw-mt-[30px]">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  text?: string
}>()
</script>
