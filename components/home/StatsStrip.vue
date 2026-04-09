<script setup lang="ts">
import { ref, type Ref, onMounted, onUnmounted } from "vue";

const { t } = useI18n();

interface Stat {
  key: string;
  target: number;
  suffix: string;
  count: Ref<number>;
}

const stripRef = ref<HTMLElement | null>(null);

const parseStatValue = (raw: string): { target: number; suffix: string } => {
  const match = raw.match(/^(\d+)(.*)$/);
  if (!match) {
    return { target: 0, suffix: "" };
  }
  return {
    target: Number.parseInt(match[1] ?? "0", 10),
    suffix: match[2] ?? "",
  };
};

const statsConfig = [
  { key: "clients" },
  { key: "countries" },
  { key: "years" },
] as const;

const stats: Stat[] = statsConfig.map(({ key }) => {
  const raw = t(`landing.stats.${key}.value`);
  const { target, suffix } = parseStatValue(raw);
  return { key, target, suffix, count: ref(0) };
});

let rafId: number | null = null;
let observer: IntersectionObserver | null = null;

const runCounters = () => {
  const duration = 1200;
  const startMs = performance.now();

  const tick = (now: number) => {
    const elapsed = now - startMs;
    const rawT = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - rawT, 3);

    stats.forEach((stat) => {
      stat.count.value = Math.round(eased * stat.target);
    });

    if (rawT < 1) {
      rafId = requestAnimationFrame(tick);
    } else {
      stats.forEach((stat) => { stat.count.value = stat.target; });
    }
  };

  rafId = requestAnimationFrame(tick);
};

onMounted(() => {
  if (!stripRef.value) return;

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting) {
        observer?.disconnect();
        runCounters();
      }
    },
    { threshold: 0.3 }
  );

  observer.observe(stripRef.value);
});

onUnmounted(() => {
  observer?.disconnect();
  if (rafId !== null) cancelAnimationFrame(rafId);
});
</script>

<template>
  <section
    ref="stripRef"
    class="stats-strip"
    aria-label="Company statistics"
  >
    <div class="stats-inner">
      <div
        v-for="stat in stats"
        :key="stat.key"
        class="stat-item"
      >
        <span class="stat-value" aria-live="polite">
          {{ stat.count.value }}{{ stat.suffix }}
        </span>
        <span class="stat-label">
          {{ t(`landing.stats.${stat.key}.label`) }}
        </span>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.stats-strip {
  background: var(--color-primary-900);
  border-top: 1px solid rgba(223, 175, 133, 0.15);
  border-bottom: 1px solid rgba(223, 175, 133, 0.15);
  padding: 3rem 1.5rem;
}

.stats-inner {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  &:not(:last-child) {
    border-right: 1px solid rgba(223, 175, 133, 0.2);
  }
}

.stat-value {
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--color-primary-200);
  line-height: 1;
  font-family: var(--font-heading);
}

.stat-label {
  font-size: var(--text-sm);
  color: rgba(223, 175, 133, 0.65);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

@media (max-width: 480px) {
  .stats-inner {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .stat-item:not(:last-child) {
    border-right: none;
    border-bottom: 1px solid rgba(223, 175, 133, 0.2);
    padding-bottom: 2.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .stat-value {

  }
}
</style>

