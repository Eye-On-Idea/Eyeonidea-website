<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.creatingAPost.introTitle") }}</h2>
    <p>{{ t("clientHub.article.content.creatingAPost.introText") }}</p>

    <h2>{{ t("clientHub.article.content.creatingAPost.createTitle") }}</h2>
    <ol>
      <li>{{ t("clientHub.article.content.creatingAPost.createStep1") }}</li>
      <li>{{ t("clientHub.article.content.creatingAPost.createStep2") }}</li>
      <li>{{ t("clientHub.article.content.creatingAPost.createStep3") }}</li>
    </ol>

    <ClientHubArticleImage alt="Creating a new document in the Studio" caption="Creating a new post document" />

    <h2>{{ t("clientHub.article.content.creatingAPost.titleSectionTitle") }}</h2>
    <p>{{ t("clientHub.article.content.creatingAPost.titleText") }}</p>

    <h2>{{ t("clientHub.article.content.creatingAPost.imageTitle") }}</h2>
    <ol>
      <li>{{ t("clientHub.article.content.creatingAPost.imageStep1") }}</li>
      <li>{{ t("clientHub.article.content.creatingAPost.imageStep2") }}</li>
      <li>{{ t("clientHub.article.content.creatingAPost.imageStep3") }}</li>
    </ol>

    <ClientHubArticleImage alt="Image upload dialog in the Studio" caption="Uploading a featured image" />

    <div class="tip-box">
      <strong>{{ t("clientHub.article.tipLabel") }}:</strong>
      {{ t("clientHub.article.content.creatingAPost.imageTip") }}
    </div>

    <h2>{{ t("clientHub.article.content.creatingAPost.contentTitle") }}</h2>
    <p>{{ t("clientHub.article.content.creatingAPost.contentText") }}</p>
  </div>
</template>
