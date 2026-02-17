export interface HubArticle {
  slug: string;
  categorySlug: string;
  serviceSlug: string;
  titleKey: string;
  summaryKey: string;
  keywords: string[];
  order: number;
}

export interface HubCategory {
  slug: string;
  serviceSlug: string;
  titleKey: string;
  descriptionKey: string;
  iconKey: string;
  order: number;
  articles: HubArticle[];
}

export interface HubService {
  slug: string;
  titleKey: string;
  descriptionKey: string;
  iconKey: string;
  order: number;
  comingSoon: boolean;
  categories: HubCategory[];
}

export interface OnboardingSection {
  key: string;
  titleKey: string;
}

const services: HubService[] = [
  {
    slug: "website-content",
    titleKey: "clientHub.services.website-content.title",
    descriptionKey: "clientHub.services.website-content.description",
    iconKey: "clientHub.services.website-content.icon",
    order: 1,
    comingSoon: false,
    categories: [
      {
        slug: "getting-started",
        serviceSlug: "website-content",
        titleKey: "clientHub.categories.getting-started.title",
        descriptionKey: "clientHub.categories.getting-started.description",
        iconKey: "clientHub.categories.getting-started.icon",
        order: 1,
        articles: [
          {
            slug: "cms-overview",
            categorySlug: "getting-started",
            serviceSlug: "website-content",
            titleKey: "clientHub.articles.cms-overview.title",
            summaryKey: "clientHub.articles.cms-overview.summary",
            keywords: ["cms", "overview", "content", "management", "studio", "sanity"],
            order: 1,
          },
          {
            slug: "logging-in",
            categorySlug: "getting-started",
            serviceSlug: "website-content",
            titleKey: "clientHub.articles.logging-in.title",
            summaryKey: "clientHub.articles.logging-in.summary",
            keywords: ["login", "sign in", "access", "studio", "open", "invitation"],
            order: 2,
          },
          {
            slug: "studio-navigation",
            categorySlug: "getting-started",
            serviceSlug: "website-content",
            titleKey: "clientHub.articles.studio-navigation.title",
            summaryKey: "clientHub.articles.studio-navigation.summary",
            keywords: ["navigate", "interface", "sidebar", "menu", "content types"],
            order: 3,
          },
        ],
      },
      {
        slug: "editing-content",
        serviceSlug: "website-content",
        titleKey: "clientHub.categories.editing-content.title",
        descriptionKey: "clientHub.categories.editing-content.description",
        iconKey: "clientHub.categories.editing-content.icon",
        order: 2,
        articles: [
          {
            slug: "editing-text",
            categorySlug: "editing-content",
            serviceSlug: "website-content",
            titleKey: "clientHub.articles.editing-text.title",
            summaryKey: "clientHub.articles.editing-text.summary",
            keywords: ["edit", "text", "content", "field", "modify", "update"],
            order: 1,
          },
          {
            slug: "drafts-and-publishing",
            categorySlug: "editing-content",
            serviceSlug: "website-content",
            titleKey: "clientHub.articles.drafts-and-publishing.title",
            summaryKey: "clientHub.articles.drafts-and-publishing.summary",
            keywords: ["draft", "publish", "save", "live", "check", "workflow"],
            order: 2,
          },
        ],
      },
      {
        slug: "seo",
        serviceSlug: "website-content",
        titleKey: "clientHub.categories.seo.title",
        descriptionKey: "clientHub.categories.seo.description",
        iconKey: "clientHub.categories.seo.icon",
        order: 3,
        articles: [
          {
            slug: "seo-basics",
            categorySlug: "seo",
            serviceSlug: "website-content",
            titleKey: "clientHub.articles.seo-basics.title",
            summaryKey: "clientHub.articles.seo-basics.summary",
            keywords: ["seo", "title", "meta", "description", "search", "google"],
            order: 1,
          },
          {
            slug: "slugs-and-urls",
            categorySlug: "seo",
            serviceSlug: "website-content",
            titleKey: "clientHub.articles.slugs-and-urls.title",
            summaryKey: "clientHub.articles.slugs-and-urls.summary",
            keywords: ["slug", "url", "page", "address", "link"],
            order: 2,
          },
        ],
      },
      {
        slug: "news-and-posts",
        serviceSlug: "website-content",
        titleKey: "clientHub.categories.news-and-posts.title",
        descriptionKey: "clientHub.categories.news-and-posts.description",
        iconKey: "clientHub.categories.news-and-posts.icon",
        order: 4,
        articles: [
          {
            slug: "creating-a-post",
            categorySlug: "news-and-posts",
            serviceSlug: "website-content",
            titleKey: "clientHub.articles.creating-a-post.title",
            summaryKey: "clientHub.articles.creating-a-post.summary",
            keywords: ["create", "post", "news", "article", "blog", "image", "content"],
            order: 1,
          },
          {
            slug: "publishing-a-post",
            categorySlug: "news-and-posts",
            serviceSlug: "website-content",
            titleKey: "clientHub.articles.publishing-a-post.title",
            summaryKey: "clientHub.articles.publishing-a-post.summary",
            keywords: ["publish", "draft", "review", "live", "post"],
            order: 2,
          },
        ],
      },
      {
        slug: "media",
        serviceSlug: "website-content",
        titleKey: "clientHub.categories.media.title",
        descriptionKey: "clientHub.categories.media.description",
        iconKey: "clientHub.categories.media.icon",
        order: 5,
        articles: [
          {
            slug: "image-best-practices",
            categorySlug: "media",
            serviceSlug: "website-content",
            titleKey: "clientHub.articles.image-best-practices.title",
            summaryKey: "clientHub.articles.image-best-practices.summary",
            keywords: ["image", "upload", "crop", "size", "format", "jpg", "png"],
            order: 1,
          },
          {
            slug: "alt-text-and-files",
            categorySlug: "media",
            serviceSlug: "website-content",
            titleKey: "clientHub.articles.alt-text-and-files.title",
            summaryKey: "clientHub.articles.alt-text-and-files.summary",
            keywords: ["alt text", "accessibility", "pdf", "file", "upload", "document"],
            order: 2,
          },
        ],
      },
      {
        slug: "troubleshooting",
        serviceSlug: "website-content",
        titleKey: "clientHub.categories.troubleshooting.title",
        descriptionKey: "clientHub.categories.troubleshooting.description",
        iconKey: "clientHub.categories.troubleshooting.icon",
        order: 6,
        articles: [
          {
            slug: "common-mistakes",
            categorySlug: "troubleshooting",
            serviceSlug: "website-content",
            titleKey: "clientHub.articles.common-mistakes.title",
            summaryKey: "clientHub.articles.common-mistakes.summary",
            keywords: ["mistake", "error", "problem", "avoid", "common"],
            order: 1,
          },
          {
            slug: "cms-faq",
            categorySlug: "troubleshooting",
            serviceSlug: "website-content",
            titleKey: "clientHub.articles.cms-faq.title",
            summaryKey: "clientHub.articles.cms-faq.summary",
            keywords: ["faq", "question", "help", "support", "answer"],
            order: 2,
          },
        ],
      },
    ],
  },
  {
    slug: "email",
    titleKey: "clientHub.services.email.title",
    descriptionKey: "clientHub.services.email.description",
    iconKey: "clientHub.services.email.icon",
    order: 2,
    comingSoon: false,
    categories: [
      {
        slug: "getting-started",
        serviceSlug: "email",
        titleKey: "clientHub.categories.getting-started.title",
        descriptionKey: "clientHub.categories.getting-started.description",
        iconKey: "clientHub.categories.getting-started.icon",
        order: 1,
        articles: [
          {
            slug: "email-overview",
            categorySlug: "getting-started",
            serviceSlug: "email",
            titleKey: "clientHub.articles.email-overview.title",
            summaryKey: "clientHub.articles.email-overview.summary",
            keywords: ["email", "overview", "zimbra", "professional", "setup"],
            order: 1,
          },
          {
            slug: "first-login",
            categorySlug: "getting-started",
            serviceSlug: "email",
            titleKey: "clientHub.articles.first-login.title",
            summaryKey: "clientHub.articles.first-login.summary",
            keywords: ["login", "first", "password", "change", "secure"],
            order: 2,
          },
          {
            slug: "webmail-access",
            categorySlug: "getting-started",
            serviceSlug: "email",
            titleKey: "clientHub.articles.webmail-access.title",
            summaryKey: "clientHub.articles.webmail-access.summary",
            keywords: ["webmail", "browser", "access", "zimbra"],
            order: 3,
          },
        ],
      },
      {
        slug: "setup",
        serviceSlug: "email",
        titleKey: "clientHub.categories.setup.title",
        descriptionKey: "clientHub.categories.setup.description",
        iconKey: "clientHub.categories.setup.icon",
        order: 2,
        articles: [
          {
            slug: "email-app-setup",
            categorySlug: "setup",
            serviceSlug: "email",
            titleKey: "clientHub.articles.email-app-setup.title",
            summaryKey: "clientHub.articles.email-app-setup.summary",
            keywords: ["imap", "smtp", "outlook", "apple mail", "thunderbird", "settings", "app"],
            order: 1,
          },
        ],
      },
      {
        slug: "management",
        serviceSlug: "email",
        titleKey: "clientHub.categories.management.title",
        descriptionKey: "clientHub.categories.management.description",
        iconKey: "clientHub.categories.management.icon",
        order: 3,
        articles: [
          {
            slug: "email-backup",
            categorySlug: "management",
            serviceSlug: "email",
            titleKey: "clientHub.articles.email-backup.title",
            summaryKey: "clientHub.articles.email-backup.summary",
            keywords: ["backup", "export", "archive", "storage"],
            order: 1,
          },
        ],
      },
      {
        slug: "troubleshooting",
        serviceSlug: "email",
        titleKey: "clientHub.categories.troubleshooting.title",
        descriptionKey: "clientHub.categories.troubleshooting.description",
        iconKey: "clientHub.categories.troubleshooting.icon",
        order: 4,
        articles: [
          {
            slug: "email-faq",
            categorySlug: "troubleshooting",
            serviceSlug: "email",
            titleKey: "clientHub.articles.email-faq.title",
            summaryKey: "clientHub.articles.email-faq.summary",
            keywords: ["faq", "question", "help", "storage", "address"],
            order: 1,
          },
        ],
      },
    ],
  },
  {
    slug: "domain",
    titleKey: "clientHub.services.domain.title",
    descriptionKey: "clientHub.services.domain.description",
    iconKey: "clientHub.services.domain.icon",
    order: 3,
    comingSoon: false,
    categories: [
      {
        slug: "overview",
        serviceSlug: "domain",
        titleKey: "clientHub.categories.overview.title",
        descriptionKey: "clientHub.categories.overview.description",
        iconKey: "clientHub.categories.overview.icon",
        order: 1,
        articles: [
          {
            slug: "domain-ownership",
            categorySlug: "overview",
            serviceSlug: "domain",
            titleKey: "clientHub.articles.domain-ownership.title",
            summaryKey: "clientHub.articles.domain-ownership.summary",
            keywords: ["domain", "ownership", "registered", "legal", "company"],
            order: 1,
          },
        ],
      },
      {
        slug: "renewals",
        serviceSlug: "domain",
        titleKey: "clientHub.categories.renewals.title",
        descriptionKey: "clientHub.categories.renewals.description",
        iconKey: "clientHub.categories.renewals.icon",
        order: 2,
        articles: [
          {
            slug: "domain-renewal",
            categorySlug: "renewals",
            serviceSlug: "domain",
            titleKey: "clientHub.articles.domain-renewal.title",
            summaryKey: "clientHub.articles.domain-renewal.summary",
            keywords: ["renewal", "expire", "yearly", "payment", "invoice"],
            order: 1,
          },
        ],
      },
      {
        slug: "transfers",
        serviceSlug: "domain",
        titleKey: "clientHub.categories.transfers.title",
        descriptionKey: "clientHub.categories.transfers.description",
        iconKey: "clientHub.categories.transfers.icon",
        order: 3,
        articles: [
          {
            slug: "domain-transfer",
            categorySlug: "transfers",
            serviceSlug: "domain",
            titleKey: "clientHub.articles.domain-transfer.title",
            summaryKey: "clientHub.articles.domain-transfer.summary",
            keywords: ["transfer", "provider", "auth code", "move"],
            order: 1,
          },
          {
            slug: "dns-configuration",
            categorySlug: "transfers",
            serviceSlug: "domain",
            titleKey: "clientHub.articles.dns-configuration.title",
            summaryKey: "clientHub.articles.dns-configuration.summary",
            keywords: ["dns", "records", "spf", "dkim", "mx", "ssl", "configuration"],
            order: 2,
          },
        ],
      },
      {
        slug: "troubleshooting",
        serviceSlug: "domain",
        titleKey: "clientHub.categories.troubleshooting.title",
        descriptionKey: "clientHub.categories.troubleshooting.description",
        iconKey: "clientHub.categories.troubleshooting.icon",
        order: 4,
        articles: [
          {
            slug: "domain-faq",
            categorySlug: "troubleshooting",
            serviceSlug: "domain",
            titleKey: "clientHub.articles.domain-faq.title",
            summaryKey: "clientHub.articles.domain-faq.summary",
            keywords: ["faq", "question", "help", "domain"],
            order: 1,
          },
        ],
      },
    ],
  },
  {
    slug: "hosting",
    titleKey: "clientHub.services.hosting.title",
    descriptionKey: "clientHub.services.hosting.description",
    iconKey: "clientHub.services.hosting.icon",
    order: 4,
    comingSoon: false,
    categories: [
      {
        slug: "overview",
        serviceSlug: "hosting",
        titleKey: "clientHub.categories.overview.title",
        descriptionKey: "clientHub.categories.overview.description",
        iconKey: "clientHub.categories.overview.icon",
        order: 1,
        articles: [
          {
            slug: "hosting-setup",
            categorySlug: "overview",
            serviceSlug: "hosting",
            titleKey: "clientHub.articles.hosting-setup.title",
            summaryKey: "clientHub.articles.hosting-setup.summary",
            keywords: ["hosting", "setup", "infrastructure", "europe", "managed"],
            order: 1,
          },
          {
            slug: "environments",
            categorySlug: "overview",
            serviceSlug: "hosting",
            titleKey: "clientHub.articles.environments.title",
            summaryKey: "clientHub.articles.environments.summary",
            keywords: ["production", "development", "staging", "live", "environment"],
            order: 2,
          },
        ],
      },
      {
        slug: "how-it-works",
        serviceSlug: "hosting",
        titleKey: "clientHub.categories.how-it-works.title",
        descriptionKey: "clientHub.categories.how-it-works.description",
        iconKey: "clientHub.categories.how-it-works.icon",
        order: 2,
        articles: [
          {
            slug: "content-updates",
            categorySlug: "how-it-works",
            serviceSlug: "hosting",
            titleKey: "clientHub.articles.content-updates.title",
            summaryKey: "clientHub.articles.content-updates.summary",
            keywords: ["update", "rebuild", "webhook", "deploy", "automatic"],
            order: 1,
          },
          {
            slug: "analytics",
            categorySlug: "how-it-works",
            serviceSlug: "hosting",
            titleKey: "clientHub.articles.analytics.title",
            summaryKey: "clientHub.articles.analytics.summary",
            keywords: ["analytics", "reporting", "dashboard", "tracking"],
            order: 2,
          },
        ],
      },
      {
        slug: "maintenance",
        serviceSlug: "hosting",
        titleKey: "clientHub.categories.maintenance.title",
        descriptionKey: "clientHub.categories.maintenance.description",
        iconKey: "clientHub.categories.maintenance.icon",
        order: 3,
        articles: [
          {
            slug: "support-and-maintenance",
            categorySlug: "maintenance",
            serviceSlug: "hosting",
            titleKey: "clientHub.articles.support-and-maintenance.title",
            summaryKey: "clientHub.articles.support-and-maintenance.summary",
            keywords: ["support", "maintenance", "access", "ftp", "policy"],
            order: 1,
          },
        ],
      },
      {
        slug: "troubleshooting",
        serviceSlug: "hosting",
        titleKey: "clientHub.categories.troubleshooting.title",
        descriptionKey: "clientHub.categories.troubleshooting.description",
        iconKey: "clientHub.categories.troubleshooting.icon",
        order: 4,
        articles: [
          {
            slug: "hosting-faq",
            categorySlug: "troubleshooting",
            serviceSlug: "hosting",
            titleKey: "clientHub.articles.hosting-faq.title",
            summaryKey: "clientHub.articles.hosting-faq.summary",
            keywords: ["faq", "question", "help", "hosting", "server"],
            order: 1,
          },
        ],
      },
    ],
  },
  {
    slug: "visual-identity",
    titleKey: "clientHub.services.visual-identity.title",
    descriptionKey: "clientHub.services.visual-identity.description",
    iconKey: "clientHub.services.visual-identity.icon",
    order: 5,
    comingSoon: false,
    categories: [
      {
        slug: "logo",
        serviceSlug: "visual-identity",
        titleKey: "clientHub.categories.logo.title",
        descriptionKey: "clientHub.categories.logo.description",
        iconKey: "clientHub.categories.logo.icon",
        order: 1,
        articles: [
          {
            slug: "logo-files",
            categorySlug: "logo",
            serviceSlug: "visual-identity",
            titleKey: "clientHub.articles.logo-files.title",
            summaryKey: "clientHub.articles.logo-files.summary",
            keywords: ["logo", "svg", "png", "jpg", "file", "format", "vector"],
            order: 1,
          },
          {
            slug: "logo-usage",
            categorySlug: "logo",
            serviceSlug: "visual-identity",
            titleKey: "clientHub.articles.logo-usage.title",
            summaryKey: "clientHub.articles.logo-usage.summary",
            keywords: ["logo", "usage", "rules", "version", "primary", "icon"],
            order: 2,
          },
        ],
      },
      {
        slug: "brand-guidelines",
        serviceSlug: "visual-identity",
        titleKey: "clientHub.categories.brand-guidelines.title",
        descriptionKey: "clientHub.categories.brand-guidelines.description",
        iconKey: "clientHub.categories.brand-guidelines.icon",
        order: 2,
        articles: [
          {
            slug: "colors-and-typography",
            categorySlug: "brand-guidelines",
            serviceSlug: "visual-identity",
            titleKey: "clientHub.articles.colors-and-typography.title",
            summaryKey: "clientHub.articles.colors-and-typography.summary",
            keywords: ["color", "palette", "typography", "font", "brand"],
            order: 1,
          },
          {
            slug: "templates-and-print",
            categorySlug: "brand-guidelines",
            serviceSlug: "visual-identity",
            titleKey: "clientHub.articles.templates-and-print.title",
            summaryKey: "clientHub.articles.templates-and-print.summary",
            keywords: ["template", "business card", "letterhead", "presentation", "social media", "print"],
            order: 2,
          },
        ],
      },
      {
        slug: "brand-management",
        serviceSlug: "visual-identity",
        titleKey: "clientHub.categories.brand-management.title",
        descriptionKey: "clientHub.categories.brand-management.description",
        iconKey: "clientHub.categories.brand-management.icon",
        order: 3,
        articles: [
          {
            slug: "brand-consistency",
            categorySlug: "brand-management",
            serviceSlug: "visual-identity",
            titleKey: "clientHub.articles.brand-consistency.title",
            summaryKey: "clientHub.articles.brand-consistency.summary",
            keywords: ["consistency", "brand", "recognition", "file management"],
            order: 1,
          },
          {
            slug: "visual-identity-faq",
            categorySlug: "brand-management",
            serviceSlug: "visual-identity",
            titleKey: "clientHub.articles.visual-identity-faq.title",
            summaryKey: "clientHub.articles.visual-identity-faq.summary",
            keywords: ["faq", "question", "help", "brand", "logo", "identity"],
            order: 2,
          },
        ],
      },
    ],
  },
];

