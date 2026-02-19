<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.emailBackup.introTitle") }}</h2>
    <p>{{ t("clientHub.article.content.emailBackup.introText") }}</p>

    <ClientHubArticleImage alt="Email backup options overview" caption="Email backup methods" />

    <h2>{{ t("clientHub.article.content.emailBackup.optionsTitle") }}</h2>
    <ul>
      <li>{{ t("clientHub.article.content.emailBackup.option1") }}</li>
      <li>{{ t("clientHub.article.content.emailBackup.option2") }}</li>
      <li>{{ t("clientHub.article.content.emailBackup.option3") }}</li>
    </ul>

    <div class="warning-box">
      <strong>{{ t("clientHub.article.warningLabel") }}:</strong>
      {{ t("clientHub.article.content.emailBackup.warning") }}
    </div>
  </div>
</template>
