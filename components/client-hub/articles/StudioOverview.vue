<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.studioOverview.introTitle") }}</h2>
    <p>{{ t("clientHub.article.content.studioOverview.introText") }}</p>

    <ClientHubScreenshotPlaceholder description="The main Studio dashboard view" />

    <h2>{{ t("clientHub.article.content.studioOverview.areasTitle") }}</h2>
    <ul>
      <li><strong>{{ t("clientHub.article.content.studioOverview.area1Label") }}</strong> — {{ t("clientHub.article.content.studioOverview.area1Desc") }}</li>
      <li><strong>{{ t("clientHub.article.content.studioOverview.area2Label") }}</strong> — {{ t("clientHub.article.content.studioOverview.area2Desc") }}</li>
      <li><strong>{{ t("clientHub.article.content.studioOverview.area3Label") }}</strong> — {{ t("clientHub.article.content.studioOverview.area3Desc") }}</li>
    </ul>

    <div class="tip-box">
      <strong>{{ t("clientHub.article.tipLabel") }}:</strong>
      {{ t("clientHub.article.content.studioOverview.tip") }}
    </div>
  </div>
</template>
