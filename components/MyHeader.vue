// Burger menu logic and integration with header // This version activates the
mobile menu below 769px width

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isMenuOpen = ref(false);

const isExact = (to: string) => route.path === to;
const isSection = (to: string) =>
  route.path === to || route.path.startsWith(to + "/");

const aboutDropdownItems = [
  [
    { label: "About", to: "/about" },
    { label: "Policies", icon: "i-lucide-book-text", to: "/about/policies" },
    { label: "Legal", icon: "i-lucide-info", to: "/about/legal" },
  ],
];
</script>

<template>
  <header
    class="site-header fixed top-0 z-10 w-full min-w-[320px] bg-neutral-900/90"
  >
    <nav class="w-full max-w-[1440px] mx-auto px-4 md:px-6">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <NuxtLink to="/">
          <img
            class="logo max-w-[75px] hover:ring hover:ring-amber-50 transition hover:p-2 hover:rounded-2xl"
            src="/public-material/logo-center-shadow.svg"
            alt="EOI logo with shadow effect on lettering"
          />
        </NuxtLink>

        <!-- Desktop Nav -->
        <ul class="hidden md:flex items-center gap-6">
          <li>
            <UButton
              variant="ghost"
              to="/"
              class="nav-link"
              :aria-current="isExact('/') ? 'page' : undefined"
              >Home</UButton
            >
          </li>
          <li>
            <UButton
              variant="ghost"
              to="/services"
              class="nav-link"
              :aria-current="isSection('/services') ? 'page' : undefined"
              >Services</UButton
            >
          </li>
          <li>
            <UDropdownMenu :items="aboutDropdownItems">
              <UButton variant="ghost" class="flex items-center gap-1"
                >About <UIcon name="i-lucide-chevron-down"
              /></UButton>
            </UDropdownMenu>
          </li>
          <li>
            <UButton
              variant="ghost"
              to="/contact"
              class="nav-link"
              :aria-current="isSection('/contact') ? 'page' : undefined"
              >Contact</UButton
            >
          </li>
        </ul>

        <!-- Burger Menu Button -->
        <button
          class="md:hidden inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          @click="isMenuOpen = !isMenuOpen"
          :aria-expanded="isMenuOpen.toString()"
          aria-label="Toggle navigation menu"
        >
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path v-if="!isMenuOpen" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <transition name="fade">
        <ul
          v-if="isMenuOpen"
          class="md:hidden flex flex-col gap-4 mt-4 bg-[--color-neutral-900] text-white p-4 rounded-lg shadow-md"
        >
          <li>
            <NuxtLink to="/" class="block" @click="isMenuOpen = false"
              >Home</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/services" class="block" @click="isMenuOpen = false"
              >Services</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/about" class="block" @click="isMenuOpen = false"
              >About</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/about/policies"
              class="block"
              @click="isMenuOpen = false"
              >Policies</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/about/legal"
              class="block"
              @click="isMenuOpen = false"
              >Legal</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/contact" class="block" @click="isMenuOpen = false"
              >Contact</NuxtLink
            >
          </li>
        </ul>
      </transition>
    </nav>
  </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.site-header {
  backdrop-filter: blur(2.4px);
  -webkit-backdrop-filter: blur(5.4px);
  box-shadow: 0 6px 12px 2px #1f1f1fa0;
  transition: background-color 120ms linear;
}
</style>
