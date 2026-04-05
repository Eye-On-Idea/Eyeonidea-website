<script setup lang="ts">
definePageMeta({
  layout: false,
});

const localePath = useLocalePath();
const router = useRouter();
const route = useRoute();

useHead({
  title: "Client Hub — Beta Access | Eye On Idea",
  meta: [{ name: "robots", content: "noindex, nofollow" }],
});

const handleContinue = () => {
  sessionStorage.setItem("client-hub-acknowledged", "1");
  const redirect = (route.query.redirect as string) || localePath("/client-hub");
  router.replace(redirect);
};
</script>

<template>
  <div class="construction-page">

    <!-- ── Background image + overlay ── -->
    <div class="construction-page__bg" aria-hidden="true">
      <img
        src="/images/nanobanana/process-hero-clear-project-journey.jpg"
        alt=""
        class="construction-page__bg-img"
      />
      <div class="construction-page__bg-overlay" />
    </div>

    <!-- ── Animated orbs (decorative) ── -->
    <div class="construction-page__orbs" aria-hidden="true">
      <div class="construction-orb construction-orb--1" />
      <div class="construction-orb construction-orb--2" />
      <div class="construction-orb construction-orb--3" />
    </div>

    <!-- ── Main content ── -->
    <div class="construction-page__inner">

      <!-- Logo -->
      <NuxtLink :to="localePath('/')" class="construction-page__logo" aria-label="Back to Eye On Idea homepage">
        <img
          src="/public-material/logo-center-shadow.svg"
          alt="Eye On Idea"
          class="h-10 w-auto"
        />
      </NuxtLink>

      <!-- Card -->
      <div class="construction-card" role="main">

        <!-- Icon badge -->
        <div class="construction-card__icon-wrap" aria-hidden="true">
          <UIcon name="i-heroicons-wrench-screwdriver" class="w-7 h-7" />
        </div>

        <!-- Eyebrow -->
        <p class="construction-card__eyebrow">Client Hub</p>

        <!-- Headline -->
        <h1 class="construction-card__title">
          Currently Under<br />Construction
        </h1>

        <!-- Body -->
        <div class="construction-card__body">
          <p>
            We're actively building the Client Hub — a dedicated space where Eye On Idea clients can find guides, resources, and everything needed to manage their digital presence with confidence.
          </p>
          <p>
            A <strong>beta version</strong> is already available and fully usable. Content is being added continuously, and the experience will keep improving in the weeks ahead.
          </p>
        </div>

        <!-- Beta notice pill -->
        <div class="construction-card__pill" aria-label="Beta version available">
          <span class="construction-card__pill-dot" aria-hidden="true" />
          Beta version live — updated regularly
        </div>

        <!-- CTA -->
        <button
          type="button"
          class="construction-card__cta"
          @click="handleContinue"
        >
          <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" aria-hidden="true" />
          Enter Beta Version
        </button>

      </div>

      <!-- Back to site -->
      <NuxtLink
        :to="localePath('/')"
        class="construction-page__back"
      >
        <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" aria-hidden="true" />
        Back to eyeonidea.com
      </NuxtLink>

    </div>
  </div>
</template>

<style lang="scss" scoped>

/* ════════════════════════════════════════════════════════
   PAGE SHELL
════════════════════════════════════════════════════════ */

.construction-page {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  overflow: hidden;
}

/* ── Background ── */

.construction-page__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.construction-page__bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: saturate(0.6) brightness(0.45);
}

.construction-page__bg-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    rgba(26, 22, 20, 0.82) 0%,
    rgba(26, 22, 20, 0.72) 50%,
    rgba(26, 22, 20, 0.88) 100%
  );
}

/* ── Orbs ── */

.construction-page__orbs {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.construction-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
}

.construction-orb--1 {
  width: 500px;
  height: 500px;
  top: -15%;
  left: -10%;
  background: radial-gradient(circle, #dfaf85 0%, transparent 70%);
  opacity: 0.18;
  animation: orb-drift-1 22s ease-in-out infinite;
}

.construction-orb--2 {
  width: 420px;
  height: 420px;
  bottom: -10%;
  right: -8%;
  background: radial-gradient(circle, #64c6b7 0%, transparent 70%);
  opacity: 0.16;
  animation: orb-drift-2 18s ease-in-out infinite;
}

.construction-orb--3 {
  width: 280px;
  height: 280px;
  top: 40%;
  right: 15%;
  background: radial-gradient(circle, #dfaf85 0%, transparent 70%);
  opacity: 0.12;
  animation: orb-drift-3 26s ease-in-out infinite;
}

@keyframes orb-drift-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(28px, -18px) scale(1.04); }
  66%       { transform: translate(-18px, 14px) scale(0.96); }
}

@keyframes orb-drift-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  40%       { transform: translate(-22px, 18px) scale(1.03); }
  75%       { transform: translate(14px, -12px) scale(0.97); }
}

