<template>
  <div class="text-center pa-4">
    <v-dialog v-model="showModal" width="auto">
      <v-card min-width="320" title="Change Bank Account" class="!tw-rounded-[20px]">
        <button class="tw-absolute tw-right-4 tw-top-6" @click="showModal = false">
          <img src="@/assets/images/svgs/close.svg" class="tw-w-3" alt="close icon" />
        </button>
        <section class="tw-px-5 tw-flex tw-flex-col tw-gap-4">
          <v-select
            label="Select Bank Name"
            hide-details="auto"
            v-model="form.bankCode"
            item-value="code"
            item-title="name"
            :items="banks"
          ></v-select>
          <v-text-field
            hide-details="auto"
            label="Account Number"
            type="text"
            v-model="form.accountNumber"
          ></v-text-field>
          <v-text-field
            hide-details="auto"
            label="Account  Name"
            type="text"
            v-model="accountName"
          ></v-text-field>
        </section>
        <div class="text-center">
          <v-btn
            class="tw-my-8 tw-w-[200px] !tw-h-[50px] !tw-rounded-full"
            color="#FA4A0C"
            @click="submit"
            :loading="loading"
          >
            Change Address</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, ref, watch, onMounted } from 'vue'
import { useUserStore } from '@/stores/user.ts'
import { useToast } from 'vue-toast-notification'

const toast = useToast()
const userStore = useUserStore()

const { banks, profile } = storeToRefs(userStore)

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

const accountName = ref('')
const form = ref<{
  bankCode: string | null
  accountNumber: string
}>({
  bankCode: null,
  accountNumber: '',
})
const loading = ref(false)

const submit = async () => {
  loading.value = true
  let res

  const payload = {
    ...form.value,
    bankName: banks.value.find((bank) => bank.code === form.value.bankCode)?.name,
    accountName: accountName.value,
  }
  if (!profile.value?.bank) {
    res = await userStore.addBankDetails({
      ...payload,
    })
  } else {
    res = await userStore.updateBankDetails({
      ...payload,
    })
  }

  if (res) {
    toast.success(
      profile.value?.bank ? 'Bank account updated successfully' : 'Bank account added successfully',
      {
        position: 'top',
        duration: 6000,
      },
    )
    emit('update:show', false)
  }

  loading.value = false
}

const fetchAccountDetails = async () => {
  loading.value = true
  const res = await userStore.getAccountDetails(form.value)
  if (res) {
    accountName.value = res.payload.accountName
  }
  loading.value = false
}

watch(
  () => form.value.accountNumber,
  (newVal: string) => {
    if (newVal.length === 10 && !accountName.value.length) {
      fetchAccountDetails()
    } else if (newVal.length < 10 && accountName.value.length) {
      accountName.value = ''
    }
  },
)

watch(
  () => form.value.bankCode,
  (newVal: string | null, oldVal: string | null) => {
    if (newVal && oldVal != null) {
      accountName.value = ''
    }
  },
)

watch(
  () => props.show,
  (newVal: boolean) => {
    if (newVal && profile.value?.bank) {
      form.value.accountNumber = profile.value.bank.accountNumber
      form.value.bankCode = profile.value.bank.bankCode
      accountName.value = profile.value.bank.accountName
    }
  },
)

onMounted(() => {
  userStore.fetchBanks()
})
</script>
