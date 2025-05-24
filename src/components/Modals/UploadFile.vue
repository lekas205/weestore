<template>
  <v-dialog v-model="showModal" width="auto">
    <v-card min-width="320" class="!tw-rounded-[20px]">
      <section class="tw-p-4">
        <div class="mb-6">
          <h2 class="tw-font-medium">Upload File</h2>

          <button class="tw-absolute tw-right-4 tw-top-6" @click="showModal = false">
            <img src="@/assets/images/svgs/close.svg" class="tw-w-3" alt="close icon" />
          </button>
        </div>

        <v-text-field
          hide-details="auto"
          label="Amount"
          type="tel"
          v-model="amount"
          v-if="showAmount"
          @blur="emit('amount', amount)"
          class="tw-mb-4"
        ></v-text-field>

        <v-file-input
          accept="image/png, image/jpeg, image/bmp"
          label="Photos"
          placeholder="Upload your photos"
          prepend-icon="mdi-camera"
          @change="saveFileToLocal"
        ></v-file-input>

        <div class="tw-flex tw-gap-4 tw-flex-wrap" v-if="files.length">
          <div v-for="(file, idx) in files" :key="idx" class="tw-relative">
            <button class="tw-absolute tw-right-[-4px] tw-top-0 tw-z-10" @click="removeFile(idx)">
              <v-icon icon="mdi-close-circle" color="red"></v-icon>
            </button>

            <v-card class="my-2" elevation="2" rounded>
              <v-img :src="file.src" height="80" width="80" cover></v-img>
            </v-card>
          </div>
        </div>

        <div class="text-center">
          <v-btn
            class="tw-my-8 tw-w-full !tw-h-[50px] !tw-rounded-full"
            color="primary"
            @click="proceedToUpload"
            :loading="loading"
          >
            Upload
          </v-btn>
        </div>
      </section>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import { handleFileUpload } from '@/utils/helpers'

interface CustomFile extends File {
  src?: string
}
const toast = useToast()
const props = defineProps<{
  show: boolean
  showAmount?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'uploadImageUrls', urls: string[]): void
  (e: 'amount', value: string): void
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
const amount = ref('')
const files = ref<CustomFile[]>([])

function saveFileToLocal(event: any): void {
  const file: File = event.target.files[0]
  console.log(file)

  if (!file) return

  handleFilePreview(file)
}

function removeFile(idx: number) {
  files.value.splice(idx, 1)
}

function handleFilePreview(file: CustomFile) {
  const reader = new FileReader()

  reader.onload = function (e) {
    file['src'] = e.target?.result as string
    files.value.push(file)
  }

  reader.readAsDataURL(file)
}

const proceedToUpload = async () => {
  loading.value = true
  const urls = await handleFileUpload([...files.value])

  if (urls) {
    emit('uploadImageUrls', urls)
    toast.success('Files uploaded successfully', {
      position: 'top',
      duration: 3000,
    })
  }
  loading.value = false
}
</script>
