<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.templatesAndPrint.businessCardsTitle") }}</h2>
    <p>{{ t("clientHub.article.content.templatesAndPrint.businessCardsText") }}</p>

    <h2>{{ t("clientHub.article.content.templatesAndPrint.letterheadTitle") }}</h2>
    <p>{{ t("clientHub.article.content.templatesAndPrint.letterheadText") }}</p>

    <h2>{{ t("clientHub.article.content.templatesAndPrint.presentationsTitle") }}</h2>
    <p>{{ t("clientHub.article.content.templatesAndPrint.presentationsText") }}</p>

    <h2>{{ t("clientHub.article.content.templatesAndPrint.socialMediaTitle") }}</h2>
    <p>{{ t("clientHub.article.content.templatesAndPrint.socialMediaText") }}</p>
  </div>
</template>
