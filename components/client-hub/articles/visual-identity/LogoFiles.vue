<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.logoFiles.introTitle") }}</h2>
    <p>{{ t("clientHub.article.content.logoFiles.introText") }}</p>

    <h2>{{ t("clientHub.article.content.logoFiles.svgTitle") }}</h2>
    <p>{{ t("clientHub.article.content.logoFiles.svgText") }}</p>

    <h2>{{ t("clientHub.article.content.logoFiles.pngTitle") }}</h2>
    <p>{{ t("clientHub.article.content.logoFiles.pngText") }}</p>

    <h2>{{ t("clientHub.article.content.logoFiles.jpgTitle") }}</h2>
    <p>{{ t("clientHub.article.content.logoFiles.jpgText") }}</p>

    <div class="tip-box">
      <strong>{{ t("clientHub.article.tipLabel") }}:</strong>
      {{ t("clientHub.article.content.logoFiles.tip") }}
    </div>
  </div>
</template>
