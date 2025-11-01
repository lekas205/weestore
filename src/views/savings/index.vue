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
          @click="showSavingsInterest = true"
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

    <v-tab-item v-if="tab === 'active-circle'">
      <div class="tw-w-[90vw]">
        <section class="tw-overflow-auto">
          <div class="tw-flex tw-gap-4">
            <CircleBreakDownCard
              circle_title="Bronze Circle"
              class="tw-shrink-0 tw-w-[85%]"
              v-for="i in 3"
              :key="i"
            />
          </div>
        </section>
      </div>
    </v-tab-item>
    <v-tab-item v-if="tab === 'completed-circle'">
      <div class="tw-w-[90vw]">
        <section class="tw-overflow-auto">
          <div class="tw-flex tw-gap-4">
            <CircleBreakDownCard
              circle_title="Bronze Circle"
              class="tw-shrink-0 tw-w-[85%]"
              v-for="i in 3"
              :key="i"
            />
          </div>
        </section>
      </div>
    </v-tab-item>

    <SavingPlans v-model:show="showSavingsPlan" />
    <SavingsInterests v-model:show="showSavingsInterest" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/Global/AppHeader.vue'
import { formatAsMoney } from '@/utils/helpers.ts'
import SavingPlans from '@/components/Global/SavingPlans.vue'
import CircleBreakDownCard from '@/components/Global/CircleBreakDownCard.vue'
import SavingsInterests from '@/components/Global/SavingsInterests.vue'

const tab = ref(null)
const showSavingsPlan = ref(false)
const showSavingsInterest = ref(false)
</script>
