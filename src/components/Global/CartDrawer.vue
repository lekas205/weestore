<template>
  <v-layout>
    <v-navigation-drawer v-model="showDrawer" temporary :width="450" color="#F4F4F8">
      <section class="tw-p-5">
        <div class="tw-flex">
          <button @click="showDrawer = false">
            <img src="@/assets/images/svgs/back.svg" alt="hamburger" />
          </button>
          <p class="mx-auto tw-text-[18px]">Cart</p>
        </div>

        <template v-if="cartItems?.data?.length">
          <section class="tw-mt-10">
            <ProductItem v-for="(item, index) in cartItems?.data" :key="index" :url="item.images">
              <section class="tw-flex tw-justify-between tw-w-full">
                <div>
                  <label class="tw-text-[18px]"> {{ item.product_name }} </label>
                  <p class="tw-text-success">Qty {{ item.quantity }}</p>
                  <div class="tw-flex tw-gap-6 tw-text-[16px] tw-text-success">
                    <p>Total Price</p>
                    <p>{{ formatAsMoney(item.price * item.quantity) }}</p>
                  </div>
                </div>
                <div class="tw-text-[18px] text-center">
                  <p class="tw-text-[16px]">WHP</p>
                  <p class="tw-text-success">{{ item.whp }}</p>
                  <button class="tw-text-primary" @click="deleteItem(item.cart_item_id)">
                    <v-icon icon="mdi-delete" end></v-icon>
                  </button>
                </div>
              </section>
            </ProductItem>

            <div class="tw-bg-white py-5 tw-text-center tw-rounded-xl">
              <p class="tw-underline tw-mb-3">Total Cart Order</p>
              <h3 class="tw-text-success tw-text-[25px]">{{ formatAsMoney(total) }}</h3>
            </div>

            <section class="my-4">
              <p class="tw-text-[18px] mb-3">Enter Delivery Address</p>
              <input
                placeholder="Ender Address"
                v-model="form.address"
                class="tw-px-10 tw-py-4 tw-w-full tw-text-[20px] tw-rounded-full tw-shadow-sm tw-bg-white tw-outline-primary"
              />
            </section>
            <PaymentMethods v-model="form.paymentMethod" @uploadedImageUrls="handleUploadedUrl" />
          </section>

          <div class="tw-flex tw-justify-between tw-gap-4 tw-flex-wrap tw-mt-8 tw-pb-7">
            <v-btn
              class="tw-mt-auto !tw-h-[50px] tw-w-full !tw-rounded-full"
              color="primary"
              @click="createOrder"
              :loading="loading"
            >
              Complete Order</v-btn
            >
            <v-btn
              class="tw-mt-auto !tw-h-[50px] tw-w-full !tw-rounded-full"
              color="primary"
              @click="showOrderSuccess = true"
            >
              Continue Shopping</v-btn
            >
          </div>
        </template>
        <div
          class="tw-flex tw-flex-col tw-items-center tw-justify-center my-auto tw-h-[75vh]"
          v-else
        >
          <img src="@/assets/images/svgs/cart.svg" alt="" width="215px" />
          <h2 class="tw-text-[28px] mt-4 mb-3">No item added yet</h2>
          <p class="tw-w-[60%] text-center mx-auto tw-text-[17px] tw-opacity-50">
            Hit the button below to Create an order
          </p>
          <v-btn
            class="!tw-h-[70px] !tw-rounded-full tw-w-full mt-4"
            color="primary"
            @click="placeOrder"
          >
            Place Order</v-btn
          >
        </div>
      </section>
      <paystack-modal
        id="paystack-modal"
        :amount="paystackData?.amount"
        :email="paystackData?.email"
        buttonText="Pay Online"
        :publicKey="paystackPublicKey"
        :reference="paystackData?.reference"
        :callback="paystackData?.callback"
        :onSuccess="onSuccessfulPayment"
        :onCancel="onCancelledPayment"
        :embed="false"
      >
      </paystack-modal>
    </v-navigation-drawer>
  </v-layout>
  <OrderSuccess v-model:show="showOrderSuccess" />
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import ProductItem from './ProductItem.vue'
import PaymentMethods from './PaymentMethods.vue'
import OrderSuccess from '../Modals/OrderSuccess.vue'
import { useCartStore } from '@/stores/cart.ts'
import { formatAsMoney } from '@/utils/helpers.ts'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user.ts'

const userStore = useUserStore()

const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()
const cartStore = useCartStore()

const { profile } = storeToRefs(userStore)
const { cartItems } = storeToRefs(cartStore)

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

const paystackPublicKey = computed(() => import.meta.env.VITE_PAYSTACK_PUBLIC_KEY)

const loading = ref(false)
const showOrderSuccess = ref(false)

const paystackData = ref()
const form = ref<{
  address: string
  paymentMethod: string
  paymentProof: string
}>({
  address: '',
  paymentMethod: '',
  paymentProof: '',
})

const showDrawer = computed({
  get() {
    return props.show
  },
  set(value) {
    emit('update:show', value)
  },
})

const total = computed(() => {
  return cartItems.value?.data?.reduce((acc: number, item: any) => {
    return acc + item.price * item.quantity
  }, 0)
})

const placeOrder = () => {
  showDrawer.value = false
  router.push('/home')
}

const handleUploadedUrl = (urls: string[]) => {
  form.value.paymentProof = urls[0]
}

const deleteItem = async (itemId: string) => {
  authStore.toggleLoader()
  await cartStore.deleteICartItem(itemId)
  authStore.toggleLoader()
}

const createOrder = async () => {
  const payload = {
    ...form.value,
    cartId: cartItems.value.cart_id,
  }

  const formData = new FormData()
  formData.append('paymentMethod', form.value.paymentMethod)
  formData.append('address', form.value.address)
  formData.append('cartId', cartItems.value.cart_id)

  if (form.value.paymentProof && form.value.paymentMethod === 'BANK') {
    formData.append('paymentProof', form.value.paymentProof || '')
  }

  loading.value = true
  const response = await cartStore.createOrder(
    form.value.paymentMethod === 'BANK' ? formData : payload,
  )
  if (response) {
    if (form.value.paymentMethod === 'PAYSTACK') {
      handlePaystackPayment(response.payload)
    } else {
      toast.success('Order created successfully', {
        position: 'top',
        duration: 6000,
      })
      showDrawer.value = false
      showOrderSuccess.value = true
      cartStore.fetchCartItems()
    }
  }
  loading.value = false
}

const handlePaystackPayment = (data: any) => {
  paystackData.value = data
  setTimeout(() => {
    document.getElementById('paystack-modal')?.click()
  }, 1000)
}

const onSuccessfulPayment = () => {
  cartStore.fetchCartItems()
  showDrawer.value = false
  showOrderSuccess.value = true

  cartStore.fetchCartItems()
}

const onCancelledPayment = () => {
  toast.error('Transaction failed, try again', {
    position: 'top',
    duration: 6000,
  })
}

watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      form.value.address = profile.value.address
    }
  },
)
</script>

<style scoped>
.swiper-slide {
  height: 300px;
}
</style>
