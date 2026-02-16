<template>
  <footer class="footer-main">
    <!-- Top: Logo + Contacts + Site nav -->
    <UContainer class="max-w-480 py-16">
      <div class="grid gap-12 lg:grid-cols-[320px_1fr_320px] items-start">
        <!-- Brand / intro -->
        <div class="space-y-5">
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring) focus-visible:ring-offset-2 ring-offset-(--ring-offset) group logo-container"
          >
            <img
              src="/public-material/logo-center-shadow.svg"
              alt="Eye On Idea logo"
              class="h-16 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <span class="sr-only">{{ t("footer.goToHomepage") }}</span>
          </NuxtLink>
          <p class="text-primary-200 text-lg">
            <i>{{ t("footer.tagline") }}</i>
          </p>
        </div>

        <!-- Contact (single office) -->
        <div class="flex flex-row flex-wrap gap-4 justify-center">
          <div class="office-card">
            <h3 class="text-xl font-semibold text-primary-50 mb-4">
              {{ t("footer.offices.denmark.title") }}
            </h3>
            <address class="not-italic space-y-3 text-primary-200">
              <p>{{ t("footer.offices.denmark.address") }}</p>
              <p class="flex items-center gap-3">
                <Icon
                  name="i-heroicons-phone"
                  aria-hidden="true"
                  class="size-5 text-primary-400"
                />
                <a class="footer-link" href="tel:+4529930583"
                  >+45 29 93 05 83</a
                >
              </p>
              <p class="flex items-center gap-3">
                <Icon
                  name="i-heroicons-envelope"
                  aria-hidden="true"
                  class="size-5 text-primary-400"
                />
                <a class="footer-link" href="mailto:hello@eyeonidea.com"
                  >hello@eyeonidea.com</a
                >
              </p>
              <p class="flex items-center gap-3">
                <Icon
                  name="i-heroicons-identification"
                  aria-hidden="true"
                  class="size-5 text-primary-400"
                />
                {{ t("footer.offices.denmark.cvr") }}
              </p>
              <p class="flex items-center gap-3">
                <Icon
                  name="i-heroicons-link"
                  aria-hidden="true"
                  class="size-5 text-primary-400"
                />
                <a
                  class="footer-link"
                  href="https://www.linkedin.com/company/eye-on-idea/"
                  target="_blank"
                  rel="noopener"
                  >{{ t("footer.offices.denmark.linkedin") }}</a
                >
              </p>
            </address>
          </div>

          <!-- CEO Card -->
          <div class="office-card">
            <h3 class="text-xl font-semibold text-primary-50 mb-4">
              {{ t("footer.founder.title") }}
            </h3>
            <div class="space-y-3 text-primary-200">
              <p class="font-medium text-primary-100">Rune M. P. Pjetursson</p>
              <p class="text-sm">{{ t("footer.founder.role") }}</p>
              <p class="flex items-center gap-3 mt-4">
                <Icon
                  name="i-heroicons-globe-alt"
                  aria-hidden="true"
                  class="size-5 text-primary-400"
                />
                <a
                  class="footer-link"
                  href="https://runepjetursson.com"
                  target="_blank"
                  rel="noopener"
                  >runepjetursson.com</a
                >
              </p>
            </div>
          </div>
        </div>

        <!-- Site nav (full) -->
        <nav class="lg:justify-self-end" aria-label="footer-nav">
          <h3 class="text-xl font-semibold mb-5 text-primary-50">
            {{ t("footer.siteNav.heading") }}
          </h3>
          <ul class="grid gap-3 min-w-60">
            <li>
              <NuxtLink class="footer-nav-link" to="/">
                {{ t("footer.siteNav.home") }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="footer-nav-link" to="/services">
                {{ t("footer.siteNav.services") }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="footer-nav-link" to="/about">
                {{ t("footer.siteNav.about") }}
              </NuxtLink>
            </li>
            <!-- News page <li>
              <NuxtLink class="footer-nav-link" to="/news">
                {{ t("footer.siteNav.news") }}
              </NuxtLink>
            </li> -->
            <li>
              <NuxtLink class="footer-nav-link" to="/contact">
                {{ t("footer.siteNav.contact") }}
              </NuxtLink>
            </li>
            <li class="mt-3 pt-3 border-t border-primary-800">
              <NuxtLink class="footer-nav-link text-sm" to="/about/legal">
                {{ t("footer.siteNav.legal") }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink class="footer-nav-link text-sm" to="/about/policies">
                {{ t("footer.siteNav.policies") }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </UContainer>

    <!-- Bottom: copyright -->
    <div class="footer-bottom">
      <UContainer
        class="max-w-[90rem] py-5 text-sm text-primary-300 flex items-center justify-center gap-4"
      >
        <p>{{ t("footer.copyright", { year: new Date().getFullYear() }) }}</p>
      </UContainer>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>

<style lang="scss" scoped>
/* Footer main styling */
.footer-main {
  background: linear-gradient(
    180deg,
    var(--color-primary-950) 0%,
    var(--color-neutral-950) 100%
  );
  color: var(--color-primary-100);
}

/* Logo container with dark background for visibility */
.logo-container {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 1rem;
}

/* Office cards - solid surface */
.office-card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  width: 340px;
  min-height: 220px;
  transition: all var(--duration-normal) var(--ease-smooth);

  &:hover {
    background: rgba(255, 255, 255, 0.09);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
}

/* Footer links */
.footer-link {
  color: var(--color-primary-200);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color var(--duration-fast) var(--ease-smooth);

  &:hover {
    color: var(--color-primary-100);
  }
}

/* Footer navigation links */
.footer-nav-link {
  color: var(--color-primary-300);
  transition: color var(--duration-fast) var(--ease-smooth);
  position: relative;
  display: inline-block;
  padding: 0.375rem 0;
  min-height: 44px;
  line-height: 1.6;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--color-primary-400);
    transition: width var(--duration-normal) var(--ease-smooth);
  }

  &:hover {
    color: var(--color-primary-100);

    &::after {
      width: 100%;
    }
  }
}

/* Footer bottom bar */
.footer-bottom {
  background: rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

/* Address styling */
address {
  display: flex;
  flex-direction: column;
}

/* Focus visible */
:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 3px;
}

/* Respect reduced transparency */
@media (prefers-reduced-transparency: reduce) {
  .office-card {
    background: var(--color-primary-900);
  }
}
</style>
