<template>
  <div class="tw-relative">
    <img
      src="../../assets//images/png/app-background-image.png"
      alt=""
      class="tw-fixed tw-left-0 tw-w-[110vw] tw-h-[100%] tw-top-0 tw-z-0"
    />
    <div class="tw-relative">
      <AppHeader title="Savings" />

      <p class="tw-text-primary mx-auto tw-w-[70%] tw-mt-10 tw-mb-4 tw-text-center">
        “Save more. Shop easy. Earn smart. Only on WeeStore”
      </p>

      <div class="tw-h-[180px] tw-overflow-hidden tw-relative">
        <div class="d-flex justify-center">
          <v-pie
            :items="items"
            inner-cut="87"
            size="360"
            animation
            hide-slice
            class="tw-rotate-[-90deg]"
          ></v-pie>
        </div>

        <div
          class="tw-flex tw-flex-col tw-items-center tw-mb-2 tw-absolute tw-top-20 tw-left-1/2 -tw-translate-x-1/2"
        >
          <small>Available Balance</small>
          <h3 class="tw-text-[29px] tw-font-semibold">
            {{ visible ? formatAsMoney(400000) : '*****' }}
          </h3>
          <button @click="visible = !visible">
            <v-icon color="black" icon="mdi-eye" size="small"></v-icon>
          </button>
        </div>
      </div>
      <div class="tw-flex tw-justify-between">
        <p>Start</p>
        <p>Stop</p>
      </div>

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

const visible = ref(true)
const showSavingsPlan = ref(false)
const showSavingsInterest = ref(false)

const items = [
  { key: 1, title: 'TypeScript', value: 30, color: '#BD182D' },
  { key: 1, title: 'TypeScript', value: 20, color: '#FA4A0C' },
  { key: 5, title: 'N/A', value: 50, color: '#00993000' },
]
</script>
