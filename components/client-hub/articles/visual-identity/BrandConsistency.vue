<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.brandConsistency.introTitle") }}</h2>
    <p>{{ t("clientHub.article.content.brandConsistency.introText") }}</p>

    <ClientHubArticleImage alt="Brand consistency examples across materials" caption="Consistent brand application" />

    <h3>{{ t("clientHub.article.content.brandConsistency.checklistTitle") }}</h3>
    <ul>
      <li>{{ t("clientHub.article.content.brandConsistency.check1") }}</li>
      <li>{{ t("clientHub.article.content.brandConsistency.check2") }}</li>
      <li>{{ t("clientHub.article.content.brandConsistency.check3") }}</li>
    </ul>
    <p>{{ t("clientHub.article.content.brandConsistency.checkText") }}</p>

    <h2>{{ t("clientHub.article.content.brandConsistency.fileManagementTitle") }}</h2>
    <ul>
      <li>{{ t("clientHub.article.content.brandConsistency.fileManagement1") }}</li>
      <li>{{ t("clientHub.article.content.brandConsistency.fileManagement2") }}</li>
      <li>{{ t("clientHub.article.content.brandConsistency.fileManagement3") }}</li>
      <li>{{ t("clientHub.article.content.brandConsistency.fileManagement4") }}</li>
    </ul>

    <div class="warning-box">
      <strong>{{ t("clientHub.article.warningLabel") }}:</strong>
      {{ t("clientHub.article.content.brandConsistency.warning") }}
    </div>
  </div>
</template>
