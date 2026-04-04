<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const { t, tm } = useI18n();

const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);

onMounted(() => {
  if (!sectionRef.value) return;
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting) {
        isVisible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.06 },
  );
  observer.observe(sectionRef.value);
  onUnmounted(() => observer.disconnect());
});
</script>

<template>
  <section
    ref="sectionRef"
    class="about-founder"
    aria-labelledby="founder-heading"
  >
    <!-- Section label row -->
    <div class="section-label-row" aria-hidden="true">
      <span class="sep-line" />
      <span class="sep-diamond" />
      <span class="sep-text">{{ t("about.founder.badge") }}</span>
      <span class="sep-diamond" />
      <span class="sep-line" />
    </div>

    <div class="section-container">
      <div class="founder-grid" :class="{ 'animate-in': isVisible }">

        <!-- Left: photo -->
        <div class="photo-side">
          <div class="photo-frame">
            <div class="deco-frame" aria-hidden="true">
              <span class="corner corner--tl" />
              <span class="corner corner--tr" />
              <span class="corner corner--bl" />
              <span class="corner corner--br" />
            </div>
            <img
              src="/images/desk/rune_desk2.png"
              :alt="t('about.founder.name')"
              class="founder-photo"
              loading="lazy"
            />
          </div>
        </div>

        <!-- Right: content -->
        <div class="content-side">
          <div class="founder-numeral-row" aria-hidden="true">
            <span class="num-rule" />
            <span class="num-text">I</span>
            <span class="num-rule" />
          </div>

          <h2 id="founder-heading" class="founder-name">
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

          <!-- Philosophy blockquote -->
          <blockquote class="philosophy-block">
            <div class="philosophy-label" aria-hidden="true">
              <span class="phi-line" />
              <span class="phi-text">{{ t("about.founder.philosophy.title") }}</span>
              <span class="phi-line" />
            </div>
            <p class="philosophy-quote">
              "{{ t("about.founder.philosophy.text") }}"
            </p>
          </blockquote>

          <!-- LinkedIn -->
          <a
            href="https://www.linkedin.com/in/rune-pjetursson/"
            target="_blank"
            rel="noopener noreferrer"
            class="linkedin-link"
          >
            <span class="linkedin-monogram" aria-hidden="true">in</span>
            {{ t("about.founder.connect") }}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
/* ── Section ──────────────────────────────────────────────────── */
.about-founder {
  background: #120703;
  padding-bottom: 0;
}

/* ── Section label row ────────────────────────────────────────── */
.section-label-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 80rem;
  margin: 0 auto;
  padding: 6rem 2rem 4rem;
}

.sep-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.12);
}

.sep-diamond {
  width: 5px;
  height: 5px;
  background: rgba(223, 175, 133, 0.35);
  transform: rotate(45deg);
  flex-shrink: 0;
}

.sep-text {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.45);
  flex-shrink: 0;
}

/* ── Container ────────────────────────────────────────────────── */
.section-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 2rem 6rem;
}

/* ── Grid ─────────────────────────────────────────────────────── */
.founder-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3.5rem;
  align-items: start;
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.8s var(--ease-smooth),
    transform 0.8s var(--ease-smooth);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  @media (min-width: 768px) {
    grid-template-columns: 0.7fr 1.3fr;
    gap: 5rem;
  }
}

/* ── Photo side ───────────────────────────────────────────────── */
.photo-side {
  @media (max-width: 767px) {
    max-width: 20rem;
    margin: 0 auto;
  }
}

.photo-frame {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border: 1px solid rgba(223, 175, 133, 0.12);
}

.deco-frame {
  position: absolute;
  inset: 0.875rem;
  pointer-events: none;
  z-index: 2;
}

.corner {
  position: absolute;
  width: 1.25rem;
  height: 1.25rem;
  border-color: rgba(223, 175, 133, 0.25);
  border-style: solid;

  &--tl { top: 0; left: 0; border-width: 1px 0 0 1px; }
  &--tr { top: 0; right: 0; border-width: 1px 1px 0 0; }
  &--bl { bottom: 0; left: 0; border-width: 0 0 1px 1px; }
  &--br { bottom: 0; right: 0; border-width: 0 1px 1px 0; }
}

.founder-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
}

@supports (animation-timeline: view()) {
  .photo-frame {
    animation: founderFloat linear;
    animation-timeline: view();
    animation-range: entry 0% exit 100%;
  }

  @keyframes founderFloat {
    from { transform: translateY(16px); }
    to   { transform: translateY(-16px); }
  }
}

