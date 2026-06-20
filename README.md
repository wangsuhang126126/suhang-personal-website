# Suhang Personal Website

Personal website for Suhang Wang, built with Vite and React.

The site includes a multilingual MDX article publishing system for Chinese, Japanese, and English writing.

## Local Preview

Install dependencies when setting up the project for the first time or after dependency changes:

```bash
npm install
```

Start the local development server:

```bash
npm run dev -- --host 127.0.0.1 --port 5187
```

Build for production:

```bash
npm run build
```

The production output is generated in:

```text
dist
```

Do not commit `node_modules`, `dist`, `.DS_Store`, or `.env`.

## Contact Form Backend

The Contact form submits to the Cloudflare Pages Function at:

```text
/api/contact
```

Configure these Cloudflare Pages environment variables:

```text
RESEND_API_KEY
CONTACT_TO_EMAIL
CONTACT_FROM_EMAIL
```

Also create a Cloudflare KV namespace and bind it to the Pages project with this exact binding name:

```text
CONTACT_RATE_LIMIT
```

In Cloudflare Pages, add the binding under the project settings for Functions / KV namespace bindings. The binding is required for backend-side duplicate and rate-limit protection. The function rejects repeated submissions from the same IP within 60 seconds, allows at most 3 submissions from the same email within 10 minutes, and rejects duplicate normalized message content within 10 minutes.

After deployment, test by sending one valid message, then immediately submitting the same message again. The second request should show the localized "please wait" message instead of sending another email.

## What MDX Means Here

MDX lets normal Markdown-style writing live together with a small set of React-powered article components.

For ordinary articles, you can keep writing like Markdown:

```mdx
## Section Title

This is a paragraph.

- Bullet point
- Bullet point

> Quote text
```

When needed, you can also use approved article components such as `Callout`, `ArticleImage`, `VideoEmbed`, and `DataCard`.

## Article Folder Structure

Articles live in:

```text
src/content/articles
```

Each article topic gets one folder. The folder name becomes the public article slug.

Example:

```text
src/content/articles/japan-residential-energy-transition
```

Inside each article folder, create one MDX file per language:

```text
src/content/articles/japan-residential-energy-transition/zh.mdx
src/content/articles/japan-residential-energy-transition/ja.mdx
src/content/articles/japan-residential-energy-transition/en.mdx
```

You can publish one language first and add the others later. The article page will show available languages and gracefully disable missing ones.

## Frontmatter

Every `.mdx` file should keep YAML frontmatter at the top for readability:

```mdx
---
title: "Japan's Residential Energy Transition: What Comes After Solar?"
date: "2026-06-14"
language: "en"
summary: "A closer look at how storage, VPPs, and distributed energy are reshaping the residential energy market in Japan."
tags: ["Energy", "Japan", "Storage"]
status: "published"
canonicalSlug: "japan-residential-energy-transition"
---
```

The site reads article metadata from an explicit MDX export, so add the same metadata below the YAML block:

```mdx
export const frontmatter = {
  title: "Japan's Residential Energy Transition: What Comes After Solar?",
  date: "2026-06-14",
  language: "en",
  summary: "A closer look at how storage, VPPs, and distributed energy are reshaping the residential energy market in Japan.",
  tags: ["Energy", "Japan", "Storage"],
  status: "published",
  canonicalSlug: "japan-residential-energy-transition",
};
```

Important: do not replace this with raw MDX string parsing. A previous production crash was caused by trying to parse raw MDX with `.match()` when the build returned a non-string module shape.

Fields:

- `title`: Article title in that language.
- `date`: Publish date in `YYYY-MM-DD` format.
- `language`: Use `zh`, `ja`, or `en`.
- `summary`: Short description used on the Writing index and article page.
- `tags`: Article tags as a list.
- `status`: Usually `published`, but can also be `draft` or `planned`.
- `canonicalSlug`: The shared article slug for all language versions.

## Article Components

These components are available directly inside `.mdx` articles.

### Callout

```mdx
<Callout type="note">
This is an important note.
</Callout>
```

### ArticleImage

Place article images in:

```text
public/images/articles
```

Then use:

```mdx
<ArticleImage
  src="/images/articles/example.jpg"
  alt="Example image"
  caption="Example image caption"
/>
```

### VideoEmbed

YouTube URLs are converted into embed URLs automatically.

```mdx
<VideoEmbed url="https://www.youtube.com/watch?v=example" />
```

### DataCard

