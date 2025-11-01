<template>
  <div class="tw-bg-white tw-shadow-md tw-rounded-2xl tw-p-6">
    <h2 class="tw-font-semibold mb-5">{{ circle_title }}</h2>
    <div class="tw-flex tw-justify-between tw-mb-3">
      <p class="tw-text-[14px]">Target Amount</p>
      <p>{{ formatAsMoney(80000) }}</p>
    </div>
    <div class="tw-flex tw-justify-between mb-3">
      <p class="tw-text-[14px]">Saved so far</p>
      <p>{{ formatAsMoney(20000) }}</p>
    </div>
    <div class="tw-flex tw-justify-between mb-4">
      <p class="tw-text-[14px]">Remaining</p>
      <p>{{ formatAsMoney(2000) }}</p>
    </div>

    <div class="pt-3 tw-border-t tw-border-[#CFD6D8]">
      <v-btn
        class="!tw-rounded-full !tw-capitalize !tw-underline"
        color="green"
        variant="text"
        @click="showCircleBreakdown = true"
      >
        {{ props.matured ? 'Withdraw' : 'View Details' }}
      </v-btn>
    </div>
    <CircleBreakdown
      circle_type="Bronze Circle"
      status="Active"
      v-model:show="showCircleBreakdown"
    />
  </div>
</template>

<script setup lang="ts">
import { formatAsMoney } from '@/utils/helpers'
import CircleBreakdown from './CircleBreakdown.vue'
import { ref } from 'vue'

const props = defineProps<{
  circle_title: string
  matured?: boolean
}>()

const showCircleBreakdown = ref(false)
</script>
