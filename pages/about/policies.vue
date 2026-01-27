<script setup lang="ts">
import { ref, onMounted } from "vue";

const { t } = useI18n();

const isVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});

useSeoMeta({
  title: () => t("policies.meta.title"),
  description: () => t("policies.meta.description"),
  ogTitle: () => t("policies.meta.title"),
  ogDescription: () => t("policies.meta.description"),
  ogType: "website",
  ogUrl: "https://eyeonidea.com/about/policies",
  twitterCard: "summary",
  twitterTitle: () => t("policies.meta.title"),
  twitterDescription: () => t("policies.meta.description"),
});

useHead({
  link: [
    {
      rel: "canonical",
      href: "https://eyeonidea.com/about/policies",
    },
  ],
});

const privacySectionKeys = [
  "introduction",
  "dataController",
  "dataCollected",
  "purpose",
  "legalBasis",
  "retention",
  "sharing",
  "rights",
  "security",
];

const cookieSectionKeys = ["what", "types", "specific", "manage", "thirdParty"];
</script>

<template>
  <div class="policies-page">
    <!-- Hero -->
    <section class="page-hero" aria-labelledby="policies-heading">
      <div class="hero-background" aria-hidden="true">
        <div class="bg-gradient" />
      </div>
      <div class="hero-content" :class="{ 'animate-in': isVisible }">
        <span class="hero-badge glass-brand">{{ t("policies.hero.badge") }}</span>
        <h1 id="policies-heading" class="hero-title">{{ t("policies.hero.title") }}</h1>
        <p class="hero-subtitle">{{ t("policies.hero.subtitle") }}</p>
      </div>
    </section>

    <!-- Content -->
    <section class="page-content">
      <div class="content-container" :class="{ 'animate-in': isVisible }">
        <p class="last-updated">{{ t("policies.lastUpdated") }}</p>

        <!-- Table of Contents -->
        <nav class="toc" aria-label="Table of contents">
          <h2 class="toc-title">Contents</h2>
          <ul class="toc-list">
            <li><a href="#privacy-policy">Privacy Policy</a></li>
            <li><a href="#cookie-policy">Cookie Policy</a></li>
          </ul>
        </nav>

        <!-- Privacy Policy -->
        <div id="privacy-policy" class="policy-section">
          <h2 class="policy-title">{{ t("policies.privacy.title") }}</h2>

          <div
            v-for="key in privacySectionKeys"
            :key="key"
            class="content-section"
          >
            <h3 class="section-title">{{ t(`policies.privacy.sections.${key}.title`) }}</h3>
            <p
              v-for="(paragraph, index) in t(`policies.privacy.sections.${key}.content`)"
              :key="index"
              class="section-paragraph"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>

        <!-- Cookie Policy -->
        <div id="cookie-policy" class="policy-section">
          <h2 class="policy-title">{{ t("policies.cookies.title") }}</h2>

          <template v-for="key in cookieSectionKeys" :key="key">
            <div class="content-section">
              <h3 class="section-title">{{ t(`policies.cookies.sections.${key}.title`) }}</h3>

              <!-- Regular content -->
              <template v-if="key !== 'specific'">
                <p
                  v-for="(paragraph, index) in t(`policies.cookies.sections.${key}.content`)"
                  :key="index"
                  class="section-paragraph"
                >
                  {{ paragraph }}
                </p>
              </template>

              <!-- Cookie table -->
              <template v-else>
                <div class="cookie-table-wrapper">
                  <table class="cookie-table">
                    <thead>
                      <tr>
                        <th>Cookie</th>
                        <th>Purpose</th>
                        <th>Duration</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(cookie, index) in t('policies.cookies.sections.specific.items')"
                        :key="index"
                      >
                        <td><code>{{ cookie.name }}</code></td>
                        <td>{{ cookie.purpose }}</td>
                        <td>{{ cookie.duration }}</td>
                        <td>
                          <span class="cookie-type" :class="`type-${cookie.type.toLowerCase()}`">
                            {{ cookie.type }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </template>
            </div>
          </template>
        </div>

        <!-- Policy Updates -->
        <div class="content-section">
          <h3 class="section-title">{{ t("policies.changes.title") }}</h3>
          <p class="section-paragraph">{{ t("policies.changes.content") }}</p>
        </div>

        <!-- Contact -->
        <div class="content-section contact-section">
          <h3 class="section-title">{{ t("policies.contact.title") }}</h3>
          <p class="section-paragraph">{{ t("policies.contact.content") }}</p>
          <p class="section-paragraph">{{ t("policies.contact.complaints") }}</p>
        </div>

        <!-- Back Link -->
        <div class="back-link-wrapper">
          <NuxtLink to="/about" class="back-link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="back-icon">
              <path fill-rule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clip-rule="evenodd" />
            </svg>
            Back to About
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.policies-page {
  min-height: 100vh;
}

.page-hero {
  position: relative;
  padding: 10rem 1.5rem 4rem;
  text-align: center;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 12rem 2rem 5rem;
  }
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.bg-gradient {
  position: absolute;
  inset: 0;
  background: var(--color-hero-bg-gradient);
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s var(--ease-smooth), transform 0.8s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-badge {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-accent-200);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.hero-title {
  font-size: var(--text-3xl);
  color: var(--color-hero-text);
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: var(--text-4xl);
  }
}

.hero-subtitle {
  font-size: var(--text-base);
  color: var(--color-hero-text-muted);
  line-height: 1.6;

  @media (min-width: 768px) {
    font-size: var(--text-lg);
  }
}

.page-content {
  padding: 4rem 1.5rem 6rem;
  background: var(--color-section-light);

  @media (min-width: 768px) {
    padding: 5rem 2rem 8rem;
  }
}

.content-container {
  max-width: 800px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s var(--ease-smooth) 0.2s, transform 0.8s var(--ease-smooth) 0.2s;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.last-updated {
  font-size: var(--text-sm);
  color: var(--color-text-subtle);
  margin-bottom: 2rem;
}

.toc {
  padding: 1.5rem;
  background: var(--color-bg-subtle);
  border-radius: var(--radius-lg);
  margin-bottom: 3rem;
}

.toc-title {
  font-size: var(--text-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-subtle);
  margin-bottom: 1rem;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  a {
    color: var(--color-primary-600);
    text-decoration: none;
    font-size: var(--text-sm);

    &:hover {
      text-decoration: underline;
    }
  }
}

.policy-section {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
}

.policy-title {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    font-size: var(--text-3xl);
  }
}

.content-section {
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.section-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.75rem;
}

.section-paragraph {
  font-size: var(--text-base);
  line-height: 1.8;
  color: var(--color-text-muted);
  margin-bottom: 0.75rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.cookie-table-wrapper {
  overflow-x: auto;
  margin-top: 1rem;
}

.cookie-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);

  th,
  td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid var(--color-border);
  }

  th {
    font-weight: 600;
    color: var(--color-text);
    background: var(--color-bg-subtle);
  }

  td {
    color: var(--color-text-muted);
  }

  code {
    font-size: var(--text-xs);
    background: var(--color-bg-subtle);
    padding: 0.125rem 0.375rem;
    border-radius: var(--radius-sm);
  }
}

