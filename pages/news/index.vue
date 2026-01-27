<template>
  <div class="news-page">
    <!-- Hero with featured post -->
    <NewsHero :featured-post="featuredPost" :pending="pendingFeatured" />

    <!-- Search and filters -->
    <NewsFilters
      :search-query="searchQuery"
      :selected-type="selectedType"
      :filtered-count="totalPosts"
      :is-loading="pendingPosts"
      @update:search-query="updateSearch"
      @update:selected-type="updateType"
    />

    <!-- Posts list -->
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

// SEO
const { t } = useI18n();

const seoData = computed(() => ({
  title: t("news.seo.title"),
  description: t("news.seo.description"),
  keywords: [
    // Digital agency news terms
    "digital agency news",
    "website development updates",
    "web design trends",
    "digital transformation 2025",
    // Topic areas
    "B2B website development",
    "visual identity design",
    "CMS solutions updates",
    "Nordic digital industry",
    // Company news
    "Eye On Idea news updates",
    "web development announcements",
    "digital agency developments",
    // Event-related
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

// State for filtering
const searchQuery = ref("");
const selectedType = ref<PostType | null>(null);
const limit = 10;
const loadingMore = ref(false);

const hasActiveFilters = computed(() => {
  return !!searchQuery.value || !!selectedType.value;
});

// Fetch featured post (composable at top level)
const { data: featuredPost, pending: pendingFeatured } = useFeaturedPost();

// Post card projection for queries
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

// Total posts count
const totalPosts = computed(() => filteredPosts.value.length);

// Check if there are more posts to load
const hasMore = computed(() => visibleCount.value < filteredPosts.value.length);

// Update search
function updateSearch(query: string) {
  searchQuery.value = query;
  visibleCount.value = limit;
}

// Update type filter
function updateType(type: PostType | null) {
  selectedType.value = type;
  visibleCount.value = limit;
}

// Clear all filters
function clearFilters() {
  searchQuery.value = "";
  selectedType.value = null;
  visibleCount.value = limit;
}

// Load more posts (client-side pagination)
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
