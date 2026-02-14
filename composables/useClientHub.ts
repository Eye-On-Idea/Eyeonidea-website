export interface HubArticle {
  slug: string;
  categorySlug: string;
  titleKey: string;
  summaryKey: string;
  keywords: string[];
  order: number;
}

export interface HubCategory {
  slug: string;
  titleKey: string;
  descriptionKey: string;
  iconKey: string;
  order: number;
  articles: HubArticle[];
}

const categories: HubCategory[] = [
  {
    slug: "getting-started",
    titleKey: "clientHub.categories.getting-started.title",
    descriptionKey: "clientHub.categories.getting-started.description",
    iconKey: "clientHub.categories.getting-started.icon",
    order: 1,
    articles: [
      {
        slug: "accepting-invitation",
        categorySlug: "getting-started",
        titleKey: "clientHub.articles.accepting-invitation.title",
        summaryKey: "clientHub.articles.accepting-invitation.summary",
        keywords: ["invitation", "email", "account", "setup", "onboarding"],
        order: 1,
      },
      {
        slug: "logging-in",
        categorySlug: "getting-started",
        titleKey: "clientHub.articles.logging-in.title",
        summaryKey: "clientHub.articles.logging-in.summary",
        keywords: ["login", "sign in", "access", "studio", "password"],
        order: 2,
      },
      {
        slug: "studio-overview",
        categorySlug: "getting-started",
        titleKey: "clientHub.articles.studio-overview.title",
        summaryKey: "clientHub.articles.studio-overview.summary",
        keywords: ["studio", "interface", "overview", "navigation", "dashboard"],
        order: 3,
      },
    ],
  },
  {
    slug: "content-management",
    titleKey: "clientHub.categories.content-management.title",
    descriptionKey: "clientHub.categories.content-management.description",
    iconKey: "clientHub.categories.content-management.icon",
    order: 2,
    articles: [
      {
        slug: "creating-content",
        categorySlug: "content-management",
        titleKey: "clientHub.articles.creating-content.title",
        summaryKey: "clientHub.articles.creating-content.summary",
        keywords: ["create", "new", "content", "document", "page"],
        order: 1,
      },
      {
        slug: "editing-content",
        categorySlug: "content-management",
        titleKey: "clientHub.articles.editing-content.title",
        summaryKey: "clientHub.articles.editing-content.summary",
        keywords: ["edit", "modify", "update", "change", "text"],
        order: 2,
      },
      {
        slug: "understanding-drafts",
        categorySlug: "content-management",
        titleKey: "clientHub.articles.understanding-drafts.title",
        summaryKey: "clientHub.articles.understanding-drafts.summary",
        keywords: ["draft", "published", "version", "status", "difference"],
        order: 3,
      },
    ],
  },
  {
    slug: "media",
    titleKey: "clientHub.categories.media.title",
    descriptionKey: "clientHub.categories.media.description",
    iconKey: "clientHub.categories.media.icon",
    order: 3,
    articles: [
      {
        slug: "uploading-media",
        categorySlug: "media",
        titleKey: "clientHub.articles.uploading-media.title",
        summaryKey: "clientHub.articles.uploading-media.summary",
        keywords: ["upload", "image", "photo", "file", "media"],
        order: 1,
      },
      {
        slug: "managing-media",
        categorySlug: "media",
        titleKey: "clientHub.articles.managing-media.title",
        summaryKey: "clientHub.articles.managing-media.summary",
        keywords: ["manage", "organize", "find", "replace", "library"],
        order: 2,
      },
    ],
  },
  {
    slug: "publishing",
    titleKey: "clientHub.categories.publishing.title",
    descriptionKey: "clientHub.categories.publishing.description",
    iconKey: "clientHub.categories.publishing.icon",
    order: 4,
    articles: [
      {
        slug: "publishing-changes",
        categorySlug: "publishing",
        titleKey: "clientHub.articles.publishing-changes.title",
        summaryKey: "clientHub.articles.publishing-changes.summary",
        keywords: ["publish", "live", "deploy", "release", "go live"],
        order: 1,
      },
      {
        slug: "draft-publish-workflow",
        categorySlug: "publishing",
        titleKey: "clientHub.articles.draft-publish-workflow.title",
        summaryKey: "clientHub.articles.draft-publish-workflow.summary",
        keywords: ["workflow", "draft", "publish", "review", "process"],
        order: 2,
      },
    ],
  },
  {
    slug: "troubleshooting",
    titleKey: "clientHub.categories.troubleshooting.title",
    descriptionKey: "clientHub.categories.troubleshooting.description",
    iconKey: "clientHub.categories.troubleshooting.icon",
    order: 5,
    articles: [
      {
        slug: "cannot-login",
        categorySlug: "troubleshooting",
        titleKey: "clientHub.articles.cannot-login.title",
        summaryKey: "clientHub.articles.cannot-login.summary",
        keywords: ["login", "cannot", "error", "locked", "password", "access"],
        order: 1,
      },
      {
        slug: "changes-not-showing",
        categorySlug: "troubleshooting",
        titleKey: "clientHub.articles.changes-not-showing.title",
        summaryKey: "clientHub.articles.changes-not-showing.summary",
        keywords: ["changes", "not showing", "missing", "cache", "publish"],
        order: 2,
      },
      {
        slug: "permission-issues",
        categorySlug: "troubleshooting",
        titleKey: "clientHub.articles.permission-issues.title",
        summaryKey: "clientHub.articles.permission-issues.summary",
        keywords: ["permission", "access", "denied", "role", "admin"],
        order: 3,
      },
    ],
  },
  {
    slug: "best-practices",
    titleKey: "clientHub.categories.best-practices.title",
    descriptionKey: "clientHub.categories.best-practices.description",
    iconKey: "clientHub.categories.best-practices.icon",
    order: 6,
    articles: [
      {
        slug: "content-tips",
        categorySlug: "best-practices",
        titleKey: "clientHub.articles.content-tips.title",
        summaryKey: "clientHub.articles.content-tips.summary",
        keywords: ["tips", "writing", "formatting", "quality", "seo"],
        order: 1,
      },
      {
        slug: "image-guidelines",
        categorySlug: "best-practices",
        titleKey: "clientHub.articles.image-guidelines.title",
        summaryKey: "clientHub.articles.image-guidelines.summary",
        keywords: ["image", "size", "format", "optimize", "resolution"],
        order: 2,
      },
    ],
  },
];

