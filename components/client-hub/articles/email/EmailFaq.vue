<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.emailFaq.introTitle") }}</h2>

    <h3>{{ t("clientHub.article.content.emailFaq.q1") }}</h3>
    <p>{{ t("clientHub.article.content.emailFaq.a1") }}</p>

    <h3>{{ t("clientHub.article.content.emailFaq.q2") }}</h3>
    <p>{{ t("clientHub.article.content.emailFaq.a2") }}</p>

    <h3>{{ t("clientHub.article.content.emailFaq.q3") }}</h3>
    <p>{{ t("clientHub.article.content.emailFaq.a3") }}</p>

    <h3>{{ t("clientHub.article.content.emailFaq.q4") }}</h3>
    <p>{{ t("clientHub.article.content.emailFaq.a4") }}</p>

    <h2>{{ t("clientHub.article.content.emailFaq.mistakesTitle") }}</h2>
    <ul>
      <li>{{ t("clientHub.article.content.emailFaq.mistake1") }}</li>
      <li>{{ t("clientHub.article.content.emailFaq.mistake2") }}</li>
      <li>{{ t("clientHub.article.content.emailFaq.mistake3") }}</li>
    </ul>
  </div>
</template>
