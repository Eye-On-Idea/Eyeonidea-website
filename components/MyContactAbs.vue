<template>
  <div
    id="contact-abs"
    ref="root"
    class="fixed right-2.5 top-1/2 -translate-y-1/2 z-60"
  >
    <!-- Stable anchor so the icon never jumps -->
    <div class="relative w-12 h-12 overflow-visible">
      <!-- Panel opens down & left from the same top-right point -->
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
          class="absolute top-0 right-0 origin-top-right z-[60]"
          style="transform-origin: top right"
        >
          <!-- Top padding leaves space under the overlapping button -->
          <div class="w-72 rounded-2xl border p-4 pt-14 pr-4 cont">
            <!-- Headline -->
            <h3 :id="titleId" class="text-lg font-semibold text-neutral-900 mb-3">
              {{ t("common.contact.title") }}
              <span>{{ t("common.contact.titleHighlight") }}</span>
            </h3>

            <!-- Contact items (hover = ring outline only; text doesn't change) -->
            <div class="flex flex-col gap-2">
              <a
                href="mailto:hello@eyeonidea.com"
                class="flex items-center gap-3 p-2 rounded-xl border border-transparent hover:ring-2 hover:ring-primary-50 hover:ring-offset-0 dark:hover:ring-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 bg-primary-100/25 hover:bg-primary-100/75"
              >
                <UIcon
                  name="i-heroicons-envelope"
                  class="w-5 h-5 shrink-0 text-neutral-900"
                  aria-hidden="true"
                />
                <div class="min-w-0">
                  <div
                    class="text-sm font-medium text-neutral-900 dark:text-primary-100"
                  >
                    {{ t("common.contact.email") }}
                  </div>
                  <div
                    class="email-text text-sm text-neutral-700 dark:text-primary-200 truncate"
                  >
                    hello@eyeonidea.com
                  </div>
                </div>
              </a>

              <a
                href="tel:+4529930583"
                class="flex items-center gap-3 p-2 rounded-xl border border-transparent hover:ring-2 hover:ring-primary-50 hover:ring-offset-0 dark:hover:ring-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 bg-primary-100/25 hover:bg-primary-100/75"
              >
                <UIcon
                  name="i-heroicons-phone"
                  class="w-5 h-5 shrink-0 text-neutral-900"
                  aria-hidden="true"
                />
                <div class="min-w-0">
                  <div
                    class="text-sm font-medium text-neutral-900 dark:text-primary-100"
                  >
                    {{ t("common.contact.phone") }}
                  </div>
                  <div
                    class="text-sm text-neutral-700 dark:text-primary-200 truncate"
                  >
                    +45 29 93 05 83
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Single toggle button stays above the panel -->
      <button
        ref="triggerRef"
        @click.stop="toggle"
        :aria-expanded="open ? 'true' : 'false'"
        :aria-controls="panelId"
        class="touch-target absolute top-0 right-0 z-[60] inline-flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-primary-500 text-white hover:bg-primary-600 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 transition-all duration-300"
        :class="{ 'animate-pulse-subtle': !open }"
        :title="
          open ? t('common.contact.closePanel') : t('common.contact.openPanel')
        "
      >
        <UIcon
          :name="
            open
              ? 'i-heroicons-x-mark-20-solid'
              : 'i-heroicons-chat-bubble-left-right-solid'
          "
          class="w-6 h-6"
          aria-hidden="true"
        />
        <span class="sr-only">{{
          open ? t("common.contact.closePanel") : t("common.contact.openPanel")
        }}</span>
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
  // Use boolean capture flag so removeEventListener matches
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
button {
  cursor: pointer;
}
h3 {
  position: absolute;
  top: 15px;
  font-family: "Times New Roman", Times, serif;
  span {
    color: var(--color-primary-200);
    font-family: "Kanit", sans-serif;
  }
}
.email-text {
  letter-spacing: 1.5px;
}

.cont {
  background: var(--glass-tint-medium);
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
  -webkit-backdrop-filter: blur(var(--glass-blur))
    saturate(var(--glass-saturation));
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;

  box-shadow: var(--glass-shadow-elevated);
}
</style>
