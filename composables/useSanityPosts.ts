
import { groq } from "#imports";
import { useSanityFetch } from "./useSanityFetch";
import type { Post, PostType } from "~/types/sanity";

const postCardProjection = groq`
{
  _id,
  _type,
  title,
  slug,
  postType,
  publishedAt,
  featured,
  featuredFrom,
  featuredTo,
  excerpt,
  heroImage,
  heroImageAlt,
  readingTimeOverride,
  "collaborators": collaborators[]->{
    _id,
    _type,
    name,
    slug,
    logo
  }
}
`;

const postFullProjection = groq`
{
  _id,
  _type,
  title,
  slug,
  postType,
  publishedAt,
  featured,
  featuredFrom,
  featuredTo,
  excerpt,
  heroImage,
  heroImageAlt,
  readingTimeOverride,
  body[]{
    ...,
    _type == "image" => {
      ...,
      "url": asset->url,
      "dimensions": asset->metadata.dimensions
    }
  },
  "author": author->{
    _id,
    _type,
    name,
    role,
    photo,
    email,
    phone
  },
  "collaborators": collaborators[]->{
    _id,
    _type,
    name,
    slug,
    logo,
    websiteUrl
  },
  eventStartDate,
  eventEndDate,
  eventLocation,
  seo{
    metaTitle,
    metaDescription,
    ogImage,
    noIndex,
    canonicalUrl
  }
}
`;

export function usePostBySlug(slug: string) {
  const query = groq`
    *[_type == "post" && slug.current == $slug][0]
    ${postFullProjection}
  `;
  return useSanityFetch<Post | null>(query, { slug });
}

export function useAllPostSlugs() {
  const query = groq`
    *[_type == "post" && defined(slug.current)]{
      "slug": slug.current
    }
  `;
  return useSanityFetch<{ slug: string }[]>(query);
}

export function usePostsList(params?: {
  postType?: PostType | null;
  limit?: number;
  offset?: number;
  featuredOnly?: boolean;
  searchQuery?: string;
}) {
  const limit = params?.limit ?? 10;
  const offset = params?.offset ?? 0;
  const end = offset + limit;

  const query = groq`
    *[
      _type == "post"
      && defined(slug.current)
      && publishedAt <= now()
      && (!defined($postType) || $postType == "" || postType == $postType)
      && (!$featuredOnly || featured == true)
      && (!defined($searchQuery) || $searchQuery == "" || title match $searchQuery + "*" || excerpt match $searchQuery + "*")
    ]
    | order(publishedAt desc)[$offset...$end]
    ${postCardProjection}
  `;

  return useSanityFetch<Post[]>(query, {
    postType: params?.postType ?? null,
    featuredOnly: params?.featuredOnly ?? false,
    searchQuery: params?.searchQuery ?? "",
    offset,
    end,
  });
}

export function usePostsCount(params?: {
  postType?: PostType | null;
  searchQuery?: string;
}) {
  const query = groq`
    count(*[
      _type == "post"
      && defined(slug.current)
      && publishedAt <= now()
      && (!defined($postType) || $postType == "" || postType == $postType)
      && (!defined($searchQuery) || $searchQuery == "" || title match $searchQuery + "*" || excerpt match $searchQuery + "*")
    ])
  `;

  return useSanityFetch<number>(query, {
    postType: params?.postType ?? null,
    searchQuery: params?.searchQuery ?? "",
  });
}

export function useFeaturedPost() {
  const query = groq`
    *[
      _type == "post"
      && defined(slug.current)
      && publishedAt <= now()
      && featured == true
      && (
        !defined(featuredFrom) || featuredFrom <= now()
      )
      && (
        !defined(featuredTo) || featuredTo >= now()
      )
    ]
    | order(publishedAt desc)[0]
    ${postCardProjection}
  `;
  return useSanityFetch<Post | null>(query, undefined, {
    key: "featured-post",
    fresh: true,
  });
}

export function useRecentPostsExcluding(excludeId: string, limit = 3) {
  const query = groq`
    *[
      _type == "post"
      && defined(slug.current)
      && publishedAt <= now()
      && _id != $excludeId
    ]
    | order(publishedAt desc)[0...$limit]
    ${postCardProjection}
  `;

  return useSanityFetch<Post[]>(query, { excludeId, limit });
}

export function usePostsByCollaboratorSlug(
  collaboratorSlug: string,
  limit = 20
) {
  const query = groq`
    *[
      _type == "post"
      && defined(slug.current)
      && publishedAt <= now()
      && references(*[_type == "collaborator" && slug.current == $collaboratorSlug][0]._id)
    ]
    | order(publishedAt desc)[0...$limit]
    ${postCardProjection}
  `;
  return useSanityFetch<Post[]>(query, { collaboratorSlug, limit });
}

export function usePostTypes() {
  const postTypes: { value: PostType; label: string }[] = [
    { value: "news", label: "News" },
    { value: "event", label: "Events" },
    { value: "product_update", label: "Product Updates" },
    { value: "press_release", label: "Press Releases" },
  ];
  return postTypes;
}
