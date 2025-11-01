<template>
  <div class="pt-5">
    <label class="tw-text-[14px] mb-4">How many unit do you want to Withdraw?</label>
    <v-text-field
      hide-details="auto"
      label="Enter amount"
      type="text"
      v-model="amount"
    ></v-text-field>

    <div
      class="tw-flex tw-justify-between tw-items-center mt-4 pb-4 tw-border-b tw-border-gray-300 mb-7"
    >
      <div class="">
        <p class="tw-text-[12px]">Access Bank</p>
        <small>Olalekan Michael Adeyingbo</small>
      </div>

      <p>0695018597</p>
    </div>

    <v-btn
      class="!tw-h-[45px] tw-w-full !tw-rounded-full !tw-capitalize"
      color="primary"
      @click="emits('proceed', amount)"
    >
      Insert PIN
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
