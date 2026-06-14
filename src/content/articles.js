const mdxModules = import.meta.glob("./articles/**/*.mdx", {
  eager: true,
});

const mdxRawFiles = import.meta.glob("./articles/**/*.mdx", {
  eager: true,
  import: "default",
  query: "?raw",
});

const languagePriority = ["en", "zh", "ja"];

function parseFrontmatterValue(value) {
  const trimmed = value.trim();

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }

  return trimmed.replace(/^["']|["']$/g, "");
}

function MissingArticleComponent() {
  return "This article version could not be loaded.";
}

function getMdxModule(filePath) {
  return (
    mdxModules[filePath] ||
    mdxModules[filePath.replace(/\?raw.*$/, "")] ||
    mdxModules[filePath.replace(/\?import.*$/, "")]
  );
}

function parseMdxFile(raw, filePath, module) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) {
    throw new Error(`Missing frontmatter in ${filePath}`);
  }

  const [, frontmatterText] = match;
  const frontmatter = {};

  frontmatterText.split(/\r?\n/).forEach((line) => {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      return;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1);
    frontmatter[key] = parseFrontmatterValue(value);
  });

  const pathParts = filePath.split("/");
  const fileName = pathParts[pathParts.length - 1] || "";
  const folderSlug = pathParts[pathParts.length - 2] || frontmatter.canonicalSlug;
  const languageFromFile = fileName.replace(/\.mdx$/, "");

  return {
    ...frontmatter,
    Component: module?.default || MissingArticleComponent,
    slug: frontmatter.canonicalSlug || folderSlug,
    language: frontmatter.language || languageFromFile,
    sourcePath: filePath,
  };
}

const articles = Object.entries(mdxRawFiles)
  .map(([filePath, raw]) => parseMdxFile(raw, filePath, getMdxModule(filePath)))
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
