<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.colorsAndTypography.colorsTitle") }}</h2>
    <p>{{ t("clientHub.article.content.colorsAndTypography.colorsText") }}</p>
    <p>{{ t("clientHub.article.content.colorsAndTypography.colorsAvoid") }}</p>

    <h2>{{ t("clientHub.article.content.colorsAndTypography.typographyTitle") }}</h2>
    <p>{{ t("clientHub.article.content.colorsAndTypography.typographyText") }}</p>

    <div class="warning-box">
      <strong>{{ t("clientHub.article.warningLabel") }}:</strong>
      {{ t("clientHub.article.content.colorsAndTypography.warning") }}
    </div>
  </div>
</template>
