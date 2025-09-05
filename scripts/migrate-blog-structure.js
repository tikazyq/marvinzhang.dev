#!/usr/bin/env node

/**
 * Migration script to flatten blog structure from nested folders to flat structure
 * Converts from: blog/YYYY/MM/post-slug.mdx
 * To: blog/YYYY-MM-DD-post-slug.mdx
 * 
 * Handles both English (blog/) and Chinese (i18n/zh/docusaurus-plugin-content-blog/) content
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

/**
 * Parse frontmatter from an MDX file to extract date
 */
async function parseFrontmatter(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const { data } = matter(content);
    return data;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Get all .mdx files in nested structure
 */
async function findNestedMdxFiles(blogDir) {
  const fullBlogPath = path.join(ROOT_DIR, blogDir);
  const files = [];
  
  try {
    const entries = await fs.readdir(fullBlogPath, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory() && /^\d{4}$/.test(entry.name)) {
        // Year directory
        const yearPath = path.join(fullBlogPath, entry.name);
        const monthEntries = await fs.readdir(yearPath, { withFileTypes: true });
        
        for (const monthEntry of monthEntries) {
          if (monthEntry.isDirectory() && /^\d{2}$/.test(monthEntry.name)) {
            // Month directory
            const monthPath = path.join(yearPath, monthEntry.name);
            const postEntries = await fs.readdir(monthPath, { withFileTypes: true });
            
            for (const postEntry of postEntries) {
              if (postEntry.isFile() && postEntry.name.endsWith('.mdx')) {
                const originalPath = path.join(monthPath, postEntry.name);
                const relativePath = path.relative(ROOT_DIR, originalPath);
                files.push({
                  originalPath,
                  relativePath,
                  year: entry.name,
                  month: monthEntry.name,
                  filename: postEntry.name,
                  blogDir
                });
              }
            }
          }
        }
      }
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error(`Error reading directory ${fullBlogPath}:`, error.message);
    }
  }
  
  return files;
}

/**
 * Format date as YYYY-MM-DD
 */
function formatDate(dateInput) {
  let date;
  
  if (dateInput instanceof Date) {
    date = dateInput;
  } else if (typeof dateInput === 'string') {
    date = new Date(dateInput);
  } else {
    return null;
  }
  
  if (isNaN(date.getTime())) {
    return null;
  }
  
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
}

/**
 * Extract slug from filename
 */
function extractSlug(filename) {
  return filename.replace('.mdx', '');
}

/**
 * Create new filename with date prefix
 */
function createNewFilename(frontmatter, originalSlug, fallbackYear, fallbackMonth) {
  let formattedDate;
  
  if (frontmatter && frontmatter.date) {
    formattedDate = formatDate(frontmatter.date);
  }
  
  // Fallback to year/month from directory structure if date parsing fails
  if (!formattedDate) {
    // Assume day 01 if we can't parse the date
    const fallbackDateStr = `${fallbackYear}-${fallbackMonth}-01`;
    formattedDate = fallbackDateStr;
    console.warn(`Warning: Could not parse date for ${originalSlug}, using fallback: ${formattedDate}`);
  }
  
  return `${formattedDate}-${originalSlug}.mdx`;
}

/**
 * Migrate a single file
 */
async function migrateFile(fileInfo) {
  const { originalPath, blogDir, year, month, filename } = fileInfo;
  
  // Parse frontmatter to get date
  const frontmatter = await parseFrontmatter(originalPath);
  if (!frontmatter) {
    console.error(`Skipping ${originalPath}: Could not parse frontmatter`);
    return false;
  }
  
  // Extract slug and create new filename
  const originalSlug = extractSlug(filename);
  const newFilename = createNewFilename(frontmatter, originalSlug, year, month);
  
  // Create new path (flat structure)
  const newPath = path.join(ROOT_DIR, blogDir, newFilename);
  
  if (VERBOSE) {
    console.log(`${DRY_RUN ? '[DRY RUN] ' : ''}Migrating:`);
    console.log(`  From: ${fileInfo.relativePath}`);
    console.log(`  To:   ${path.relative(ROOT_DIR, newPath)}`);
  }
  
  // Check if target file already exists
  try {
    await fs.access(newPath);
    console.warn(`Warning: Target file already exists: ${path.relative(ROOT_DIR, newPath)}`);
    return false;
  } catch (error) {
    // File doesn't exist, which is what we want
  }
  
  if (!DRY_RUN) {
    try {
      // Copy file to new location
      await fs.copyFile(originalPath, newPath);
      
      // Remove original file
      await fs.unlink(originalPath);
      
      console.log(`✓ Migrated: ${path.relative(ROOT_DIR, newPath)}`);
      return true;
    } catch (error) {
      console.error(`Error migrating ${originalPath}:`, error.message);
      return false;
    }
  } else {
    console.log(`✓ [DRY RUN] Would migrate: ${path.relative(ROOT_DIR, newPath)}`);
    return true;
  }
}

