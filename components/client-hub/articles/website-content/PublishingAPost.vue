<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.publishingAPost.draftTitle") }}</h2>
    <p>{{ t("clientHub.article.content.publishingAPost.draftText") }}</p>

    <h2>{{ t("clientHub.article.content.publishingAPost.publishTitle") }}</h2>
    <p>{{ t("clientHub.article.content.publishingAPost.publishText") }}</p>

    <h2>{{ t("clientHub.article.content.publishingAPost.reviewTitle") }}</h2>
    <p>{{ t("clientHub.article.content.publishingAPost.reviewText") }}</p>
    <ul>
      <li>{{ t("clientHub.article.content.publishingAPost.review1") }}</li>
      <li>{{ t("clientHub.article.content.publishingAPost.review2") }}</li>
      <li>{{ t("clientHub.article.content.publishingAPost.review3") }}</li>
      <li>{{ t("clientHub.article.content.publishingAPost.review4") }}</li>
    </ul>

    <div class="tip-box">
      <strong>{{ t("clientHub.article.tipLabel") }}:</strong>
      {{ t("clientHub.article.content.publishingAPost.tip") }}
    </div>

    <div class="note-box">
      <strong>{{ t("clientHub.article.noteLabel") }}:</strong>
      {{ t("clientHub.article.content.publishingAPost.note") }}
    </div>
  </div>
</template>