.cookie-type {
  display: inline-block;
  padding: 0.125rem 0.5rem;
  font-size: var(--text-xs);
  font-weight: 500;
  border-radius: 9999px;

  &.type-essential {
    background: var(--color-accent-100);
    color: var(--color-accent-700);
  }

  &.type-preference {
    background: var(--color-primary-100);
    color: var(--color-primary-700);
  }

  &.type-analytics {
    background: #e0e7ff;
    color: #4338ca;
  }
}

.contact-section {
  padding: 1.5rem;
  background: var(--color-bg-subtle);
  border-radius: var(--radius-lg);
  margin-top: 2rem;
}

.back-link-wrapper {
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
  margin-top: 2rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-primary-600);
  text-decoration: none;
  font-size: var(--text-sm);
  font-weight: 500;
  transition: color 0.2s var(--ease-smooth);

  &:hover {
    color: var(--color-primary-700);
  }
}

.back-icon {
  width: 1rem;
  height: 1rem;
}

// Dark mode
:root.dark {
  .page-content {
    background: var(--color-section-dark);
  }

  .toc {
    background: var(--color-bg-elevated);
  }

  .toc-list a {
    color: var(--color-primary-400);
  }

  .cookie-table {
    th {
      background: var(--color-bg-elevated);
    }

    code {
      background: var(--color-bg-elevated);
    }
  }

  .cookie-type {
    &.type-essential {
      background: var(--color-accent-900);
      color: var(--color-accent-300);
    }

    &.type-preference {
      background: var(--color-primary-900);
      color: var(--color-primary-300);
    }

    &.type-analytics {
      background: #312e81;
      color: #a5b4fc;
    }
  }

  .contact-section {
    background: var(--color-bg-elevated);
  }

  .back-link {
    color: var(--color-primary-400);

    &:hover {
      color: var(--color-primary-300);
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-content,
  .content-container {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
