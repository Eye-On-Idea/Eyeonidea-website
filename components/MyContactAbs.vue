<template>
  <div
    id="contact-abs"
    ref="root"
    class="fixed right-3 top-1/2 -translate-y-1/2 z-60"
  >

    <div class="relative w-11 h-11 overflow-visible">

      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="open"
          :id="panelId"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          ref="panelRef"
          tabindex="-1"
          class="contact-panel absolute top-0 right-0 origin-top-right z-60"
        >

          <div class="deco-frame" aria-hidden="true">
            <span class="corner corner--tl" />
            <span class="corner corner--tr" />
            <span class="corner corner--bl" />
            <span class="corner corner--br" />
          </div>

          <div class="panel-inner">

            <div class="panel-label-row" aria-hidden="true">
              <span class="panel-rule" />
              <span class="panel-diamond panel-diamond--sm" />
              <span class="panel-label" :id="titleId">{{ t("common.contact.title") }}</span>
              <span class="panel-diamond panel-diamond--sm" />
              <span class="panel-rule" />
            </div>

            <a href="mailto:hello@eyeonidea.com" class="contact-row" tabindex="0">
              <span class="contact-icon-wrap" aria-hidden="true">
                <UIcon name="i-heroicons-envelope" class="contact-icon" aria-hidden="true" />
              </span>
              <div class="contact-text">
                <span class="contact-label">{{ t("common.contact.email") }}</span>
                <span class="contact-value">hello@eyeonidea.com</span>
              </div>
              <span class="contact-arrow" aria-hidden="true">→</span>
            </a>

            <div class="row-separator" aria-hidden="true">
              <span class="sep-line" />
              <span class="sep-diamond" />
              <span class="sep-line" />
            </div>

            <a href="tel:+4529930583" class="contact-row" tabindex="0">
              <span class="contact-icon-wrap" aria-hidden="true">
                <UIcon name="i-heroicons-phone" class="contact-icon" aria-hidden="true" />
              </span>
              <div class="contact-text">
                <span class="contact-label">{{ t("common.contact.phone") }}</span>
                <span class="contact-value">+45 29 93 05 83</span>
              </div>
              <span class="contact-arrow" aria-hidden="true">→</span>
            </a>

          </div>
        </div>
      </Transition>

      <button
        ref="triggerRef"
        @click.stop="toggle"
        :aria-expanded="open ? 'true' : 'false'"
        :aria-controls="panelId"
        class="contact-trigger absolute top-0 right-0 z-61"
        :class="{ 'contact-trigger--pulse': !open }"
        :title="open ? t('common.contact.closePanel') : t('common.contact.openPanel')"
      >
        <UIcon
          :name="open ? 'i-heroicons-x-mark-20-solid' : 'i-heroicons-chat-bubble-left-right-solid'"
          class="w-5 h-5"
          aria-hidden="true"
        />
        <span class="sr-only">{{ open ? t("common.contact.closePanel") : t("common.contact.openPanel") }}</span>
      </button>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from "vue";

const { t } = useI18n();
const open = ref(false);
const root = ref<HTMLElement | null>(null);
const panelRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLButtonElement | null>(null);
const lastFocusedElement = ref<HTMLElement | null>(null);
const panelId = "floating-contact-panel";
const titleId = "contact-dialog-title";

const focusableSelector =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const getFocusableElements = (container: HTMLElement | null) => {
  if (!container) return [];
  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector));
};

const focusFirstElement = () => {
  const focusable = getFocusableElements(panelRef.value);
  const first = focusable[0];
  if (first) {
    first.focus();
    return;
  }
  panelRef.value?.focus();
};

const toggle = () => {
  open.value = !open.value;
};

const onDocClick = (e: MouseEvent) => {
  const el = root.value;
  if (!el) return;
  if (!el.contains(e.target as Node)) open.value = false;
};

