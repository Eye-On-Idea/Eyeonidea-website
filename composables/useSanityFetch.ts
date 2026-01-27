// /composables/useSanityFetch.ts

export type SanityFetchOptions = {
  /**
   * Stable key for Nuxt AsyncData caching/dedupe.
   * If omitted, generated from query+params.
   */
  key?: string;
  /**
   * If true, query won't run until you call refresh()
   */
  lazy?: boolean;
  /**
   * If false, skip server fetch; client relies on payload only.
   */
  server?: boolean;
  /**
   * If true, always fetch fresh data on client navigation (bypasses cache).
   * Useful for frequently updated content like news posts.
   */
  fresh?: boolean;
};

/**
 * Small hash that works in both server + client (no node:crypto dependency).
 */
function hashDjb2(input: string) {
  let hash = 5381;
  for (let i = 0; i < input.length; i++)
    hash = (hash * 33) ^ input.charCodeAt(i);
  // convert to unsigned + base36 for compactness
  return (hash >>> 0).toString(36);
}

function makeKey(query: string, params?: Record<string, unknown>) {
  return `sanity:${hashDjb2(JSON.stringify({ query, params: params ?? {} }))}`;
}

/**
 * Sanity fetch that avoids browser requests by relying on payloads on client.
 */
export function useSanityFetch<T>(
  query: string,
  params?: Record<string, unknown>,
  options: SanityFetchOptions = {}
) {
  const key = options.key ?? makeKey(query, params);
  const server = options.server ?? true;
  const lazy = options.lazy ?? false;
  const fresh = options.fresh ?? false;

  return useAsyncData<T>(
    key,
    async () => {
      if (import.meta.client) {
        const nuxtApp = useNuxtApp();
        const getCached = () =>
          (nuxtApp.static.data[key] ??
            nuxtApp.payload.data[key]) as T | undefined;

        // If fresh option is enabled, fetch directly from API (skip cache)
        if (fresh) {
          try {
            const result = await $fetch<T>("/api/sanity/query", {
              method: "POST",
              body: { query, params: params ?? {} },
            });
            return result;
          } catch (error) {
            console.error("[sanity] fresh-fetch-failed", {
              code: "SANITY_FRESH_FETCH_FAILED",
              key,
              error,
            });
            // Fall back to cached data if fresh fetch fails
            const cached = getCached();
            if (cached !== undefined) {
              return cached;
            }
            return null as T;
          }
        }

        const cached = getCached();
        if (cached !== undefined) {
          return cached;
        }

        const route = useRoute();
        const retry = async <R>(
          fn: () => Promise<R>,
          attempts: number,
          delayMs: number
        ) => {
          let lastError: unknown;
          for (let i = 0; i < attempts; i++) {
            try {
              return await fn();
            } catch (error) {
              lastError = error;
              if (i < attempts - 1) {
                await new Promise((resolve) =>
                  setTimeout(resolve, delayMs * (i + 1))
                );
              }
            }
          }
          throw lastError;
        };

        let loadedPayload: Record<string, any> | null = null;
        try {
          loadedPayload = await retry(async () => {
            const payload = await loadPayload(route.path);
            if (!payload) {
              throw new Error("payload-missing");
            }
            return payload;
          }, 2, 150);
        } catch {
          // Handled below with fallback logging.
        }

        if (loadedPayload?.data && nuxtApp.static?.data) {
          for (const [payloadKey, payloadValue] of Object.entries(
            loadedPayload.data
          )) {
            nuxtApp.static.data[payloadKey] = payloadValue;
          }
        }

        const cachedAfter = getCached();
        if (cachedAfter !== undefined) {
          return cachedAfter;
        }

        // Fallback to API when payload is missing (both dev and production)
        // This handles client-side navigation when payloadExtraction is disabled
        try {
          const fallbackData = await retry(
            async () => {
              const result = await $fetch<T>("/api/sanity/query", {
                method: "POST",
                body: { query, params: params ?? {} },
              });
              if (result === null || result === undefined) {
                throw new Error("api-fetch-empty");
              }
              return result;
            },
            2,
            250
          );
          return fallbackData;
        } catch (error) {
          console.error("[sanity] api-fetch-failed", {
            code: "SANITY_API_FETCH_FAILED",
            key,
            route: route.path,
            error,
          });
          return null as T;
        }
      }
      const sanity = useSanity();
      return sanity.client.fetch<T>(query, params ?? {}, {
        perspective: "published",
        useCdn: false,
      });
    },
    {
      server,
      lazy,
      default: () => null as T,
    }
  );
}

