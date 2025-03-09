<template>
  <div class="text-center pa-4">
    <v-dialog v-model="showModal" width="auto">
      <v-card min-width="320" title="Change Pin" class="!tw-rounded-[20px]">
        <button class="tw-absolute tw-right-4 tw-top-6" @click="showModal = false">
          <img src="@/assets/images/svgs/close.svg" class="tw-w-3" alt="close icon" />
        </button>
        <section class="tw-px-5 tw-flex tw-flex-col tw-gap-4">
          <v-text-field hide-details="auto" label="Old Pin" type="password"></v-text-field>
          <v-text-field hide-details="auto" label="New Pin" type="password"></v-text-field>
          <v-text-field hide-details="auto" label="Confirm Pin" type="password"></v-text-field>
        </section>
        <div class="text-center">
          <v-btn class="tw-my-8 tw-w-[200px] !tw-h-[50px] !tw-rounded-full" color="#FA4A0C">
            Change Pin</v-btn
          >
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

const form = ref({
  otp: '',
  new_pin: '',
  confirm_pin: '',
})
</script>
