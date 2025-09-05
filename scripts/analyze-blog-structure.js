#!/usr/bin/env node

/**
 * Verification script to analyze the current blog structure
 * and provide insights before migration
 */

const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');

const ROOT_DIR = process.cwd();
const BLOG_PATHS = [
  'blog',
  'i18n/zh/docusaurus-plugin-content-blog'
];

/**
 * Analyze a blog directory
 */
async function analyzeDirectory(blogDir) {
  const fullBlogPath = path.join(ROOT_DIR, blogDir);
  const analysis = {
    path: blogDir,
    totalFiles: 0,
    nestedFiles: 0,
    flatFiles: 0,
    yearDirs: [],
    flatFileNames: [],
    nestedFileInfo: [],
    issues: []
  };

  try {
    const entries = await fs.readdir(fullBlogPath, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory() && /^\d{4}$/.test(entry.name)) {
        // Year directory - nested structure
        analysis.yearDirs.push(entry.name);
        const yearPath = path.join(fullBlogPath, entry.name);
        
        try {
          const monthEntries = await fs.readdir(yearPath, { withFileTypes: true });
          
          for (const monthEntry of monthEntries) {
            if (monthEntry.isDirectory() && /^\d{2}$/.test(monthEntry.name)) {
              const monthPath = path.join(yearPath, monthEntry.name);
              const postEntries = await fs.readdir(monthPath, { withFileTypes: true });
              
              for (const postEntry of postEntries) {
                if (postEntry.isFile() && postEntry.name.endsWith('.mdx')) {
                  analysis.totalFiles++;
                  analysis.nestedFiles++;
                  
                  const filePath = path.join(monthPath, postEntry.name);
                  const relativePath = path.relative(ROOT_DIR, filePath);
                  
                  // Parse frontmatter to get date
                  try {
                    const content = await fs.readFile(filePath, 'utf-8');
                    const { data } = matter(content);
                    
                    analysis.nestedFileInfo.push({
                      path: relativePath,
                      year: entry.name,
                      month: monthEntry.name,
                      filename: postEntry.name,
                      slug: postEntry.name.replace('.mdx', ''),
                      date: data.date,
                      hasDate: !!data.date,
                      title: data.title || 'No title'
                    });
                    
                    if (!data.date) {
                      analysis.issues.push(`Missing date in ${relativePath}`);
                    }
                  } catch (error) {
                    analysis.issues.push(`Could not parse frontmatter in ${relativePath}: ${error.message}`);
                  }
                }
              }
            }
          }
        } catch (error) {
          analysis.issues.push(`Error reading year directory ${entry.name}: ${error.message}`);
        }
      } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
        // Already flat file
        analysis.totalFiles++;
        analysis.flatFiles++;
        analysis.flatFileNames.push(entry.name);
      }
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      analysis.issues.push(`Directory ${blogDir} does not exist`);
    } else {
      analysis.issues.push(`Error reading ${blogDir}: ${error.message}`);
    }
  }
  
  return analysis;
}

/**
 * Main analysis function
 */
async function main() {
  console.log('🔍 Analyzing blog structure...\n');
  
  const allAnalyses = [];
  
  for (const blogDir of BLOG_PATHS) {
    const analysis = await analyzeDirectory(blogDir);
    allAnalyses.push(analysis);
    
    console.log(`📁 ${blogDir}:`);
    console.log(`   Total files: ${analysis.totalFiles}`);
    console.log(`   Nested files (will be migrated): ${analysis.nestedFiles}`);
    console.log(`   Flat files (already migrated): ${analysis.flatFiles}`);
    
    if (analysis.yearDirs.length > 0) {
      console.log(`   Year directories: ${analysis.yearDirs.join(', ')}`);
    }
    
    if (analysis.issues.length > 0) {
      console.log(`   ⚠️  Issues found: ${analysis.issues.length}`);
      analysis.issues.forEach(issue => console.log(`      - ${issue}`));
    }
    
    console.log('');
  }
  
  // Summary
  const totalNested = allAnalyses.reduce((sum, a) => sum + a.nestedFiles, 0);
  const totalFlat = allAnalyses.reduce((sum, a) => sum + a.flatFiles, 0);
  const totalIssues = allAnalyses.reduce((sum, a) => sum + a.issues.length, 0);
  
  console.log('📊 Summary:');
  console.log(`   Files to migrate: ${totalNested}`);
  console.log(`   Already migrated: ${totalFlat}`);
  console.log(`   Issues found: ${totalIssues}`);
  
  if (totalNested > 0) {
    console.log('\n💡 Migration Preview:');
    
    // Show a few examples
    const examples = allAnalyses
      .flatMap(a => a.nestedFileInfo)
      .slice(0, 5);
      
    examples.forEach(file => {
      const formattedDate = file.date ? 
        new Date(file.date).toISOString().split('T')[0] : 
        `${file.year}-${file.month}-01`;
        
      const newName = `${formattedDate}-${file.slug}.mdx`;
      console.log(`   ${file.path} → ${file.path.split('/').slice(0, -3).join('/')}/${newName}`);
    });
    
    if (allAnalyses.flatMap(a => a.nestedFileInfo).length > 5) {
      console.log(`   ... and ${totalNested - 5} more files`);
    }
  }
  
  console.log('\n🚀 Next Steps:');
  
  if (totalIssues > 0) {
    console.log('   1. Fix the issues listed above');
    console.log('   2. Re-run this analysis script');
  }
  
  if (totalNested > 0) {
    console.log('   1. Create a backup: pnpm run backup:blog');
    console.log('   2. Preview migration: pnpm run migrate:blog:dry');
    console.log('   3. Run migration: pnpm run migrate:blog');
  } else {
    console.log('   ✅ No migration needed - all files are already in flat structure!');
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

main().catch(error => {
  console.error('❌ Analysis failed:', error);
  process.exit(1);
});