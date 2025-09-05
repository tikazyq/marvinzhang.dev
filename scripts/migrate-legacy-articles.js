#!/usr/bin/env node

/**
 * Script to migrate legacy blog articles from ./articles to Docusaurus structure
 * Converts .md files to .mdx with proper frontmatter and handles bilingual content
 */

const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');

// Configuration
const DRY_RUN = process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose');

const ROOT_DIR = process.cwd();
const ARTICLES_DIR = path.join(ROOT_DIR, 'articles');
const BLOG_DIR = path.join(ROOT_DIR, 'blog');
const ZH_BLOG_DIR = path.join(ROOT_DIR, 'i18n/zh/docusaurus-plugin-content-blog');

/**
 * Extract slug from article filename
 */
function extractSlugFromArticle(filename) {
  return filename
    .replace(/\.(md|mdx)$/, '')
    .replace(/^\d{4}-\d{2}-\d{2}-/, '')
    .replace(/-en$/, ''); // Remove -en suffix for English versions
}

/**
 * Check if article already exists in current blog structure
 */
async function isArticleAlreadyMigrated(articleFile) {
  const slug = extractSlugFromArticle(articleFile);
  const isEnglish = articleFile.includes('-en.md');
  
  try {
    const targetDir = isEnglish ? BLOG_DIR : ZH_BLOG_DIR;
    const files = await fs.readdir(targetDir);
    
    // Check if any existing file has the same slug
    const hasSlugMatch = files.some(file => {
      const existingSlug = extractSlugFromArticle(file);
      return existingSlug === slug;
    });
    
    if (hasSlugMatch) return true;
    
    // Also check for potential content similarity by reading the article
    const articleContent = await fs.readFile(path.join(ARTICLES_DIR, articleFile), 'utf-8');
    const articleTitle = extractTitleFromContent(articleContent);
    
    // Check if title matches any existing post
    for (const file of files.filter(f => f.endsWith('.mdx'))) {
      try {
        const existingPath = path.join(targetDir, file);
        const existingContent = await fs.readFile(existingPath, 'utf-8');
        const { data: frontmatter } = matter(existingContent);
        
        if (frontmatter.title && frontmatter.title.includes(articleTitle.substring(0, 20))) {
          return true;
        }
      } catch (error) {
        // Skip if can't read file
      }
    }
    
    return false;
  } catch (error) {
    return false;
  }
}

/**
 * Extract title from article content
 */
function extractTitleFromContent(content) {
  // Look for first heading
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : 'Untitled';
}

/**
 * Generate appropriate tags based on content analysis
 */
function generateTags(content, filename) {
  const tags = [];
  const contentLower = content.toLowerCase();
  
  // Analyze content for common topics
  if (contentLower.includes('frontend') || contentLower.includes('前端')) tags.push('frontend');
  if (contentLower.includes('backend') || contentLower.includes('后端')) tags.push('backend');
  if (contentLower.includes('react') || contentLower.includes('vue')) tags.push('frontend', 'javascript');
  if (contentLower.includes('golang') || contentLower.includes('go语言')) tags.push('golang');
  if (contentLower.includes('typescript')) tags.push('typescript', 'javascript');
  if (contentLower.includes('project management') || contentLower.includes('项目管理')) tags.push('project-management');
  if (contentLower.includes('agile') || contentLower.includes('敏捷')) tags.push('project-management', 'agile');
  if (contentLower.includes('ai') || contentLower.includes('artificial intelligence') || contentLower.includes('人工智能')) tags.push('ai');
  if (contentLower.includes('machine learning') || contentLower.includes('机器学习')) tags.push('ai', 'machine-learning');
  if (contentLower.includes('data') || contentLower.includes('数据')) tags.push('data-analysis');
  if (contentLower.includes('github') || contentLower.includes('git')) tags.push('github', 'devops');
  if (contentLower.includes('testing') || contentLower.includes('测试')) tags.push('testing');
  if (contentLower.includes('algorithm') || contentLower.includes('算法')) tags.push('algorithms');
  if (contentLower.includes('distributed') || contentLower.includes('分布式')) tags.push('distributed-systems');
  
  // Default tags if none found
  if (tags.length === 0) {
    tags.push('blog');
  }
  
  // Remove duplicates and limit to 5 tags
  return [...new Set(tags)].slice(0, 5);
}

/**
 * Create proper frontmatter for the article
 */
function createFrontmatter(content, filename) {
  const title = extractTitleFromContent(content);
  const slug = extractSlugFromArticle(filename);
  const tags = generateTags(content, filename);
  
  // Extract date from filename
  const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})/);
  const date = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];
  
  return {
    slug,
    title,
    authors: ['marvin'],
    tags,
    date
  };
}

/**
 * Convert markdown content to mdx and add frontmatter
 */
function convertToMdx(content, filename) {
  // Remove existing title if it matches the first heading
  const title = extractTitleFromContent(content);
  const frontmatter = createFrontmatter(content, filename);
  
  // Remove the first h1 if it matches our title
  const contentWithoutTitle = content.replace(/^#\s+(.+)$/m, (match, heading) => {
    return heading.trim() === title ? '' : match;
  }).trim();
  
  return matter.stringify(contentWithoutTitle, frontmatter);
}

