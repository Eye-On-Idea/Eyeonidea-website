<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.templatesAndPrint.businessCardsTitle") }}</h2>
    <p>{{ t("clientHub.article.content.templatesAndPrint.businessCardsText") }}</p>

    <ClientHubArticleImage alt="Business card template" caption="Business card template" aspect-ratio="3/2" />

    <h2>{{ t("clientHub.article.content.templatesAndPrint.letterheadTitle") }}</h2>
    <p>{{ t("clientHub.article.content.templatesAndPrint.letterheadText") }}</p>

    <ClientHubArticleImage alt="Letterhead template" caption="Letterhead template" aspect-ratio="3/4" />

    <h2>{{ t("clientHub.article.content.templatesAndPrint.presentationsTitle") }}</h2>
    <p>{{ t("clientHub.article.content.templatesAndPrint.presentationsText") }}</p>

    <ClientHubArticleImage alt="Presentation template slide" caption="Presentation template" />

    <h2>{{ t("clientHub.article.content.templatesAndPrint.socialMediaTitle") }}</h2>
    <p>{{ t("clientHub.article.content.templatesAndPrint.socialMediaText") }}</p>

    <ClientHubArticleImage alt="Social media template examples" caption="Social media templates" />
  </div>
</template>
