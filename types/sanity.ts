export type PostType = "news" | "event" | "product_update" | "press_release";

export interface SanitySlug {
  current?: string | null;
}

export interface SanityImage {
  asset?: {
    _ref?: string;
  } | null;
}

export interface SanityAuthor {
  _id?: string;
  _type?: string;
  name?: string;
  role?: string;
  photo?: unknown;
  email?: string;
  phone?: string;
}

export interface SanityCollaborator {
  _id: string;
  _type?: string;
  name: string;
  slug?: SanitySlug | null;
  logo?: unknown;
  websiteUrl?: string;
}

export interface SanitySeo {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage | null;
  noIndex?: boolean;
  canonicalUrl?: string;
}

export interface SanityTag {
  _key?: string;
  title?: string;
}

export interface PortableTextBlock {
  _type: string;
  [key: string]: unknown;
}

export interface Post {
  _id: string;
  _type?: "post" | string;
  _updatedAt?: string;
  title: string;
  slug: SanitySlug;
  postType: PostType;
  publishedAt?: string;
  featured?: boolean;
  featuredFrom?: string;
  featuredTo?: string;
  excerpt?: string;
  heroImage?: SanityImage | null;
  heroImageAlt?: string;
  readingTimeOverride?: number;
  body?: PortableTextBlock[];
  author?: SanityAuthor | null;
  collaborators?: SanityCollaborator[];
  eventStartDate?: string;
  eventEndDate?: string;
  eventLocation?: string;
  tags?: SanityTag[];
  seo?: SanitySeo;
}
