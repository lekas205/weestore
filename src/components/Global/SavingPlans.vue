<template>
  <v-layout>
    <v-navigation-drawer
      v-model="showDrawer"
      temporary
      :width="450"
      color="#F4F4F8"
      class="tw-relative"
    >
      <img
        src="../../assets//images/png/app-background-image.png"
        alt=""
        class="tw-fixed tw-left-0 tw-w-[110vw] tw-h-[100%] tw-top-0 tw-z-0"
      />
      <button class="tw-absolute tw-top-[50px]" @click="showDrawer = false">
        <v-icon icon="mdi-arrow-left" end></v-icon>
      </button>
      <div class="tw-flex tw-flex-col tw-mt-[50px] tw-items-center">
        <h5 class="tw-text-[20px] tw-font-semibold mb-1">Choose a Plan</h5>
        <p class="tw-text-[14px]">Pick your circle duration</p>
      </div>

      <img
        src="../../assets/images/svgs/bundle-banner.svg"
        alt="bundle banner"
        width="100%"
        class="tw-absolute tw-top-[120px] tw-left-1/2 -tw-translate-x-1/2"
      />

      <div class="tw-mt-[140px] tw-relative tw-w-[75%] tw-mx-auto">
        <div
          v-for="(item, index) in savingPlans"
          :key="index"
          @click="plan = item.value"
          class="tw-rounded-[15px] tw-bg-white tw-p-3 tw-shadow-lg tw-flex tw-items-center tw-gap-4 tw-mb-5"
          :class="{
            'tw-border tw-border-primary': plan === item.value,
          }"
        >
          <div
            class="tw-flex tw-justify-center tw-items-center tw-h-[20px] tw-w-[20px] tw-border tw-border-primary tw-rounded-full"
          >
            <div
              class="tw-bg-primary tw-h-[9px] tw-w-[9px] tw-rounded-full"
              v-if="plan === item.value"
            ></div>
          </div>
          <div class="tw-w-[100%] tw-mr-auto">
            <h5 class="tw-text-[14px] tw-font-semibold mb-1 tw-text-[#372E52]">{{ item.label }}</h5>
            <p class="tw-text-[#736D86] tw-text-[12px]">
              {{ item.description }}
            </p>
          </div>

          <!-- <v-btn
            class="!tw-text-[12px] !tw-capitalize !tw-font-normal !tw-h-[30px] !tw-rounded-full"
            color="primary"
          >
            View details
          </v-btn> -->
        </div>
      </div>
      <div class="px-5 tw-mt-[100px] tw-absolute tw-bottom-5 tw-z-40 tw-w-full">
        <v-btn
          class="tw-mt-5 tw-w-full !tw-h-[50px] !tw-rounded-full"
          color="primary"
          @click="showSheet = true"
        >
          Continue
        </v-btn>
      </div>
    </v-navigation-drawer>
  </v-layout>

  <SavingsSetup v-model:show="showSetupDrawer" />

  <AppBottomSheet v-model:show="showSheet">
    <SavingMethod @next="openSavingConfig($event)" />
  </AppBottomSheet>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AppBottomSheet from './AppBottomSheet.vue'
import SavingMethod from '../Sheets/SavingMethod.vue'
import SavingsSetup from './SavingsSetup.vue'

const props = defineProps<{
  show: boolean
}>()
const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

const plan = ref('bronze')
const showSheet = ref(false)
const showSetupDrawer = ref(false)

const savingPlans = ref([
  {
    label: 'Bronze Circle',
    value: 'bronze',
    description: 'Save consistently for 1-2months and get your principal + interest for shopping',
    duration: '3 months',
  },
  {
    label: 'Silver Circle',
    value: 'silver',
    description: 'Save consistently for 3-8months and get your principal + interest for shopping',
    duration: '6 months',
  },
  {
    label: 'Platinum Circle',
    value: 'platinum',
    description: 'Save consistently for 9-12months and get your principal + interest for shopping',
    duration: '9 months',
  },
  {
    label: 'Diamond Circle',
    value: 'diamond',
    description: 'Save consistently for 18months and get your principal + interest for shopping',
    duration: '12 months',
  },
])

const showDrawer = computed({
  get() {
    return props.show
  },
  set(value) {
    emit('update:show', value)
  },
})

const openSavingConfig = (method: string) => {
  showSheet.value = false
  console.log(method)
  showSetupDrawer.value = true
}
</script>
