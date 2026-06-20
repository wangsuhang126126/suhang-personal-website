# Project Notes

## Project

- Project name: Suhang Personal Website
- Production domain: https://suhangwang.com
- GitHub repository: https://github.com/wangsuhang126126/suhang-personal-website
- Deployment platform: Cloudflare Pages
- Build command: `npm run build`
- Build output directory: `dist`

## Tech Stack

- Vite
- React
- MDX via `@mdx-js/rollup` and `@mdx-js/react`
- Plain CSS design system in `src/index.css`
- Cloudflare Pages static deployment from GitHub

## Main Folder Structure

```text
src/
  App.jsx
  components/
  components/mdx/
  content/
    articles/
  hooks/
  pages/
public/
  images/
```

## Current Page Structure

- `/` - Homepage with Hero, Perspective, Energy Flow Interlude, Energy, Technology, Writing Preview, and full Contact form section.
- `/writing` - Writing index generated from MDX article metadata.
- `/writing/[slug]?lang=zh|ja|en` - Multilingual article detail page.
- `/about` - About page with personal copy, photography, and image lightbox.
- `/journey` - Journey page.
- `/lab` - Lab project hub.
- `/contact` - Standalone Contact page with contact form.
- `/#contact` - Homepage Contact form anchor retained for backwards compatibility.

Note: top navigation Contact should point to `/contact`. Do not repeat the full homepage Contact section on About, Writing, Journey, Lab, or Contact pages.

## MDX Multilingual Article System

Articles live in:

```text
src/content/articles/[slug]/
```

Each article topic gets one folder. Each language version is a separate MDX file:

```text
src/content/articles/[slug]/zh.mdx
src/content/articles/[slug]/ja.mdx
src/content/articles/[slug]/en.mdx
```

Each MDX file should keep normal YAML frontmatter for readability and must also explicitly export `frontmatter` metadata for the React article index:

```mdx
---
title: "Article title"
date: "2026-06-14"
language: "en"
summary: "Short summary."
tags: ["Energy", "Japan"]
status: "published"
canonicalSlug: "article-slug"
---

export const frontmatter = {
  title: "Article title",
  date: "2026-06-14",
  language: "en",
  summary: "Short summary.",
  tags: ["Energy", "Japan"],
  status: "published",
  canonicalSlug: "article-slug",
};
```

The shared `canonicalSlug` connects `zh`, `ja`, and `en` versions of the same article. Missing language versions should be handled gracefully by the article page.

## Contact Form Status

The homepage Contact section and standalone `/contact` page use a visible contact form instead of displaying an email address directly. The form posts to a Cloudflare Pages Function at `/api/contact`, which sends messages through the Resend REST API.

Required Cloudflare Pages environment variables:

```text
RESEND_API_KEY
CONTACT_TO_EMAIL
CONTACT_FROM_EMAIL
```

`CONTACT_FROM_EMAIL` must use a sender address or domain verified in Resend. Local Vite development can render and validate the form UI, but email sending only works when the Pages Function is running with those environment variables configured.

Contact duplicate/rate-limit protection requires a Cloudflare KV namespace bound to the Pages project:

```text
CONTACT_RATE_LIMIT
```

The Pages Function at `functions/api/contact.js` uses this KV binding before sending through Resend. It rejects repeated submissions from the same IP within 60 seconds, allows at most 3 submissions from the same email within 10 minutes, and rejects duplicate normalized message content within 10 minutes. If the KV binding is missing, the Contact API returns a service-unavailable error instead of silently sending without protection.

## Important Recent Bug Fixes

- Fixed a production black-screen crash caused by `f.match is not a function`.
- Root cause: the MDX article system tried to parse raw MDX content with `.match()`, but production builds could provide a non-string module shape.
- Current fix: MDX files explicitly export `frontmatter`, and `src/content/articles.js` reads metadata from MDX module objects instead of parsing raw MDX strings.
- Do not reintroduce raw MDX `.match()` parsing.

## Known Pitfalls

- Work only in `/Users/frankm5air/Documents/GitHub/suhang-personal-website`.
- Do not modify `/Users/frankm5air/Documents/suhang-personal-website`; it is an older copied folder.
- Keep Cloudflare Pages output as `dist`.
- If dependencies change, update both `package.json` and `package-lock.json`.
- Do not expose a raw email address on the public site.
- Preserve theme persistence and light/dark support.
- Preserve the MDX `frontmatter` export approach.

## Do Not Commit

Never commit:

```text
node_modules
dist
.DS_Store
.env
```

These should remain ignored by `.gitignore`.

## Local Development Commands

Install dependencies:

```bash
npm install
```

Run local development server:

```bash
npm run dev -- --host 127.0.0.1 --port 5187
```

Build locally:

```bash
npm run build
```

## Deployment Workflow

1. Make small, scoped changes in the GitHub-managed repository folder.
2. Run `npm run build`.
3. Review changed files in GitHub Desktop.
4. Do not commit ignored/generated files.
5. Commit with a clear summary.
6. Push to GitHub.
7. Cloudflare Pages builds with `npm run build` and deploys `dist`.

## Recommended Future Workflow

- Keep changes focused and incremental.
- Verify homepage, Writing, About, Journey, Lab, and article detail pages after changes.
- Add articles by creating or updating MDX files under `src/content/articles/[slug]/`.
- Keep article metadata synchronized between YAML frontmatter and the exported `frontmatter` object.
- Run `npm run build` before every handoff.

## Claude Code Handoff

- Work only in the GitHub-managed repository folder.
- Do not modify copied folders.
- Always confirm the active working directory before editing.
- Always run `npm run build` before completing a task.
- Preserve Cloudflare Pages compatibility.
- Preserve the MDX frontmatter approach.
- Do not reintroduce raw MDX `.match()` parsing.
- Do not commit `node_modules`, `dist`, `.DS_Store`, or `.env`.
- If dependencies change, update `package-lock.json`.
- Prefer small, scoped changes.
- Do not redesign or rebuild the whole site unless explicitly asked.
