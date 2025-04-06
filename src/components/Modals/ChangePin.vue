<template>
  <div class="text-center pa-4">
    <v-dialog v-model="showModal" width="auto">
      <v-card min-width="320" title="Change Pin" class="!tw-rounded-[20px]">
        <button class="tw-absolute tw-right-4 tw-top-6" @click="showModal = false">
          <img src="@/assets/images/svgs/close.svg" class="tw-w-3" alt="close icon" />
        </button>
        <section class="tw-px-5 tw-flex tw-flex-col tw-gap-4">
          <v-text-field
            hide-details="auto"
            label="Old Pin"
            type="password"
            v-model="form.old_password"
          ></v-text-field>
          <v-text-field
            hide-details="auto"
            label="New Pin"
            type="password"
            v-model="form.new_password"
          ></v-text-field>
          <v-text-field
            hide-details="auto"
            label="Confirm Pin"
            type="password"
            v-model="form.confirm_new_password"
          ></v-text-field>
        </section>
        <div class="text-center">
          <v-btn
            class="tw-my-8 tw-w-[200px] !tw-h-[50px] !tw-rounded-full"
            color="primary"
            @click="submit"
            :loading="loading"
          >
            Change Pin</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/user.ts'
import type { changePinDTO } from '@/types/dto'
import { useToast } from 'vue-toast-notification'

const toast = useToast()
const userStore = useUserStore()
const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

const showModal = computed({
  get() {
    return props.show
  },
  set(value) {
    emit('update:show', value)
  },
})

const loading = ref(false)
const form = ref<changePinDTO>({
  new_password: '',
  old_password: '',
  confirm_new_password: '',
})

const submit = async () => {
  loading.value = true
  const res = await userStore.changePin(form.value)
  if (res) {
    toast.success('Pin changed successfully', {
      position: 'top-right',
      duration: 6000,
    })
    emit('update:show', false)
  }

  loading.value = false
}
</script>
