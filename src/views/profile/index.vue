<template>
  <AppHeader title="Profile" />
  <div class="mt-8">
    <p class="tw-text-[18px] mb-3">Personal details</p>

    <div class="tw-bg-white tw-p-5 tw-flex tw-gap-5 tw-rounded-[22px]">
      <img src="@/assets/images/png/avatar.png" class="tw-h-[101px] tw-w-[91px]" alt="" />

      <section>
        <h4 class="tw-text-[18px]">{{ profile?.fullname }}</h4>
        <p class="tw-opacity-50 mb-2">{{ profile?.email }}</p>
        <hr />
        <p class="tw-opacity-50 py-2">{{ profile?.phone }}</p>
        <hr />
        <p class="tw-opacity-50 py-2">{{ profile?.address }}</p>
        <hr />
        <div class="tw-opacity-50 pt-2">
          <p>{{ profile?.bank?.accountName }}</p>
          <p>{{ profile?.bank?.accountNumber }}</p>
          <p>{{ profile?.bank?.bankName }}</p>
        </div>
      </section>
    </div>

    <ul class="tw-flex tw-flex-col tw-gap-4 tw-mt-8">
      <li class="tw-bg-white tw-p-5 tw-rounded-[20px] tw-text-[18px]">
        Referral Code - 08136018432
      </li>
      <li
        @click="showChangePin = true"
        class="tw-bg-white tw-p-5 tw-rounded-[20px] tw-text-[18px] tw-flex tw-justify-between tw-items-center"
      >
        Change PIN
        <img src="@/assets/images/svgs/back.svg" class="tw-rotate-180" alt="" />
      </li>
      <li
        @click="showChangeAddress = true"
        class="tw-bg-white tw-p-5 tw-rounded-[20px] tw-text-[18px] tw-flex tw-justify-between tw-items-center"
      >
        Change Store Address
        <img src="@/assets/images/svgs/back.svg" class="tw-rotate-180" alt="" />
      </li>
      <li
        @click="showBankAccount = true"
        class="tw-bg-white tw-p-5 tw-rounded-[20px] tw-text-[18px] tw-flex tw-justify-between tw-items-center"
      >
        {{ profile?.bank?.bankName ? 'Change Bank Account' : 'Add Bank Account' }}
        <img src="@/assets/images/svgs/back.svg" class="tw-rotate-180" alt="" />
      </li>

      <li class="tw-bg-white tw-p-5 tw-rounded-[20px] tw-text-[18px]">Contact Us Via WhatApp</li>
      <li class="tw-bg-white tw-p-5 tw-rounded-[20px] tw-text-[18px]">Delete Account</li>
    </ul>
  </div>

  <ChangePin v-model:show="showChangePin" />
  <ChangeAddress v-model:show="showChangeAddress" />
  <ChangeBankAccount v-model:show="showBankAccount" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import ChangePin from '@/components/Modals/ChangePin.vue'
import AppHeader from '@/components/Global/AppHeader.vue'
import ChangeAddress from '@/components/Modals/ChangeAddress.vue'
import ChangeBankAccount from '@/components/Modals/ChangeBankAccount.vue'
import { useUserStore } from '@/stores/user.ts'

const userStore = useUserStore()

const { profile } = storeToRefs(userStore)

const showChangePin = ref(false)
const showChangeAddress = ref(false)
const showBankAccount = ref(false)
</script>
