<template>
  <div class="news-page">

    <NewsHero :featured-post="featuredPost" :pending="pendingFeatured" />

    <NewsFilters
      :search-query="searchQuery"
      :selected-type="selectedType"
      :filtered-count="totalPosts"
      :is-loading="pendingPosts"
      @update:search-query="updateSearch"
      @update:selected-type="updateType"
    />

    <NewsPostsList
      :posts="visiblePosts"
      :pending="pendingPosts"
      :has-more="hasMore"
      :loading-more="loadingMore"
      :total-posts="totalPosts"
      :has-filters="hasActiveFilters"
      @load-more="loadMore"
      @clear-filters="clearFilters"
    />
  </div>
</template>

<script setup lang="ts">
import type { PostType, Post } from "~/types/sanity";
import { useFeaturedPost } from "~/composables/useSanityPosts";

const { t } = useI18n();

const seoData = computed(() => ({
  title: t("news.seo.title"),
  description: t("news.seo.description"),
  keywords: [

    "digital agency news",
    "website development updates",
    "web design trends",
    "digital transformation 2025",

    "B2B website development",
    "visual identity design",
    "CMS solutions updates",
    "Nordic digital industry",

    "Eye On Idea news updates",
    "web development announcements",
    "digital agency developments",

    "digital agency insights",
    "web development best practices",
    "digital industry Europe",
  ],
  url: "https://eyeonidea.com/news",
}));

useSeo({
  title: seoData.value.title,
  description: seoData.value.description,
  keywords: seoData.value.keywords,
  url: seoData.value.url,
  type: "website",
  twitterCard: "summary_large_image",
  schemaType: "CollectionPage",
  includeWebSiteSchema: false,
});

useHead({
  link: [{ rel: "preconnect", href: "https://cdn.sanity.io" }],
});

const searchQuery = ref("");
const selectedType = ref<PostType | null>(null);
const limit = 10;
const loadingMore = ref(false);

const hasActiveFilters = computed(() => {
  return !!searchQuery.value || !!selectedType.value;
});

const { data: featuredPost, pending: pendingFeatured } = useFeaturedPost();

const postCardProjection = `{
  _id,
  _type,
  title,
  slug,
  postType,
  publishedAt,
  featured,
  excerpt,
  heroImage,
  heroImageAlt,
  readingTimeOverride
}`;

const allPostsQuery = `*[_type == "post" && publishedAt <= now()]
  | order(publishedAt desc)
  ${postCardProjection}`;

const { data: postsData, pending: pendingPosts } = useSanityFetch<Post[]>(
  allPostsQuery,
  undefined,
  { key: "news-posts-all", fresh: true }
);

const allPosts = computed(() => postsData.value ?? []);
const normalizedQuery = computed(() => searchQuery.value.trim().toLowerCase());

const filteredPosts = computed(() => {
  let posts = allPosts.value;
  if (selectedType.value) {
    posts = posts.filter((post) => post.postType === selectedType.value);
  }

  if (normalizedQuery.value) {
    const q = normalizedQuery.value;
    posts = posts.filter((post) => {
      const title = post.title?.toLowerCase() ?? "";
      const excerpt = post.excerpt?.toLowerCase() ?? "";
      return title.includes(q) || excerpt.includes(q);
    });
  }

  return posts;
});

const visibleCount = ref(limit);

const visiblePosts = computed(() =>
  filteredPosts.value.slice(0, visibleCount.value)
);

const totalPosts = computed(() => filteredPosts.value.length);

const hasMore = computed(() => visibleCount.value < filteredPosts.value.length);

function updateSearch(query: string) {
  searchQuery.value = query;
  visibleCount.value = limit;
}

function updateType(type: PostType | null) {
  selectedType.value = type;
  visibleCount.value = limit;
}

function clearFilters() {
  searchQuery.value = "";
  selectedType.value = null;
  visibleCount.value = limit;
}

function loadMore() {
  if (loadingMore.value || !hasMore.value) return;

  loadingMore.value = true;
  visibleCount.value = Math.min(
    visibleCount.value + limit,
    filteredPosts.value.length
  );
  loadingMore.value = false;
}
</script>

<style lang="scss" scoped>
.news-page {
  min-height: 100vh;
}
</style>