const trapTabKey = (event: KeyboardEvent) => {
  if (!open.value || event.key !== "Tab") return;
  const container = root.value;
  if (!container) return;

  const focusable = getFocusableElements(container);
  if (focusable.length === 0) {
    event.preventDefault();
    panelRef.value?.focus();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (!first || !last) {
    event.preventDefault();
    panelRef.value?.focus();
    return;
  }
  const activeElement = document.activeElement as HTMLElement | null;

  if (!container.contains(activeElement)) {
    event.preventDefault();
    first.focus();
    return;
  }

  if (event.shiftKey && activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};

const onKey = (e: KeyboardEvent) => {
  if (!open.value) return;
  if (e.key === "Escape") {
    open.value = false;
    return;
  }
  if (e.key === "Tab") {
    trapTabKey(e);
  }
};

onMounted(() => {

  document.addEventListener("click", onDocClick, true);
  document.addEventListener("keydown", onKey);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", onDocClick, true);
  document.removeEventListener("keydown", onKey);
});

watch(open, async (isOpen) => {
  if (isOpen) {
    lastFocusedElement.value = document.activeElement as HTMLElement | null;
    await nextTick();
    focusFirstElement();
  } else {
    await nextTick();
    const returnTarget = triggerRef.value || lastFocusedElement.value;
    returnTarget?.focus();
    lastFocusedElement.value = null;
  }
});
</script>

<style lang="scss" scoped>

.contact-panel {
  width: 17rem;
  background: #161210;
  border: 1px solid rgba(223, 175, 133, 0.18);
  border-radius: 2px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3);

  html:not(.dark) & {
    background: #ffffff;
    border-color: rgba(153, 82, 38, 0.18);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);
  }
}

.deco-frame {
  position: absolute;
  inset: 0.625rem;
  pointer-events: none;
  z-index: 0;
}

.corner {
  position: absolute;
  width: 0.75rem;
  height: 0.75rem;
  border-color: rgba(223, 175, 133, 0.2);
  border-style: solid;
  transition: border-color 0.3s ease;

  &--tl { top: 0; left: 0; border-width: 1px 0 0 1px; }
  &--tr { top: 0; right: 0; border-width: 1px 1px 0 0; }
  &--bl { bottom: 0; left: 0; border-width: 0 0 1px 1px; }
  &--br { bottom: 0; right: 0; border-width: 0 1px 1px 0; }

  html:not(.dark) .contact-panel & {
    border-color: rgba(153, 82, 38, 0.18);
  }
}

.contact-panel:hover .corner {
  border-color: rgba(223, 175, 133, 0.4);

  html:not(.dark) & {
    border-color: rgba(153, 82, 38, 0.35);
  }
}

.panel-inner {
  position: relative;
  z-index: 1;
  padding: 3.25rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.panel-label-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.panel-rule {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.15);

  html:not(.dark) .contact-panel & {
    background: rgba(153, 82, 38, 0.12);
  }
}

.panel-diamond {
  width: 5px;
  height: 5px;
  background: rgba(223, 175, 133, 0.4);
  transform: rotate(45deg);
  flex-shrink: 0;

  &--sm {
    width: 3px;
    height: 3px;
    background: rgba(223, 175, 133, 0.25);
  }

  html:not(.dark) .contact-panel & {
    background: rgba(153, 82, 38, 0.4);
    &.panel-diamond--sm { background: rgba(153, 82, 38, 0.22); }
  }
}

