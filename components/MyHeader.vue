<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isExact = (to: string) => route.path === to;
const isSection = (to: string) =>
  route.path === to || route.path.startsWith(to + "/");

/** ----- Header background color: from #1f1f1f -> var(--color-primary-900) ----- */
const hdrBg = ref("rgb(31, 31, 31)"); // SSR-safe default (#1f1f1f)
const endRgb = ref<{ r: number; g: number; b: number }>({
  r: 0x0f,
  g: 0x2f,
  b: 0x6b,
}); // fallback to #0f2f6b

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const v =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(v, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
function mix(
  a: { r: number; g: number; b: number },
  b: { r: number; g: number; b: number },
  t: number
) {
  const lerp = (x: number, y: number, k: number) => Math.round(x + (y - x) * k);
  return `rgb(${lerp(a.r, b.r, t)}, ${lerp(a.g, b.g, t)}, ${lerp(
    a.b,
    b.b,
    t
  )})`;
}

const START = { r: 0x1f, g: 0x1f, b: 0x1f }; // #1f1f1f
const FADE_PORTION = 0.4;

onMounted(() => {
  // ✅ Read CSS var only on client
  const cssHex = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-primary-900")
    .trim();
  if (cssHex) endRgb.value = hexToRgb(cssHex);

  const hero = document.getElementById("hero");
  if (!hero) {
    hdrBg.value = mix(START, endRgb.value, 0);
    return;
  }

  const headerEl = document.querySelector(".site-header") as HTMLElement | null;
  const headerH = headerEl?.offsetHeight ?? 80;

  const update = () => {
    const heroH = hero.offsetHeight || 1;
    const y = window.scrollY + headerH;
    const fadeEnd = heroH * FADE_PORTION;
    const t = Math.min(1, Math.max(0, y / fadeEnd));
    hdrBg.value = mix(START, endRgb.value, t);
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  onUnmounted(() => {
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
  });
});

/* dropdown state (chevrons) */
const openCollaborators = ref(false);
const openAbout = ref(false);

/* menu items (unchanged aside from your fixed slug) */
const itemsAbout = computed(() => [
  [
    {
      label: "About & Contact",
      type: "link",
      to: "/about-and-contact",
      class: isExact("/about-and-contact") ? "font-semibold" : undefined,
    },
  ],
  [
    {
      label: "Public material & downloads",
      type: "link",
      to: "/about-and-contact/public-material-and-downloads",
      class:
        route.path === "/about-and-contact/public-material-and-downloads"
          ? "font-semibold"
          : undefined,
    },
  ],
  [
    {
      label: "Privacy Policy",
      type: "link",
      to: "/about-and-contact/privacy-policy",
      class:
        route.path === "/about-and-contact/privacy-policy"
          ? "font-semibold"
          : undefined,
    },
  ],
  [
    {
      label: "Cookie Policy",
      type: "link",
      to: "/about-and-contact/cookie-policy",
      class:
        route.path === "/about-and-contact/cookie-policy"
          ? "font-semibold"
          : undefined,
    },
  ],
]);
const itemsMobile = computed(() => [
  { label: "Home", type: "link", to: "/" },
  {
    label: "Equipment & solutions",
    type: "link",
    to: "/equipment-and-solutions",
  },
  { type: "separator" },
  { label: "Collaborators", type: "label" },
  { type: "separator" },
  { label: "About & contact", type: "label" },
  { label: "About & Contact", type: "link", to: "/about-and-contact" },
  {
    label: "Public material & downloads",
    type: "link",
    to: "/about-and-contact/public-material-and-downloads",
  },
]);
</script>

<template>
  <a
    href="#hero"
    class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-xl focus:bg-[var(--color-primary-100)] focus:px-3 focus:py-2 focus:text-[var(--color-text)]"
  >
    Skip to main content
  </a>

  <!-- full-bleed, no white gap -->
  <header
    class="site-header fixed inset-x-0 top-0 z-50 w-screen min-w-[320px] shadow-md"
    :style="{ backgroundColor: hdrBg }"
  >
    <UContainer
      class="mx-auto flex h-20 items-center justify-between max-w-[1920px]"
    >
      <NuxtLink
        to="/"
        aria-label="Tegetec — Home"
        class="inline-flex items-center gap-2 rounded-md transition + ring-0 hover:ring-1 focus-visible:ring-1 + hover:ring-[var(--color-primary-200)] focus-visible:ring-[var(--focus-ring)] p-2"
      >
        <img
          src="/assets/img/tegetec.svg"
          alt="Tegetec"
          class="h-9 w-auto"
          decoding="async"
          fetchpriority="high"
        />
      </NuxtLink>

      <!-- desktop -->
      <nav aria-label="Primary" class="ml-6 hidden md:block">
        <ul class="flex items-center gap-2 sm:gap-4">
          <li>
            <NuxtLink
              to="/"
              class="nav-item hover:bg-primary-800/50 rounded-sm p-1 transition-all hover:p-2"
              :aria-current="isExact('/') ? 'page' : undefined"
              >Home</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/equipment-and-solutions"
              class="nav-item hover:bg-primary-800/50 rounded-sm p-1 transition-all hover:p-2"
              :aria-current="
                isSection('/equipment-and-solutions') ? 'page' : undefined
              "
              :class="
                isSection('/equipment-and-solutions') ? 'font-semibold' : ''
              "
            >
              Equipment &amp; solutions
            </NuxtLink>
          </li>

          <li>
            <NuxtLink
              to="/collaborators"
              class="nav-item hover:bg-primary-800/50 rounded-sm p-1 transition-all hover:p-2"
              :aria-current="isSection('/collaborators') ? 'page' : undefined"
              :class="isSection('/collaborators') ? 'font-semibold' : ''"
            >
              Collaborators
            </NuxtLink>
          </li>

          <li class="relative z-50 cursor-pointer">
            <UDropdownMenu
              v-model:open="openAbout"
              class="cursor-pointer"
              :items="itemsAbout"
              :ui="{
                content:
                  'w-80 z-50 border border-[var(--color-border)] bg-primary-800 p-1',
              }"
            >
              <UButton
                color="brand"
                variant="ghost"
                class="nav-trigger inline-flex items-center hover:bg-primary-800/50 rounded-sm p-1 transition-all hover:p-2"
                :class="isSection('/about-and-contact') ? 'font-semibold' : ''"
              >
                <span>About &amp; contact</span>
                <UIcon
                  name="i-lucide-chevron-down"
                  class="ml-1 size-4 opacity-80 transition-transform duration-200"
                  :class="openAbout ? 'rotate-180' : ''"
                />
              </UButton>
            </UDropdownMenu>
          </li>
        </ul>
      </nav>

      <!-- mobile -->
      <div class="md:hidden">
        <UDropdownMenu
          arrow
          :items="itemsMobile"
          :ui="{
            content:
              'w-72 z-50 border border-[var(--color-border)]  bg-primary-800 p-1',
          }"
        >
          <UButton
            label="Menu"
            icon="i-lucide-menu"
            color="neutral"
            variant="outline"
            class="rounded-md ring-1 ring-transparent ring-offset-2 ring-offset-[var(--color-bg)] transition hover:ring-[var(--color-primary-200)] focus-visible:ring-[var(--focus-ring)]"
          />
        </UDropdownMenu>
      </div>
    </UContainer>
  </header>
  <div class="head-fill"></div>
