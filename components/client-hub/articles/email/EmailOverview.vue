<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.emailOverview.introTitle") }}</h2>
    <p>{{ t("clientHub.article.content.emailOverview.introText") }}</p>

    <h2>{{ t("clientHub.article.content.emailOverview.featuresTitle") }}</h2>
    <ul>
      <li>{{ t("clientHub.article.content.emailOverview.feature1") }}</li>
      <li>{{ t("clientHub.article.content.emailOverview.feature2") }}</li>
      <li>{{ t("clientHub.article.content.emailOverview.feature3") }}</li>
      <li>{{ t("clientHub.article.content.emailOverview.feature4") }}</li>
    </ul>

    <h2>{{ t("clientHub.article.content.emailOverview.eoiTitle") }}</h2>
    <ul>
      <li>{{ t("clientHub.article.content.emailOverview.eoi1") }}</li>
      <li>{{ t("clientHub.article.content.emailOverview.eoi2") }}</li>
      <li>{{ t("clientHub.article.content.emailOverview.eoi3") }}</li>
      <li>{{ t("clientHub.article.content.emailOverview.eoi4") }}</li>
    </ul>

    <h2>{{ t("clientHub.article.content.emailOverview.yourTitle") }}</h2>
    <ul>
      <li>{{ t("clientHub.article.content.emailOverview.your1") }}</li>
      <li>{{ t("clientHub.article.content.emailOverview.your2") }}</li>
      <li>{{ t("clientHub.article.content.emailOverview.your3") }}</li>
      <li>{{ t("clientHub.article.content.emailOverview.your4") }}</li>
    </ul>

    <div class="warning-box">
      <strong>{{ t("clientHub.article.warningLabel") }}:</strong>
      {{ t("clientHub.article.content.emailOverview.warning") }}
    </div>
  </div>
</template>
