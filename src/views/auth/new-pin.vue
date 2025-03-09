<template>
  <div class="tw-relative tw-mt-[-40px] tw-z-10 tw-h-full tw-flex tw-flex-col">
    <h3 class="tw-text-white tw-text-center tw-text-[18px]">Create New PIN</h3>
    <section class="tw-mt-[70px]">
      <p class="tw-text-[20px]">Enter Otp</p>
      <v-otp-input :model-value="form.otp" variant="filled"></v-otp-input>
      <p class="tw-text-[20px]">Create New PIN</p>
      <v-otp-input :model-value="form.new_pin" variant="filled"></v-otp-input>
      <p class="tw-text-[20px]">Confirm New PIN</p>
      <v-otp-input :model-value="form.confirm_pin" variant="filled" class="tw-mt-2"></v-otp-input>
    </section>

    <v-btn class="!tw-h-[70px] !tw-rounded-full mt-9" color="#FA4A0C"> Next</v-btn>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const form = ref({
  otp: '',
  new_pin: '',
  confirm_pin: '',
})
</script>
