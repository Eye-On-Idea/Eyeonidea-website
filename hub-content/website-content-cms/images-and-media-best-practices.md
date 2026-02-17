# Guide: Images & Media Best Practices

This guide helps you use images and files correctly in your CMS.

Good images make your website look professional.
Poor images can slow it down or make it look unclear.

---

## What this is

This guide explains:

- How to choose the right image size
- How to upload images correctly
- How to avoid common mistakes
- How images affect performance

---

## What you should know

- Large images can slow down your website.
- Blurry images reduce credibility.
- Cropping matters.
- The Studio shows recommended sizes — follow them.

When in doubt:
Use landscape images unless told otherwise.

---

## Step-by-step guide

### Step 1 — Prepare your image before upload

Before uploading:

- Use JPG for photos
- Use PNG only if you need transparency
- Keep file size under 1–2 MB unless otherwise stated
- Resize images close to the recommended size

If your Studio field shows:
“Recommended size: 1600x900”
Try to stay close to that ratio.

**Screenshot:** `cms-images-01-recommended-size.png`

---

### Step 2 — Upload the image

1. Click the image field
2. Upload or choose from existing media
3. Wait for upload to finish

Avoid uploading:

- Screenshots from WhatsApp
- Very small images stretched large
- Images with embedded text (unless intentional)

**Screenshot:** `cms-images-02-upload.png`

---

### Step 3 — Adjust crop if needed

Some fields allow cropping.

Make sure:

- The subject is centered
- Important text is not cut off
- Faces are not cropped at the top

Always check how it looks on the website.

**Screenshot:** `cms-images-03-crop.png`

---

### Step 4 — Add alt text (important)

Alt text describes the image.

It helps:

- Accessibility
- Search engines
- Screen readers

Keep it short and descriptive.

Good example:
“Commercial roofing team installing flat roof in Aarhus”

Avoid:
“image123.jpg”

**Screenshot:** `cms-images-04-alt-text.png`

---

### Step 5 — Publish and review

After publishing:

1. Open the page on your website
2. Check desktop view
3. Check mobile view
4. Check loading speed

If it feels slow, the image may be too large.

**Screenshot:** `cms-images-05-check-live.png`

---

## Common mistakes

### Uploading very large photos (5–10MB)

This slows the page.

### Using low-resolution images

Blurry images reduce trust.

### Cropping without checking mobile

Images behave differently on smaller screens.

### Forgetting alt text

Alt text is important for accessibility.

---

## File uploads (PDFs and documents)

If your Studio allows file uploads:

- Keep PDFs under 5MB if possible
- Use clear filenames:
  - `company-brochure-2026.pdf`
- Avoid spaces in filenames
- Use lowercase letters

---

## FAQ

### What is the best image size?

Follow the help text inside your Studio.
Most hero images use a landscape format.

### Does the system compress images automatically?

Yes.
The website optimizes images when displaying them.
Still, start with reasonable sizes.

### Can I replace an image later?

Yes.
Upload a new one and publish again.

### Can Eye On Idea help optimize images?

Yes.
Image optimization and content refinement can be provided if needed.

---

## Technical Information (Advanced)

- Images are stored in Sanity’s asset pipeline.
- The frontend uses dynamic image transformations for size and format.
- Proper sizing reduces bandwidth and improves Lighthouse scores.
- Alt text is rendered into semantic HTML for accessibility (WCAG baseline compliance).
