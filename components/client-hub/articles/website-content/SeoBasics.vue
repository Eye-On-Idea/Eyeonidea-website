<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.seoBasics.introTitle") }}</h2>
    <p>{{ t("clientHub.article.content.seoBasics.introText") }}</p>

    <h3>{{ t("clientHub.article.content.seoBasics.fieldsTitle") }}</h3>
    <ul>
      <li>{{ t("clientHub.article.content.seoBasics.field1") }}</li>
      <li>{{ t("clientHub.article.content.seoBasics.field2") }}</li>
      <li>{{ t("clientHub.article.content.seoBasics.field3") }}</li>
      <li>{{ t("clientHub.article.content.seoBasics.field4") }}</li>
    </ul>

    <ClientHubArticleImage alt="SEO fields in the Studio document editor" caption="SEO fields in the document editor" />

    <h2>{{ t("clientHub.article.content.seoBasics.titleTitle") }}</h2>
    <p>{{ t("clientHub.article.content.seoBasics.titleText") }}</p>
    <p class="example">{{ t("clientHub.article.content.seoBasics.titleExample") }}</p>

    <h2>{{ t("clientHub.article.content.seoBasics.descriptionTitle") }}</h2>
    <p>{{ t("clientHub.article.content.seoBasics.descriptionText") }}</p>
    <p class="example">{{ t("clientHub.article.content.seoBasics.descriptionExample") }}</p>

    <div class="note-box">
      <strong>{{ t("clientHub.article.noteLabel") }}:</strong>
      {{ t("clientHub.article.content.seoBasics.note") }}
    </div>
  </div>
</template>
