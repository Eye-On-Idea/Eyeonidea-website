<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.cmsOverview.introTitle") }}</h2>
    <p>{{ t("clientHub.article.content.cmsOverview.introText") }}</p>

    <ClientHubArticleImage alt="CMS Studio dashboard overview" caption="The Sanity Studio dashboard" />

    <h2>{{ t("clientHub.article.content.cmsOverview.whatYouCanDoTitle") }}</h2>
    <ul>
      <li>{{ t("clientHub.article.content.cmsOverview.whatYouCanDo1") }}</li>
      <li>{{ t("clientHub.article.content.cmsOverview.whatYouCanDo2") }}</li>
      <li>{{ t("clientHub.article.content.cmsOverview.whatYouCanDo3") }}</li>
      <li>{{ t("clientHub.article.content.cmsOverview.whatYouCanDo4") }}</li>
    </ul>

    <h2>{{ t("clientHub.article.content.cmsOverview.prerequisitesTitle") }}</h2>
    <p>{{ t("clientHub.article.content.cmsOverview.prerequisitesText") }}</p>

    <h3>{{ t("clientHub.article.content.cmsOverview.rolesTitle") }}</h3>
    <ul>
      <li>{{ t("clientHub.article.content.cmsOverview.rolesWriter") }}</li>
      <li>{{ t("clientHub.article.content.cmsOverview.rolesEditor") }}</li>
    </ul>

    <div class="note-box">
      <strong>{{ t("clientHub.article.noteLabel") }}:</strong>
      {{ t("clientHub.article.content.cmsOverview.rolesNote") }}
    </div>

    <div class="tip-box">
      <strong>{{ t("clientHub.article.tipLabel") }}:</strong>
      {{ t("clientHub.article.content.cmsOverview.tip") }}
    </div>
  </div>
</template>
