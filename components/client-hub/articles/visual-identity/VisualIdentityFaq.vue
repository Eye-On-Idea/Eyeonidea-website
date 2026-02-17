<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.visualIdentityFaq.introTitle") }}</h2>

    <h3>{{ t("clientHub.article.content.visualIdentityFaq.q1") }}</h3>
    <p>{{ t("clientHub.article.content.visualIdentityFaq.a1") }}</p>

    <h3>{{ t("clientHub.article.content.visualIdentityFaq.q2") }}</h3>
    <p>{{ t("clientHub.article.content.visualIdentityFaq.a2") }}</p>

    <h3>{{ t("clientHub.article.content.visualIdentityFaq.q3") }}</h3>
    <p>{{ t("clientHub.article.content.visualIdentityFaq.a3") }}</p>

    <h3>{{ t("clientHub.article.content.visualIdentityFaq.q4") }}</h3>
    <p>{{ t("clientHub.article.content.visualIdentityFaq.a4") }}</p>

    <h2>{{ t("clientHub.article.content.visualIdentityFaq.mistakesTitle") }}</h2>
    <ul>
      <li>{{ t("clientHub.article.content.visualIdentityFaq.mistake1") }}</li>
      <li>{{ t("clientHub.article.content.visualIdentityFaq.mistake2") }}</li>
      <li>{{ t("clientHub.article.content.visualIdentityFaq.mistake3") }}</li>
      <li>{{ t("clientHub.article.content.visualIdentityFaq.mistake4") }}</li>
    </ul>
  </div>
</template>
