<template>
  <AppHeader />
  <div class="tw-flex mt-10 tw-justify-between tw-gap-5">
    <div
      v-for="tab in tabs"
      :key="tab"
      class="tw-py-3 tw-rounded-lg tw-bg-white tw-w-full tw-text-center tw-duration-300 tw-transition tw-capitalize tw-ease-in-out"
      :class="{
        'tw-bg-gradient-to-r tw-from-[#FF8D19] tw-to-[#FF375F] tw-text-white': activeTab === tab,
      }"
      @click="activeTab = tab"
    >
      {{ tab }}
    </div>
  </div>

  <PocketView v-if="activeTab === 'pocket'" />
  <RewardView v-else />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PocketView from './components/PocketView.vue'
import RewardView from './components/RewardView.vue'
import AppHeader from '@/components/Global/AppHeader.vue'

const tabs = ref(['pocket', 'reward'])
const activeTab = ref('pocket')
</script>