</template>

<style scoped lang="scss">
.head-fill {
  height: 50px;
  width: 100%;
}
.site-header {
  transition: background-color 180ms linear;
  backdrop-filter: blur(2.4px);
  -webkit-backdrop-filter: blur(5.4px);
}

/* --- Top-level nav items on dark bar --- */
.nav-item {
  @apply inline-flex items-center px-2 py-1 rounded-md transition;
  color: var(--color-primary-50); /* bright on dark bar */
  /* default: no ring/background */
  @apply ring-0;
  /* hover/focus-only indicators */
  @apply hover:bg-white/10 hover:ring-1 hover:ring-[var(--color-primary-300)]
         focus-visible:ring-1 focus-visible:ring-[var(--focus-ring)];
}
.nav-item[aria-current="page"] {
  font-weight: 700;
}

/* --- Dropdown triggers on dark bar --- */
.nav-trigger {
  @apply inline-flex items-center px-2 py-1 uppercase tracking-wider rounded-md transition;
  color: var(--color-primary-50);
  @apply ring-0
         hover:bg-white/10 hover:ring-1 hover:ring-[var(--color-primary-300)]
         focus-visible:ring-1 focus-visible:ring-[var(--focus-ring)];
}

/* --- Dropdown menu items (light panel) --- */
:deep(.ui-dropdown-menu [role="menuitem"]),
:deep(.ui-dropdown-menu a[role="menuitem"]) {
  color: var(--link); /* dark blue on light panel (WCAG) */
  @apply rounded-md px-3 py-2 transition ring-0;
  @apply hover:bg-[var(--color-primary-50)] hover:ring-1 hover:ring-[var(--color-primary-200)]
         focus-visible:ring-1 focus-visible:ring-[var(--focus-ring)];
}
:deep(.ui-dropdown-menu [role="menuitem"][data-disabled]) {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .nav-item,
  .nav-trigger {
    transition: none;
  }
}
</style>
