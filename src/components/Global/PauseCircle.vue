<template>
  <div class="pt-4">
    <h2 class="tw-text-[20px] tw-font-semibold tw-mb-2">
      Are you sure you want to pause this circle?
    </h2>
    <p>Pausing this Circle means:</p>
    <ul class="mt-4 pl-7">
      <li class="tw-mb-2 tw-text-[12px] !tw-list-disc">Automatic savings will stop temporarily</li>
      <li class="tw-mb-2 tw-text-[12px] !tw-list-disc">Your progress is safe</li>
      <li class="tw-mb-2 tw-text-[12px] !tw-list-disc">
        You can resume anytime to continue saving
      </li>
      <li class="tw-mb-2 tw-text-[12px] !tw-list-disc">
        No interest or bonus will accumulate while pause
      </li>
    </ul>

    <div class="tw-flex tw-gap-3 mt-6">
      <v-btn
        class="!tw-rounded-full !tw-capitalize !tw-underline"
        color="green"
        variant="text"
        @click="emits('close')"
      >
        Cancel
      </v-btn>
      <v-btn class="!tw-rounded-full !tw-capitalize" color="primary" @click="emits('pauseCircle')">
        Yes,Pause Circle
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  (e: 'close'): void
  (e: 'pauseCircle'): void
}>()
</script>