.panel-label {
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(223, 175, 133, 0.55);
  white-space: nowrap;
  flex-shrink: 0;

  html:not(.dark) .contact-panel & {
    color: rgba(153, 82, 38, 0.6);
  }
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.5rem;
  text-decoration: none;
  border-radius: 2px;
  border: 1px solid transparent;
  transition: background 0.2s ease, border-color 0.2s ease;
  cursor: pointer;

  &:hover {
    background: rgba(223, 175, 133, 0.05);
    border-color: rgba(223, 175, 133, 0.12);

    .contact-arrow { opacity: 1; transform: translateX(2px); }
    .contact-icon-wrap { border-color: rgba(223, 175, 133, 0.35); }
  }

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.5);
    outline-offset: 2px;
  }

  html:not(.dark) & {
    &:hover {
      background: rgba(153, 82, 38, 0.04);
      border-color: rgba(153, 82, 38, 0.12);
      .contact-icon-wrap { border-color: rgba(153, 82, 38, 0.25); }
    }
    &:focus-visible { outline-color: rgba(153, 82, 38, 0.5); }
  }
}

.contact-icon-wrap {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(223, 175, 133, 0.15);
  border-radius: 2px;
  background: rgba(223, 175, 133, 0.05);
  transition: border-color 0.2s ease;

  html:not(.dark) .contact-row & {
    border-color: rgba(153, 82, 38, 0.12);
    background: rgba(153, 82, 38, 0.04);
  }
}

.contact-icon {
  width: 1rem;
  height: 1rem;
  color: rgba(223, 175, 133, 0.75);

  html:not(.dark) .contact-row & {
    color: #7d3412;
  }
}

.contact-text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.contact-label {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 237, 223, 0.45);

  html:not(.dark) .contact-row & {
    color: #475569;
  }
}

.contact-value {
  font-family: var(--font-text);
  font-size: 0.78rem;
  font-weight: 400;
  color: rgba(255, 237, 223, 0.85);
  letter-spacing: 0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  html:not(.dark) .contact-row & {
    color: #1f1f1f;
  }
}

.contact-arrow {
  font-size: 0.75rem;
  color: rgba(223, 175, 133, 0.4);
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.2s ease;
  flex-shrink: 0;

  html:not(.dark) .contact-row & {
    color: rgba(153, 82, 38, 0.5);
  }
}

.row-separator {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0.25rem 0.5rem;
}

.sep-line {
  flex: 1;
  height: 1px;
  background: rgba(223, 175, 133, 0.08);

  html:not(.dark) .contact-panel & {
    background: rgba(153, 82, 38, 0.08);
  }
}

.sep-diamond {
  width: 4px;
  height: 4px;
  background: rgba(223, 175, 133, 0.2);
  transform: rotate(45deg);
  flex-shrink: 0;

  html:not(.dark) .contact-panel & {
    background: rgba(153, 82, 38, 0.18);
  }
}

.contact-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  background: #995226;
  color: #ffeddf;
  border: 1px solid rgba(223, 175, 133, 0.3);
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);

  &:hover {
    background: #7d3412;
    border-color: rgba(223, 175, 133, 0.5);
    transform: scale(1.05);
  }

  &:focus-visible {
    outline: 2px solid rgba(223, 175, 133, 0.6);
    outline-offset: 3px;
  }

  html:not(.dark) & {
    background: #995226;
    border-color: rgba(153, 82, 38, 0.4);
    box-shadow: 0 4px 16px rgba(153, 82, 38, 0.25);

    &:hover {
      background: #7d3412;
      border-color: rgba(153, 82, 38, 0.6);
    }
  }
}

.contact-trigger--pulse {
  animation: trigger-pulse 2.8s ease-in-out infinite;
}

@keyframes trigger-pulse {
  0%, 100% { box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35), 0 0 0 0 rgba(153, 82, 38, 0); }
  50%       { box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35), 0 0 0 6px rgba(153, 82, 38, 0); }
  60%       { box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35), 0 0 0 8px rgba(153, 82, 38, 0.12); }
  80%       { box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35), 0 0 0 12px rgba(153, 82, 38, 0); }
}

@media (prefers-reduced-motion: reduce) {
  .contact-trigger--pulse { animation: none; }
  .contact-row, .contact-arrow, .contact-icon-wrap, .corner, .contact-trigger { transition: none; }
}
</style>