/**
 * Clean up empty directories
 */
async function cleanupEmptyDirectories(blogDir) {
  const fullBlogPath = path.join(ROOT_DIR, blogDir);
  
  try {
    const entries = await fs.readdir(fullBlogPath, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory() && /^\d{4}$/.test(entry.name)) {
        const yearPath = path.join(fullBlogPath, entry.name);
        
        try {
          const monthEntries = await fs.readdir(yearPath, { withFileTypes: true });
          
          // Remove empty month directories
          for (const monthEntry of monthEntries) {
            if (monthEntry.isDirectory() && /^\d{2}$/.test(monthEntry.name)) {
              const monthPath = path.join(yearPath, monthEntry.name);
              
              try {
                const monthContents = await fs.readdir(monthPath);
                if (monthContents.length === 0) {
                  if (!DRY_RUN) {
                    await fs.rmdir(monthPath);
                    console.log(`✓ Removed empty directory: ${path.relative(ROOT_DIR, monthPath)}`);
                  } else {
                    console.log(`✓ [DRY RUN] Would remove empty directory: ${path.relative(ROOT_DIR, monthPath)}`);
                  }
                }
              } catch (error) {
                // Directory might not be empty or not exist
              }
            }
          }
          
          // Remove empty year directory
          const yearContents = await fs.readdir(yearPath);
          if (yearContents.length === 0) {
            if (!DRY_RUN) {
              await fs.rmdir(yearPath);
              console.log(`✓ Removed empty directory: ${path.relative(ROOT_DIR, yearPath)}`);
            } else {
              console.log(`✓ [DRY RUN] Would remove empty directory: ${path.relative(ROOT_DIR, yearPath)}`);
            }
          }
        } catch (error) {
          // Directory might not exist
        }
      }
    }
  } catch (error) {
    console.error(`Error cleaning up directories in ${blogDir}:`, error.message);
  }
}

/**
 * Main migration function
 */
async function main() {
  console.log('🚀 Starting blog structure migration...');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no files will be moved)' : 'LIVE RUN (files will be moved)'}`);
  console.log('');
  
  let totalFiles = 0;
  let successfulMigrations = 0;
  
  for (const blogDir of BLOG_PATHS) {
    console.log(`📁 Processing ${blogDir}...`);
    
    const nestedFiles = await findNestedMdxFiles(blogDir);
    
    if (nestedFiles.length === 0) {
      console.log(`  No nested .mdx files found in ${blogDir}`);
      continue;
    }
    
    console.log(`  Found ${nestedFiles.length} files to migrate`);
    totalFiles += nestedFiles.length;
    
    // Migrate each file
    for (const fileInfo of nestedFiles) {
      const success = await migrateFile(fileInfo);
      if (success) {
        successfulMigrations++;
      }
    }
    
    // Clean up empty directories
    console.log(`  Cleaning up empty directories in ${blogDir}...`);
    await cleanupEmptyDirectories(blogDir);
    
    console.log('');
  }
  
  console.log('📊 Migration Summary:');
  console.log(`  Total files found: ${totalFiles}`);
  console.log(`  Successfully migrated: ${successfulMigrations}`);
  console.log(`  Failed: ${totalFiles - successfulMigrations}`);
  
  if (DRY_RUN) {
    console.log('');
    console.log('💡 This was a dry run. To actually migrate files, run:');
    console.log('   node scripts/migrate-blog-structure.js');
  }
  
  console.log('\n✅ Migration complete!');
}

// Check if gray-matter is available
try {
  require.resolve('gray-matter');
} catch (error) {
  console.error('❌ Error: gray-matter package is required but not installed.');
  console.error('Please install it with: pnpm add gray-matter');
  process.exit(1);
}

// Run the migration
main().catch(error => {
  console.error('❌ Migration failed:', error);
  process.exit(1);
});