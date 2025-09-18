<template>
  <div>
    <AppHeader title="Savings" />

    <section
      class="text-white tw-bg-gradient-to-r tw-from-[#FF8D19] tw-to-[#FF375F] tw-p-4 tw-rounded-xl mt-5"
    >
      <div class="tw-flex tw-flex-col tw-items-center tw-mb-2">
        <h3 class="tw-text-[22px] tw-font-semibold">{{ formatAsMoney(40000) }}</h3>
        <small>Available Balance</small>
      </div>
      <RouterLink to="/" class="tw-underline tw-text-[12px]"> Start Saving</RouterLink>
    </section>

    <section class="mt-5 mb-7">
      <p class="mb-2">Quick Actions</p>
      <div class="tw-flex tw-gap-4">
        <div
          @click="showSavingsPlan = true"
          class="tw-bg-white tw-rounded-xl tw-p-3 text-center tw-shadow-md tw-w-[47%] tw-flex tw-gap-2 tw-justify-center tw-items-center"
        >
          <v-icon icon="mdi-plus" end></v-icon>
          New circle
        </div>

        <div
          class="tw-bg-white tw-rounded-xl tw-p-3 text-center tw-shadow-md tw-w-[47%] tw-flex tw-flex-col tw-justify-center"
        >
          <p class="tw-text-[#009930]">My Interest</p>
          <small> {{ formatAsMoney(40000) }} </small>
        </div>
      </div>
    </section>

    <v-tabs v-model="tab" align-tabs="center" color="primary" slider-color="primary">
      <v-tab
        value="active-circle"
        class="tw-text-grey !tw-text-[13px] !tw-capitalize !tw-ml-0 !tw-h-[30px]"
      >
        Active Circle
      </v-tab>
      <v-tab
        value="completed-circle"
        class="tw-text-grey !tw-text-[13px] !tw-capitalize !tw-h-[30px]"
      >
        Completed Circle
      </v-tab>
    </v-tabs>

    <SavingPlans :show="showSavingsPlan" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/Global/AppHeader.vue'
import { formatAsMoney } from '@/utils/helpers.ts'
import SavingPlans from '@/components/Global/SavingPlans.vue'

const tab = ref(null)
const showSavingsPlan = ref(false)
</script>