/* ── Content side ─────────────────────────────────────────────── */
.content-side {
  padding-top: 0.5rem;
}

/* ── Numeral row ──────────────────────────────────────────────── */
.founder-numeral-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.num-rule {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.1);
  max-width: 3rem;
}

.num-text {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: rgba(223, 175, 133, 0.4);
}

/* ── Name & role ──────────────────────────────────────────────── */
.founder-name {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #ffeddf;
  margin: 0 0 0.5rem;
}

.founder-role {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.5);
  margin: 0 0 2rem;
}

/* ── Bio ──────────────────────────────────────────────────────── */
.bio-content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
  border-left: 1px solid rgba(223, 175, 133, 0.15);
  padding-left: 1.75rem;
}

.bio-paragraph {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.875rem, 1.1vw, 0.975rem);
  line-height: 1.8;
  color: rgba(255, 237, 223, 0.5);
  margin: 0;
}

/* ── Philosophy blockquote ────────────────────────────────────── */
.philosophy-block {
  margin: 0 0 2.5rem;
  padding: 1.75rem;
  background: rgba(223, 175, 133, 0.03);
  border: 1px solid rgba(223, 175, 133, 0.1);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: 2px;
    background: rgba(223, 175, 133, 0.3);
  }
}

.philosophy-label {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.875rem;
}

.phi-line {
  flex: 0 0 1.5rem;
  height: 1px;
  background: rgba(223, 175, 133, 0.2);
}

.phi-text {
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.45);
}

.philosophy-quote {
  font-family: var(--font-text);
  font-weight: 300;
  font-size: clamp(0.875rem, 1.1vw, 0.975rem);
  line-height: 1.75;
  color: rgba(255, 237, 223, 0.55);
  font-style: italic;
  margin: 0;
}

/* ── LinkedIn link ────────────────────────────────────────────── */
.linkedin-link {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem 1.125rem;
  min-height: 44px;
  background: rgba(223, 175, 133, 0.06);
  border: 1px solid rgba(223, 175, 133, 0.18);
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.65);
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;

  &:hover {
    background: rgba(223, 175, 133, 0.1);
    border-color: rgba(223, 175, 133, 0.3);
    color: rgba(223, 175, 133, 0.9);
  }

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.5);
    outline-offset: 2px;
  }
}

.linkedin-monogram {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  background: rgba(223, 175, 133, 0.12);
  border: 1px solid rgba(223, 175, 133, 0.2);
  font-size: 0.55rem;
  font-weight: 900;
  letter-spacing: 0;
  color: rgba(223, 175, 133, 0.7);
}

@media (prefers-reduced-motion: reduce) {
  .founder-grid {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

/* ── Light mode overrides ─────────────────────────────────────── */
html:not(.dark) {
  .about-founder { background: var(--color-section-alt); }

  .sep-line    { background: var(--deco-line); }
  .sep-diamond { background: var(--deco-diamond); }
  .sep-text    { color: var(--deco-text); }

  .photo-frame { border-color: var(--deco-line-strong); }
  .corner      { border-color: var(--deco-border); }

  .num-rule  { background: var(--deco-line); }
  .num-text  { color: var(--color-primary-500); opacity: 0.5; }

  .founder-name { color: var(--color-text-primary); }
  .founder-role { color: var(--color-primary-500); }

  .bio-content { border-left-color: var(--deco-line-strong); }
  .bio-paragraph { color: var(--color-text-subtle); }

  .philosophy-block {
    background: rgba(153, 82, 38, 0.04);
    border-color: var(--deco-line);

    &::before { background: var(--deco-line-strong); }
  }

  .phi-line  { background: var(--deco-line); }
  .phi-text  { color: var(--deco-text); }
  .philosophy-quote { color: var(--color-text-subtle); }

  .linkedin-link {
    background: rgba(153, 82, 38, 0.06);
    border-color: var(--deco-line);
    color: var(--color-primary-600);

    &:hover {
      background: rgba(153, 82, 38, 0.12);
      border-color: var(--deco-line-strong);
      color: var(--color-primary-700);
    }

    &:focus-visible { outline-color: var(--color-primary-500); }
  }

  .linkedin-monogram {
    background: rgba(153, 82, 38, 0.10);
    border-color: var(--deco-border);
    color: var(--color-primary-600);
  }
}
</style>


