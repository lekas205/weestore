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
      <div class="tw-relative">
        <button class="tw-absolute tw-top-[10px]" @click="showDrawer = false">
          <v-icon icon="mdi-arrow-left" end></v-icon>
        </button>
        <div class="tw-flex tw-flex-col mt-10 tw-items-center">
          <h5 class="tw-text-[20px] tw-font-semibold mb-1">Savings Setup</h5>
          <p class="tw-text-[14px]">Enter your savings details</p>
        </div>

        <section class="tw-p-4 mt-6 tw-bg-white tw-border-r-5 mx-8">
          <div class="">
            <h3 class="tw-font-semibold tw-mb-4">Savings</h3>
            <div class="tw-flex tw-gap-3">
              <div
                v-for="item in frequencies"
                :key="item"
                class="tw-w-full tw-bg-white tw-rounded-full tw-py-2 text-center tw-text-[#372E52] tw-text-[14px] tw-shadow"
                :class="{
                  'tw-border tw-border-primary tw-text-primary tw-font-semibold':
                    form.frequency === item,
                }"
                @click="form.frequency = item"
              >
                {{ item }}
              </div>
            </div>
          </div>

          <div class="mt-7">
            <p class="mb-2">What is your target savings?</p>
            <v-text-field
              v-model="form.target"
              placeholder="Enter amount"
              type="number"
              class="tw-bg-white tw-rounded-full"
              hide-details
              dense
              outlined
              color="primary"
            ></v-text-field>
          </div>

          <div class="mt-7">
            <p class="mb-2">How much do you want to save per time?</p>
            <v-text-field
              v-model="form.amount"
              placeholder="Enter amount"
              type="number"
              class="tw-bg-white tw-rounded-full"
              hide-details
              dense
              outlined
              color="primary"
            ></v-text-field>
          </div>

          <v-btn
            class="tw-my-10 tw-w-full !tw-h-[50px] !tw-rounded-full"
            color="primary"
            @click="showSheet = true"
          >
            Next
          </v-btn>
        </section>
      </div>
    </v-navigation-drawer>
  </v-layout>

  <SavingsPaymentMethod v-model:show="showPaymentDrawer" />

  <AppBottomSheet v-model:show="showSheet">
    <SavingsSummary @next="openSavingConfig($event)" />
  </AppBottomSheet>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AppBottomSheet from './AppBottomSheet.vue'
import SavingsSummary from '../Sheets/SavingsSummary.vue'
import SavingsPaymentMethod from './SavingsPaymentMethod.vue'

const props = defineProps<{
  show: boolean
}>()
const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

const showPaymentDrawer = ref(false)
const form = ref({ amount: '', target: '', frequency: 'Daily' })
const showSheet = ref(false)
const frequencies = ref(['Daily', 'Weekly', 'Monthly'])

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
  showPaymentDrawer.value = true
}
</script>
