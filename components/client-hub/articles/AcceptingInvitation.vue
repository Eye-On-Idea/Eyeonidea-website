<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.acceptingInvitation.whatToExpect") }}</h2>
    <p>{{ t("clientHub.article.content.acceptingInvitation.whatToExpectText") }}</p>

    <ClientHubScreenshotPlaceholder description="The invitation email from Sanity" />

    <h2>{{ t("clientHub.article.content.acceptingInvitation.steps") }}</h2>
    <ol>
      <li>{{ t("clientHub.article.content.acceptingInvitation.step1") }}</li>
      <li>{{ t("clientHub.article.content.acceptingInvitation.step2") }}</li>
      <li>{{ t("clientHub.article.content.acceptingInvitation.step3") }}</li>
      <li>{{ t("clientHub.article.content.acceptingInvitation.step4") }}</li>
    </ol>

    <div class="tip-box">
      <strong>{{ t("clientHub.article.tipLabel") }}:</strong>
      {{ t("clientHub.article.content.acceptingInvitation.tip") }}
    </div>

    <h2>{{ t("clientHub.article.content.acceptingInvitation.troubleTitle") }}</h2>
    <ul>
      <li>{{ t("clientHub.article.content.acceptingInvitation.trouble1") }}</li>
      <li>{{ t("clientHub.article.content.acceptingInvitation.trouble2") }}</li>
      <li>{{ t("clientHub.article.content.acceptingInvitation.trouble3") }}</li>
    </ul>
  </div>
</template>
