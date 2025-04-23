<template>
  <div class="container tw-min-h-[100vh] py-10 tw-bg-[#F4F4F8]">
    <router-view />
    <AppPageLoader v-if="authStore.loader" />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import AppPageLoader from '@/components/Global/AppLoader.vue'

const authStore = useAuthStore()
</script>