```mdx
<DataCard
  label="Market focus"
  value="Residential energy storage"
  note="Japan market"
/>
```

## URLs

The default article URL uses English if available:

```text
/writing/japan-residential-energy-transition
```

Language-specific versions:

```text
/writing/japan-residential-energy-transition?lang=zh
/writing/japan-residential-energy-transition?lang=ja
/writing/japan-residential-energy-transition?lang=en
```

## How to Publish a New Multilingual Article

Ready-to-use templates live in:

```text
src/content/articles/_template/
```

Follow these steps to publish a new article:

**Step 1: Copy the template folder**

Duplicate `src/content/articles/_template/` and rename it to your article slug.
The slug becomes the public URL. Use lowercase letters and hyphens only.

Example:

```text
src/content/articles/my-new-article/
```

**Step 2: Start with the Chinese version**

Open `zh.mdx` first. Edit the frontmatter fields:

- `title`: Article title in Chinese.
- `date`: Publish date in `YYYY-MM-DD` format.
- `summary`: One or two sentences describing the article.
- `tags`: Relevant tags as a list.
- `canonicalSlug`: The folder name you chose in Step 1.

Update the same values in the exported `frontmatter` object below the YAML block. Both blocks must match.

**Step 3: Translate into Japanese and English**

Edit `ja.mdx` and `en.mdx` the same way. Use the correct `language` value for each:

- `zh.mdx` → `language: "zh"`
- `ja.mdx` → `language: "ja"`
- `en.mdx` → `language: "en"`

The `canonicalSlug` must be identical across all three files.

**Step 4: Write the article body**

Replace the placeholder content with your article. Available components:

- `<Callout type="note">` — highlight an important observation
- `<ArticleImage src="..." alt="..." caption="..." />` — embed an image
- `<VideoEmbed url="..." />` — embed a YouTube video
- `<DataCard label="..." value="..." note="..." />` — show a data point

Place article images in `public/images/articles/your-article-slug/`.

**Step 5: Set status to published**

When the article is ready, change `status: "draft"` to `status: "published"` in both the YAML block and the exported `frontmatter` object of each language file.

**Step 6: Preview locally**

```bash
npm run dev -- --host 127.0.0.1 --port 5187
```

Open the article at:

```text
http://127.0.0.1:5187/writing/your-article-slug?lang=zh
http://127.0.0.1:5187/writing/your-article-slug?lang=ja
http://127.0.0.1:5187/writing/your-article-slug?lang=en
```

Check that the language switcher works and all three versions render.

**Step 7: Build locally**

```bash
npm run build
```

The build must pass with no errors before committing.

**Step 8: Commit and push through GitHub Desktop**

Open GitHub Desktop, review the changed files, write a clear commit message, and push to GitHub. Cloudflare Pages will build and deploy automatically.

## Article Publishing Checklist

Before pushing a new article, verify:

- [ ] `zh.mdx`, `ja.mdx`, and `en.mdx` all exist in the article folder
- [ ] All three files have both a YAML frontmatter block and an exported `frontmatter` object
- [ ] `canonicalSlug` is identical across all three language files
- [ ] `language` value is `zh`, `ja`, or `en` in each respective file
- [ ] `title` and `summary` are filled in for each language
- [ ] `status` is `"published"` in all three files
- [ ] Images are placed under `public/images/articles/your-article-slug/`
- [ ] `npm run build` passes with no errors
- [ ] Article page renders at `/writing/your-article-slug`
- [ ] Language switcher works across all three versions

## Publishing With GitHub Desktop and Cloudflare Pages

1. Open GitHub Desktop.
2. Review the changed files.
3. Write a clear commit message, for example:

   ```text
   Add new MDX article
   ```

4. Commit and push to GitHub.
5. Cloudflare Pages will build and deploy from GitHub.

Cloudflare Pages build settings should remain:

```text
Build command: npm run build
Build output directory: dist
```

## Contact Form Email Setup

The Contact form posts to a Cloudflare Pages Function at:

```text
/api/contact
```

The function sends email through the Resend REST API. Configure these environment variables in Cloudflare Pages:

```text
RESEND_API_KEY
CONTACT_TO_EMAIL
CONTACT_FROM_EMAIL
```

In Cloudflare Pages, add them under your project settings:

```text
Settings → Environment variables
```

`CONTACT_FROM_EMAIL` must use a sender address or domain verified in Resend. Local Vite development can render and validate the form UI, but email sending only works when the Pages Function is running with those environment variables configured.
