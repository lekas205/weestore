<template>
  <v-layout>
    <v-navigation-drawer v-model="showDrawer" temporary :width="450" color="#F4F4F8">
      <img
        src="../../assets//images/png/app-background-image.png"
        alt=""
        class="tw-fixed tw-left-0 tw-w-[110vw] tw-h-[100%] tw-top-0 tw-z-0"
      />
      <div class="text-center tw-mt-[70px] tw-relative">
        <img
          src="../../assets/images/svgs/check-icon.svg"
          alt=""
          width="70px"
          class="mx-auto mb-3"
        />
        <h2 class="tw-text-[20px] tw-font-semibold">Congratulations!</h2>
        <small>You’ve successfully joined the Bronze Circle</small>

        <div class="tw-flex tw-gap-3 tw-mt-[30px] tw-justify-center">
          <v-btn
            class="tw-mt-10 !tw-h-[40px] !tw-rounded-full !tw-capitalize !tw-underline"
            color="green"
            variant="text"
            to="/home"
          >
            Back to Home
          </v-btn>
          <v-btn
            class="tw-mt-10 !tw-h-[40px] !tw-rounded-full !tw-capitalize"
            color="primary"
            to="/savings"
          >
            Start New Circle
          </v-btn>
        </div>
      </div>
    </v-navigation-drawer>
  </v-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  show: boolean
}>()
const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'success'): void
}>()

const showDrawer = computed({
  get() {
    return props.show
  },
  set(value) {
    emit('update:show', value)
  },
})
</script>
