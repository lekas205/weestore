<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user.ts'
import { useCartStore } from '@/stores/cart.ts'

const userStore = useUserStore()
const cartStore = useCartStore()

const route = useRoute()
const layout = computed(() => route.meta.layout + '-pages' || 'public-pages')

onMounted(() => {
  if (localStorage.getItem('ACCESS_TOKEN')) {
    userStore.getProfile()
    cartStore.fetchCartItems()
  }
})
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
