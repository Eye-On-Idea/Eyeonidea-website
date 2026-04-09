

import { LiquidGlass } from '@wxperia/liquid-glass-vue'

export default defineNuxtPlugin((nuxtApp) => {

  nuxtApp.vueApp.component('LiquidGlass', LiquidGlass)
})
