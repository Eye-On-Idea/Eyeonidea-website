# Client Hub — Developer Guide

## Overview

The Client Hub is a password-protected knowledge base at `/client-hub/**` that helps clients manage their website content. It uses `nuxt-auth-utils` session cookies for authentication.

---

## How Authentication Works

1. **Server API routes** (`server/api/client-hub/`):
   - `login.post.ts` — Validates password against `CLIENT_HUB_PASSWORD` env var, sets a sealed session cookie via `setUserSession()`
   - `logout.post.ts` — Clears the session via `clearUserSession()`
   - `session.get.ts` — Returns current auth state

2. **Middleware** (`middleware/client-hub-auth.ts`):
   - Applied to all `/client-hub/**` pages except `/client-hub/login`
   - Checks `useUserSession()` for `loggedIn` and `user.clientHub === true`
   - Redirects unauthenticated users to `/client-hub/login?redirect=<original-path>`

3. **Session cookie**: Managed entirely by `nuxt-auth-utils`. Encrypted and sealed using `NUXT_SESSION_PASSWORD`.

---

## How to Add a New Category

1. **Add category data** in `composables/useClientHub.ts`:
   ```ts
   {
     slug: "your-category-slug",
     titleKey: "clientHub.categories.your-category-slug.title",
     descriptionKey: "clientHub.categories.your-category-slug.description",
     iconKey: "clientHub.categories.your-category-slug.icon",
     order: 7, // next available order number
     articles: [], // add articles here
   }
   ```

2. **Add i18n strings** in `i18n/locales/en/pages/client-hub.json` under `categories`:
   ```json
   "your-category-slug": {
     "title": "Category Title",
     "description": "Category description text.",
     "icon": "i-heroicons-icon-name"
   }
   ```

3. Translate to other locales as needed.

That's it — the category will automatically appear on the hub landing page and in navigation.

---

## How to Add a New Article

1. **Create the article component** at `components/client-hub/articles/YourArticleName.vue`:
   ```vue
   <script setup lang="ts">
   const { t } = useI18n();
   </script>
   <template>
     <div>
       <h2>{{ t("clientHub.article.content.yourArticle.sectionTitle") }}</h2>
       <p>{{ t("clientHub.article.content.yourArticle.sectionText") }}</p>
     </div>
   </template>
   ```

2. **Add article data** to the appropriate category in `composables/useClientHub.ts`:
   ```ts
   {
     slug: "your-article-slug", // must match component name in kebab-case
     categorySlug: "category-slug",
     titleKey: "clientHub.articles.your-article-slug.title",
     summaryKey: "clientHub.articles.your-article-slug.summary",
     keywords: ["search", "keywords"],
     order: 4, // next available order in the category
   }
   ```

3. **Add i18n strings** in `i18n/locales/en/pages/client-hub.json`:
   - Under `articles`: add `title` and `summary`
   - Under `article.content`: add all section text used in the component

**Important**: The article slug `your-article-slug` is converted to PascalCase `YourArticleSlug` to resolve the component. So the component file must be named `YourArticleSlug.vue` under `components/client-hub/articles/`.

---

## Deployment Requirements

### Environment Variables (required on Cloudflare Pages)

| Variable | Purpose |
|---|---|
| `NUXT_SESSION_PASSWORD` | Encryption key for session cookies. **Must be changed from default** in production. Use a random string of 32+ characters. |
| `CLIENT_HUB_PASSWORD` | Shared password clients use to access the hub. |

### Runtime Requirements

- **Cloudflare Pages with SSR** (or any Node.js/edge server runtime)
- The `/client-hub/**` routes are server-rendered (not prerendered) because they need to read/write session cookies
- All other public marketing pages remain prerendered for performance
- Route rules are configured in `nuxt.config.ts` under `routeRules`

### Nitro Preset

Currently set to `cloudflare-pages` in `nuxt.config.ts`. Change this if deploying to a different platform (e.g., `node-server`, `vercel`, `netlify`).

---

## i18n Workflow

- All Client Hub text lives in `i18n/locales/en/pages/client-hub.json`
- Registered via `i18n/locales/en/index.ts` as `clientHub`
- Access in components via `t("clientHub.section.key")`
- To translate: copy the JSON structure to other locale directories and translate the values

---

## File Structure

```
server/api/client-hub/
  login.post.ts          # Login endpoint
  logout.post.ts         # Logout endpoint
  session.get.ts         # Session check endpoint
server/types/auth.d.ts   # TypeScript augmentation for User type

middleware/
  client-hub-auth.ts     # Route guard

layouts/
  client-hub.vue         # Hub layout (header, footer, logout)

pages/client-hub/
  login.vue              # Login page (public, no layout)
  index.vue              # Hub landing (categories grid)
  [category]/index.vue   # Category page (article list)
  [category]/[article].vue  # Article page (content + nav)

components/client-hub/
  Breadcrumb.vue         # Breadcrumb navigation
  SearchBar.vue          # Title/keyword search
  CategoryCard.vue       # Category tile for landing page
  ArticleCard.vue        # Article list item
  ScreenshotPlaceholder.vue  # Placeholder for future screenshots
  articles/              # One component per article
    AcceptingInvitation.vue
    LoggingIn.vue
    ... (15 total)

composables/
  useClientHub.ts        # Data structure + helpers

i18n/locales/en/pages/
  client-hub.json        # All English strings
```
