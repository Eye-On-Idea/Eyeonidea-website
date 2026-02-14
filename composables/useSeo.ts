/**
 * SEO composable tailored for eyeonidea.com.
 * Generates meta tags, canonical URLs, Open Graph/Twitter, and JSON-LD.
 */

type SchemaNode = Record<string, unknown>;

interface SeoOptions {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  url?: string;
  canonical?: string;
  type?: "website" | "article" | "profile" | "product" | "portfolio";
  noindex?: boolean;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: SchemaNode | SchemaNode[];
  breadcrumbs?: Array<{ name: string; url: string }>;
  ogType?: string;
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  twitterSite?: string;
  twitterCreator?: string;
  titleTemplate?: string | null;
  schemaType?:
    | "WebPage"
    | "AboutPage"
    | "ContactPage"
    | "CollectionPage"
    | "ItemPage"
    | "ProfilePage";
  includeOrganizationSchema?: boolean;
  includeWebSiteSchema?: boolean;
  // Article-specific fields for enhanced SEO
  articleSection?: string;
  articleTags?: string[];
  wordCount?: number;
}

type MaybeRefOrGetter<T> = T | { value: T } | (() => T);

const resolveUrl = (input: string, baseUrl: string) => {
  try {
    return new URL(input, baseUrl).toString();
  } catch {
    return input;
  }
};

const toOgLocale = (locale: string) => locale.replace("-", "_");

const getImageMimeType = (url: string) => {
  const extension = url
    .split("?")[0]
    .split("#")[0]
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
  const localePath = useLocalePath();
  const config = useRuntimeConfig();

  const resolveOptions = () => {
    if (typeof options === "function") {
      return options();
    }
    return unref(options);
  };

  const baseUrl = (config.public.siteUrl || "https://eyeonidea.com").replace(
    /\/$/,
    "",
  );
  const siteName = config.public.siteName || "Eye On Idea";
  const siteLegalName = config.public.siteLegalName || "Eye On Idea";
  const siteDescription =
    config.public.siteDescription ||
    "Danish digital consultancy helping B2B companies across Europe establish professional digital presence";
  const siteLogo = resolveUrl(
    config.public.siteLogo || "/android-chrome-512x512.png",
    baseUrl,
  );
  const defaultImage = resolveUrl(
    config.public.ogImage || "/android-chrome-512x512.png",
    baseUrl,
  );
  const siteTwitter = config.public.twitterHandle || "@eyeonidea";
  const siteLinkedIn =
    config.public.linkedinUrl ||
    "https://www.linkedin.com/company/eye-on-idea/";
  const industry = config.public.industry || "Digital Agency";
  const defaultImageWidth = Number(config.public.ogImageWidth) || 1200;
  const defaultImageHeight = Number(config.public.ogImageHeight) || 630;
  const getSeoContext = () => {
    const resolved = resolveOptions();
    const routePath = resolved.url ?? route.path;
    const pageUrl = resolveUrl(routePath, baseUrl);
    const canonicalUrl = resolveUrl(resolved.canonical || pageUrl, baseUrl);

    const titleHasBrand = resolved.title
      .toLowerCase()
      .includes(siteName.toLowerCase());
    const metaTitle = titleHasBrand
      ? resolved.title
      : `${resolved.title} | ${siteName}`;
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

    const lang = localeProperties.value?.iso || locale.value || "en";
    const dir = localeProperties.value?.dir;
    const ogLocale = toOgLocale(lang);

    const localeEntries = Array.isArray(locales.value)
      ? (locales.value as Array<string | { code?: string; iso?: string }>)
      : [];

    const alternateCandidates = localeEntries
      .map((entry) => {
        const code = typeof entry === "string" ? entry : entry.code;
        if (!code) return null;
        const iso = typeof entry === "string" ? undefined : entry.iso;
        const href = resolveUrl(localePath(route.path, code), baseUrl);
        return {
          code,
          iso,
          href,
        };
      })
      .filter((entry): entry is { code: string; iso?: string; href: string } =>
        Boolean(entry),
      );

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
      title: resolved.title,
      ...(ctx.resolvedTitleTemplate === undefined
        ? {}
        : { titleTemplate: ctx.resolvedTitleTemplate }),
      meta: [
        { name: "description", content: resolved.description },
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
        { property: "og:description", content: resolved.description },
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
        { name: "twitter:description", content: resolved.description },
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

    organizationSchema.foundingDate = "2024";
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
      description: resolved.description,
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
        headline: resolved.title,
        description: resolved.description,
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
        name: resolved.title,
        description: resolved.description,
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
        name: resolved.title,
        description: resolved.description,
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
