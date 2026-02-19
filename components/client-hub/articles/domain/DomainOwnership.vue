<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.domainOwnership.introTitle") }}</h2>
    <p>{{ t("clientHub.article.content.domainOwnership.introText") }}</p>

    <h2>{{ t("clientHub.article.content.domainOwnership.ownershipTitle") }}</h2>
    <p>{{ t("clientHub.article.content.domainOwnership.ownershipText") }}</p>

    <ClientHubArticleImage alt="Domain registrar ownership panel" caption="Domain ownership information in the registrar" />

    <h2>{{ t("clientHub.article.content.domainOwnership.eoiTitle") }}</h2>
    <ul>
      <li>{{ t("clientHub.article.content.domainOwnership.eoi1") }}</li>
      <li>{{ t("clientHub.article.content.domainOwnership.eoi2") }}</li>
      <li>{{ t("clientHub.article.content.domainOwnership.eoi3") }}</li>
      <li>{{ t("clientHub.article.content.domainOwnership.eoi4") }}</li>
    </ul>

    <h2>{{ t("clientHub.article.content.domainOwnership.yourTitle") }}</h2>
    <ul>
      <li>{{ t("clientHub.article.content.domainOwnership.your1") }}</li>
      <li>{{ t("clientHub.article.content.domainOwnership.your2") }}</li>
      <li>{{ t("clientHub.article.content.domainOwnership.your3") }}</li>
      <li>{{ t("clientHub.article.content.domainOwnership.your4") }}</li>
    </ul>
  </div>
</template>
