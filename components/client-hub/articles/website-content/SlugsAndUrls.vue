<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.slugsAndUrls.introTitle") }}</h2>
    <p>{{ t("clientHub.article.content.slugsAndUrls.introText") }}</p>

    <h3>{{ t("clientHub.article.content.slugsAndUrls.exampleTitle") }}</h3>
    <p><code>{{ t("clientHub.article.content.slugsAndUrls.exampleText") }}</code></p>

    <h2>{{ t("clientHub.article.content.slugsAndUrls.bestPracticesTitle") }}</h2>
    <ul>
      <li>{{ t("clientHub.article.content.slugsAndUrls.bestPractice1") }}</li>
      <li>{{ t("clientHub.article.content.slugsAndUrls.bestPractice2") }}</li>
      <li>{{ t("clientHub.article.content.slugsAndUrls.bestPractice3") }}</li>
      <li>{{ t("clientHub.article.content.slugsAndUrls.bestPractice4") }}</li>
    </ul>

    <h3>{{ t("clientHub.article.content.slugsAndUrls.publishTitle") }}</h3>
    <p>{{ t("clientHub.article.content.slugsAndUrls.publishText") }}</p>

    <div class="warning-box">
      <strong>{{ t("clientHub.article.warningLabel") }}:</strong>
      {{ t("clientHub.article.content.slugsAndUrls.warning") }}
    </div>

    <div class="note-box">
      <strong>{{ t("clientHub.article.noteLabel") }}:</strong>
      {{ t("clientHub.article.content.slugsAndUrls.note") }}
    </div>
  </div>
</template>
