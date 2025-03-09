<template>
  <div class="rtw-elative tw-mt-[-40px] tw-z-10 tw-h-full tw-flex tw-flex-col">
    <h3 class="tw-text-white tw-text-center tw-text-[18px]">Account Verification</h3>
    <section class="tw-text-center tw-mt-[80px]">
      <p>Please enter the 6-digit code sent to your Mobile Number 081 *** *** 432</p>

      <v-otp-input model-value="8011" variant="filled" class="tw-mt-5"></v-otp-input>
      <p class="text-[14px]">
        Not my phone number?
        <RouterLink to="/" class="tw-underline">Change Phone Number</RouterLink>
      </p>

      <RouterLink to="/" class="tw-text-[#D40E0E] tw-text-[20px] tw-mt-4 tw-block"
        >Resend Code</RouterLink
      >
    </section>

    <v-btn class="tw-mt-auto !tw-h-[70px] !tw-rounded-full" color="#FA4A0C"> Verify</v-btn>
  </div>
</template>
