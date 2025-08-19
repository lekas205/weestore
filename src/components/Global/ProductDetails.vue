<template>
  <v-layout>
    <v-navigation-drawer v-model="showDrawer" temporary :width="450" color="#F4F4F8">
      <section class="tw-p-5 tw-flex tw-flex-col">
        <AppHeader back @go-back="showDrawer = false" title="Product Details" hideCartIcon />

        <swiper
          v-if="product?.images"
          :slidesPerView="'auto'"
          :centeredSlides="true"
          :pagination="{
            clickable: true,
          }"
          :modules="[Pagination]"
          class="mySwiper mt-10"
        >
          <swiper-slide v-for="(image, index) in product?.images" :key="index">
            <img
              :src="image.imageUrl"
              alt="Product Image"
              class="tw-object-cover tw-mx-auto tw-h-[250px] tw-w-full"
            />
          </swiper-slide>
        </swiper>
        <div class="tw-h-[270px] tw-w-full" v-else>
          <img :src="product.image" class="tw-w-full tw-h-full tw-object-fill" />
        </div>

        <div class="tw-w-full tw-py-8 text-center bg-white tw-rounded-2xl">
          <h3 class="tw-text-[25px]">{{ product?.product_name }}</h3>
          <p class="tw-text-primary tw-text-[20px]">As at today</p>

          <section class="tw-flex tw-flex-col tw-gap-3 mt-2 tw-px-10">
            <div class="tw-flex tw-justify-between tw-items-center">
              <p class="text">Unit Price</p>
              <p class="tw-text-success tw-text-[20px]">{{ formatAsMoney(product?.price) }}</p>
            </div>
            <div class="tw-flex tw-justify-between tw-items-center">
              <p>{{ !isPurchased ? ' Min. Qty' : 'Unit(s)' }}</p>
              <QuantityStepper
                v-model="quantity"
                v-if="!isPurchased"
                :min-qty="product.min_quantity"
                :max-qty="product.max_quantity"
              />
              <p v-else>{{ product.quantity }}</p>
            </div>
            <div class="tw-flex tw-justify-between tw-items-center">
              <p>Total Price</p>
              <p class="tw-text-primary tw-text-[20px]">
                {{
                  isPurchased
                    ? formatAsMoney(product.total)
                    : formatAsMoney(product?.price * quantity)
                }}
              </p>
            </div>
          </section>
          <v-alert color="#FFF0D2" density="compact" type="warning" theme="dark" class="mt-5">
            {{ alertDescription }}
          </v-alert>
        </div>

        <section v-if="!isPurchased">
          <section class="tw-mt-5" v-if="product?.description">
            <h4 class="tw-text-[20px]">Product Description</h4>
            <small class="tw-text-[16px] tw-opacity-50"> {{ product?.description }} </small>
          </section>
          <div class="tw-flex tw-flex-col tw-mt-10">
            <v-btn
              class="tw-mt-auto !tw-h-[70px] !tw-rounded-full"
              color="primary"
              @click="AddToCart"
              :loading="loading"
            >
              Add to cart</v-btn
            >
          </div>
        </section>

        <template v-else>
          <section class="tw-flex tw-flex-col tw-gap-4 mt-5">
            <div class="tw-flex tw-justify-between tw-w-full">
              <p class="tw-text-[18px]">Purchase Amount</p>
              <p class="tw-text-[18px]">{{ formatAsMoney(product.total) }}</p>
            </div>

            <div class="tw-flex tw-justify-between tw-w-full">
              <p class="tw-text-[18px]">Procurement Date</p>
              <p class="tw-text-[18px]">{{ product.start_date }}</p>
            </div>

            <div class="tw-flex tw-justify-between tw-w-full">
              <p class="tw-text-[18px]">WHP</p>
              <p class="tw-text-[18px]">{{ product.whp }}</p>
            </div>
          </section>

          <section
            class="tw-flex tw-flex-col tw-gap-5 mt-5 pb-6 mt-8"
            v-if="product?.category?.toLowerCase() != 'groceries'"
          >
            <v-btn
              @click="showPocketModal = true"
              class="tw-mt-auto !tw-h-[70px] !tw-text-[14px] !tw-leading-6 !tw-rounded-full"
              color="#FA4A0C"
            >
              Transfer To Pocket for Restocking. <br />
              Balance - {{ formatAsMoney(product?.total) }}
            </v-btn>

            <v-btn
              @click="withdrawToBank"
              class="tw-mt-auto !tw-h-[70px] !tw-text-[14px] !tw-leading-6 !tw-rounded-full"
              color="#fa4b0c5b"
            >
              Withdraw To Bank. <br />
              Balance - {{ formatAsMoney(product?.total) }}
            </v-btn>
          </section>
        </template>
      </section>
    </v-navigation-drawer>
  </v-layout>

  <Withdrawal v-model:show="showWithdrawal" :units="product.quantity" @proceed="transferToBank" />
  <PocketTransfer
    v-model:show="showPocketModal"
    :units="product.quantity"
    @proceed="transferToPocket"
  />
