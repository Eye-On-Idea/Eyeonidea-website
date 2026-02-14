<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.permissionIssues.introTitle") }}</h2>
    <p>{{ t("clientHub.article.content.permissionIssues.introText") }}</p>

    <h2>{{ t("clientHub.article.content.permissionIssues.symptomsTitle") }}</h2>
    <ul>
      <li>{{ t("clientHub.article.content.permissionIssues.symptom1") }}</li>
      <li>{{ t("clientHub.article.content.permissionIssues.symptom2") }}</li>
      <li>{{ t("clientHub.article.content.permissionIssues.symptom3") }}</li>
    </ul>

    <h2>{{ t("clientHub.article.content.permissionIssues.whatToDoTitle") }}</h2>
    <p>{{ t("clientHub.article.content.permissionIssues.whatToDoText") }}</p>

    <div class="note-box">
      <strong>{{ t("clientHub.article.noteLabel") }}:</strong>
      {{ t("clientHub.article.content.permissionIssues.note") }}
    </div>
  </div>
</template>
