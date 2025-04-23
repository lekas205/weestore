<template>
  <div class="tw-flex tw-justify-between">
    <button @click="emit('goBack')" v-if="back">
      <img src="@/assets/images/svgs/back.svg" alt="hamburger" />
    </button>
    <button @click="showSidebar = true" v-else>
      <img src="@/assets/images/svgs/hamburger.svg" alt="hamburger" />
    </button>
    <p class="tw-text-[20px] tw-mx-auto" v-if="title">{{ title }}</p>

    <button @click="showCart = true" v-if="!hideCartIcon">
      <v-badge color="primary" :content="cartCount">
        <img src="@/assets/images/svgs/cart.svg" alt="car" />
      </v-badge>
    </button>
  </div>

  <CartDrawer v-model:show="showCart" />
  <AppMenuDrawer v-model:show="showSidebar" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import CartDrawer from './CartDrawer.vue'
import AppMenuDrawer from './AppMenuDrawer.vue'

import { useCartStore } from '@/stores/cart.ts'

const cartStore = useCartStore()

const { cartItems } = storeToRefs(cartStore)

defineProps<{
  back?: boolean
  title?: string
  hideCartIcon?: boolean
}>()

const emit = defineEmits<{
  (e: 'goBack'): void
}>()

const showCart = ref(false)
const showSidebar = ref(false)

const cartCount = computed(() => cartItems.value.count || 0)
</script>
