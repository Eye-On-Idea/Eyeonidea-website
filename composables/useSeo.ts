/**
 * SEO composable tailored for eyeonidea.com.
 * Generates meta tags, canonical URLs, Open Graph/Twitter, and JSON-LD.
 */
import type { MaybeRefOrGetter as VueMaybeRefOrGetter } from "vue";

type SchemaNode = Record<string, unknown>;
type ResolvableString = string | (() => string);
type MaybeRefOrGetter<T> = VueMaybeRefOrGetter<T>;
type AlternateLocaleEntry = { code: string; iso?: string; href: string };

interface PublicSeoRuntimeConfig {
  siteUrl?: string;
  siteName?: string;
  siteLegalName?: string;
  siteDescription?: string;
  siteLogo?: string;
  ogImage?: string;
  twitterHandle?: string;
  linkedinUrl?: string;
  industry?: string;
  ogImageWidth?: number | string;
  ogImageHeight?: number | string;
}

interface SeoOptions {
  title: ResolvableString;
  description: ResolvableString;
  image?: string | undefined;
  imageAlt?: string | undefined;
  imageWidth?: number | undefined;
  imageHeight?: number | undefined;
  url?: string | undefined;
  canonical?: string | undefined;
  type?: "website" | "article" | "profile" | "product" | "portfolio" | undefined;
  noindex?: boolean | undefined;
  keywords?: string[] | undefined;
  author?: string | undefined;
  publishedTime?: string | undefined;
  modifiedTime?: string | undefined;
  structuredData?: SchemaNode | SchemaNode[] | undefined;
  breadcrumbs?: Array<{ name: string; url: string }> | undefined;
  ogType?: string | undefined;
  twitterCard?: "summary" | "summary_large_image" | "app" | "player" | undefined;
  twitterSite?: string | undefined;
  twitterCreator?: string | undefined;
  titleTemplate?: string | null | undefined;
  schemaType?:
    | "WebPage"
    | "AboutPage"
    | "ContactPage"
    | "CollectionPage"
    | "ItemPage"
    | "ProfilePage"
    | undefined;
  includeOrganizationSchema?: boolean | undefined;
  includeWebSiteSchema?: boolean | undefined;
  // Article-specific fields for enhanced SEO
  articleSection?: string | undefined;
  articleTags?: string[] | undefined;
  wordCount?: number | undefined;
}

const resolveUrl = (input: string, baseUrl: string) => {
  try {
    return new URL(input, baseUrl).toString();
  } catch {
    return input;
  }
};

const toOgLocale = (locale: string) => locale.replace("-", "_");

const getImageMimeType = (url: string) => {
  const extension = ((url.split("?")[0] ?? "")
    .split("#")[0] ?? "")
    .split(".")
    .pop()
    ?.toLowerCase();

  switch (extension) {
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "webp":
      return "image/webp";
    case "gif":
      return "image/gif";
    default:
      return undefined;
  }
};

