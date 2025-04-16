<template>
  <div class="tw-flex tw-gap-3 tw-bg-primary tw-text-white px-2 py-1 tw-rounded-full">
    <button @click="count--" :disabled="count === 1">
      <img src="@/assets/images/svgs/minus.svg" alt="" />
    </button>
    <p class="tw-font-semibold">{{ count }}</p>
    <button @click="count++">
      <img src="@/assets/images/svgs/plus.svg" alt="" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const count = ref(1)

const emits = defineEmits<{
  (e: 'update:modelValue', val: number): void
}>()

watch(
  () => count.value,
  (newCount: number) => {
    if (newCount) {
      emits('update:modelValue', newCount)
    }
  },
)
</script>
