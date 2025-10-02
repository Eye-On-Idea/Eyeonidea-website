<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, nextTick } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Active checks
const isExact = (to: string) => route.path === to;
const isSection = (to: string) =>
  route.path === to || route.path.startsWith(to + "/");

//
const langLink = computed(() => {
  return route.path.startsWith("/da") ? "/" : "/da";
});

const langLabel = computed(() =>
  route.path.startsWith("/da") ? "Switch to English" : "Switch to Danish"
);
// header transition
const hdrAlpha = ref(0.31);
const START_ALPHA = 0.31;
const END_ALPHA = 1.0;
const FADE_PORTION = 0.4;

onMounted(() => {
  const hero = document.getElementById("hero");
  const headerEl = document.querySelector(".site-header") as HTMLElement | null;

  if (!hero) {
    hdrAlpha.value = END_ALPHA;
    return;
  }

  const headerH = headerEl?.offsetHeight ?? 80;

  const update = () => {
    const heroH = hero.offsetHeight || 1;
    const y = window.scrollY + headerH;
    const fadeEnd = heroH * FADE_PORTION;
    const progress = Math.min(1, Math.max(0, y / fadeEnd));
    hdrAlpha.value = START_ALPHA + (END_ALPHA - START_ALPHA) * progress;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  onUnmounted(() => {
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
  });
});

// Menu Drop down
const aboutDropdownItems = [
  [
    { label: "About", to: "/about" },
    { label: "Policies", icon: "i-lucide-book-text", to: "/about/policies" },
    { label: "Legal", icon: "i-lucide-info", to: "/about/legal" },
  ],
];
</script>

<template>
  <a
    href="#hero"
    class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-xl focus:bg-[var(--quart-colour)] focus:px-3 focus:py-2 focus:text-[var(--prim-colour)]"
  >
    Skip to main content
  </a>

  <header
    class="site-header sticky top-0 z-10 mx-auto flex h-20 w-full min-w-[320px] w-max[1920px] align-middle"
    :style="{ '--hdr-alpha': hdrAlpha.toString() }"
  >
    <nav class="w-full max-w-[1440px]">
      <ul class="flex flex-row">
        <li>
          <NuxtLink
            to="/"
            class="nav-link"
            :aria-current="isExact('/') ? 'page' : undefined"
          >
            Home
          </NuxtLink>
        </li>

        <li>
          <NuxtLink
            to="/services"
            class="nav-link"
            :aria-current="isSection('/services') ? 'page' : undefined"
          >
            Services
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/">
            <img
              class="logo"
              src="/public-material/logo-center-shadow.svg"
              alt="EOI logo with shadow effect on lettering"
            />
          </NuxtLink>
        </li>
        <li class="flex items-center">
          <UDropdownMenu
            :items="aboutDropdownItems"
            :content="{ side: 'bottom', align: 'start', sideOffset: 6 }"
            :ui="{
              content: 'bg-brand-200 text-neutral-900 ',
              itemLabel:
                'text-[15px] font-sans text-neutral-900 hover:text-amber-50',
              itemLeadingIcon: 'size-4 text-neutral-900',
            }"
          >
            <!-- Trigger -->
            <UButton
              color="gray"
              variant="ghost"
              class="flex items-center gap-1 font-sans text-[15px] md:text-[16px] leading-none h-10 px-3 rounded-[var(--radius-md)] text-[var(--color-neutral-900)] cursor-pointer hover:bg-brand-300/20"
              aria-label="About menu"
            >
              <span class="uppercase">about</span>
              <UIcon
                name="i-lucide-chevron-down"
                class="size-4"
                aria-hidden="true"
              />
            </UButton>
          </UDropdownMenu>
        </li>
        <li>
          <NuxtLink
            to="/contact"
            class="nav-link"
            :aria-current="isSection('/contact') ? 'page' : undefined"
          >
            contact
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.site-header {
  --hdr-alpha: 0.31;
  background-color: rgba(31, 31, 31, var(--hdr-alpha));
  backdrop-filter: blur(2.4px);
  -webkit-backdrop-filter: blur(5.4px);
  box-shadow: 0 6px 12px 2px #1f1f1fa0;
  transition: background-color 120ms linear;
}

@media (prefers-reduced-motion: reduce) {
  .site-header {
    transition: none;
  }
}

header {
  background-color: #1f1f1f50;
  backdrop-filter: blur(2.4px);
  -webkit-backdrop-filter: blur(5.4px);
  box-shadow: 0px 6px 12px 2px #1f1f1fa0;
  nav {
    display: flex;
    justify-content: center;
    margin-top: auto;
    padding: 15px;
    margin: 0 auto;
    position: relative;
    ul {
      gap: 25px;
      letter-spacing: 0.09em;
      li {
        margin-top: auto;
        text-transform: uppercase;
        padding: 0;
        cursor: pointer;
        transition: var(--transition-normal);
        a {
          transition: var(--transition-normal);
        }
        &:hover {
          a {
            outline: solid 1px var(--color-brand-50);
            padding: 8px;
            border-radius: 6px;
          }
        }
        img {
          width: 100%;
          max-width: 150px;
          min-width: 50px;
        }
      }
    }
    .nav-link[aria-current="page"] {
      font-weight: 700;
    }
  }
}

@media (max-width: 420px) {
  a {
    font-size: 0.7rem;
  }
  .inline-flex {
    font-size: 0.7rem;
    padding: 3px !important;
  }
}
</style>
