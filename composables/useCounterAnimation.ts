import { ref, computed, onMounted } from 'vue'
import { usePreferredReducedMotion } from '@vueuse/core'

export function useCounterAnimation(
  targetValue: number,
  options: {
    duration?: number
    startValue?: number
    decimals?: number
    suffix?: string
    prefix?: string
    easing?: 'linear' | 'easeOut' | 'easeInOut'
  } = {}
) {
  const {
    duration = 2000,
    startValue = 0,
    decimals = 0,
    suffix = '',
    prefix = '',
    easing = 'easeOut',
  } = options

  const reducedMotionPreference = usePreferredReducedMotion()
  const prefersReducedMotion = computed(() => reducedMotionPreference.value === 'reduce')

  const currentValue = ref(startValue)
  const isAnimating = ref(false)

  const easingFunctions = {
    linear: (t: number) => t,
    easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
    easeInOut: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  }

  const startAnimation = () => {
    if (isAnimating.value) return

    if (prefersReducedMotion.value) {
      currentValue.value = targetValue
      return
    }

    isAnimating.value = true
    const startTime = performance.now()
    const difference = targetValue - startValue

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const easedProgress = easingFunctions[easing](progress)

      currentValue.value = startValue + difference * easedProgress

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        currentValue.value = targetValue
        isAnimating.value = false
      }
    }

    requestAnimationFrame(animate)
  }

  const formattedValue = computed(() => {
    const rounded = currentValue.value.toFixed(decimals)
    return `${prefix}${rounded}${suffix}`
  })

  return {
    currentValue,
    formattedValue,
    startAnimation,
    isAnimating,
  }
}

export function useScrollTriggeredCounter(
  targetValue: number,
  options: Parameters<typeof useCounterAnimation>[1] & {
    threshold?: number
  } = {}
) {
  const { threshold = 0.5, ...counterOptions } = options

  const targetRef = ref<HTMLElement | null>(null)
  const hasTriggered = ref(false)
  const counter = useCounterAnimation(targetValue, counterOptions)

  onMounted(() => {
    if (!targetRef.value) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered.value) {
            hasTriggered.value = true
            counter.startAnimation()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    observer.observe(targetRef.value)

    return () => observer.disconnect()
  })

  return {
    targetRef,
    ...counter,
  }
}
