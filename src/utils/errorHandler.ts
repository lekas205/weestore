import { useAuthStore } from '@/stores/auth'
import router from '@/router'
import { useToast } from 'vue-toast-notification'

export function handleStoreRequestError(error: any): any {
  const toast = useToast()

  let message = 'There was a problem processing your request'
  let errorObj: any = {}

  if (error.response) {
    const { status, data = {} } = error.response
    errorObj = data.error?.length > 0 ? data.error[0] : {}

    if (status === 400) {
      message = errorObj.message || message
    } else if (status === 401) {
      const isLoginPage = document.location.pathname.includes('/login')
      const authStore = useAuthStore()
      message = errorObj.message || message
      authStore.removeSavedAuthToken()
      if (!isLoginPage) {
        toast.error('You are not logged in', {
          position: 'top',
          duration: 6000,
        })
        router.push({ name: 'Login' })
        return
      }
    }
  } else if (error.request) {
    message = 'Network Error'
  }

  toast.error(message, {
    position: 'top',
    duration: 6000,
  })

  return errorObj
}
