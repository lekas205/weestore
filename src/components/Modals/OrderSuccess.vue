<template>
  <v-dialog v-model="showModal" width="auto">
    <v-card min-width="320" class="!tw-rounded-[20px]">
      <div class="text-center pa-4">
        <button class="tw-absolute tw-right-4 tw-top-6" @click="showModal = false">
          <img src="@/assets/images/svgs/close.svg" class="tw-w-3" alt="close icon" />
        </button>
        <section class="tw-p-4 tw-mt-[40px] text-center">
          <h2 class="tw-font-semibold tw-text-[25px]">Order Received</h2>
          <p class="my-3 tw-text-center">
            Please check the 'My Products' section after 5 minutes to verify the status of your
            transaction. Or Contact Admin for further Assistance.
          </p>
          <!-- <p>+2348128392001</p> -->
        </section>

        <div class="text-center pb-4">
          <v-btn
            class="tw-mt-3 tw-w-[80%] !tw-h-[50px] !tw-rounded-full"
            color="primary"
            @click="router.push('/products')"
          >
            My Products
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

const router = useRouter()
const showModal = computed({
  get() {
    return props.show
  },
  set(value) {
    emit('update:show', value)
  },
})
</script>
