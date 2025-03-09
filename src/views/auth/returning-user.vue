<template>
  <div class="relative tw-mt-[-40px] tw-z-10 tw-h-full tw-flex tw-flex-col">
    <p class="tw-text-white text-center tw-text-[18px]">Welcome, {{ user }}</p>
    <div class="tw-mt-10 tw-text-[17px]">
      <p>Login to your Account</p>

      <div class="mt-10">
        <v-text-field hide-details="auto" label="PIN" type="password"></v-text-field>
      </div>

      <div class="tw-flex tw-justify-between tw-mt-10">
        <p class="tw-text-[17px]">
          Not {{ user }}
          <RouterLink :to="ROUTES.login.path" class="tw-text-primary"> Login</RouterLink>
        </p>

        <RouterLink class="text-[17px] tw-text-primary" :to="ROUTES.reset_pin.path">
          PIN Reset?</RouterLink
        >
      </div>
    </div>

    <div class="tw-mt-auto tw-flex tw-flex-col">
      <RouterLink :to="ROUTES.login.path" class="tw-text-[18px] tw-text-center tw-text-primary mb-8"
        >Not a User? Signup Here</RouterLink
      >
      <v-btn class="!tw-h-[70px] !tw-rounded-full" color="#FA4A0C"> Login</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ROUTES } from '../../router/routes/routes'

const user = ref('Michael')
</script>
