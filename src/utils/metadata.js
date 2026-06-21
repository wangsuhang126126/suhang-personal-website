import { getArticle } from "../content/articles.js";

const siteUrl = "https://suhangwang.com";
const siteName = "Suhang Wang (Frank)";
const defaultImage = `${siteUrl}/og-default.png`;

const pageCopy = {
  en: {
    home: {
      title: "Suhang Wang (Frank) | Energy, Technology, Japan",
      description:
        "Personal website of Suhang Wang, focused on energy systems, technology, Japan market observations, writing, and small digital projects.",
    },
    writing: {
      title: "Writing | Suhang Wang (Frank)",
      description: "Essays and notes on energy systems, technology, Japan, AI tools, and personal projects.",
    },
    about: {
      title: "About | Suhang Wang (Frank)",
      description: "About Suhang Wang, his path across China, Japan, energy, technology, and personal creative work.",
    },
    journey: {
      title: "Journey | Suhang Wang (Frank)",
      description: "A career path shaped by China, Japan, energy, technology, international business, and AI.",
    },
    lab: {
      title: "Lab | Suhang Wang (Frank)",
      description: "Tools, experiments, and small systems around energy, AI-assisted prototypes, and personal digital projects.",
    },
    contact: {
      title: "Contact | Suhang Wang (Frank)",
      description: "Contact Suhang Wang for relevant conversations around energy, technology, Japan, and practical collaboration.",
    },
    notFound: {
      title: "Page Not Found | Suhang Wang (Frank)",
      description: "The page you are looking for may have moved or does not exist.",
    },
  },
  zh: {
    home: {
      title: "王苏杭 | 能源、技术与日本观察",
      description: "王苏杭的个人网站，记录能源系统、技术、日本市场观察、写作和小型数字项目。",
    },
    writing: {
      title: "Writing | 王苏杭",
      description: "关于能源系统、技术、日本、AI 工具和个人项目的文章与笔记。",
    },
    about: {
      title: "关于 | 王苏杭",
      description: "关于王苏杭，以及他在中国、日本、能源、技术和个人创作之间逐渐形成的路径。",
    },
    journey: {
      title: "Journey | 王苏杭",
      description: "一条由中国、日本、能源、技术、国际商务和 AI 共同塑造的职业路径。",
    },
    lab: {
      title: "Lab | 王苏杭",
      description: "放置能源工具、AI 辅助原型、小型数字项目和个人实验的空间。",
    },
    contact: {
      title: "联系 | 王苏杭",
      description: "围绕能源、技术、日本和具体合作，与王苏杭联系。",
    },
    notFound: {
      title: "页面不存在 | 王苏杭",
      description: "你访问的页面可能已经移动，或暂时不存在。",
    },
  },
  ja: {
    home: {
      title: "王 蘇杭（おう そこう） | エネルギー、テクノロジー、日本",
      description:
        "王 蘇杭（おう そこう）の個人サイト。エネルギーシステム、テクノロジー、日本市場の観察、文章、小さなデジタルプロジェクトをまとめています。",
    },
    writing: {
      title: "Writing | 王 蘇杭（おう そこう）",
      description: "エネルギーシステム、テクノロジー、日本、AI ツール、個人プロジェクトに関する文章とメモ。",
    },
    about: {
      title: "About | 王 蘇杭（おう そこう）",
      description: "中国、日本、エネルギー、テクノロジー、個人的な創作をまたぐ王 蘇杭（おう そこう）の歩み。",
    },
    journey: {
      title: "Journey | 王 蘇杭（おう そこう）",
      description: "中国、日本、エネルギー、テクノロジー、国際ビジネス、AI によって形づくられてきたキャリアの道筋。",
    },
    lab: {
      title: "Lab | 王 蘇杭（おう そこう）",
      description: "エネルギー関連ツール、AI を使った試作、小さなデジタルプロジェクト、個人的な実験の場所。",
    },
    contact: {
      title: "Contact | 王 蘇杭（おう そこう）",
      description: "エネルギー、テクノロジー、日本、具体的な協力について王 蘇杭（おう そこう）に連絡する。",
    },
    notFound: {
      title: "ページが見つかりません | 王 蘇杭（おう そこう）",
      description: "お探しのページは移動したか、存在しない可能性があります。",
    },
  },
};

function getCopy(lang) {
  return pageCopy[lang] || pageCopy.en;
}

function ensureMeta(selector, createAttributes) {
  const existing = document.querySelector(selector);
  if (existing) return existing;

  const meta = document.createElement("meta");
  Object.entries(createAttributes).forEach(([key, value]) => meta.setAttribute(key, value));
  document.head.appendChild(meta);
  return meta;
}

function setMetaByName(name, content) {
  ensureMeta(`meta[name="${name}"]`, { name }).setAttribute("content", content);
}

function setMetaByProperty(property, content) {
  ensureMeta(`meta[property="${property}"]`, { property }).setAttribute("content", content);
}

function setCanonical(url) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

function removeMetaByProperty(property) {
  document.querySelector(`meta[property="${property}"]`)?.remove();
}

function buildUrl(pathname, lang) {
  const url = new URL(pathname || "/", siteUrl);
  if (lang && lang !== "en") {
    url.searchParams.set("lang", lang);
  }
  return url.href;
}

function pageKeyFromPath(pathname) {
  if (pathname === "/") return "home";
  if (pathname === "/writing") return "writing";
  if (pathname === "/about") return "about";
  if (pathname === "/journey") return "journey";
  if (pathname === "/lab") return "lab";
  if (pathname === "/contact") return "contact";
  return "notFound";
}

export function getPageMetadata(pathname, lang) {
  const key = pageKeyFromPath(pathname);
  const copy = getCopy(lang)[key] || getCopy(lang).home;

  return {
    title: copy.title,
    description: copy.description,
    type: "website",
    url: buildUrl(pathname, lang),
    image: defaultImage,
  };
}

export function getArticleMetadata(slug, lang) {
  const article = getArticle(slug, lang);
  if (!article) {
    return getPageMetadata(`/writing/${slug}`, lang);
  }

  const url = buildUrl(`/writing/${article.slug}`, article.requestedLanguage || lang || article.language);

  return {
    title: `${article.title} | ${siteName}`,
    description: article.summary,
    type: "article",
    url,
    image: article.image || defaultImage,
    publishedTime: article.date || "",
    tags: Array.isArray(article.tags) ? article.tags : [],
  };
}

export function applyMetadata(metadata) {
  const title = metadata.title || pageCopy.en.home.title;
  const description = metadata.description || pageCopy.en.home.description;
  const url = metadata.url || siteUrl;
  const image = metadata.image || defaultImage;
  const type = metadata.type || "website";

  document.title = title;
  setCanonical(url);
  setMetaByName("description", description);

  setMetaByProperty("og:title", title);
  setMetaByProperty("og:description", description);
  setMetaByProperty("og:type", type);
  setMetaByProperty("og:url", url);
  setMetaByProperty("og:site_name", siteName);
  setMetaByProperty("og:image", image);
  setMetaByProperty("og:image:alt", siteName);
  setMetaByProperty("og:image:width", "1200");
  setMetaByProperty("og:image:height", "630");

  setMetaByName("twitter:card", "summary_large_image");
  setMetaByName("twitter:title", title);
  setMetaByName("twitter:description", description);
  setMetaByName("twitter:image", image);

  if (type === "article" && metadata.publishedTime) {
    setMetaByProperty("article:published_time", metadata.publishedTime);
  } else {
    removeMetaByProperty("article:published_time");
  }
}
