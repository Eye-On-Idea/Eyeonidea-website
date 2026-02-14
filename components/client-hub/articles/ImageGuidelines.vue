<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.imageGuidelines.introTitle") }}</h2>
    <p>{{ t("clientHub.article.content.imageGuidelines.introText") }}</p>

    <h2>{{ t("clientHub.article.content.imageGuidelines.formatsTitle") }}</h2>
    <ul>
      <li>{{ t("clientHub.article.content.imageGuidelines.format1") }}</li>
      <li>{{ t("clientHub.article.content.imageGuidelines.format2") }}</li>
      <li>{{ t("clientHub.article.content.imageGuidelines.format3") }}</li>
    </ul>

    <h2>{{ t("clientHub.article.content.imageGuidelines.sizesTitle") }}</h2>
    <p>{{ t("clientHub.article.content.imageGuidelines.sizesText") }}</p>

    <h2>{{ t("clientHub.article.content.imageGuidelines.dosTitle") }}</h2>
    <ul>
      <li>{{ t("clientHub.article.content.imageGuidelines.do1") }}</li>
      <li>{{ t("clientHub.article.content.imageGuidelines.do2") }}</li>
      <li>{{ t("clientHub.article.content.imageGuidelines.do3") }}</li>
    </ul>

    <h2>{{ t("clientHub.article.content.imageGuidelines.dontsTitle") }}</h2>
    <ul>
      <li>{{ t("clientHub.article.content.imageGuidelines.dont1") }}</li>
      <li>{{ t("clientHub.article.content.imageGuidelines.dont2") }}</li>
      <li>{{ t("clientHub.article.content.imageGuidelines.dont3") }}</li>
    </ul>
  </div>
</template>
