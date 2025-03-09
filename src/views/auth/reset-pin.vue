<template>
  <div class="tw-relative tw-mt-[-40px] tw-z-10 tw-h-full tw-flex tw-flex-col">
    <h3 class="tw-text-white tw-text-center tw-text-[16px]">PIN Reset</h3>
    <section class="tw-text-center tw-mt-[70px]">
      <p class="tw-text-[20px] tw-mb-6">
        Please enter mobile number to receive the Otp to reset PIN
      </p>

      <v-text-field label="Enter Mobile Number" type="tel"></v-text-field>
    </section>

    <v-btn class="tw-mt-auto !tw-h-[70px] !tw-rounded-full" color="#FA4A0C"> Send Otp</v-btn>
  </div>
</template>
