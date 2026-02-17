<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.studioNavigation.introTitle") }}</h2>
    <p>{{ t("clientHub.article.content.studioNavigation.introText") }}</p>

    <ul>
      <li>{{ t("clientHub.article.content.studioNavigation.contentType1") }}</li>
      <li>{{ t("clientHub.article.content.studioNavigation.contentType2") }}</li>
      <li>{{ t("clientHub.article.content.studioNavigation.contentType3") }}</li>
      <li>{{ t("clientHub.article.content.studioNavigation.contentType4") }}</li>
      <li>{{ t("clientHub.article.content.studioNavigation.contentType5") }}</li>
    </ul>

    <p>{{ t("clientHub.article.content.studioNavigation.howToNavigate") }}</p>

    <div class="tip-box">
      <strong>{{ t("clientHub.article.tipLabel") }}:</strong>
      {{ t("clientHub.article.content.studioNavigation.tip") }}
    </div>
  </div>
</template>