/**
 * Create English placeholder for Chinese-only articles
 */
function createEnglishPlaceholder(chineseContent, filename) {
  const chineseTitle = extractTitleFromContent(chineseContent);
  const slug = extractSlugFromArticle(filename);
  const tags = generateTags(chineseContent, filename);
  
  // Extract date from filename
  const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})/);
  const date = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];
  
  const frontmatter = {
    slug,
    title: `${chineseTitle} (English Translation Needed)`,
    authors: ['marvin'],
    tags: [...tags, 'translation-needed'],
    date
  };
  
  const placeholderContent = `This article is currently available only in Chinese. An English translation is needed.

**Chinese Title:** ${chineseTitle}

**Original Publication Date:** ${date}

**Note:** This is a placeholder post. Please refer to the Chinese version in the language switcher or contribute a translation.

---

*If you would like to contribute an English translation of this article, please feel free to submit a pull request.*`;

  return matter.stringify(placeholderContent, frontmatter);
}

/**
 * Migrate a single article
 */
async function migrateArticle(articleFile) {
  const articlePath = path.join(ARTICLES_DIR, articleFile);
  const isEnglish = articleFile.includes('-en.md');
  
  try {
    // Check if already migrated
    if (await isArticleAlreadyMigrated(articleFile)) {
      console.log(`⏭️  Skipping ${articleFile} - already migrated`);
      return false;
    }
    
    // Read the article content
    const content = await fs.readFile(articlePath, 'utf-8');
    
    // Convert to MDX with frontmatter
    const mdxContent = convertToMdx(content, articleFile);
    
    // Determine target path
    const slug = extractSlugFromArticle(articleFile);
    const dateMatch = articleFile.match(/^(\d{4}-\d{2}-\d{2})/);
    const date = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];
    const newFilename = `${date}-${slug}.mdx`;
    
    const targetDir = isEnglish ? BLOG_DIR : ZH_BLOG_DIR;
    const targetPath = path.join(targetDir, newFilename);
    
    if (VERBOSE) {
      console.log(`${DRY_RUN ? '[DRY RUN] ' : ''}Migrating:`);
      console.log(`  From: ${path.relative(ROOT_DIR, articlePath)}`);
      console.log(`  To: ${path.relative(ROOT_DIR, targetPath)}`);
    }
    
    if (!DRY_RUN) {
      await fs.writeFile(targetPath, mdxContent, 'utf-8');
      console.log(`✅ Migrated: ${articleFile} -> ${newFilename}`);
    } else {
      console.log(`✅ [DRY RUN] Would migrate: ${articleFile} -> ${newFilename}`);
    }
    
    // If this is a Chinese article without an English version, create a placeholder
    if (!isEnglish) {
      const englishArticleFile = articleFile.replace('.md', '-en.md');
      const englishArticlePath = path.join(ARTICLES_DIR, englishArticleFile);
      
      try {
        await fs.access(englishArticlePath);
        // English version exists, will be handled separately
      } catch (error) {
        // No English version, create placeholder
        const englishTargetPath = path.join(BLOG_DIR, newFilename);
        const placeholderContent = createEnglishPlaceholder(content, articleFile);
        
        if (!DRY_RUN) {
          await fs.writeFile(englishTargetPath, placeholderContent, 'utf-8');
          console.log(`📝 Created English placeholder: ${newFilename}`);
        } else {
          console.log(`📝 [DRY RUN] Would create English placeholder: ${newFilename}`);
        }
      }
    }
    
    return true;
  } catch (error) {
    console.error(`❌ Error migrating ${articleFile}:`, error.message);
    return false;
  }
}

/**
 * Main migration function
 */
async function main() {
  console.log('🚀 Starting legacy blog article migration...\n');
  
  if (DRY_RUN) {
    console.log('🔍 DRY RUN MODE - No files will be modified\n');
  }
  
  try {
    // Get all articles
    const articles = await fs.readdir(ARTICLES_DIR);
    const mdArticles = articles.filter(file => file.endsWith('.md'));
    
    console.log(`📁 Found ${mdArticles.length} legacy articles\n`);
    
    let migrated = 0;
    let skipped = 0;
    let errors = 0;
    
    for (const article of mdArticles) {
      const result = await migrateArticle(article);
      if (result === true) {
        migrated++;
      } else if (result === false) {
        skipped++;
      } else {
        errors++;
      }
    }
    
    console.log('\n📊 Migration Summary:');
    console.log(`✅ Migrated: ${migrated}`);
    console.log(`⏭️  Skipped: ${skipped}`);
    console.log(`❌ Errors: ${errors}`);
    
    if (!DRY_RUN && migrated > 0) {
      console.log('\n🎉 Migration completed! Run `npm run build` to verify the results.');
    } else if (DRY_RUN) {
      console.log('\n💡 Run without --dry-run to perform the actual migration.');
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Check if gray-matter is available
try {
  require.resolve('gray-matter');
} catch (error) {
  console.error('❌ Error: gray-matter package is required but not installed.');
  console.error('Please install it with: npm install gray-matter');
  process.exit(1);
}

// Run the migration
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  });
}

module.exports = { main };