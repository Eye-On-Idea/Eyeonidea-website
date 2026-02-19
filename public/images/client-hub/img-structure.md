# Client Hub - Image Structure

> This document lists every image required for the client-hub section.
> All images live in `/public/images/client-hub/` and are served via Nuxt Image (`@nuxt/image` with IPX provider).
> Only one high-quality source file per asset is needed - Nuxt Image handles resizing, srcset, and format negotiation (WebP/AVIF) automatically.

---

## Naming Convention

- All filenames use **kebab-case**
- Pattern: `{service}/{category}-{descriptor}.png`
- Screenshots: `.png` (lossless UI captures)
- Diagrams/illustrations: `.png` or `.svg`
- Photos: `.jpg`

---

## 1. Website Content (`website-content/`)

Folder: `/public/images/client-hub/website-content/`

### Getting Started

| # | Filename | Description | Purpose | Orientation | Min Resolution |
|---|----------|-------------|---------|-------------|----------------|
| 1 | `cms-overview-dashboard.png` | Screenshot of the Sanity Studio dashboard home screen showing the main navigation, document lists, and workspace overview | Instructional screenshot | Landscape (16:9) | 1920 x 1080 |
| 2 | `logging-in-browser-url.png` | Browser address bar showing the Studio URL (e.g. `studio.clientdomain.com`) with the page loading behind it | Instructional screenshot | Landscape (16:9) | 1920 x 1080 |
| 3 | `logging-in-sign-in-screen.png` | The Studio sign-in/authentication page showing the login form or SSO button | Instructional screenshot | Landscape (16:9) | 1920 x 1080 |
| 4 | `studio-navigation-sidebar.png` | The Studio left sidebar navigation menu expanded, showing document types and menu items | Instructional screenshot | Landscape (16:9) | 1920 x 1080 |

### Content Management

| # | Filename | Description | Purpose | Orientation | Min Resolution |
|---|----------|-------------|---------|-------------|----------------|
| 5 | `editing-text-field.png` | A text/rich-text editing field in the Studio document editor, showing the toolbar and content area | Instructional screenshot | Landscape (16:9) | 1920 x 1080 |
| 6 | `drafts-indicator.png` | A document in draft state showing the draft badge/indicator in the Studio interface | Instructional screenshot | Landscape (16:9) | 1920 x 1080 |
| 7 | `drafts-publish-button.png` | The publish button and confirmation dialog in the Studio, showing how to publish a draft | Instructional screenshot | Landscape (16:9) | 1920 x 1080 |

### SEO and URLs

| # | Filename | Description | Purpose | Orientation | Min Resolution |
|---|----------|-------------|---------|-------------|----------------|
| 8 | `seo-fields-editor.png` | SEO meta fields (title, description, OG image) in the Studio document editor panel | Instructional screenshot | Landscape (16:9) | 1920 x 1080 |
| 9 | `slugs-field-editor.png` | The slug field for a document in the Studio, showing the auto-generated URL-friendly string | Instructional screenshot | Landscape (16:9) | 1920 x 1080 |

### Blog Posts

| # | Filename | Description | Purpose | Orientation | Min Resolution |
|---|----------|-------------|---------|-------------|----------------|
| 10 | `creating-post-new-document.png` | The Studio interface for creating a new blog post document, showing the empty form and required fields | Instructional screenshot | Landscape (16:9) | 1920 x 1080 |
| 11 | `creating-post-image-upload.png` | The image upload dialog/field in the Studio for adding a featured image to a post | Instructional screenshot | Landscape (16:9) | 1920 x 1080 |
| 12 | `publishing-post-action.png` | The publish action for a completed blog post, showing the review and publish flow | Instructional screenshot | Landscape (16:9) | 1920 x 1080 |

### Images and Media