export function useClientHub() {
  const { t } = useI18n();

  const getCategories = () => categories;

  const getCategory = (slug: string): HubCategory | undefined => {
    return categories.find((c) => c.slug === slug);
  };

  const getArticle = (
    categorySlug: string,
    articleSlug: string,
  ): HubArticle | undefined => {
    const category = getCategory(categorySlug);
    if (!category) return undefined;
    return category.articles.find((a) => a.slug === articleSlug);
  };

  const getAdjacentArticles = (categorySlug: string, articleSlug: string) => {
    const category = getCategory(categorySlug);
    if (!category) return { previous: undefined, next: undefined };

    const index = category.articles.findIndex((a) => a.slug === articleSlug);
    return {
      previous: index > 0 ? category.articles[index - 1] : undefined,
      next:
        index < category.articles.length - 1
          ? category.articles[index + 1]
          : undefined,
    };
  };

  const getAllArticles = (): HubArticle[] => {
    return categories.flatMap((c) => c.articles);
  };

  const searchArticles = (query: string): HubArticle[] => {
    if (!query || query.trim().length < 2) return [];
    const lowerQuery = query.toLowerCase().trim();

    return getAllArticles().filter((article) => {
      const title = t(article.titleKey).toLowerCase();
      const summary = t(article.summaryKey).toLowerCase();
      const keywordMatch = article.keywords.some((k) =>
        k.toLowerCase().includes(lowerQuery),
      );
      return (
        title.includes(lowerQuery) ||
        summary.includes(lowerQuery) ||
        keywordMatch
      );
    });
  };

  return {
    getCategories,
    getCategory,
    getArticle,
    getAdjacentArticles,
    getAllArticles,
    searchArticles,
  };
}
