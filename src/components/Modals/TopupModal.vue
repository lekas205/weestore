<template>
  <v-dialog v-model="showModal" width="auto">
    <v-card min-width="320" class="!tw-rounded-[20px]">
      <div class="text-center pa-4">
        <button class="tw-absolute tw-right-4 tw-top-6" @click="showModal = false">
          <img src="@/assets/images/svgs/close.svg" class="tw-w-3" alt="close icon" />
        </button>

        <div class="tw-flex mt-15 tw-justify-center tw-gap-5 tw-px-5">
          <div
            v-for="tab in topupOptions"
            :key="tab"
            class="tw-py-3 tw-rounded-lg tw-w-full tw-bg-white tw-text-center tw-duration-300 tw-transition tw-capitalize tw-ease-in-out"
            :class="{
              'tw-bg-gradient-to-r tw-from-[#FF8D19] tw-to-[#FF375F] tw-text-white':
                activeTab === tab,
            }"
            @click="activeTab = tab"
          >
            {{ tab }}
          </div>
        </div>

        <div class="tw-px-5 tw-my-5" v-if="activeTab === 'paystack'">
          <v-text-field
            hide-details="auto"
            label="Enter amount"
            type="number"
            v-model="amount"
          ></v-text-field>

          <v-btn
            class="!tw-h-[50px] !tw-rounded-full tw-w-full mt-6"
            color="primary"
            @click="proceed"
            :loading="loading"
          >
            Proceed</v-btn
          >
        </div>

        <section v-else>
          <section class="tw-p-4 tw-mt-[40px]">
            <div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
              <p>Account Number</p>
              <p>5601496101</p>
            </div>
            <div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
              <p>Bank Name</p>
              <p>Fidelity Bank</p>
            </div>
            <div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
              <p>Account name</p>
              <p>WEESTORE NIGERIA LIMITED</p>
            </div>
          </section>

          <section class="text-center tw-px-5 tw-text-primary">
            It takes 30 minutes to confirm Payment made through this channel
          </section>

          <div class="text-center">
            <v-btn
              class="tw-my-8 tw-w-[80%] !tw-h-[50px] !tw-rounded-full"
              color="primary"
              @click="showUploadModal = true"
            >
              Upload Proof Of Payment
            </v-btn>
          </div>
        </section>
      </div>
    </v-card>
  </v-dialog>

  <UpLoadFile
    v-model:show="showUploadModal"
    @uploadImageUrls="uploadedImage"
    @amount="saveAmount"
    showAmount
  />
  <paystack-modal
    id="paystack-topup-modal"
    :amount="paystackData?.amount"
    :email="paystackData?.email"
    :publicKey="'pk_test_9e8d9cbc7f3a81655b977db8106a8c330010cf9d'"
    :reference="paystackData?.reference"
    :callback="paystackData?.callback_url"
    :onSuccess="onSuccessfulPayment"
    :onCancel="onCancelledPayment"
    :embed="false"
  >
  </paystack-modal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTransactionStore } from '@/stores//transaction.ts'
import { useToast } from 'vue-toast-notification'
import UpLoadFile from './UploadFile.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const toast = useToast()
const transactionStore = useTransactionStore()

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'amount', value: string): void
  (e: 'update:show', value: boolean): void
  (e: 'uploadImageUrls', value: string[]): void
}>()

const uploadedImage = (value: string[]) => {
  showUploadModal.value = false
  paymentProof.value = value

  proceed()
}

const showModal = computed({
  get() {
    return props.show
  },
  set(value) {
    emit('update:show', value)
  },
})

const loading = ref(false)
const paystackData = ref()
const showUploadModal = ref(false)
const activeTab = ref('paystack')
const paymentProof = ref<string[]>([])
const topupOptions = ref(['paystack', 'bank'])

const amount = ref()

const proceed = async () => {
  authStore.toggleLoader()
  const res = await transactionStore.walletTopup({
    amount: amount.value,
    paymentMethod: activeTab.value.toUpperCase(),
    paymentUrl: paymentProof.value[0],
  })

  if (res?.success && activeTab.value === 'paystack') {
    paystackData.value = res.payload
    setTimeout(() => {
      document.getElementById('paystack-topup-modal')?.click()
    }, 1000)
  } else if (res?.success && activeTab.value === 'bank') {
    showModal.value = false
    toast.success('Topup request have been sent awaiting approval', {
      position: 'top',
      duration: 6000,
    })
  }
  authStore.toggleLoader()
}

const saveAmount = (value: string) => {
  amount.value = value
}

const onSuccessfulPayment = () => {
  transactionStore.getWalletBalance()
  showModal.value = false
  toast.success('Topup successful', {
    position: 'top',
    duration: 6000,
  })
}

const onCancelledPayment = () => {
  toast.error('Transaction failed, try again', {
    position: 'top',
    duration: 6000,
  })
}
</script>
