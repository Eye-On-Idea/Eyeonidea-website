<script lang="ts" setup>
const route = useRoute();
const { page } = usePageContent();

// Helper to fetch a single nav item by key (no foreach in template)
const navItem = (k: "home" | "services" | "about") =>
  page.value?.header?.nav?.find?.((i: any) => i.key === k) ?? {
    label: "",
    to: "#",
  };

// Individual items
const home = computed(() => navItem("home"));
const services = computed(() => navItem("services"));
const about = computed(() => navItem("about"));

// Active checks
const isExact = (to: string) => route.path === to;
const isSection = (to: string) =>
  route.path === to || route.path.startsWith(to + "/");

// Skip link text
const skipLink = computed(
  () => page.value?.header?.skipLink || "Skip to main content"
);

// Lang toggle
const { lang, toggleLang } = useLang();
const { announce } = useSrAnnounce();

const onToggleLang = async () => {
  toggleLang();
  await nextTick();
  announce(
    lang.value === "en" ? "Language set to English" : "Sprog ændret til dansk"
  );
};
</script>

<template>
  <a
    href="#hero"
    class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-xl focus:bg-[var(--quart-colour)] focus:px-3 focus:py-2 focus:text-[var(--prim-colour)]"
  >
    Skip to main content
  </a>
  <header class="fixed top-0 z-10 mx-auto flex h-20 w-full min-w-[320px">
    <nav class="w-full max-w-[1440px]">
      <ul class="flex flex-row">
        <li>
          <NuxtLink
            :to="home.to"
            class="nav-link"
            :aria-current="isExact(home.to) ? 'page' : undefined"
          >
            {{ home.label }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            :to="services.to"
            class="nav-link"
            :aria-current="isSection(services.to) ? 'page' : undefined"
          >
            {{ services.label }}
          </NuxtLink>
        </li>
        <li>
          <a href="/"
            ><img
              class="logo"
              src="/public-material/logo-center-shadow.svg"
              alt="EOI logo with shadow effect on lettering"
          /></a>
        </li>
        <li>
          <NuxtLink
            :to="about.to"
            class="nav-link"
            :aria-current="isSection(about.to) ? 'page' : undefined"
          >
            {{ about.label }}
          </NuxtLink>
        </li>
        <li>
          <UButton
            variant="solid"
            color="brand"
            size="sm"
            icon="i-heroicons-globe-alt"
            :aria-label="`Skift sprog til ${
              lang === 'en' ? 'dansk' : 'engelsk'
            }`"
            class="cursor-pointer ring-1 ring-brand-50/0 hover:bg-neutral-900/75 hover:ring-brand-50/50 focus-visible:ring-brand-50 text-[0.75rem] font-sans transition-normal"
            @click="onToggleLang"
          >
            {{ lang === "en" ? "DA" : "EN" }}
          </UButton>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
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
            outline: solid;
            outline-width: 1px;
            outline-color: var(--color-brand-50);
            padding: 8px;
            border-radius: 6px;
          }
        }
        &:nth-child(3) {
          transition: all 1.2s ease-out;
          &:hover {
            background-color: var(--quart-colour);
            padding: 12px;
            transition: var(--transition-normal);
            border-radius: var(--border-radius);
            a {
              outline: none;
            }
          }
        }
        &:nth-child(5) {
          &:hover {
            outline: none;
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
      font-weight: 700; // bold
    }
  }
}
@media (max-width: 420px) {
  a {
    font-size: 0.7rem;
  }
  button {
    font-size: 0.7rem;
    padding: 3px !important;
  }
}
</style>
