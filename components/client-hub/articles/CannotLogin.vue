<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.cannotLogin.commonTitle") }}</h2>
    <p>{{ t("clientHub.article.content.cannotLogin.commonText") }}</p>

    <h3>{{ t("clientHub.article.content.cannotLogin.cause1Title") }}</h3>
    <p>{{ t("clientHub.article.content.cannotLogin.cause1Text") }}</p>

    <h3>{{ t("clientHub.article.content.cannotLogin.cause2Title") }}</h3>
    <p>{{ t("clientHub.article.content.cannotLogin.cause2Text") }}</p>

    <h3>{{ t("clientHub.article.content.cannotLogin.cause3Title") }}</h3>
    <p>{{ t("clientHub.article.content.cannotLogin.cause3Text") }}</p>

    <h3>{{ t("clientHub.article.content.cannotLogin.cause4Title") }}</h3>
    <p>{{ t("clientHub.article.content.cannotLogin.cause4Text") }}</p>

    <div class="warning-box">
      <strong>{{ t("clientHub.article.warningLabel") }}:</strong>
      {{ t("clientHub.article.content.cannotLogin.warning") }}
    </div>
  </div>
</template>
