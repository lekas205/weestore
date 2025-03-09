<template>
  <div class="tw-relative tw-mt-[-40px] tw-z-10 tw-h-full tw-flex tw-flex-col">
    <h3 class="tw-text-white tw-text-center tw-text-[16px]">Change Mobile Number</h3>
    <section class="tw-text-center tw-mt-[70px]">
      <p class="tw-text-[20px] tw-mb-4">Please enter mobile number to receive the 6-Digits Otp</p>

      <v-text-field label="Enter Mobile Number" type="tel"></v-text-field>
      <p class="tw-text-[14px]">Didn’t receive any code?</p>

      <RouterLink to="/" class="tw-text-[#D40E0E] tw-text-[20px] tw-block tw-mt-3"
        >Resend Code</RouterLink
      >
    </section>

    <v-btn class="tw-mt-auto !tw-h-[70px] !tw-rounded-full" color="#FA4A0C"> Verify</v-btn>
  </div>
</template>
