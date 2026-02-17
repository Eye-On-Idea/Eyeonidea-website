# Website Content (CMS)

This section explains how to use your website’s content system (CMS).

You will use it to:

- Update text and images
- Create and publish news/posts (if included)
- Manage pages (if included)
- Keep your website up to date without touching code

## Quick links

- [Guide: Using the CMS (Sanity Studio)](./using-the-cms-sanity-studio)
- [Guide: Writing and publishing news/posts](./publishing-news-posts) _(only if included in your project)_
- [Guide: Image and file best practices](./images-and-files) _(only if included in your project)_

---

## What you need before you start

To access the CMS, you need an invitation email from Eye On Idea.

You will send:

- The email addresses that should get access
- Who should be Editor vs Writer (if relevant)

Eye On Idea will:

- Set up access
- Invite your users
- Keep admin access (to protect the setup)

---

## FAQ

### Where do I edit my website content?

In your CMS Studio, usually here:

- `studio.yourdomain.com`

### Can I break the website by editing content?

In normal use, no.
You can change text, images, and content blocks safely.

Some actions can have bigger impact:

- Deleting content
- Unpublishing key pages
- Replacing images with very large files

If you are unsure, save a draft first.

### What is the difference between Editor and Writer?

- **Writer:** Can add content (limited editing/removal)
- **Editor:** Can add, edit, and delete content

Eye On Idea is always Admin. Clients do not get schema access.

### Why is there a “Draft” and “Publish” flow?

Drafts let you work safely.
Publish makes the content live on the website.

### When do changes show on the website?

Usually within a short time after you publish.
Your website rebuilds automatically when content is published.

### Can you help with structure and writing?

Yes.
If you want help improving pages, news posts, or tone of voice, Eye On Idea can assist.

---

## Technical Information (Advanced)

### What the Studio is

Sanity Studio is a web app that runs in the browser and connects to Sanity’s APIs and Content Lake. [oai_citation:0‡Sanity.io](https://www.sanity.io/docs/studio/deployment?utm_source=chatgpt.com)

### Where content is stored

Sanity’s Content Lake is hosted on Google Cloud in `europe-west1` (Belgium). [oai_citation:1‡Sanity.io](https://www.sanity.io/answers/choosing-vercel-serverless-function-region-for-sanity-data-storage?utm_source=chatgpt.com)

### How the website updates after publishing

When content is published, a webhook can trigger a rebuild/deploy flow. Webhooks have practical limits, so the setup should handle bursts of updates safely. [oai_citation:2‡Sanity.io](https://www.sanity.io/docs/content-lake/webhook-best-practices?utm_source=chatgpt.com)
