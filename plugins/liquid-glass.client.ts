// plugins/liquid-glass.client.ts
// Registers the @wxperia/liquid-glass-vue components globally for client-side use

import { LiquidGlass } from '@wxperia/liquid-glass-vue'

export default defineNuxtPlugin((nuxtApp) => {
  // Register as a global component instead of using .use()
  nuxtApp.vueApp.component('LiquidGlass', LiquidGlass)
})
