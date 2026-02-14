<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.managingMedia.findingTitle") }}</h2>
    <p>{{ t("clientHub.article.content.managingMedia.findingText") }}</p>

    <ClientHubScreenshotPlaceholder description="The media library view in the Studio" />

    <h2>{{ t("clientHub.article.content.managingMedia.replacingTitle") }}</h2>
    <p>{{ t("clientHub.article.content.managingMedia.replacingText") }}</p>

    <div class="note-box">
      <strong>{{ t("clientHub.article.noteLabel") }}:</strong>
      {{ t("clientHub.article.content.managingMedia.note") }}
    </div>
  </div>
</template>
