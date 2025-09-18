<template>
  <div class="text-left tw-mt-8">
    <h4 class="tw-font-semibold mb-2">Savings Plan Summary</h4>

    <div class="mt-8 tw-flex tw-flex-wrap tw-gap-y-6">
      <div class="tw-w-1/2">
        <small>Target Savings</small>
        <p class="tw-text-primary tw-font-medium tw-text-[24px]">{{ formatAsMoney(3000) }}</p>
      </div>
      <div class="tw-w-1/2 text-right">
        <small>Savings Duration</small>
        <p class="tw-text-primary tw-font-medium tw-text-[24px]">3 Months</p>
      </div>

      <div class="tw-w-1/2">
        <small>Savings Per Time</small>
        <p class="tw-text-primary tw-font-medium tw-text-[24px]">{{ formatAsMoney(3000) }}</p>
      </div>

      <div class="tw-w-1/2 text-right">
        <small>Interest</small>
        <p class="tw-text-primary tw-font-medium tw-text-[24px]">5%</p>
      </div>

      <div class="tw-w-1/2">
        <small>Saving Frequency</small>
        <p class="tw-text-primary tw-font-medium tw-text-[24px]">Daily</p>
      </div>
    </div>

    <v-btn
      class="tw-mt-10 tw-w-full !tw-h-[50px] !tw-rounded-full"
      color="primary"
      @click="emits('next', selected)"
    >
      Start
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatAsMoney } from '@/utils/helpers.ts'

const selected = ref('Manual')
const methods = ref(['Manual', 'Auto-debit'])

const emits = defineEmits<{
  (e: 'next', value: string): void
}>()
</script>
