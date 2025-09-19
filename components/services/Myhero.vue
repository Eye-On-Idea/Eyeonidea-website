<template>
  <div class="bg" id="hero">
    <section class="cont px-4 sm:px-6 lg:px-8 pt-12">
      <div class="border border-brand-200/40 rounded-2xl p-6 sm:p-8 space-y-5">
        <header class="mb-2">
          <h1
            class="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-brand-100"
          >
            <strong>Ship with confidence</strong>: fewer tickets, clearer UX
          </h1>
        </header>

        <p class="text-neutral-700 dark:text-brand-200 max-w-3xl">
          I help you launch with fewer surprises. I find issues
          <strong>before release</strong>, write clear steps to reproduce them,
          and point to <strong>actionable fixes</strong>. That means fewer
          support tickets, less fire-fighting, and a calmer launch.
        </p>

        <p class="text-neutral-700 dark:text-brand-200 max-w-3xl">
          I look at the whole flow. I test across devices and browsers, run
          pragmatic <strong>WCAG&nbsp;2.1&nbsp;AA</strong> checks, and tighten
          copy so users know what to do next. When you need direction, I sketch
          concepts and <strong>lightweight prototypes</strong> that align your
          team fast.
        </p>

        <p class="text-neutral-700 dark:text-brand-200 max-w-3xl">
          You get clarity, not noise. Every deliverable focuses on risk, effort,
          and impact—so product, design, and engineering move with confidence. I
          work <strong>remote-first</strong>, offer short on-site sessions in
          the EU, and fit into your tools and cadence.
        </p>

        <p class="text-neutral-700 dark:text-brand-200 max-w-3xl">
          I sell safer launches, clearer UX, and ideas your team can execute. If
          you want fewer surprises and a release you can stand behind, let’s
          talk.
        </p>

        <div class="pt-2">
          <a
            href="mailto:hello@eyeonidea.com"
            class="inline-flex items-center rounded-xl px-4 py-2 bg-brand-500 text-white hover:bg-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
          >
            Book a discovery call
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  position: relative;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  margin-bottom: 50px;
  isolation: isolate;
  padding-top: 5%;
  min-height: 70lvh;
  background-color: #1f1f1f;
  background-image: linear-gradient(
      to left,
      rgba(31, 31, 31, 0) 0%,
      /* right edge: image visible */ rgba(31, 31, 31, 0.1) 20%,
      rgba(31, 31, 31, 0.4) 38%,
      rgba(31, 31, 31, 0.75) 52%,
      rgba(31, 31, 31, 1) 60%,
      /* fully dark by 60% */ rgba(31, 31, 31, 1) 100%
    ),
    url("/public-material/img/pexels-francesco-ungaro-96381_small.jpg");

  background-repeat: no-repeat, no-repeat;
  background-size: 100% 100%, cover;
  background-position: left top, 80% 50%; /* image ~30% right of center */
}

.bg .cont {
  max-width: 1440px;
  min-width: 370px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* Medium image */
@media (min-width: 640px) {
  .bg {
    background-image: linear-gradient(
        to left,
        #1f1f1f00 0%,
        rgba(31, 31, 31, 0.1) 20%,
        rgba(31, 31, 31, 0.4) 38%,
        rgba(31, 31, 31, 0.75) 52%,
        rgba(31, 31, 31, 1) 60%,
        rgba(31, 31, 31, 1) 100%
      ),
      url("/public-material/img/pexels-francesco-ungaro-96381_medium.jpg");
  }
}

/* Large image */
@media (min-width: 1024px) {
  .bg {
    background-image: linear-gradient(
        to left,
        rgba(31, 31, 31, 0) 0%,
        rgba(31, 31, 31, 0.1) 20%,
        rgba(31, 31, 31, 0.4) 38%,
        rgba(31, 31, 31, 0.75) 52%,
        rgba(31, 31, 31, 1) 60%,
        rgba(31, 31, 31, 1) 100%
      ),
      url("/public-material/img/pexels-francesco-ungaro-96381_large.jpg");
  }
}

/* Optional: tiny focus nudge on ultra-wide */
@media (min-width: 1440px) {
  .bg {
    background-position: left top, 82% 50%;
  }
}
</style>
