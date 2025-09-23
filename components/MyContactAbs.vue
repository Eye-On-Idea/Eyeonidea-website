<template>
  <div
    id="contact-abs"
    ref="root"
    class="fixed right-[10px] top-1/2 -translate-y-1/2 z-50"
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
          class="absolute top-0 right-0 origin-top-right z-40"
          style="transform-origin: top right"
        >
          <!-- Top padding leaves space under the overlapping button -->
          <div
            class="w-72 rounded-2xl border border-primary-200 bg-white dark:bg-neutral-900 shadow-xl p-4 pt-14 pr-4"
          >
            <!-- Headline -->
            <h3 class="text-lg font-semibold text-primary-600 mb-3">
              tegetec <span>contact</span>
            </h3>

            <!-- Contact items (hover = ring outline only; text doesn't change) -->
            <div class="flex flex-col gap-2">
              <a
                href="mailto:mail@tegetec.com"
                class="flex items-center gap-3 p-2 rounded-xl border border-transparent hover:ring-2 hover:ring-primary-50 hover:ring-offset-0 dark:hover:ring-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                <UIcon
                  name="i-heroicons-envelope"
                  class="w-5 h-5 shrink-0 text-primary-400"
                  aria-hidden="true"
                />
                <div class="min-w-0">
                  <div
                    class="text-sm font-medium text-neutral-900 dark:text-primary-100"
                  >
                    Email
                  </div>
                  <div
                    class="email-text text-sm text-neutral-700 dark:text-primary-200 truncate"
                  >
                    mail@tegetec.com
                  </div>
                </div>
              </a>

              <a
                href="tel:+4570252420"
                class="flex items-center gap-3 p-2 rounded-xl border border-transparent hover:ring-2 hover:ring-primary-50 hover:ring-offset-0 dark:hover:ring-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                <UIcon
                  name="i-heroicons-phone"
                  class="w-5 h-5 shrink-0 text-primary-400"
                  aria-hidden="true"
                />
                <div class="min-w-0">
                  <div
                    class="text-sm font-medium text-neutral-900 dark:text-primary-100"
                  >
                    Phone
                  </div>
                  <div
                    class="text-sm text-neutral-700 dark:text-primary-200 truncate"
                  >
                    +45 70 25 24 20
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Single toggle button stays above the panel -->
      <button
        @click.stop="toggle"
        :aria-expanded="open ? 'true' : 'false'"
        :aria-controls="panelId"
        class="absolute top-0 right-0 z-50 inline-flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-primary-500 text-white hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
        :title="open ? 'Close contact panel' : 'Open contact panel'"
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
          open ? "Close contact panel" : "Open contact panel"
        }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const open = ref(false);
const root = ref<HTMLElement | null>(null);
const panelId = "floating-contact-panel";

const toggle = () => {
  open.value = !open.value;
};

const onDocClick = (e: MouseEvent) => {
  const el = root.value;
  if (!el) return;
  if (!el.contains(e.target as Node)) open.value = false;
};

const onKey = (e: KeyboardEvent) => {
  if (e.key === "Escape") open.value = false;
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
</script>

<style lang="scss" scoped>
button {
  cursor: pointer;
}
h3 {
  position: absolute;
  top: 20px;
  span {
    color: var(--color-primary-200);
  }
}
.email-text {
  letter-spacing: 1.5px;
}

@media (max-width: 769px) {
  #contact-abs {
    display: none;
  }
}
</style>
