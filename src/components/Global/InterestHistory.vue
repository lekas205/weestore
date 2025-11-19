<template>
  <v-layout>
    <v-navigation-drawer v-model="showDrawer" temporary :width="450" color="#F4F4F8">
      <img
        src="../../assets//images/png/app-background-image.png"
        alt=""
        class="tw-fixed tw-left-0 tw-w-[110vw] tw-h-[100%] tw-top-0 tw-z-0"
      />
      <div class="tw-mt-[70px] tw-relative">
        <button class="tw-absolute tw-top-[10px]v" @click="showDrawer = false">
          <v-icon icon="mdi-arrow-left" end></v-icon>
        </button>
        <div class="tw-flex tw-flex-col mt-10 tw-items-center">
          <h5 class="tw-text-[20px] tw-font-semibold mb-1">Interest History</h5>
        </div>

        <section class="tw-px-5 tw-mt-7">
          <div
            class="tw-flex tw-justify-between tw-pb-8 history-list"
            v-for="(item, index) in history"
            :key="index"
          >
            <div class="">
              <h3 class="tw-text-[20px]">
                {{ item.status === 'credit' ? 'Interest Earned' : 'Interest Withdrawn' }}
              </h3>
              <p>{{ formatDate(new Date()) }}</p>
            </div>

            <div :class="item.status === 'credit' ? 'tw-text-green' : 'tw-text-error'">
              <h3 class="tw-font-semibold tw-text-[20px]">
                {{ formatAsMoney(item.amount) }}
              </h3>
              <p class="tw-capitalize">{{ item.status }}</p>
            </div>
          </div>
        </section>
      </div>
    </v-navigation-drawer>
  </v-layout>
</template>

<script setup lang="ts">
import { formatAsMoney, formatDate } from '@/utils/helpers'
import { computed, ref } from 'vue'

const props = defineProps<{
  show: boolean
}>()
const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'success'): void
}>()

const showDrawer = computed({
  get() {
    return props.show
  },
  set(value) {
    emit('update:show', value)
  },
})

const history = ref([
  { status: 'credit', amount: 3000 },
  { status: 'credit', amount: 2000 },
  { status: 'debit', amount: 4000 },
])
</script>

<style scoped>
.history-list {
  padding-left: 30px;
  position: relative;
}

.history-list:not(:last-child) {
  border-left: 1px dashed #fa4a0c;
}

.history-list::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 1px;
  height: 12px;
  width: 12px;
  background-color: #fa4a0c;
  border-radius: 100%;
}
</style>
