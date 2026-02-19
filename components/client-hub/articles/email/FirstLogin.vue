<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.firstLogin.stepsTitle") }}</h2>
    <ol>
      <li>{{ t("clientHub.article.content.firstLogin.step1") }}</li>
      <li>{{ t("clientHub.article.content.firstLogin.step2") }}</li>
      <li>{{ t("clientHub.article.content.firstLogin.step3") }}</li>
    </ol>

    <ClientHubExternalLinkButton
      href="https://zimbra1.mail.ovh.net/"
      label="Webmail Access"
      icon="i-heroicons-arrow-top-right-on-square-solid"
    />

    <ClientHubArticleImage
      alt="Zimbra webmail login page"
      caption="The webmail login screen"
    />

    <h2>{{ t("clientHub.article.content.firstLogin.changePasswordTitle") }}</h2>
    <ol>
      <li>{{ t("clientHub.article.content.firstLogin.changeStep1") }}</li>
      <li>{{ t("clientHub.article.content.firstLogin.changeStep2") }}</li>
      <li>{{ t("clientHub.article.content.firstLogin.changeStep3") }}</li>
    </ol>

    <ClientHubArticleImage
      alt="Changing password in webmail settings"
      caption="The password change screen"
    />

    <div class="warning-box">
      <strong>{{ t("clientHub.article.warningLabel") }}:</strong>
      {{ t("clientHub.article.content.firstLogin.warning") }}
    </div>
  </div>
</template>
