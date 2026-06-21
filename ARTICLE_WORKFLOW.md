# Article Publishing Workflow

This document records the standard workflow for publishing articles on the current Vite / React / MDX personal website.

Do not use this document to introduce Astro, SSG, SSR, or path-based language migration plans. The current article system uses MDX files under `src/content/articles/` and language switching through `?lang=en`, `?lang=zh`, and `?lang=ja`.

## 1. Decide the Article Type

Before creating a new article, decide which category it belongs to.

### Industry / Policy / Product / Subsidy / Market Analysis

Use this category for articles involving:

- energy
- residential energy storage
- solar
- Powerwall
- Japan residential energy market
- policy
- subsidies
- prices
- product specifications
- market data
- competitor analysis
- product or market-related judgments

These articles should use the full industry disclaimer.

### Personal Essay / Travel / Daily Life

Use this category for:

- personal essays
- travel notes
- daily life reflections
- personal records
- lighter observations that do not depend on specific public data, policy details, subsidies, prices, product specs, or market numbers

These articles do not include an AI-use note by default.

## 2. Choose the Correct Template

Use the template that matches the article type.

```text
Industry articles:
src/content/articles/_template/

Personal articles:
src/content/articles/_personal-template/
```

Copy the template folder, then rename the copied folder to the new article slug.

Example:

```text
src/content/articles/my-new-article/
```

Use lowercase letters and hyphens for folder names.

## 3. Create the Three Language Files

Each article topic should have one folder with one MDX file per language:

```text
src/content/articles/[slug]/en.mdx
src/content/articles/[slug]/zh.mdx
src/content/articles/[slug]/ja.mdx
```

Language rules:

- `en.mdx` must use `language: "en"`
- `zh.mdx` must use `language: "zh"`
- `ja.mdx` must use `language: "ja"`
- `canonicalSlug` must be identical across all language versions
- the shared `canonicalSlug` should normally match the folder name

The build validates language values and canonical slug consistency. If the values do not match, `npm run build` will fail.

## 4. Fill Required Frontmatter

Each MDX file must include the same metadata in two places:

1. the YAML frontmatter block at the top
2. the exported `frontmatter` object below it

Required fields used by the current article loader:

```mdx
---
title: "Article title"
date: "2026-06-14"
language: "en"
summary: "Short article summary."
tags: ["Energy", "Japan"]
status: "draft"
canonicalSlug: "article-slug"
---

export const frontmatter = {
  title: "Article title",
  date: "2026-06-14",
  language: "en",
  summary: "Short article summary.",
  tags: ["Energy", "Japan"],
  status: "draft",
  canonicalSlug: "article-slug",
};
```

Current required fields:

- `title`
- `date`
- `language`
- `summary`
- `tags`
- `status`
- `canonicalSlug`

Do not replace the exported `frontmatter` object with raw MDX string parsing.

## 5. Draft and Published Rules

Use:

```text
status: "draft"
```

while preparing an article.

Use:

```text
status: "published"
```

when the article is ready to go public.

Current behavior:

- local development can show draft articles for preview
- production builds only include articles with `status === "published"`
- draft articles do not appear in the production Writing index
- draft articles are not available through normal production article routing

Before publishing, update `status` from `draft` to `published` in both the YAML frontmatter block and the exported `frontmatter` object for each language file.

## 6. Disclaimer Rules

### Industry Articles

Industry / policy / product / subsidy / market analysis articles should use the full industry disclaimer.

This includes articles involving energy, storage, Powerwall, Japan residential energy markets, policy, subsidies, prices, product specifications, market data, competitor analysis, or similar factual / market-related claims.

The current industry template already includes the full disclaimer in Chinese, Japanese, and English.

### Personal Articles

Personal essays, travel notes, and daily life articles do not include an AI-use note by default.

These articles can remain closer to personal expression. They do not need a default footer explaining AI involvement.

If a personal article contains specific public data, product specs, policy details, subsidies, market numbers, or similar claims, consider using the full industry disclaimer.

If a personal article needs a special note for a particular reason, add a short manual writing note. Do not make that the default rule for all personal articles.

## 7. Write and Review the Article

Recommended working order:

1. Draft the Chinese version first if that is the natural source language.
2. Create Japanese and English versions from the same core article.
3. Check that the three versions use the same `canonicalSlug`.
4. Check that each language file uses the correct `language` value.
5. Check links, headings, lists, quotes, and MDX components.
6. Confirm the article type and disclaimer choice.

Approved article components include:

- `Callout`
- `ArticleImage`
- `VideoEmbed`
- `DataCard`

Place article images under:

```text
public/images/articles/[article-slug]/
```

## 8. Run the Production Build

Before committing, run:

```bash
npm run build
```

This simulates the Cloudflare Pages production build and checks that MDX, React, and Vite can build successfully.

If the build fails:

- do not ignore the error
- fix the MDX, frontmatter, canonical slug, or React issue
- run `npm run build` again
- commit only after the build passes

## 9. Preview Locally

Run:

```bash
npm run dev -- --host 127.0.0.1 --port 5187
```

If port `5187` is busy, Vite may use another nearby port.

Check:

```text
/writing
/writing/[article-slug]?lang=en
/writing/[article-slug]?lang=zh
/writing/[article-slug]?lang=ja
```

Confirm:

- the Writing index renders
- the article page renders
- language switching works
- draft / published status is correct
- disclaimer behavior matches the article type
- the layout does not look broken

## 10. Check Files Before Committing

Do not commit:

```text
node_modules
dist
.DS_Store
.env
.claude
.idea
*.iml
.vscode
```

Do not commit `package-lock.json` unless dependencies were intentionally changed.

For ordinary article publishing, `package.json` and `package-lock.json` should not change.

## 11. GitHub Desktop Workflow

1. Open GitHub Desktop.
2. Check the changed files carefully.
3. Confirm no generated or local-only files are included.
4. Write a clear commit message.
5. Commit.
6. Push to GitHub.
7. Wait for Cloudflare Pages to build and deploy automatically.
8. After deployment, open the production article page and check all available languages.

Suggested commit message format:

```text
Add article: [article title]
```

or:

```text
Update article workflow documentation
```

## 12. Final Publishing Checklist

Before pushing:

- [ ] correct template used
- [ ] `en.mdx`, `zh.mdx`, and `ja.mdx` are present when all languages are ready
- [ ] `language` is correct in each file
- [ ] `canonicalSlug` is identical across languages
- [ ] required frontmatter fields are complete
- [ ] YAML frontmatter and exported `frontmatter` object match
- [ ] `status` is `published` when ready
- [ ] disclaimer rule matches the article type
- [ ] `npm run build` passes
- [ ] local preview pages render
- [ ] GitHub Desktop changed files look clean
