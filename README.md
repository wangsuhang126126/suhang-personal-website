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

Do not commit `node_modules` or `dist`.

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

Every `.mdx` file needs frontmatter at the top:

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

## Publishing Workflow

To publish a new article:

1. Create a new folder under `src/content/articles/[slug]`.
2. Add `zh.mdx`, `ja.mdx`, and/or `en.mdx`.
3. Fill in frontmatter.
4. Write the article content in Markdown-style MDX.
5. Use article components only when needed.
6. Preview locally:

   ```bash
   npm run dev -- --host 127.0.0.1 --port 5187
   ```

7. Build locally:

   ```bash
   npm run build
   ```

8. Commit and push through GitHub Desktop.

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
