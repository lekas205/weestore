<template>
  <v-bottom-sheet v-model="setSheet">
    <v-card height="200" class="relative">
      <v-card-text>
        <button
          variant="text"
          @click="setSheet = false"
          class="tw-absolute tw-top-5 tw-right-3 tw-shadow-lg tw-rounded-full tw-h-[25px] tw-w-[25px]"
        >
          <v-icon icon="mdi-close" size="20"></v-icon>
        </button>
        <slot />
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  show: boolean
}>()
const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()
const setSheet = computed({
  get() {
    return props.show
  },
  set(value) {
    emit('update:show', value)
  },
})
</script>