export const useSeo = (options: MaybeRefOrGetter<SeoOptions>) => {
  const route = useRoute();
  const { locale, locales, localeProperties } = useI18n();
  const localePath = useLocalePath() as (path: string, locale?: string) => string;
  const config = useRuntimeConfig();
  const publicConfig = config.public as PublicSeoRuntimeConfig;

  const resolveOptions = () => {
    if (typeof options === "function") {
      return options();
    }
    return unref(options);
  };

  const baseUrl = (publicConfig.siteUrl || "https://eyeonidea.com").replace(
    /\/$/,
    "",
  );
  const siteName = publicConfig.siteName || "Eye On Idea";
  const siteLegalName = publicConfig.siteLegalName || "Eye On Idea";
  const siteDescription =
    publicConfig.siteDescription ||
    "Danish digital consultancy helping B2B companies across Europe establish professional digital presence";
  const siteLogo = resolveUrl(
    publicConfig.siteLogo || "/android-chrome-512x512.png",
    baseUrl,
  );
  const defaultImage = resolveUrl(
    publicConfig.ogImage || "/images/og-image.png",
    baseUrl,
  );
  const siteTwitter = publicConfig.twitterHandle || "@eyeonidea";
  const siteLinkedIn =
    publicConfig.linkedinUrl ||
    "https://www.linkedin.com/company/eye-on-idea/";
  const industry = publicConfig.industry || "Digital Agency";
  const defaultImageWidth = Number(publicConfig.ogImageWidth) || 1200;
  const defaultImageHeight = Number(publicConfig.ogImageHeight) || 630;
  const getSeoContext = () => {
    const resolved = resolveOptions();
    const routePath = resolved.url ?? route.path;
    const pageUrl = resolveUrl(routePath, baseUrl);
    const canonicalUrl = resolveUrl(resolved.canonical || pageUrl, baseUrl);

    // Resolve title and description — they may be getter functions when passed
    // as reactive i18n values (e.g. `title: () => t("page.meta.title")`)
    const titleRaw =
      typeof resolved.title === "function"
        ? resolved.title()
        : resolved.title;
    const descriptionRaw =
      typeof resolved.description === "function"
        ? resolved.description()
        : resolved.description;

    const titleHasBrand = (titleRaw || "")
      .toLowerCase()
      .includes(siteName.toLowerCase());
    const metaTitle = titleHasBrand
      ? titleRaw
      : `${titleRaw} | ${siteName}`;
    const resolvedTitleTemplate =
      resolved.titleTemplate === undefined
        ? titleHasBrand
          ? null
          : undefined
        : resolved.titleTemplate;

    const ogImage = resolveUrl(resolved.image || defaultImage, baseUrl);
    const imageAlt = resolved.imageAlt || metaTitle;
    const imageWidth =
      resolved.imageWidth ?? (resolved.image ? undefined : defaultImageWidth);
    const imageHeight =
      resolved.imageHeight ?? (resolved.image ? undefined : defaultImageHeight);

    const lang = String(localeProperties.value?.iso || locale.value || "en");
    const dir = localeProperties.value?.dir;
    const ogLocale = toOgLocale(lang);

    const localeEntries = Array.isArray(locales.value)
      ? (locales.value as Array<string | { code?: string; iso?: string }>)
      : [];

    const alternateCandidates: AlternateLocaleEntry[] = [];
    localeEntries.forEach((entry) => {
      const codeValue = typeof entry === "string" ? entry : entry.code;
      if (!codeValue) return;

      const code = String(codeValue);
      const isoValue = typeof entry === "string" ? undefined : entry.iso;
      const iso = typeof isoValue === "string" ? isoValue : undefined;
      const href = resolveUrl(localePath(route.path, code), baseUrl);

      alternateCandidates.push({
        code,
        iso,
        href,
      });
    });

    const uniqueHrefs = new Set(alternateCandidates.map((entry) => entry.href));
    const hasAlternateUrls = uniqueHrefs.size > 1;

    const alternateLinks = hasAlternateUrls
      ? [
          ...alternateCandidates.map((entry) => ({
            rel: "alternate",
            hreflang: entry.iso || entry.code,
            href: entry.href,
          })),
          { rel: "alternate", hreflang: "x-default", href: canonicalUrl },
        ]
      : [];

    const ogLocaleAlternates = hasAlternateUrls
      ? alternateCandidates
          .filter((entry) => entry.code !== locale.value)
          .map((entry) => toOgLocale(entry.iso || entry.code))
      : [];

    const ogType =
      resolved.ogType ||
      (resolved.type === "article" || resolved.type === "product"
        ? resolved.type
        : "website");

    const twitterSite = resolved.twitterSite || siteTwitter;
    const twitterCreator = resolved.twitterCreator || twitterSite;
    const imageMimeType = getImageMimeType(ogImage);

    return {
      resolved,
      titleRaw,
      descriptionRaw,
      canonicalUrl,
      metaTitle,
      resolvedTitleTemplate,
      ogImage,
      imageAlt,
      imageWidth,
      imageHeight,
      lang,
      dir,
      ogLocale,
      alternateLinks,
      ogLocaleAlternates,
      ogType,
      twitterSite,
      twitterCreator,
      imageMimeType,
    };
  };

  useHead(() => {
    const ctx = getSeoContext();
    const resolved = ctx.resolved;

    return {
      htmlAttrs: {
        lang: ctx.lang,
        ...(ctx.dir ? { dir: ctx.dir } : {}),
      },
      title: ctx.titleRaw,
      ...(ctx.resolvedTitleTemplate === undefined
        ? {}
        : { titleTemplate: ctx.resolvedTitleTemplate }),
      meta: [
        { name: "description", content: ctx.descriptionRaw },
        ...(resolved.keywords?.length
          ? [{ name: "keywords", content: resolved.keywords.join(", ") }]
          : []),
        { name: "author", content: resolved.author || siteName },
        ...(resolved.noindex
          ? [
              { name: "robots", content: "noindex, nofollow" },
              { name: "googlebot", content: "noindex, nofollow" },
            ]
          : [
              {
                name: "robots",
                content:
                  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
              },
            ]),

        { property: "og:type", content: ctx.ogType },
        { property: "og:site_name", content: siteName },
        { property: "og:url", content: ctx.canonicalUrl },
        { property: "og:title", content: ctx.metaTitle },
        { property: "og:description", content: ctx.descriptionRaw },
        { property: "og:image", content: ctx.ogImage },
        { property: "og:image:alt", content: ctx.imageAlt },
        ...(ctx.imageWidth && ctx.imageHeight
          ? [
              { property: "og:image:width", content: String(ctx.imageWidth) },
              { property: "og:image:height", content: String(ctx.imageHeight) },
            ]
          : []),
        ...(ctx.imageMimeType
          ? [{ property: "og:image:type", content: ctx.imageMimeType }]
          : []),
        ...(ctx.ogImage.startsWith("https://")
          ? [{ property: "og:image:secure_url", content: ctx.ogImage }]
          : []),
        { property: "og:locale", content: ctx.ogLocale },
        ...ctx.ogLocaleAlternates.map((localeCode) => ({
          property: "og:locale:alternate",
          content: localeCode,
        })),
        ...(resolved.publishedTime
          ? [
              {
                property: "article:published_time",
                content: resolved.publishedTime,
              },
            ]
          : []),
        ...(resolved.modifiedTime
          ? [
              {
                property: "article:modified_time",
                content: resolved.modifiedTime,
              },
            ]
          : []),
        // Article-specific Open Graph tags for better social sharing
        ...(resolved.type === "article" && resolved.author
          ? [{ property: "article:author", content: resolved.author }]
          : []),
        ...(resolved.articleSection
          ? [{ property: "article:section", content: resolved.articleSection }]
          : []),
        ...(resolved.articleTags?.length
          ? resolved.articleTags.map((tag) => ({
              property: "article:tag",
              content: tag,
            }))
          : []),

        {
          name: "twitter:card",
          content: resolved.twitterCard || "summary_large_image",
        },
        { name: "twitter:title", content: ctx.metaTitle },
        { name: "twitter:description", content: ctx.descriptionRaw },
        { name: "twitter:image", content: ctx.ogImage },
        { name: "twitter:image:alt", content: ctx.imageAlt },
        { name: "twitter:url", content: ctx.canonicalUrl },
        ...(ctx.twitterSite
          ? [{ name: "twitter:site", content: ctx.twitterSite }]
          : []),
        ...(ctx.twitterCreator
          ? [{ name: "twitter:creator", content: ctx.twitterCreator }]
          : []),
      ],
      link: [
        { rel: "canonical", href: ctx.canonicalUrl },
        ...ctx.alternateLinks,
      ],
    };
  });

  useSchemaOrg(() => {
    const ctx = getSeoContext();
    const resolved = ctx.resolved;
    const schemas: SchemaNode[] = [];

    const organizationSchema: SchemaNode = {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: siteName,
      legalName: siteLegalName,
      url: baseUrl,
      description: siteDescription,
      logo: {
        "@type": "ImageObject",
        url: siteLogo,
      },
    };

    const sameAs = [siteLinkedIn].filter(Boolean);
    if (sameAs.length > 0) {
      organizationSchema.sameAs = sameAs;
    }

    organizationSchema.email = "hello@eyeonidea.com";
    organizationSchema.telephone = "+4529930583";
    organizationSchema.contactPoint = [
      {
        "@type": "ContactPoint",
        email: "hello@eyeonidea.com",
        telephone: "+4529930583",
        contactType: "customer service",
      },
    ];

    organizationSchema.address = [
      {
        "@type": "PostalAddress",
        addressLocality: "Aalborg",
        addressRegion: "North Jutland",
        addressCountry: "DK",
      },
    ];

    organizationSchema.foundingDate = "2025";
    organizationSchema.industry = industry;
    organizationSchema.areaServed = [
      "Denmark",
      "Nordic Countries",
      "European Union",
    ];

    const webSiteSchema: SchemaNode = {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: siteName,
      description: siteDescription,
      publisher: { "@id": `${baseUrl}/#organization` },
      inLanguage: ctx.lang,
    };

    if (resolved.includeOrganizationSchema !== false) {
      schemas.push(organizationSchema);
    }

    if (resolved.includeWebSiteSchema !== false) {
      schemas.push(webSiteSchema);
    }

    const imageObject: SchemaNode = {
      "@type": "ImageObject",
      url: ctx.ogImage,
    };

    if (ctx.imageWidth && ctx.imageHeight) {
      imageObject.width = ctx.imageWidth;
      imageObject.height = ctx.imageHeight;
    }

    const authorName = resolved.author || siteName;
    const isOrganizationAuthor =
      authorName === siteName || authorName === siteLegalName;

    const authorSchema: SchemaNode = isOrganizationAuthor
      ? {
          "@type": "Organization",
          "@id": `${baseUrl}/#organization`,
          name: authorName,
        }
      : {
          "@type": "Person",
          name: authorName,
        };

    const pageSchemaType =
      resolved.schemaType ||
      (resolved.type === "profile" ? "AboutPage" : "WebPage");

    const webPageSchema: SchemaNode = {
      "@type": pageSchemaType,
      "@id": ctx.canonicalUrl,
      url: ctx.canonicalUrl,
      name: ctx.metaTitle,
      description: ctx.descriptionRaw,
      inLanguage: ctx.lang,
      isPartOf: { "@id": `${baseUrl}/#website` },
      primaryImageOfPage: imageObject,
      image: imageObject,
      author: authorSchema,
    };

    if (resolved.publishedTime) {
      webPageSchema.datePublished = resolved.publishedTime;
    }

    if (resolved.modifiedTime) {
      webPageSchema.dateModified = resolved.modifiedTime;
    }

    if (resolved.breadcrumbs && resolved.breadcrumbs.length > 0) {
      webPageSchema.breadcrumb = {
        "@type": "BreadcrumbList",
        "@id": `${ctx.canonicalUrl}#breadcrumb`,
        itemListElement: resolved.breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: resolveUrl(crumb.url, baseUrl),
        })),
      };
    }

    if (pageSchemaType === "AboutPage") {
      webPageSchema.about = { "@id": `${baseUrl}/#organization` };
    }

    schemas.push(webPageSchema);

    if (resolved.type === "article" && resolved.publishedTime) {
      const articleSchema: SchemaNode = {
        "@type": "Article",
        "@id": `${ctx.canonicalUrl}#article`,
        headline: ctx.titleRaw,
        description: ctx.descriptionRaw,
        image: imageObject,
        datePublished: resolved.publishedTime,
        dateModified: resolved.modifiedTime || resolved.publishedTime,
        author: authorSchema,
        publisher: { "@id": `${baseUrl}/#organization` },
        mainEntityOfPage: { "@id": ctx.canonicalUrl },
        inLanguage: ctx.lang,
        isPartOf: { "@id": `${baseUrl}/#website` },
      };

      // Add article section if provided
      if (resolved.articleSection) {
        articleSchema.articleSection = resolved.articleSection;
      }

      // Add keywords/tags if provided
      if (resolved.articleTags?.length) {
        articleSchema.keywords = resolved.articleTags.join(", ");
      }

      // Add word count if provided (helps with content categorization)
      if (resolved.wordCount) {
        articleSchema.wordCount = resolved.wordCount;
      }

      schemas.push(articleSchema);
    }

    if (resolved.type === "product") {
      const productSchema: SchemaNode = {
        "@type": "Product",
        "@id": `${ctx.canonicalUrl}#product`,
        name: ctx.titleRaw,
        description: ctx.descriptionRaw,
        image: ctx.ogImage,
        brand: { "@type": "Brand", name: siteName },
        url: ctx.canonicalUrl,
      };
      schemas.push(productSchema);
    }

    if (resolved.type === "portfolio") {
      const creativeWorkSchema: SchemaNode = {
        "@type": "CreativeWork",
        "@id": `${ctx.canonicalUrl}#work`,
        name: ctx.titleRaw,
        description: ctx.descriptionRaw,
        image: ctx.ogImage,
        creator: { "@id": `${baseUrl}/#organization` },
        inLanguage: ctx.lang,
        url: ctx.canonicalUrl,
      };

      if (resolved.publishedTime) {
        creativeWorkSchema.datePublished = resolved.publishedTime;
      }

      if (resolved.modifiedTime || resolved.publishedTime) {
        creativeWorkSchema.dateModified =
          resolved.modifiedTime || resolved.publishedTime;
      }

      schemas.push(creativeWorkSchema);
    }

    if (resolved.structuredData) {
      if (Array.isArray(resolved.structuredData)) {
        schemas.push(...resolved.structuredData);
      } else {
        schemas.push(resolved.structuredData);
      }
    }

    return schemas;
  });
};

const useSchemaOrg = (schemas: MaybeRefOrGetter<SchemaNode[]>) => {
  useHead(() => {
    const resolved = typeof schemas === "function" ? schemas() : unref(schemas);
    if (!resolved || resolved.length === 0) {
      return { script: [] };
    }

    return {
      script: [
        {
          key: "schema-org",
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": resolved,
          }),
        },
      ],
    };
  });
};
