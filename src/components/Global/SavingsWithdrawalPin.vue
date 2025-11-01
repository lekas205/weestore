<template>
  <div class="text-center pt-4">
    <h2 class="tw-font-semibold tw-text-[18px]">Enter your Circle Pin</h2>
    <p class="tw-text-[12px]">Enter your current 4-digit PIN</p>
    <div class="px-5 mb-8">
      <v-otp-input v-model="pin" length="4" variant="underlined"></v-otp-input>
    </div>

    <v-btn
      class="!tw-h-[45px] tw-w-full !tw-rounded-full !tw-capitalize"
      color="primary"
      @click="emits('proceed')"
    >
      Proceed
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const pin = ref('')

const emits = defineEmits<{
  (e: 'proceed'): void
}>()
</script>
