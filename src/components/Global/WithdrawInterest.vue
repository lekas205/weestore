<template>
  <div class="pt-5">
    <h2 class="py-4 tw-font-semibold">Withdraw Interest</h2>
    <label class="tw-text-[14px] mb-4">Amount</label>
    <v-text-field
      hide-details="auto"
      label="Enter Amount"
      type="text"
      v-model="amount"
    ></v-text-field>

    <v-btn
      class="!tw-h-[45px] tw-w-full !tw-rounded-full !tw-capitalize mt-9"
      color="primary"
      @click="emits('proceed', amount)"
    >
      Withdraw
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const amount = ref()

const emits = defineEmits<{
  (e: 'proceed', value: number | string): void
}>()
</script>
