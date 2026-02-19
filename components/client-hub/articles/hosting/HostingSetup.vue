<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.hostingSetup.introTitle") }}</h2>
    <p>{{ t("clientHub.article.content.hostingSetup.introText") }}</p>

    <ClientHubArticleImage alt="Hosting infrastructure overview" caption="Your hosting setup" />

    <h2>{{ t("clientHub.article.content.hostingSetup.eoiTitle") }}</h2>
    <ul>
      <li>{{ t("clientHub.article.content.hostingSetup.eoi1") }}</li>
      <li>{{ t("clientHub.article.content.hostingSetup.eoi2") }}</li>
      <li>{{ t("clientHub.article.content.hostingSetup.eoi3") }}</li>
      <li>{{ t("clientHub.article.content.hostingSetup.eoi4") }}</li>
      <li>{{ t("clientHub.article.content.hostingSetup.eoi5") }}</li>
      <li>{{ t("clientHub.article.content.hostingSetup.eoi6") }}</li>
    </ul>

    <div class="note-box">
      <strong>{{ t("clientHub.article.noteLabel") }}:</strong>
      {{ t("clientHub.article.content.hostingSetup.note") }}
    </div>
  </div>
</template>
