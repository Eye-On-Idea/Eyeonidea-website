<script setup lang="ts">
const { t, tm } = useI18n();

interface FAQItem {
  question: string;
  answer: string;
}

useSeo({
  title: () => t("process.meta.title"),
  description: () => t("process.meta.description"),
  type: "website",
  schemaType: "WebPage",
  includeWebSiteSchema: false,
  breadcrumbs: [
    { name: "Home", url: "https://eyeonidea.com" },
    { name: "Services", url: "https://eyeonidea.com/services" },
    {
      name: t("process.meta.title"),
      url: "https://eyeonidea.com/services/process",
    },
  ],
  structuredData: {
    "@type": "FAQPage",
    "@id": "https://eyeonidea.com/services/process#faq",
    mainEntity: (tm("process.faq.items") as FAQItem[]).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  },
});
</script>

<template>
  <div class="process-page">
    <ProcessHero />
    <!-- Process-only: step-by-step workflow visualization -->
    <ProcessTimeline />
    <ProcessFAQ />
    <ProcessCTA />
  </div>
</template>

<style lang="scss" scoped>
.process-page {
  min-height: 100vh;
}
</style>
