<template>
  <div class="container tw-min-h-[100vh] py-10 tw-bg-[#F4F4F8]">
    <router-view />
    <AppBottomBar />
  </div>

  <AppPageLoader v-if="authStore.loader" />
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import AppPageLoader from '@/components/Global/AppLoader.vue'
import AppBottomBar from '@/components/Global/AppBottomBar.vue'

const authStore = useAuthStore()
</script>
