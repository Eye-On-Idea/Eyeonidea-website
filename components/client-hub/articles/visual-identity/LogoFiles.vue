<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h2>{{ t("clientHub.article.content.logoFiles.introTitle") }}</h2>
    <p>{{ t("clientHub.article.content.logoFiles.introText") }}</p>

    <ClientHubArticleImage src="/images/client-hub/visual-identity/logo-files-overview.png" alt="Logo file formats overview" caption="Your logo files in different formats" />

    <h2>{{ t("clientHub.article.content.logoFiles.svgTitle") }}</h2>
    <p>{{ t("clientHub.article.content.logoFiles.svgText") }}</p>

    <ClientHubArticleImage src="/images/client-hub/visual-identity/logo-svg-example.png" alt="SVG logo example" caption="SVG format - scalable vector" aspect-ratio="1/1" />

    <h2>{{ t("clientHub.article.content.logoFiles.pngTitle") }}</h2>
    <p>{{ t("clientHub.article.content.logoFiles.pngText") }}</p>

    <ClientHubArticleImage src="/images/client-hub/visual-identity/logo-png-example.png" alt="PNG logo example" caption="PNG format - transparent background" aspect-ratio="1/1" />

    <h2>{{ t("clientHub.article.content.logoFiles.jpgTitle") }}</h2>
    <p>{{ t("clientHub.article.content.logoFiles.jpgText") }}</p>

    <div class="tip-box">
      <strong>{{ t("clientHub.article.tipLabel") }}:</strong>
      {{ t("clientHub.article.content.logoFiles.tip") }}
    </div>
  </div>
</template>
