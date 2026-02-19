<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.environments.productionTitle") }}</h2>
    <p>{{ t("clientHub.article.content.environments.productionText") }}</p>

    <ClientHubArticleImage alt="Production and development environment diagram" caption="Production vs. development environments" />

    <h2>{{ t("clientHub.article.content.environments.developmentTitle") }}</h2>
    <p>{{ t("clientHub.article.content.environments.developmentText") }}</p>

    <div class="note-box">
      <strong>{{ t("clientHub.article.noteLabel") }}:</strong>
      {{ t("clientHub.article.content.environments.note") }}
    </div>
  </div>
</template>
