<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.domainRenewal.processTitle") }}</h2>
    <p>{{ t("clientHub.article.content.domainRenewal.processText") }}</p>
    <ol>
      <li>{{ t("clientHub.article.content.domainRenewal.processStep1") }}</li>
      <li>{{ t("clientHub.article.content.domainRenewal.processStep2") }}</li>
      <li>{{ t("clientHub.article.content.domainRenewal.processStep3") }}</li>
      <li>{{ t("clientHub.article.content.domainRenewal.processStep4") }}</li>
    </ol>

    <h2>{{ t("clientHub.article.content.domainRenewal.expirationTitle") }}</h2>
    <p>{{ t("clientHub.article.content.domainRenewal.expirationText") }}</p>

    <div class="warning-box">
      <p><strong>{{ t("clientHub.article.warningLabel") }}:</strong> {{ t("clientHub.article.content.domainRenewal.warning") }}</p>
    </div>

    <h3>{{ t("clientHub.article.content.domainRenewal.lifecycleTitle") }}</h3>
    <ol>
      <li>{{ t("clientHub.article.content.domainRenewal.lifecycle1") }}</li>
      <li>{{ t("clientHub.article.content.domainRenewal.lifecycle2") }}</li>
      <li>{{ t("clientHub.article.content.domainRenewal.lifecycle3") }}</li>
      <li>{{ t("clientHub.article.content.domainRenewal.lifecycle4") }}</li>
      <li>{{ t("clientHub.article.content.domainRenewal.lifecycle5") }}</li>
    </ol>

    <div class="tip-box">
      <p><strong>{{ t("clientHub.article.tipLabel") }}:</strong> {{ t("clientHub.article.content.domainRenewal.tip") }}</p>
    </div>
  </div>
</template>
