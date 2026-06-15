import React from "react";

const mdxModules = import.meta.glob("./articles/**/*.mdx", {
  eager: true,
});

const languagePriority = ["en", "zh", "ja"];

function MissingArticleComponent() {
  return React.createElement(
    "div",
    { className: "article-error", role: "status" },
    "This article version could not be rendered. Please check the article source file.",
  );
}

function getPathParts(filePath) {
  return String(filePath).split("/");
}

function getArticleLanguage(filePath, frontmatter) {
  const pathParts = getPathParts(filePath);
  const fileName = pathParts[pathParts.length - 1] || "";
  const languageFromFile = fileName.replace(/\.mdx$/, "");
  return frontmatter.language || languageFromFile || "en";
}

function getArticleSlug(filePath, frontmatter) {
  const pathParts = getPathParts(filePath);
  const folderSlug = pathParts[pathParts.length - 2] || "";
  return frontmatter.canonicalSlug || folderSlug;
}

function normalizeArticle(filePath, module) {
  const frontmatter = module?.frontmatter && typeof module.frontmatter === "object" ? module.frontmatter : {};
  const slug = getArticleSlug(filePath, frontmatter);
  const language = getArticleLanguage(filePath, frontmatter);

  return {
    title: frontmatter.title || "Untitled article",
    date: frontmatter.date || "",
    language,
    summary: frontmatter.summary || "No summary has been added yet.",
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    status: frontmatter.status || "draft",
    canonicalSlug: frontmatter.canonicalSlug || slug,
    Component: typeof module?.default === "function" ? module.default : MissingArticleComponent,
    slug,
    sourcePath: filePath,
  };
}

const articles = Object.entries(mdxModules)
  .map(([filePath, module]) => normalizeArticle(filePath, module))
  .filter((article) => {
    if (!article.slug) return false;
    const parts = String(article.sourcePath).split("/");
    return !parts.some((part) => part.startsWith("_"));
  })
  .sort((a, b) => String(b.date).localeCompare(String(a.date)));

const articlesBySlug = articles.reduce((groups, article) => {
  const slug = article.canonicalSlug || article.slug;
  if (!groups[slug]) {
    groups[slug] = {};
  }
  groups[slug][article.language] = article;
  return groups;
}, {});

function pickPreferredVersion(versions, preferredLanguage = "en") {
  return (
    versions[preferredLanguage] ||
    languagePriority.map((language) => versions[language]).find(Boolean) ||
    Object.values(versions)[0] ||
    null
  );
}

export function getArticleIndex(preferredLanguage = "en") {
  return Object.entries(articlesBySlug)
    .map(([slug, versions]) => {
      const article = pickPreferredVersion(versions, preferredLanguage);
      return article
        ? {
            ...article,
            slug,
            availableLanguages: Object.keys(versions),
          }
        : null;
    })
    .filter(Boolean)
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

export function getArticle(slug, language = "en") {
  const versions = articlesBySlug[slug];
  if (!versions) {
    return null;
  }

  const article = pickPreferredVersion(versions, language);
  if (!article) {
    return null;
  }

  return {
    ...article,
    slug,
    requestedLanguage: language,
    availableLanguages: Object.keys(versions),
  };
}

export function getArticleVersions(slug) {
  return articlesBySlug[slug] || {};
}