| # | Filename | Description | Purpose | Orientation | Min Resolution |
|---|----------|-------------|---------|-------------|----------------|
| 13 | `image-upload-interface.png` | The image upload interface in the Studio, showing drag-and-drop or file picker and optimization settings | Instructional screenshot | Landscape (16:9) | 1920 x 1080 |
| 14 | `alt-text-field.png` | The alt text input field for an image asset in the Studio media library | Instructional screenshot | Landscape (16:9) | 1920 x 1080 |
| 15 | `common-mistakes-overview.png` | Annotated screenshot or illustration showing common CMS editing mistakes to avoid (e.g. missing alt text, broken formatting, unpublished changes) | Instructional screenshot | Landscape (16:9) | 1920 x 1080 |

---

## 2. Email (`email/`)

Folder: `/public/images/client-hub/email/`

| # | Filename | Description | Purpose | Orientation | Min Resolution |
|---|----------|-------------|---------|-------------|----------------|
| 16 | `first-login-webmail.png` | The Zimbra webmail login page showing the username/password form | Instructional screenshot | Landscape (16:9) | 1920 x 1080 |
| 17 | `first-login-password-change.png` | The password change screen inside Zimbra webmail settings | Instructional screenshot | Landscape (16:9) | 1920 x 1080 |
| 18 | `webmail-inbox.png` | The Zimbra webmail inbox interface showing the email list, reading pane, and folder sidebar | Instructional screenshot | Landscape (16:9) | 1920 x 1080 |
| 19 | `email-app-imap-settings.png` | Example IMAP/SMTP configuration screen in a common email app (e.g. Outlook, Apple Mail, or Thunderbird) showing server, port, and encryption fields | Instructional screenshot | Landscape (16:9) | 1920 x 1080 |
| 20 | `email-backup-methods.png` | Overview illustration or screenshot showing email backup options (export, IMAP sync, archival) | Instructional screenshot | Landscape (16:9) | 1920 x 1080 |

---

## 3. Domain (`domain/`)

Folder: `/public/images/client-hub/domain/`

| # | Filename | Description | Purpose | Orientation | Min Resolution |
|---|----------|-------------|---------|-------------|----------------|
| 21 | `domain-ownership-panel.png` | Domain registrar control panel showing ownership/WHOIS information for a domain | Instructional screenshot | Landscape (16:9) | 1920 x 1080 |
| 22 | `domain-renewal-timeline.png` | Illustration or screenshot showing the domain renewal process and timeline (expiry date, grace period, redemption) | Instructional diagram | Landscape (16:9) | 1920 x 1080 |
| 23 | `domain-transfer-auth.png` | Screenshot of the domain transfer authorization process (auth code, transfer approval steps) | Instructional screenshot | Landscape (16:9) | 1920 x 1080 |
| 24 | `dns-records-panel.png` | DNS records management panel showing A, CNAME, MX, and TXT records for a domain | Instructional screenshot | Landscape (16:9) | 1920 x 1080 |

---

## 4. Hosting (`hosting/`)

Folder: `/public/images/client-hub/hosting/`

| # | Filename | Description | Purpose | Orientation | Min Resolution |
|---|----------|-------------|---------|-------------|----------------|
| 25 | `hosting-setup-overview.png` | Diagram or screenshot showing the hosting infrastructure (Cloudflare Pages, CDN, origin server) | Instructional diagram | Landscape (16:9) | 1920 x 1080 |
| 26 | `environments-diagram.png` | Diagram showing production vs. development environments, with arrows indicating the deployment flow between them | Instructional diagram | Landscape (16:9) | 1920 x 1080 |
| 27 | `content-updates-flow.png` | Flowchart or diagram showing how content updates move from CMS edit to live site (edit > save > build > deploy) | Instructional diagram | Landscape (16:9) | 1920 x 1080 |
| 28 | `analytics-dashboard.png` | Example analytics dashboard screenshot (e.g. Cloudflare Analytics or similar) showing traffic, page views, and performance metrics | Instructional screenshot | Landscape (16:9) | 1920 x 1080 |

---

## 5. Visual Identity (`visual-identity/`)

Folder: `/public/images/client-hub/visual-identity/`

### Logo Files

