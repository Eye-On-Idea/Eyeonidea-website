<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.loggingIn.openStudioTitle") }}</h2>
    <p>{{ t("clientHub.article.content.loggingIn.openStudioText") }}</p>
    <p><code>{{ t("clientHub.article.content.loggingIn.openStudioUrl") }}</code></p>
    <p>{{ t("clientHub.article.content.loggingIn.openStudioBookmark") }}</p>

    <h2>{{ t("clientHub.article.content.loggingIn.signInTitle") }}</h2>
    <ol>
      <li>{{ t("clientHub.article.content.loggingIn.signInStep1") }}</li>
      <li>{{ t("clientHub.article.content.loggingIn.signInStep2") }}</li>
      <li>{{ t("clientHub.article.content.loggingIn.signInStep3") }}</li>
    </ol>

    <h3>{{ t("clientHub.article.content.loggingIn.noInviteTitle") }}</h3>
    <p>{{ t("clientHub.article.content.loggingIn.noInviteText") }}</p>

    <div class="tip-box">
      <strong>{{ t("clientHub.article.tipLabel") }}:</strong>
      {{ t("clientHub.article.content.loggingIn.tip") }}
    </div>
  </div>
</template>
