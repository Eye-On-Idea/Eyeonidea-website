
import { ref } from 'vue'

const isPageFullyLoaded = ref(false)
const loadCallbacks: (() => void)[] = []

export const usePageLoadManager = () => {
  const registerLoadCallback = (callback: () => void) => {
    if (isPageFullyLoaded.value) {

      callback()
    } else {

      loadCallbacks.push(callback)
    }
  }

  const markPageAsLoaded = () => {
    isPageFullyLoaded.value = true

    loadCallbacks.forEach(cb => cb())
    loadCallbacks.length = 0
  }

  return {
    isPageFullyLoaded,
    registerLoadCallback,
    markPageAsLoaded,
  }
}