| # | Filename | Description | Purpose | Orientation | Min Resolution |
|---|----------|-------------|---------|-------------|----------------|
| 29 | `logo-files-overview.png` | Overview showing available logo file formats side by side (SVG, PNG, JPG) with labels | Instructional overview | Landscape (16:9) | 1920 x 1080 |
| 30 | `logo-svg-example.png` | The client's logo in SVG format displayed at various sizes to demonstrate scalability | Logo showcase | Square (1:1) | 1080 x 1080 |
| 31 | `logo-png-example.png` | The client's logo in PNG format on a transparent/checkered background | Logo showcase | Square (1:1) | 1080 x 1080 |

### Logo Usage

| # | Filename | Description | Purpose | Orientation | Min Resolution |
|---|----------|-------------|---------|-------------|----------------|
| 32 | `logo-versions-variations.png` | All available logo versions and variations (full color, monochrome, reversed, icon-only, horizontal, stacked) | Brand reference | Landscape (16:9) | 1920 x 1080 |
| 33 | `logo-clear-space-size.png` | Logo clear space (exclusion zone) diagram and minimum size guidelines with measurements | Brand guideline | Landscape (16:9) | 1920 x 1080 |

### Colors and Typography

| # | Filename | Description | Purpose | Orientation | Min Resolution |
|---|----------|-------------|---------|-------------|----------------|
| 34 | `brand-color-palette.png` | Brand color palette showing primary, secondary, and accent colors with hex/RGB values and color names | Brand reference | Landscape (16:9) | 1920 x 1080 |
| 35 | `brand-typography-specimens.png` | Typography specimens showing the brand's heading and body fonts at various sizes and weights | Brand reference | Landscape (16:9) | 1920 x 1080 |

### Templates and Print

| # | Filename | Description | Purpose | Orientation | Min Resolution |
|---|----------|-------------|---------|-------------|----------------|
| 36 | `template-business-card.png` | Business card template showing front and back sides with brand elements applied | Template preview | Landscape (3:2) | 1800 x 1200 |
| 37 | `template-letterhead.png` | Letterhead/stationery template showing header, footer, and content area with brand styling | Template preview | Portrait (3:4) | 1200 x 1600 |
| 38 | `template-presentation.png` | Presentation slide template showing a title slide or key content slide with brand styling | Template preview | Landscape (16:9) | 1920 x 1080 |
| 39 | `template-social-media.png` | Social media post/story templates showing branded layouts for common platforms (Instagram, LinkedIn, etc.) | Template preview | Landscape (16:9) | 1920 x 1080 |

### Brand Consistency

| # | Filename | Description | Purpose | Orientation | Min Resolution |
|---|----------|-------------|---------|-------------|----------------|
| 40 | `brand-consistency-examples.png` | Side-by-side examples of consistent brand application across different materials (web, print, social, signage) | Brand reference | Landscape (16:9) | 1920 x 1080 |

---

## 6. Login Page (existing)

Folder: `/public/public-material/`

| # | Filename | Description | Purpose | Orientation | Min Resolution |
|---|----------|-------------|---------|-------------|----------------|
| - | `logo-center-shadow.svg` | Eye On Idea logo with centered shadow, used on the login page. **Already exists - no action needed.** | Logo / branding | N/A | N/A (vector) |

---

## Summary

| Service | Image Count | Folder |
|---------|-------------|--------|
| Website Content | 15 | `/public/images/client-hub/website-content/` |
| Email | 5 | `/public/images/client-hub/email/` |
| Domain | 4 | `/public/images/client-hub/domain/` |
| Hosting | 4 | `/public/images/client-hub/hosting/` |
| Visual Identity | 12 | `/public/images/client-hub/visual-identity/` |
| **Total new images** | **40** | |

---

## Notes

- **FAQ articles** (CmsFaq, EmailFaq, DomainFaq, HostingFaq, VisualIdentityFaq) contain no image references - they are text-only Q&A.
- **Visual Identity images are client-specific** - each client's hub will need their own brand assets for items 29-40.
- **Screenshots should be captured at 2x/Retina resolution** where possible for crisp rendering on high-DPI displays. Nuxt Image will downscale as needed.
- **Sensitive data**: Redact or blur any real credentials, personal data, or client-specific URLs in screenshots before adding.
- **Format**: Use `.png` for screenshots (lossless UI captures). Nuxt Image will serve optimized WebP/AVIF versions automatically to supported browsers.
