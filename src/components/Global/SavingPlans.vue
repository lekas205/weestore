<template>
  <v-layout>
    <v-navigation-drawer v-model="showDrawer" temporary :width="450" color="#F4F4F8">
      <button class="tw-absolute tw-top-[40px]" @click="showDrawer = false">
        <v-icon icon="mdi-arrow-left" end></v-icon>
      </button>
      <div class="tw-flex tw-flex-col mt-10 tw-items-center">
        <h5 class="tw-text-[20px] tw-font-semibold mb-1">Choose a Plan</h5>
        <p class="tw-text-[14px]">Pick your circle duration</p>
      </div>

      <div class="tw-p-4 mt-3">
        <div
          v-for="(item, index) in savingPlans"
          :key="index"
          @click="plan = item.value"
          class="tw-rounded-[15px] tw-bg-white tw-p-3 tw-shadow tw-flex tw-items-center tw-gap-3 tw-mb-4"
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
          <div class="tw-w-[60%] tw-mr-auto">
            <h5 class="tw-text-[14px] tw-font-semibold mb-1 tw-text-[#372E52]">{{ item.label }}</h5>
            <p class="tw-text-[#736D86] tw-text-[13px]">
              {{ item.description }}
            </p>
          </div>

          <v-btn
            class="!tw-text-[12px] !tw-capitalize !tw-font-normal !tw-h-[30px] !tw-rounded-full"
            color="primary"
          >
            View details
          </v-btn>
        </div>

        <v-btn
          class="tw-my-10 tw-w-full !tw-h-[50px] !tw-rounded-full"
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
    description: 'Save consistently for 3months and get your principal + interest for shopping',
    duration: '3 months',
  },
  {
    label: 'Silver Circle',
    value: 'silver',
    description: 'Save consistently for 6months and get your principal + interest for shopping',
    duration: '6 months',
  },
  {
    label: 'Platinum Circle',
    value: 'platinum',
    description: 'Save consistently for 9months and get your principal + interest for shopping',
    duration: '9 months',
  },
  {
    label: 'Diamond Circle',
    value: 'diamond',
    description: 'Save consistently for 12months and get your principal + interest for shopping',
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
