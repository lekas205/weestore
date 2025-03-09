<template>
  <div class="tw-flex tw-justify-between">
    <button @click="emit('goBack')" v-if="back">
      <img src="@/assets/images/svgs/back.svg" alt="hamburger" />
    </button>
    <button @click="showSidebar = true" v-else>
      <img src="@/assets/images/svgs/hamburger.svg" alt="hamburger" />
    </button>
    <p class="tw-text-[20px]" v-if="title">{{ title }}</p>

    <button @click="showCart = true">
      <img src="@/assets/images/svgs/cart.svg" alt="car" />
    </button>
  </div>

  <CartDrawer v-model:show="showCart" />
  <AppMenuDrawer v-model:show="showSidebar" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CartDrawer from './CartDrawer.vue'
import AppMenuDrawer from './AppMenuDrawer.vue'
defineProps<{
  back?: boolean
  title?: string
}>()

const emit = defineEmits<{
  (e: 'goBack'): void
}>()

const showCart = ref(false)
const showSidebar = ref(false)
</script>
