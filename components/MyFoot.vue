<template>
  <footer class="footer-main">
    <!-- Top row: Brand + Contact cards -->
    <UContainer class="max-w-480 pt-16 pb-10">
      <div class="footer-top">
        <!-- Brand / intro -->
        <div class="space-y-5">
          <NuxtLink
            :to="localePath('/')"
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

        <!-- Contact cards -->
        <div class="footer-cards">
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
      </div>
    </UContainer>

    <!-- Divider -->
    <div class="footer-divider" aria-hidden="true"></div>

    <!-- Site nav: full-width horizontal columns -->
    <UContainer class="max-w-480 py-10">
      <nav aria-label="footer-nav">
        <p class="footer-nav-heading">{{ t("footer.siteNav.heading") }}</p>
        <div class="footer-nav-grid">
          <!-- Home -->
          <div class="footer-nav-col">
            <NuxtLink class="footer-nav-link footer-nav-link--top" :to="localePath('/')">
              {{ t("footer.siteNav.home") }}
            </NuxtLink>
          </div>

          <!-- Services column -->
          <div class="footer-nav-col">
            <NuxtLink class="footer-nav-link footer-nav-link--top" :to="localePath('/solutions')">
              {{ t("footer.siteNav.services") }}
            </NuxtLink>
            <ul class="footer-nav-sub">
              <li>
                <NuxtLink class="footer-nav-link footer-nav-link--sub" :to="localePath('/solutions/website-packages')">
                  {{ t("footer.siteNav.websitePackages") }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="footer-nav-link footer-nav-link--sub" :to="localePath('/solutions/visual-identity')">
                  {{ t("footer.siteNav.visualIdentity") }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="footer-nav-link footer-nav-link--sub" :to="localePath('/solutions/additional-services')">
                  {{ t("footer.siteNav.additionalServices") }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="footer-nav-link footer-nav-link--sub" :to="localePath('/solutions/process')">
                  {{ t("footer.siteNav.process") }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Cases -->
          <div class="footer-nav-col">
            <NuxtLink class="footer-nav-link footer-nav-link--top" :to="localePath('/cases')">
              {{ t("footer.siteNav.cases") }}
            </NuxtLink>
          </div>

          <!-- About -->
          <div class="footer-nav-col">
            <NuxtLink class="footer-nav-link footer-nav-link--top" :to="localePath('/about')">
              {{ t("footer.siteNav.about") }}
            </NuxtLink>
          </div>

          <!-- Contact -->
          <div class="footer-nav-col">
            <NuxtLink class="footer-nav-link footer-nav-link--top" :to="localePath('/contact')">
              {{ t("footer.siteNav.contact") }}
            </NuxtLink>
          </div>

          <!-- Legal column -->
          <div class="footer-nav-col">
            <span class="footer-nav-col-heading">{{ t("footer.siteNav.legalHeading") }}</span>
            <ul class="footer-nav-sub">
              <li>
                <NuxtLink class="footer-nav-link footer-nav-link--sub" :to="localePath('/about/legal')">
                  {{ t("footer.siteNav.legal") }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="footer-nav-link footer-nav-link--sub" :to="localePath('/about/policies')">
                  {{ t("footer.siteNav.policies") }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </UContainer>

    <!-- Bottom: copyright -->
    <div class="footer-bottom">
      <UContainer
        class="max-w-360 py-5 text-sm text-primary-300 flex items-center justify-center gap-4"
      >
        <p>{{ t("footer.copyright", { year: new Date().getFullYear() }) }}</p>
      </UContainer>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
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

/* ── Top row: brand left, cards right ── */
.footer-top {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 3rem;
  }
}

/* Cards container — always horizontal, wraps on very narrow screens only */
.footer-cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  flex: 1;
}

/* Logo container with dark background for visibility */
.logo-container {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 1rem;
}

/* Office cards - no visual card, just spacing */
.office-card {
  padding: 1.5rem;
  flex: 1 1 240px;
}

/* Divider between top and nav strip */
.footer-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
}

/* ── Nav strip ── */
.footer-nav-heading {
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-primary-500);
  margin-bottom: 1.25rem;
}

/* Horizontal grid of nav columns — auto-fill so it wraps naturally */
.footer-nav-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem 3rem;

  @media (min-width: 640px) {
    gap: 2rem 4rem;
  }
}

.footer-nav-col {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 100px;
}

/* Column heading (non-link, e.g. "Legal") */
.footer-nav-col-heading {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-primary-400);
  padding: 0.375rem 0;
  min-height: 44px;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: var(--text-xs);
}

/* Sub-link list */
.footer-nav-sub {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* Footer links (contact cards) */
.footer-link {
  color: var(--color-primary-200);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color var(--duration-fast) var(--ease-smooth);

  &:hover {
    color: var(--color-primary-100);
  }
}

/* Nav top-level links */
.footer-nav-link {
  color: var(--color-primary-300);
  transition: color var(--duration-fast) var(--ease-smooth);
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0;
  min-height: 44px;
  line-height: 1.4;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
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

  &--top {
    font-weight: 600;
    color: var(--color-primary-200);
    font-size: var(--text-sm);

    &:hover {
      color: var(--color-primary-50);
    }
  }

  &--sub {
    font-size: var(--text-sm);
    color: var(--color-primary-400);
    min-height: 36px;
    font-weight: 400;

    &:hover {
      color: var(--color-primary-200);
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

</style>
