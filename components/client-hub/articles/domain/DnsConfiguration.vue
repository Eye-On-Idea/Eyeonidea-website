<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.dnsConfiguration.introTitle") }}</h2>
    <p>{{ t("clientHub.article.content.dnsConfiguration.introText") }}</p>

    <h2>{{ t("clientHub.article.content.dnsConfiguration.managedTitle") }}</h2>
    <ul>
      <li>{{ t("clientHub.article.content.dnsConfiguration.managed1") }}</li>
      <li>{{ t("clientHub.article.content.dnsConfiguration.managed2") }}</li>
      <li>{{ t("clientHub.article.content.dnsConfiguration.managed3") }}</li>
      <li>{{ t("clientHub.article.content.dnsConfiguration.managed4") }}</li>
    </ul>

    <div class="warning-box">
      <p><strong>{{ t("clientHub.article.warningLabel") }}:</strong> {{ t("clientHub.article.content.dnsConfiguration.warning") }}</p>
    </div>
  </div>
</template>
