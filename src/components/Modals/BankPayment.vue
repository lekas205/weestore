<template>
  <div class="text-center pa-4">
    <v-dialog v-model="showModal" width="auto">
      <v-card min-width="320" class="!tw-rounded-[20px]">
        <button class="tw-absolute tw-right-4 tw-top-6" @click="showModal = false">
          <img src="@/assets/images/svgs/close.svg" class="tw-w-3" alt="close icon" />
        </button>
        <section class="tw-p-4 tw-mt-[40px]">
          <div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
            <p>Account Number</p>
            <p>223900299320</p>
          </div>
          <div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
            <p>Bank Name</p>
            <p>Fidelity Bank</p>
          </div>
          <div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
            <p>Account name</p>
            <p>TechClouthe Lab</p>
          </div>
        </section>

        <section class="text-center tw-px-5 tw-text-primary">
          It takes 12 Hours to confirm Payment made through this channel
        </section>

        <div class="text-center">
          <v-btn class="tw-my-8 tw-w-[80%] !tw-h-[50px] !tw-rounded-full" color="#FA4A0C">
            Upload Proof Of Payment
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

const showModal = computed({
  get() {
    return props.show
  },
  set(value) {
    emit('update:show', value)
  },
})
</script>
