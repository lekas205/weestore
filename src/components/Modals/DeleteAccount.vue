<template>
  <div class="text-center pa-4">
    <v-dialog v-model="showModal" width="auto">
      <v-card min-width="320" class="!tw-rounded-[20px]">
        <div class="tw-px-5 mb-5 pt-7">
          <img src="@/assets/images/svgs/bin.svg" alt="delete icon" class="tw-w-20 tw-mx-auto" />
          <p class="text-center mb-3 mt-6 tw-text-[17px]">
            Are you sure you want to delete your account? This action cannot be undone if you
            proceed
          </p>
        </div>

        <template v-slot:actions>
          <v-btn class="!tw-h-[50px] !tw-rounded-full" color="#009930" @click="submit">
            Yes, Proceed</v-btn
          >
          <v-btn class="!tw-h-[50px] !tw-rounded-full" color="#FA4A0C" @click="showModal = false">
            No, Cancel</v-btn
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
  emit('proceed', form.value.unit)
  showModal.value = false
}

const form = ref({
  unit: 0,
})
</script>