const onboardingSections: OnboardingSection[] = [
  { key: "whereWeAre", titleKey: "clientHub.onboarding.sections.whereWeAre.title" },
  { key: "launchTimeline", titleKey: "clientHub.onboarding.sections.launchTimeline.title" },
  { key: "accessCredentials", titleKey: "clientHub.onboarding.sections.accessCredentials.title" },
  { key: "legalCompliance", titleKey: "clientHub.onboarding.sections.legalCompliance.title" },
  { key: "seoExpectations", titleKey: "clientHub.onboarding.sections.seoExpectations.title" },
  { key: "monitoring", titleKey: "clientHub.onboarding.sections.monitoring.title" },
  { key: "launchChecklist", titleKey: "clientHub.onboarding.sections.launchChecklist.title" },
  { key: "supportWindow", titleKey: "clientHub.onboarding.sections.supportWindow.title" },
  { key: "handoff", titleKey: "clientHub.onboarding.sections.handoff.title" },
  { key: "communication", titleKey: "clientHub.onboarding.sections.communication.title" },
];

export function useClientHub() {
  const { t } = useI18n();

  const getServices = () => services;

  const getService = (slug: string): HubService | undefined => {
    return services.find((s) => s.slug === slug);
  };

  const getCategory = (
    serviceSlug: string,
    categorySlug: string,
  ): HubCategory | undefined => {
    const service = getService(serviceSlug);
    if (!service) return undefined;
    return service.categories.find((c) => c.slug === categorySlug);
  };

  const getArticle = (
    serviceSlug: string,
    categorySlug: string,
    articleSlug: string,
  ): HubArticle | undefined => {
    const category = getCategory(serviceSlug, categorySlug);
    if (!category) return undefined;
    return category.articles.find((a) => a.slug === articleSlug);
  };

  const getAdjacentArticles = (
    serviceSlug: string,
    categorySlug: string,
    articleSlug: string,
  ) => {
    const category = getCategory(serviceSlug, categorySlug);
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
    return services.flatMap((s) =>
      s.categories.flatMap((c) => c.articles),
    );
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

  const getServiceArticleCount = (serviceSlug: string): number => {
    const service = getService(serviceSlug);
    if (!service) return 0;
    return service.categories.reduce(
      (total, cat) => total + cat.articles.length,
      0,
    );
  };

  const getOnboardingSections = () => onboardingSections;

  return {
    getServices,
    getService,
    getCategory,
    getArticle,
    getAdjacentArticles,
    getAllArticles,
    searchArticles,
    getServiceArticleCount,
    getOnboardingSections,
  };
}
