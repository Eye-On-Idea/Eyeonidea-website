<script setup lang="ts">
import { animationPresets, withDelay } from "~/composables/useAccessibleMotion";

const { t, tm } = useI18n();
</script>

<template>
  <section
    class="about-founder"
    aria-labelledby="founder-heading"
  >
    <div class="section-container">
      <div class="founder-grid">
        <!-- Photo Side -->
        <div
          class="photo-wrapper"
          v-motion
          :initial="animationPresets.slideInLeft.initial"
          :visible-once="animationPresets.slideInLeft.visible"
        >
          <div class="photo-container">
            <img
              src="/public-material/profile-picture.png"
              :alt="t('about.founder.name')"
              class="founder-photo"
              loading="lazy"
            />
            <div class="photo-backdrop" aria-hidden="true" />
          </div>
        </div>

        <!-- Content Side -->
        <div
          class="content-wrapper"
          v-motion
          :initial="animationPresets.slideInRight.initial"
          :visible-once="withDelay('slideInRight', 200).visible"
        >
          <span class="section-badge">{{ t("about.founder.badge") }}</span>
          <h2 id="founder-heading" class="founder-name" style="text-wrap: balance">
            {{ t("about.founder.name") }}
          </h2>
          <p class="founder-role">{{ t("about.founder.role") }}</p>

          <div class="bio-content">
            <p
              v-for="(paragraph, index) in tm('about.founder.bio') as string[]"
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
            <UIcon name="i-lucide-linkedin" class="linkedin-icon" aria-hidden="true" />
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

// Scroll-driven parallax on photo (progressive enhancement)
@supports (animation-timeline: view()) {
  .photo-container {
    animation: founderFloat linear;
    animation-timeline: view();
    animation-range: entry 0% exit 100%;
  }

  @keyframes founderFloat {
    from { transform: translateY(20px); }
    to { transform: translateY(-20px); }
  }
}

.content-wrapper {
  color: var(--color-hero-text);
}

.section-badge {
  display: inline-block;
  padding: 0.375rem 1rem;
  background: rgba(255, 255, 255, 0.08);
  color: var(--color-primary-200);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 9999px;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
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
  color: var(--color-primary-300);
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
  background: rgba(255, 255, 255, 0.04);
  border-left: 3px solid var(--color-primary-400);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  margin-bottom: 2rem;
}

.philosophy-title {
  font-size: var(--text-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-primary-300);
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
  min-height: 48px;
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

  &:focus-visible {
    outline: 2px solid var(--color-accent-400);
    outline-offset: 4px;
  }
}

.linkedin-icon {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
