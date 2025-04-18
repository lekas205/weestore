<template>
  <v-layout>
    <v-navigation-drawer
      v-model="showDrawer"
      temporary
      :width="450"
      color="primary"
      class="tw-relative"
    >
      <section class="tw-py-10 tw-px-7 tw-h-full tw-w-full tw-relative tw-overflow-hidden">
        <button class="tw-absolute tw-top-6 tw-z-3 tw-right-5" @click="showDrawer = false">
          <img src="@/assets/images/svgs/close-light.svg" width="20px" alt="" />
        </button>
        <div class="tw-absolute tw-h-[80vh] tw-top-[50%] tw-z-3 -tw-right-7 -tw-translate-y-1/2">
          <img src="@/assets/images/svgs/app-mock-up.svg" class="tw-h-full" alt="" />
        </div>

        <section class="tw-flex tw-flex-col tw-h-[90%] tw-mt-8">
          <h6 class="tw-font-bold tw-text-[20px]">Hi Michael</h6>
          <ul class="tw-my-auto">
            <li
              class="tw-font-bold tw-text-[16px] py-6 tw-items-center tw-border-b-[0.3px] tw-border-light"
            >
              <router-link to="/home" class="tw-flex">
                <img src="@/assets/images/svgs/sheild.svg" alt="Order Icon" class="mr-5" /> Orders
              </router-link>
            </li>
            <li
              class="tw-flex tw-font-bold tw-text-[16px] py-6 tw-items-center tw-border-b-[0.3px] tw-border-light"
            >
              <router-link to="/products" class="tw-flex">
                <img src="@/assets/images/svgs/shopping-cart.svg" alt="Order Icon" class="mr-5" />
                My Products
              </router-link>
            </li>
            <li
              class="tw-flex tw-font-bold tw-text-[16px] py-6 tw-items-center tw-border-b-[0.3px] tw-border-light"
            >
              <router-link to="/payment-history" class="tw-flex">
                <img src="@/assets/images/svgs/tag.svg" alt="Order Icon" class="mr-5" />Payment
                History
              </router-link>
            </li>
            <li
              class="tw-flex tw-font-bold tw-text-[16px] py-6 tw-items-center tw-border-b-[0.3px] tw-border-light"
            >
              <router-link to="/wallet" class="tw-flex">
                <img src="@/assets/images/svgs/tag.svg" alt="Order Icon" class="mr-5" /> My Wallet
              </router-link>
            </li>
            <li
              class="tw-flex tw-font-bold ttw-text-[16px] py-6 tw-items-center tw-border-b-[0.3px] tw-border-light"
            >
              <router-link to="/groceries" class="tw-flex">
                <img src="@/assets/images/svgs/shopping-cart.svg" alt="Order Icon" class="mr-5" />
                Groceries
              </router-link>
            </li>
            <li
              class="tw-flex tw-font-bold tw-text-[16px] py-6 tw-items-center tw-border-b-[0.3px] tw-border-light"
            >
              <router-link to="/profile" class="tw-flex">
                <img src="@/assets/images/svgs/user-circle.svg" alt="Order Icon" class="mr-5" />
                Profile
              </router-link>
            </li>
          </ul>

          <button class="tw-text-[20px] tw-font-bold tw-self-start" @click="logout">
            Sign-out
          </button>
        </section>
      </section>
    </v-navigation-drawer>
  </v-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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

const logout = () => {
  // Implement logout logic here
  localStorage.clear()

  router.push('/login')
}
</script>
