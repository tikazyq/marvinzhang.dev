// Utility functions for handling multilingual posts with new structure: /<locale>/<yyyy-mm>/<post-slug>

export const getPostLanguageFromPath = (path) => {
  // Extract locale from path: /zh/2022-09/agile-practice -> 'zh'
  if (path.startsWith('/zh/')) {
    return 'zh'
  } else if (path.startsWith('/en/')) {
    return 'en'
  }
  return 'zh' // default
}

export const getPostSlugFromPath = (path) => {
  // Extract slug from path: /zh/2022-09/agile-practice -> 'agile-practice'
  const pathParts = path.split('/')
  return pathParts[pathParts.length - 1]
}

export const getDateFromPath = (path) => {
  // Extract date from path: /zh/2022-09/agile-practice -> '2022-09'
  const pathParts = path.split('/')
  if (pathParts.length >= 3) {
    return pathParts[2]
  }
  return null
}

export const buildPostPath = (locale, date, slug) => {
  // Build path: ('en', '2022-09', 'agile-practice') -> '/en/2022-09/agile-practice'
  return `/${locale}/${date}/${slug}`
}

export const getAlternateLanguagePath = (currentPath, targetLocale) => {
  // Convert path to alternate language
  const currentLocale = getPostLanguageFromPath(currentPath)
  const date = getDateFromPath(currentPath)
  const slug = getPostSlugFromPath(currentPath)
  
  if (currentLocale === targetLocale) {
    return currentPath // No change needed
  }
  
  return buildPostPath(targetLocale, date, slug)
}

export const filterPostsByLanguage = (posts, locale) => {
  return posts.filter(post => {
    const postLang = getPostLanguageFromPath(post.route)
    return postLang === locale
  })
}

export const getAllPostsGroupedByLanguage = (posts) => {
  const grouped = {
    zh: [],
    en: []
  }
  
  posts.forEach(post => {
    const lang = getPostLanguageFromPath(post.route)
    if (grouped[lang]) {
      grouped[lang].push(post)
    }
  })
  
  return grouped
}