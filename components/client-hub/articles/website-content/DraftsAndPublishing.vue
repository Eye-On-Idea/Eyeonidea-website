<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.draftsAndPublishing.draftsTitle") }}</h2>
    <p>{{ t("clientHub.article.content.draftsAndPublishing.draftsText") }}</p>

    <ClientHubArticleImage alt="Draft indicator in the Studio" caption="A document in draft state" />

    <h2>{{ t("clientHub.article.content.draftsAndPublishing.publishTitle") }}</h2>
    <ol>
      <li>{{ t("clientHub.article.content.draftsAndPublishing.publishStep1") }}</li>
      <li>{{ t("clientHub.article.content.draftsAndPublishing.publishStep2") }}</li>
      <li>{{ t("clientHub.article.content.draftsAndPublishing.publishStep3") }}</li>
    </ol>

    <ClientHubArticleImage alt="Publish button in the Studio" caption="The publish button and confirmation" />

    <h2>{{ t("clientHub.article.content.draftsAndPublishing.checkTitle") }}</h2>
    <p>{{ t("clientHub.article.content.draftsAndPublishing.checkText") }}</p>
    <ul>
      <li>{{ t("clientHub.article.content.draftsAndPublishing.check1") }}</li>
      <li>{{ t("clientHub.article.content.draftsAndPublishing.check2") }}</li>
      <li>{{ t("clientHub.article.content.draftsAndPublishing.check3") }}</li>
      <li>{{ t("clientHub.article.content.draftsAndPublishing.check4") }}</li>
    </ul>

    <div class="tip-box">
      <strong>{{ t("clientHub.article.tipLabel") }}:</strong>
      {{ t("clientHub.article.content.draftsAndPublishing.tip") }}
    </div>

    <div class="warning-box">
      <strong>{{ t("clientHub.article.warningLabel") }}:</strong>
      {{ t("clientHub.article.content.draftsAndPublishing.warning") }}
    </div>
  </div>
</template>