</template>

<script lang="ts" setup>
import AppHeader from '@/components/Global/AppHeader.vue'
import { ref, watch, computed } from 'vue'
import type { Products } from '@/types'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import { formatAsMoney } from '@/utils/helpers.ts'
import QuantityStepper from './QuantityStepper.vue'
import Withdrawal from '@/components/Modals/Withdrawal.vue'
import PocketTransfer from '@/components/Modals/PocketTransfer.vue'
import { useCartStore } from '@/stores/cart.ts'
import { useTransactionStore } from '@/stores//transaction.ts'
import { useToast } from 'vue-toast-notification'
import { TRANSACTION_TYPES } from '@/utils/constants'
import { useAuthStore } from '@/stores/auth'
import { useProductsStore } from '@/stores/products.ts'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { ROUTES } from '@/router/routes/routes'

const productStore = useProductsStore()
const toast = useToast()
const cartStore = useCartStore()
const authStore = useAuthStore()
const userStore = useUserStore()
const transactionStore = useTransactionStore()

const router = useRouter()

const { profile } = storeToRefs(userStore)

const props = defineProps<{
  show: boolean
  product: Products
  isPurchased?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

const quantity = ref(1)
const loading = ref(false)

const showDrawer = computed({
  get() {
    return props.show
  },
  set(value) {
    emit('update:show', value)
  },
})

const showWithdrawal = ref(false)
const showPocketModal = ref(false)

const withdrawToBank = () => {
  if (!profile.value.bank.accountName) {
    toast.success('Please Add your bank details to proceed with withdrawal', {
      position: 'top',
      duration: 6000,
    })
    return router.push({ name: ROUTES.profile.name, query: { bank_account: 'true' } })
  }
  showWithdrawal.value = true
}

const AddToCart = async () => {
  if (!localStorage.getItem('ACCESS_TOKEN')) {
    toast.error('Please login to add product to cart', {
      position: 'top',
      duration: 6000,
    })
    return router.push({ name: ROUTES.login.name })
  }

  loading.value = true
  const res = await cartStore.addToCart({
    quantity: quantity.value.toString(),
    productId: props.product.product_id,
  })

  if (res?.success) {
    toast.success('Product added to cart', {
      position: 'top',
      duration: 6000,
    })

    showDrawer.value = false
  }

  loading.value = false
}

const transferToPocket = async (unit: number) => {
  authStore.toggleLoader()
  const res = await transactionStore.transferToPocket({
    productId: props.product.product_id,
    unit: unit.toString(),
    withdrawalType: TRANSACTION_TYPES.pocket,
  })

  if (res) {
    await productStore.fetchCustomerOrder()
    toast.success('Transfer to pocket successful', {
      position: 'top',
      duration: 6000,
    })

    showDrawer.value = false
  }

  authStore.toggleLoader()
}

const transferToBank = async (unit: number | string) => {
  authStore.toggleLoader()
  const res = await transactionStore.transferToBank({
    productId: props.product.product_id,
    unit: unit.toString(),
    withdrawalType: TRANSACTION_TYPES.bank,
  })

  if (res) {
    await productStore.fetchCustomerOrder()
    toast.success('Transfer to Bank successful', {
      position: 'top',
      duration: 6000,
    })

    showDrawer.value = false
  }
  authStore.toggleLoader()
}

const alertDescription = computed(() => {
  return props.isPurchased
    ? `Quantity bought is ${props.product.quantity}`
    : ` Minimun quantity is ${props.product?.min_quantity} and maximum quantity is
            ${props.product.max_quantity}`
})

watch(
  () => props.product,
  (newValue: Products) => {
    if (newValue) {
      quantity.value = newValue.min_quantity
    }
  },
  { deep: true },
)
</script>

<style scoped>
.swiper {
  height: 300px !important;
}
.swiper-slide {
  height: 250px;
}

.v-alert__content {
  text-align: left;
}
</style>
