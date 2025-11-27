#!/usr/bin/env node

/**
 * Minimal Blog Tags Standardization Script
 * 
 * This script does ONLY essential fixes:
 * 1. Convert YAML list format to array format ["tag1", "tag2"]
 * 2. Replace deprecated "da" with "data-analysis"
 * 3. Replace deprecated "algorithm" with "algorithms"
 * 4. Remove invalid tags that aren't in the official tags.yml
 * 5. NO content-based additions (keep existing tags only)
 */

const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');

// Configuration
const DRY_RUN = process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose');

const BLOG_PATHS = [
  'blog',
  'i18n/zh/docusaurus-plugin-content-blog'
];

const ROOT_DIR = process.cwd();

// Simple tag mapping for known issues ONLY
const TAG_MAPPING = {
  'da': 'data-analysis',
  'algorithm': 'algorithms'
};

// Valid standardized tags (from tags.yml)
const VALID_TAGS = new Set([
  'ai', 'agile', 'automation', 'algorithms', 'architecture', 'backend', 'blog',
  'complexity', 'crawlab', 'deepseek', 'csharp', 'data-analysis', 'devops',
  'docusaurus', 'distributed-systems', 'frontend', 'github', 'golang',
  'javascript', 'llm', 'machine-learning', 'nextjs', 'project-management',
  'react', 'software-engineering', 'technical-management', 'testing',
  'translation-needed', 'typescript', 'vue', 'vercel'
]);

/**
 * Parse frontmatter from MDX file
 */
async function parseFrontmatter(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const parsed = matter(content);
    return {
      frontmatter: parsed.data,
      content: parsed.content,
      originalContent: content
    };
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Normalize tag format from YAML list to array
 */
function normalizeTagsFormat(tags) {
  if (!tags) return [];
  
  // If already an array, return as-is
  if (Array.isArray(tags)) {
    return tags.map(tag => String(tag).trim());
  }
  
  // If it's a string, try to parse it
  if (typeof tags === 'string') {
    return tags.split(',').map(tag => tag.trim());
  }
  
  return [];
}

/**
 * Apply simple tag mapping and validation ONLY
 */
function standardizeTags(tags) {
  return tags.map(tag => {
    const normalized = tag.toLowerCase().trim();
    return TAG_MAPPING[normalized] || normalized;
  }).filter(tag => VALID_TAGS.has(tag));
}

/**
 * Update frontmatter with standardized tags
 */
function updateFrontmatter(originalContent, frontmatter, newTags) {
  const parsed = matter(originalContent);
  parsed.data.tags = newTags;
  
  return matter.stringify(parsed.content, parsed.data);
}

/**
 * Process a single blog file
 */
async function processFile(filePath) {
  const fileData = await parseFrontmatter(filePath);
  if (!fileData) return false;
  
  const { frontmatter, content, originalContent } = fileData;
  
  // Get current tags and normalize format
  const currentTags = normalizeTagsFormat(frontmatter.tags);
  
  // Apply ONLY mapping and validation (no content-based additions)
  const standardizedTags = standardizeTags(currentTags);
  
  // Check if changes are needed
  const originalArray = Array.isArray(frontmatter.tags) ? frontmatter.tags : currentTags;
  const needsFormatUpdate = !Array.isArray(frontmatter.tags);
  const needsContentUpdate = JSON.stringify(originalArray.sort()) !== JSON.stringify(standardizedTags.sort());
  
  if (needsFormatUpdate || needsContentUpdate) {
    const relativePath = path.relative(ROOT_DIR, filePath);
    
    if (VERBOSE || DRY_RUN) {
      console.log(`\n📝 ${relativePath}`);
      console.log(`   Current: [${currentTags.join(', ')}]`);
      console.log(`   Updated: [${standardizedTags.join(', ')}]`);
      
      if (needsFormatUpdate) {
        console.log(`   🔧 Format: YAML list → array`);
      }
      
      // Show mapping changes
      const mappedTags = [];
      for (let i = 0; i < currentTags.length; i++) {
        const original = currentTags[i];
        const mapped = TAG_MAPPING[original.toLowerCase()];
        if (mapped && mapped !== original) {
          mappedTags.push(`"${original}" → "${mapped}"`);
        }
      }
      
      if (mappedTags.length > 0) {
        console.log(`   🔧 Mapped: ${mappedTags.join(', ')}`);
      }
      
      // Show removed invalid tags
      const invalidTags = currentTags.filter(tag => !VALID_TAGS.has(TAG_MAPPING[tag.toLowerCase()] || tag.toLowerCase()));
      if (invalidTags.length > 0) {
        console.log(`   ❌ Removed invalid: [${invalidTags.join(', ')}]`);
      }
    }
    
    if (!DRY_RUN) {
      const updatedContent = updateFrontmatter(originalContent, frontmatter, standardizedTags);
      await fs.writeFile(filePath, updatedContent, 'utf-8');
    }
    
    return true;
  }
  
  return false;
}

/**
 * Process all files in a blog directory
 */
async function processBlogDirectory(blogDir) {
  const fullPath = path.join(ROOT_DIR, blogDir);
  
  try {
    const entries = await fs.readdir(fullPath, { withFileTypes: true });
    const mdxFiles = entries
      .filter(entry => entry.isFile() && entry.name.endsWith('.mdx'))
      .map(entry => path.join(fullPath, entry.name));
    
    console.log(`\n📁 Processing ${blogDir} (${mdxFiles.length} files)`);
    
    let updatedCount = 0;
    
    for (const filePath of mdxFiles) {
      const wasUpdated = await processFile(filePath);
      if (wasUpdated) updatedCount++;
    }
    
    console.log(`✅ ${blogDir}: ${updatedCount}/${mdxFiles.length} files updated`);
    return updatedCount;
    
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`⚠️  Directory ${blogDir} does not exist, skipping...`);
    } else {
      console.error(`❌ Error processing ${blogDir}:`, error.message);
    }
    return 0;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🏷️  Minimal Blog Tags Standardization');
  console.log('======================================');
  
  if (DRY_RUN) {
    console.log('🔍 DRY RUN MODE - No files will be modified');
  }
  
  console.log('\nMinimal changes only:');
  console.log('- Format: Convert YAML lists to ["tag1", "tag2"] arrays');
  console.log('- Fix: "da" → "data-analysis", "algorithm" → "algorithms"');
  console.log('- Clean: Remove invalid tags not in tags.yml');
  console.log('- Preserve: Keep all existing valid tags unchanged');
  console.log('- No additions: Zero content-based tag suggestions');
  
  let totalUpdated = 0;
  
  for (const blogPath of BLOG_PATHS) {
    const updated = await processBlogDirectory(blogPath);
    totalUpdated += updated;
  }
  
  console.log(`\n🎉 Minimal standardization complete!`);
  console.log(`📊 Total files updated: ${totalUpdated}`);
  
  if (DRY_RUN) {
    console.log('\n💡 Run without --dry-run to apply changes');
  } else {
    console.log('\n✨ Blog tags have been minimally standardized!');
  }
}

// Check dependencies
try {
  require.resolve('gray-matter');
} catch (error) {
  console.error('❌ Error: gray-matter package is required but not installed.');
  console.error('Please install it with: pnpm add gray-matter');
  process.exit(1);
}

// Run the script
main().catch(error => {
  console.error('❌ Tag standardization failed:', error);
  process.exit(1);
});