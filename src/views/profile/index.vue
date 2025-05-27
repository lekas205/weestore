<template>
  <AppHeader title="Profile" />
  <div>
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
      <li
        class="tw-bg-white tw-p-5 tw-rounded-[20px] tw-text-[18px] tw-relative"
        v-if="profile?.phone"
        @click="copyToClipboard(profile.phone)"
      >
        Referral Code - {{ profile?.phone }}

        <img
          src="@/assets/images/svgs/copy.svg"
          class="tw-absolute tw-right-5 -tw-translate-y-1/2 tw-top-1/2"
          alt=""
        />
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

      <li class="tw-bg-white tw-p-5 tw-rounded-[20px] tw-text-[18px] tw-relative">
        <a
          href="https://wa.me/2348136018432"
          target="_blank"
          rel="noopener"
          class="tw-w-full tw-block"
        >
          Contact Us Via WhatApp

          <span class="tw-absolute tw-right-5 -tw-translate-y-1/2 tw-top-1/2">
            <v-icon icon="mdi-whatsapp" end></v-icon>
          </span>
        </a>
      </li>
      <li
        class="tw-bg-white tw-p-5 tw-rounded-[20px] tw-text-[18px] tw-relative tw-text-red-600"
        @click="showDeleteAccount = true"
      >
        Delete Account

        <span class="tw-absolute tw-right-5 -tw-translate-y-1/2 tw-top-1/2">
          <img src="@/assets/images/svgs/bin.svg" alt="" />
        </span>
      </li>
    </ul>
  </div>

  <ChangePin v-model:show="showChangePin" />
  <ChangeAddress v-model:show="showChangeAddress" />
  <ChangeBankAccount v-model:show="showBankAccount" />
  <DeleteAccount v-model:show="showDeleteAccount" @proceed="deleteAccount" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import ChangePin from '@/components/Modals/ChangePin.vue'
import AppHeader from '@/components/Global/AppHeader.vue'
import ChangeAddress from '@/components/Modals/ChangeAddress.vue'
import ChangeBankAccount from '@/components/Modals/ChangeBankAccount.vue'
import { useUserStore } from '@/stores/user.ts'
import { useAuthStore } from '@/stores/auth.ts'
import { useToast } from 'vue-toast-notification'
import DeleteAccount from '@/components/Modals/DeleteAccount.vue'

const toast = useToast()
const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStore()

const { profile } = storeToRefs(userStore)

const showChangePin = ref(false)
const showChangeAddress = ref(false)
const showBankAccount = ref(false)
const showDeleteAccount = ref(false)

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    toast.success('Referral code copied to clipboard', {
      position: 'top',
      duration: 4000,
    })
  } catch (err) {
    toast.error('Referral code not copied', {
      position: 'top',
      duration: 6000,
    })
    console.error('Failed to copy text: ', err)
  }
}

const deleteAccount = async () => {
  authStore.toggleLoader()
  const res = await authStore.deleteAccount()
  if (res) {
    logout()
    toast.success('Account deleted successfully', {
      position: 'top',
      duration: 6000,
    })
  } else {
    toast.error('Failed to delete account', {
      position: 'top',
      duration: 6000,
    })
  }
  authStore.toggleLoader()
}

const logout = () => {
  // Implement logout logic here
  localStorage.clear()

  router.push('/login')
}
</script>
