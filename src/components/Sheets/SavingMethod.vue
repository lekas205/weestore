<template>
  <div class="text-left tw-mt-8">
    <h4 class="tw-font-semibold mb-2">How do you want to save to buy?</h4>
    <p class="tw-text-[13px]">Pick the option that works best for you.</p>

    <div class="mt-8">
      <div
        v-for="(item, index) in methods"
        :key="index"
        @click="selected = item"
        class="tw-rounded-[15px] tw-bg-white tw-px-3 tw-py-4 tw-shadow-lg tw-flex tw-items-center tw-gap-3 tw-mb-4"
      >
        <div
          class="tw-flex tw-justify-center tw-items-center tw-h-[20px] tw-w-[20px] tw-border tw-border-primary tw-rounded-full"
        >
          <div
            class="tw-bg-primary tw-h-[9px] tw-w-[9px] tw-rounded-full"
            v-if="selected === item"
          ></div>
        </div>
        {{ item }}
      </div>
    </div>

    <v-btn
      class="tw-my-10 tw-w-full !tw-h-[50px] !tw-rounded-full"
      color="primary"
      @click="emits('next', selected)"
    >
      Continue
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selected = ref('Manual')
const methods = ref(['Manual', 'Auto-debit'])

const emits = defineEmits<{
  (e: 'next', value: string): void
}>()
</script>
