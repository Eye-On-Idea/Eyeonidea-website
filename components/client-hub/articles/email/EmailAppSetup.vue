<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.emailAppSetup.introTitle") }}</h2>
    <p>{{ t("clientHub.article.content.emailAppSetup.introText") }}</p>

    <h2>{{ t("clientHub.article.content.emailAppSetup.imapTitle") }}</h2>

    <h3>{{ t("clientHub.article.content.emailAppSetup.incomingTitle") }}</h3>
    <ul>
      <li>{{ t("clientHub.article.content.emailAppSetup.incomingServer") }}</li>
      <li>{{ t("clientHub.article.content.emailAppSetup.incomingPort") }}</li>
      <li>{{ t("clientHub.article.content.emailAppSetup.incomingEncryption") }}</li>
    </ul>

    <h3>{{ t("clientHub.article.content.emailAppSetup.outgoingTitle") }}</h3>
    <ul>
      <li>{{ t("clientHub.article.content.emailAppSetup.outgoingServer") }}</li>
      <li>{{ t("clientHub.article.content.emailAppSetup.outgoingPort") }}</li>
      <li>{{ t("clientHub.article.content.emailAppSetup.outgoingEncryption") }}</li>
    </ul>

    <h3>{{ t("clientHub.article.content.emailAppSetup.credentialsTitle") }}</h3>
    <ul>
      <li>{{ t("clientHub.article.content.emailAppSetup.credentialsUsername") }}</li>
      <li>{{ t("clientHub.article.content.emailAppSetup.credentialsPassword") }}</li>
    </ul>

    <h3>{{ t("clientHub.article.content.emailAppSetup.appsTitle") }}</h3>
    <p>{{ t("clientHub.article.content.emailAppSetup.appsText") }}</p>

    <ClientHubArticleImage alt="Email app IMAP settings configuration" caption="Example IMAP settings in an email app" />

    <h2>{{ t("clientHub.article.content.emailAppSetup.testTitle") }}</h2>
    <ol>
      <li>{{ t("clientHub.article.content.emailAppSetup.testStep1") }}</li>
      <li>{{ t("clientHub.article.content.emailAppSetup.testStep2") }}</li>
      <li>{{ t("clientHub.article.content.emailAppSetup.testStep3") }}</li>
    </ol>

    <div class="tip-box">
      <strong>{{ t("clientHub.article.tipLabel") }}:</strong>
      {{ t("clientHub.article.content.emailAppSetup.tip") }}
    </div>

    <div class="warning-box">
      <strong>{{ t("clientHub.article.warningLabel") }}:</strong>
      {{ t("clientHub.article.content.emailAppSetup.warning") }}
    </div>
  </div>
</template>
