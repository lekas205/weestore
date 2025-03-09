<template>
  <div class="relative tw-mt-[-60px] tw-z-10 tw-h-full">
    <v-tabs v-model="tab" align-tabs="center" color="white" slider-color="white">
      <v-tab :value="1" class="text-white !capitalize tw-text-[18px]">Login</v-tab>
      <v-tab :value="2" class="text-white !capitalize tw-text-[18px]">Sign-up</v-tab>
    </v-tabs>

    <v-tab-item v-if="tab === 1">
      <Login />
    </v-tab-item>
    <v-tab-item v-if="tab === 2">
      <Signup />
    </v-tab-item>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Login from './components/login.vue'
import Signup from './components/signup.vue'
const tab = ref(1)
</script>
