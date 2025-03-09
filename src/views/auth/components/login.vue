<template>
  <div class="tw-h-full">
    <v-form class="tw-flex tw-flex-col tw-gap-10 tw-h-full tw-pt-[50px]">
      <div class="">
        <v-text-field hide-details="auto" label="Phone number" type="tel"></v-text-field>
      </div>
      <div class="">
        <v-text-field hide-details="auto" label="pin" type="password"></v-text-field>
      </div>

      <v-btn class="tw-mt-auto !tw-h-[70px] !tw-rounded-full" color="#FA4A0C"> Login</v-btn>
    </v-form>
  </div>
</template>
