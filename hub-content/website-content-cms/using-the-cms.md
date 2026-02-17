# Guide: Using the CMS (Sanity Studio)

This guide shows how to log in and update your website content.

## What this is

Your CMS is the place where you edit content.
It does not require coding.

You will use a “Studio” website, usually:

- `studio.yourdomain.com`

## What you can do

Common actions:

- Update page text
- Swap images
- Create a news post (if your site includes news)
- Edit contact info and opening hours (if included)

## What you should know

- Drafts are safe. Publishing makes changes live.
- Editors can delete content permanently.
- Eye On Idea keeps admin access and handles the content setup.

---

## Step-by-step guide

### Step 1 — Open the Studio

1. Go to your Studio link, for example:
   - `studio.yourdomain.com`
2. Bookmark it.

**Screenshot:** `cms-studio-01-open-studio.png`

---

### Step 2 — Sign in

1. Click **Sign in**
2. Use the email you were invited with
3. Complete the login flow

If you did not receive an invite:

- Ask your company admin to confirm your email address
- Or contact Eye On Idea

**Screenshot:** `cms-studio-02-sign-in.png`

---

### Step 3 — Find what you want to edit

Most Studios have a left menu with content types, like:

- Pages
- News / Posts
- Settings
- Navigation
- SEO

Click the area you want to update.

Tip: Use the search feature if it is available.

**Screenshot:** `cms-studio-03-navigation.png`

---

### Step 4 — Edit text safely

1. Click into a text field
2. Make your changes
3. Keep sentences short and clear

Tip:

- Avoid pasting text with weird formatting from Word
- If you paste, quickly re-check spacing and headings

**Screenshot:** `cms-studio-04-edit-text.png`

---

### Step 5 — Save as draft

Drafts save automatically.
Many Studios also include a clear **Draft** action.

Use Draft when:

- You are not done yet
- You want someone else to review
- You are unsure about the final wording

**Screenshot:** `cms-studio-05-save-draft.png`

---

### Step 6 — Publish

When you are ready:

1. Click **Publish**
2. Confirm if asked

After publishing:

- The website will update automatically
- It may take a short time before you see changes live

Tip:

- If you do not see changes, hard refresh the page (Cmd+Shift+R / Ctrl+Shift+R)

**Screenshot:** `cms-studio-06-publish.png`

---

### Step 7 — Check the result on the website

1. Open the page on your live website
2. Check:
   - Text flow
   - Spelling
   - Mobile view
   - Images (size and crop)

If something looks off, go back and adjust.

**Screenshot:** `cms-studio-07-check-live-site.png`

---

## Common mistakes

### Deleting content instead of unpublishing

Deleting is often permanent.
If you are unsure, save a draft or ask Eye On Idea.

### Uploading very large images

Large images can slow down the site.
Use the recommended sizes shown in the Studio help text.

### Editing navigation without checking mobile

Menus often behave differently on mobile.
Always check both.

---

## FAQ

### I can’t log in. What do I do?

- Confirm you are using the invited email address
- Check spam folder for the invitation
- Ask Eye On Idea to resend the invite

### Why can’t I edit certain things?

Some content is locked to protect the structure.
Only Eye On Idea changes the schema and Studio setup.

### Can I schedule content?

If scheduling is enabled in your Studio, yes.
If not, Eye On Idea can add it in some setups.

---

## Technical Information (Advanced)

### What the Studio is

Sanity Studio is a browser-based app that connects to Sanity’s hosted APIs and Content Lake. [oai_citation:3‡Sanity.io](https://www.sanity.io/docs/studio/deployment?utm_source=chatgpt.com)

### Where content is stored

Sanity’s Content Lake is hosted on Google Cloud in the `europe-west1` region (Belgium). [oai_citation:4‡Sanity.io](https://www.sanity.io/answers/choosing-vercel-serverless-function-region-for-sanity-data-storage?utm_source=chatgpt.com)

### How your website updates after publishing

Eye On Idea uses an automated publish → rebuild flow.
This is commonly done with webhooks that trigger a deployment or rebuild when content changes. Webhooks can fire often during editing, so the setup should handle events safely. [oai_citation:5‡Sanity.io](https://www.sanity.io/docs/content-lake/webhook-best-practices?utm_source=chatgpt.com)
