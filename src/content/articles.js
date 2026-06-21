import React from "react";

const mdxModules = import.meta.glob("./articles/**/*.mdx", {
  eager: true,
});

const languagePriority = ["en", "zh", "ja"];
const validLanguages = new Set(languagePriority);
const validStatuses = new Set(["published", "draft"]);
const requiredFrontmatterFields = ["title", "date", "language", "summary", "tags", "status", "canonicalSlug"];
const isProductionBuild = import.meta.env.PROD;

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

function isIgnoredArticlePath(filePath) {
  return getPathParts(filePath).some((part) => part.startsWith("_"));
}

function getFolderSlug(filePath) {
  const pathParts = getPathParts(filePath);
  return pathParts[pathParts.length - 2] || "";
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

function getValidationContext(filePath) {
  return `${getFolderSlug(filePath) || "unknown-folder"} (${filePath})`;
}

function assertArticleFrontmatter(filePath, frontmatter) {
  const context = getValidationContext(filePath);

  if (!frontmatter || typeof frontmatter !== "object") {
    throw new Error(`Article frontmatter is missing for ${context}. Export const frontmatter from the MDX file.`);
  }

  const missingFields = requiredFrontmatterFields.filter((field) => {
    if (field === "tags") {
      return !Array.isArray(frontmatter.tags);
    }
    return typeof frontmatter[field] !== "string" || frontmatter[field].trim() === "";
  });

  if (missingFields.length > 0) {
    throw new Error(`Article frontmatter is incomplete for ${context}. Missing or invalid: ${missingFields.join(", ")}.`);
  }

  if (!validLanguages.has(frontmatter.language)) {
    throw new Error(`Article frontmatter has invalid language for ${context}. Use zh, ja, or en.`);
  }

  if (!validStatuses.has(frontmatter.status)) {
    throw new Error(`Article frontmatter has invalid status for ${context}. Use published or draft.`);
  }
}

function validateCanonicalSlugs(articlesToValidate) {
  const articlesByFolder = articlesToValidate.reduce((groups, article) => {
    const folderSlug = getFolderSlug(article.sourcePath);
    if (!groups[folderSlug]) {
      groups[folderSlug] = [];
    }
    groups[folderSlug].push(article);
    return groups;
  }, {});

  Object.entries(articlesByFolder).forEach(([folderSlug, folderArticles]) => {
    const slugValues = [...new Set(folderArticles.map((article) => article.canonicalSlug).filter(Boolean))];

    if (slugValues.length > 1) {
      const details = folderArticles
        .map((article) => `${article.sourcePath}: ${article.canonicalSlug || "(missing)"}`)
        .join("; ");
      throw new Error(
        `Article canonicalSlug mismatch in folder "${folderSlug}". All language versions must share one canonicalSlug. ${details}`,
      );
    }

    const languages = new Set();
    folderArticles.forEach((article) => {
      if (languages.has(article.language)) {
        throw new Error(`Duplicate article language "${article.language}" found in folder "${folderSlug}".`);
      }
      languages.add(article.language);
    });
  });
}

function normalizeArticle(filePath, module) {
  const frontmatter = module?.frontmatter && typeof module.frontmatter === "object" ? module.frontmatter : {};
  assertArticleFrontmatter(filePath, frontmatter);
  const slug = getArticleSlug(filePath, frontmatter);
  const language = getArticleLanguage(filePath, frontmatter);

  return {
    title: frontmatter.title || "Untitled article",
    date: frontmatter.date || "",
    language,
    summary: frontmatter.summary || "No summary has been added yet.",
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    status: frontmatter.status || "draft",
    image: typeof frontmatter.image === "string" ? frontmatter.image : "",
    canonicalSlug: frontmatter.canonicalSlug || slug,
    Component: typeof module?.default === "function" ? module.default : MissingArticleComponent,
    slug,
    sourcePath: filePath,
  };
}

const allArticles = Object.entries(mdxModules)
  .filter(([filePath]) => !isIgnoredArticlePath(filePath))
  .map(([filePath, module]) => normalizeArticle(filePath, module))
  .filter((article) => article.slug)
  .sort((a, b) => String(b.date).localeCompare(String(a.date)));

validateCanonicalSlugs(allArticles);

const articles = allArticles.filter((article) => !isProductionBuild || article.status === "published");

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
