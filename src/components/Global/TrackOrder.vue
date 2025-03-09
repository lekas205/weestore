<template>
  <v-layout>
    <v-navigation-drawer
      v-model="showDrawer"
      temporary
      :width="450"
      color="#FA4A0C"
      class="tw-relative"
    >
      <h1>Track order</h1>
    </v-navigation-drawer>
  </v-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
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