@keyframes orb-drift-3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%       { transform: translate(-15px, -22px) scale(1.05); }
}

/* ── Inner layout ── */

.construction-page__inner {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
}

/* ── Logo ── */

.construction-page__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  opacity: 0.9;
  transition: opacity 0.2s ease;

  &:hover { opacity: 1; }
  &:focus-visible {
    outline: 2px solid #64c6b7;
    outline-offset: 4px;
    border-radius: 4px;
  }
}

/* ════════════════════════════════════════════════════════
   CARD
════════════════════════════════════════════════════════ */

.construction-card {
  width: 100%;
  background: rgba(26, 22, 20, 0.72);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.25rem;
  padding: 2rem 1.75rem 2.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.125rem;
  text-align: center;
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.45),
    0 0 0 1px rgba(255, 255, 255, 0.04) inset;

  @media (min-width: 480px) {
    padding: 2.5rem 2.5rem 2.75rem;
  }
}

/* ── Icon badge ── */

.construction-card__icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 1rem;
  background: linear-gradient(135deg, rgba(223, 175, 133, 0.18), rgba(100, 198, 183, 0.12));
  border: 1px solid rgba(223, 175, 133, 0.25);
  color: #dfaf85;
  margin-bottom: 0.25rem;
}

/* ── Eyebrow ── */

.construction-card__eyebrow {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #64c6b7;
  margin: 0;
}

/* ── Title ── */

.construction-card__title {
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1.15;
  color: #f9f5f1;
  margin: 0;
  letter-spacing: -0.02em;

  @media (min-width: 480px) {
    font-size: 2rem;
  }
}

/* ── Body text ── */

.construction-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 380px;

  p {
    font-size: 0.9rem;
    line-height: 1.7;
    color: #c9b8a8;
    margin: 0;
  }

  strong {
    color: #e8c49d;
    font-weight: 600;
  }
}

/* ── Beta pill ── */

.construction-card__pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.875rem;
  border-radius: 99px;
  background: rgba(100, 198, 183, 0.1);
  border: 1px solid rgba(100, 198, 183, 0.25);
  font-size: 0.75rem;
  font-weight: 600;
  color: #64c6b7;
  letter-spacing: 0.02em;
}

.construction-card__pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #64c6b7;
  animation: pulse-dot 2s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(0.75); }
}

/* ── CTA button ── */

.construction-card__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 48px;
  padding: 0.75rem 1.75rem;
  border-radius: 0.75rem;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #1a1614;
  background: linear-gradient(135deg, #dfaf85 0%, #e8c49d 100%);
  border: none;
  cursor: pointer;
  transition:
    background 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.15s ease;
  box-shadow: 0 4px 20px rgba(223, 175, 133, 0.35);
  margin-top: 0.375rem;
  letter-spacing: 0.01em;

  &:hover {
    background: linear-gradient(135deg, #e8c49d 0%, #f0d4b0 100%);
    box-shadow: 0 6px 28px rgba(223, 175, 133, 0.5);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid #64c6b7;
    outline-offset: 3px;
  }
}

/* ── Back link ── */

.construction-page__back {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  min-height: 44px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: rgba(201, 184, 168, 0.65);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover { color: rgba(201, 184, 168, 0.9); }

  &:focus-visible {
    outline: 2px solid #64c6b7;
    outline-offset: 3px;
    border-radius: 4px;
  }
}

/* ════════════════════════════════════════════════════════
   REDUCED MOTION
════════════════════════════════════════════════════════ */

@media (prefers-reduced-motion: reduce) {
  .construction-orb { animation: none; }
  .construction-card__pill-dot { animation: none; }
  .construction-card__cta,
  .construction-page__logo,
  .construction-page__back { transition: none; }
  .construction-card__cta:hover { transform: none; }
}
</style>
