<!-- ~/error.vue -->
<script setup lang="ts">
/**
 * Nuxt’s global error page. Renders for 404 and other errors.
 * You can customize the copy below (DA/EN), and add your header/footer.
 */
const props = defineProps<{
  error: { statusCode?: number; statusMessage?: string };
}>();
const route = useRoute();
const is404 = props.error?.statusCode === 404;

// Page <title>
useHead({
  title: is404 ? "404 – Side ikke fundet | Eye on Idea" : "Fejl | Eye on Idea",
});

// Reset error and go home
function goHome() {
  clearError({ redirect: "/" });
}

// Build “report issue” mailto with context
const mailto = computed(() => {
  const subject = encodeURIComponent(
    `[EOI] ${is404 ? "404" : "Fejl"} på ${route.fullPath}`
  );
  const body = encodeURIComponent(
    `Hej EOI,\n\nDer opstod en ${
      is404 ? "404 (side ikke fundet)" : "fejl"
    } på følgende adresse:\n${location.origin}${
      route.fullPath
    }\n\nBeskriv hvad du forsøgte at gøre:\n- \n\nBrowser/Enhed:\n- \n`
  );
  return `mailto:rune-ceo@eyeonidea.com?subject=${subject}&body=${body}`;
});
</script>

<template>
  <main
    class="min-h-screen bg-white dark:bg-gray-950 grid place-items-center py-16 px-4"
  >
    <UContainer class="max-w-2xl w-full">
      <UCard class="shadow-sm">
        <MyHeader></MyHeader>

        <div class="space-y-6">
          <!-- Helpful actions -->
          <div class="flex flex-wrap gap-3">
            <UButton color="black" icon="i-heroicons-home" @click="goHome">
              Til forsiden
            </UButton>

            <UButton
              color="primary"
              icon="i-heroicons-arrow-path"
              variant="soft"
              @click="$router.go(0)"
            >
              Prøv igen
            </UButton>

            <UButton color="gray" icon="i-heroicons-envelope" :to="mailto">
              Rapportér problem
            </UButton>

            <UButton
              color="gray"
              icon="i-heroicons-squares-2x2"
              to="/services"
              variant="ghost"
            >
              Se ydelser
            </UButton>
          </div>

          <!-- Context (optional) -->
          <UAlert
            icon="i-heroicons-information-circle"
            title="Teknisk info"
            :description="`Adresse: ${route.fullPath}`"
            color="gray"
            variant="subtle"
          />

          <!-- EOI details -->
          <div class="border-t border-gray-200 dark:border-gray-800 pt-6">
            <h2
              class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
            >
              Eye on Idea (EOI)
            </h2>
            <div
              class="grid sm:grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300"
            >
              <div>
                <span class="block"
                  >CVR: <span class="font-medium">45356175</span></span
                >
                <span class="block"
                  >Email:
                  <a
                    href="mailto:support@eyeonidea.com"
                    class="underline decoration-dotted"
                    >support@eyeonidea.com</a
                  ></span
                >
              </div>
              <div>
                <span class="block"
                  >Telefon:
                  <a href="tel:+4540233267" class="underline decoration-dotted"
                    >+45 40 23 32 67</a
                  ></span
                >
                <span class="block"
                  >Web:
                  <a
                    href="https://eyeonidea.com"
                    class="underline decoration-dotted"
                    target="_blank"
                    rel="noopener"
                    >eyeonidea.com</a
                  ></span
                >
              </div>
            </div>
          </div>
        </div>

        <MyFoot></MyFoot>
      </UCard>
    </UContainer>
  </main>
</template>

<style scoped>
/* Make focus outlines clearly visible for accessibility */
:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
</style>
