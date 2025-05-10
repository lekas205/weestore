<template>
  <div class="text-center pa-4">
    <v-dialog v-model="showModal" width="auto">
      <v-card min-width="320" class="!tw-rounded-[20px]">
        <div class="tw-px-5 my-5">
          <img src="@/assets/images/svgs/withdrawal.svg" alt="" class="tw-mx-auto" />
          <p class="text-center mb-3 mt-6">Withdraw to Bank Account</p>

          <v-text-field
            hide-details="auto"
            label="How many unit do you want to Withdraw?"
            type="text"
            v-model="form.unit"
            :maxLength="units"
          ></v-text-field>
        </div>

        <template v-slot:actions>
          <v-btn class="!tw-h-[50px] !tw-rounded-full" color="#009930" @click="submit">
            Withdraw</v-btn
          >
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
  units: number
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'proceed', value: number): void
}>()

const showModal = computed({
  get() {
    return props.show
  },
  set(value) {
    emit('update:show', value)
  },
})

const submit = () => {
  alert('hello')
  emit('proceed', form.value.unit)
  showModal.value = false
}

const form = ref({
  unit: 0,
})
</script>
