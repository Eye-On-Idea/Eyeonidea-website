<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const { t } = useI18n();

const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);

onMounted(() => {
  if (!sectionRef.value) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          observer.disconnect();
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(sectionRef.value);

  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>

<template>
  <section
    ref="sectionRef"
    class="about-founder"
    aria-labelledby="founder-heading"
  >
    <div class="section-container">
      <div class="founder-grid" :class="{ 'animate-in': isVisible }">
        <!-- Photo Side -->
        <div class="photo-wrapper">
          <div class="photo-container">
            <img
              src="/public-material/profile-picture.png"
              :alt="t('about.founder.name')"
              class="founder-photo"
            />
            <div class="photo-backdrop" aria-hidden="true" />
          </div>
        </div>

        <!-- Content Side -->
        <div class="content-wrapper">
          <span class="section-badge">{{ t("about.founder.badge") }}</span>
          <h2 id="founder-heading" class="founder-name">
            {{ t("about.founder.name") }}
          </h2>
          <p class="founder-role">{{ t("about.founder.role") }}</p>

          <div class="bio-content">
            <p
              v-for="(paragraph, index) in t('about.founder.bio')"
              :key="index"
              class="bio-paragraph"
            >
              {{ paragraph }}
            </p>
          </div>

          <!-- Philosophy Quote -->
          <div class="philosophy-block">
            <h3 class="philosophy-title">{{ t("about.founder.philosophy.title") }}</h3>
            <blockquote class="philosophy-quote">
              "{{ t("about.founder.philosophy.text") }}"
            </blockquote>
          </div>

          <!-- LinkedIn Link -->
          <a
            href="https://www.linkedin.com/in/rune-pjetursson/"
            target="_blank"
            rel="noopener noreferrer"
            class="linkedin-link"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="linkedin-icon">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            {{ t("about.founder.connect") }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about-founder {
  padding: 6rem 1.5rem;
  background: var(--color-hero-bg-gradient);

  @media (min-width: 768px) {
    padding: 8rem 2rem;
  }
}

.section-container {
  max-width: 1100px;
  margin: 0 auto;
}

.founder-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s var(--ease-smooth), transform 0.8s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  @media (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
    gap: 4rem;
  }
}

.photo-wrapper {
  display: flex;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
}

.photo-container {
  position: relative;
  width: 250px;
  height: 250px;

  @media (min-width: 768px) {
    width: 300px;
    height: 300px;
  }
}

.founder-photo {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-xl);
  border: 3px solid rgba(255, 255, 255, 0.1);
}

.photo-backdrop {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    var(--color-primary-500) 0%,
    var(--color-accent-500) 100%
  );
  border-radius: var(--radius-xl);
  transform: translate(12px, 12px);
  opacity: 0.3;
}

.content-wrapper {
  color: var(--color-hero-text);
}

.section-badge {
  display: inline-block;
  padding: 0.375rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  color: var(--color-accent-300);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 9999px;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.founder-name {
  font-size: var(--text-3xl);
  color: var(--color-hero-text);
  margin-bottom: 0.5rem;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: var(--text-4xl);
  }
}

.founder-role {
  font-size: var(--text-lg);
  color: var(--color-accent-400);
  font-weight: 500;
  margin-bottom: 1.5rem;
}

.bio-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.bio-paragraph {
  font-size: var(--text-base);
  line-height: 1.7;
  color: var(--color-hero-text-muted);
}

.philosophy-block {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-left: 3px solid var(--color-accent-500);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  margin-bottom: 2rem;
}

.philosophy-title {
  font-size: var(--text-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-accent-400);
  margin-bottom: 0.75rem;
}

.philosophy-quote {
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--color-hero-text);
  font-style: italic;
  margin: 0;
}

.linkedin-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-md);
  color: var(--color-hero-text);
  text-decoration: none;
  font-size: var(--text-sm);
  font-weight: 500;
  transition: background 0.2s var(--ease-smooth), border-color 0.2s var(--ease-smooth);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.25);
  }
}

.linkedin-icon {
  width: 1.25rem;
  height: 1.25rem;
}

@media (prefers-reduced-motion: reduce) {
  .founder-grid {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
