<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user.ts'

const userStore = useUserStore()

const route = useRoute()
const layout = computed(() => route.meta.layout + '-pages' || 'public-pages')

onMounted(() => {
  if (localStorage.getItem('ACCESS_TOKEN')) {
    userStore.getProfile()
  }
})
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<style scoped></style>
