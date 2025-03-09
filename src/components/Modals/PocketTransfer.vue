<template>
  <div class="text-center pa-4">
    <v-dialog v-model="showModal" width="auto">
      <v-card min-width="320" class="!tw-rounded-[20px]">
        <div class="tw-px-5 mb-5">
          <p class="text-center mb-3 mt-6">
            Please note that Transfer to Pocket implies that you’re making the Fund Available again
            for product Purchase through your wallet.
          </p>

          <v-text-field
            hide-details="auto"
            label="How Much do you want to Transfer?"
            type="text"
          ></v-text-field>
        </div>

        <template v-slot:actions>
          <v-btn class="!tw-h-[50px] !tw-rounded-full" color="#009930"> Transfer to wallet</v-btn>
          <v-btn class="!tw-h-[50px] !tw-rounded-full" color="#FA4A0C" @click="showModal = false">
            Cancel</v-btn
          >
        </template>
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
  address: '',
})
</script>
