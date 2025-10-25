#!/usr/bin/env node

/**
 * Validate Bold Formatting in Chinese Blog Posts (Source Check)
 * 
 * This script checks the MDX source files for improper bold formatting patterns
 * that can cause rendering issues in Chinese blog posts.
 * 
 * Usage:
 *   node scripts/validate-zh-bold-formatting-source.js
 *   node scripts/validate-zh-bold-formatting-source.js --file 2025-10-04-fundamental-limits-in-computing.mdx
 *   node scripts/validate-zh-bold-formatting-source.js --fix  # Auto-fix issues
 */

const fs = require('fs');
const path = require('path');

// Configuration
const ZH_BLOG_DIR = path.join(__dirname, '..', 'i18n', 'zh', 'docusaurus-plugin-content-blog');

// Parse command line arguments
const args = process.argv.slice(2);
const specificFile = args.includes('--file') ? args[args.indexOf('--file') + 1] : null;
const autoFix = args.includes('--fix');
const verbose = args.includes('--verbose');

/**
 * Get all Chinese blog post files
 */
function getZhBlogFiles() {
  const files = fs.readdirSync(ZH_BLOG_DIR)
    .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
    .filter(file => !file.includes('authors.yml'));

  if (specificFile) {
    return files.filter(file => file === specificFile);
  }

  return files;
}

/**
 * Check for bold formatting issues in source MDX content
 */
function checkSourceFormatting(content, filePath) {
  const issues = [];
  const lines = content.split('\n');
  const fixes = [];

  lines.forEach((line, lineIndex) => {
    const lineNumber = lineIndex + 1;

    // Skip code blocks, frontmatter, and comments
    if (line.trim().startsWith('```') || 
        line.trim().startsWith('~~~') ||
        line.trim().startsWith('---') ||
        line.includes('{/*') || 
        line.includes('*/}')) {
      return;
    }

    // Check if line has Chinese characters
    const hasChinese = /[\u4e00-\u9fa5]/.test(line);
    if (!hasChinese) {
      return;
    }

    // Pattern 1: Multiple bold sections without space before second **
    // This is the critical issue: ）**term** should be ） **term**
    // Look for Chinese char or closing paren immediately followed by **
    const pattern1 = /([\u4e00-\u9fa5）\)])(\*\*[^*]+\*\*)/g;
    let match;
    
    while ((match = pattern1.exec(line)) !== null) {
      const precedingChar = match[1];
      const boldSection = match[2];
      
      // Check if there's another bold section before this position
      const beforeMatch = line.substring(0, match.index);
      const hasPreviousBold = /\*\*[^*]+\*\*/.test(beforeMatch);
      
      if (hasPreviousBold) {
        const startPos = match.index + precedingChar.length;
        issues.push({
          line: lineNumber,
          column: startPos + 1,
          type: 'missing-space-before-bold',
          issue: `Missing space before second bold section on same line`,
          context: line.trim().substring(Math.max(0, match.index - 20), match.index + 40),
          suggestion: `Add space: "${precedingChar} ${boldSection}"`,
          fixable: true,
          original: line,
          fix: () => {
            // Insert space before the ** 
            return line.substring(0, startPos) + ' ' + line.substring(startPos);
          }
        });

        if (autoFix) {
          const fixedLine = line.substring(0, startPos) + ' ' + line.substring(startPos);
          fixes.push({
            lineIndex,
            originalLine: line,
            fixedLine
          });
          // Update line for subsequent fixes
          lines[lineIndex] = fixedLine;
        }
      }
    }

    // Pattern 2: Bold with quotes without proper spacing
    // Critical: **"text"** should be ** "text" **
    const pattern2 = /\*\*"[^"]+"\*\*/g;
    
    while ((match = pattern2.exec(line)) !== null) {
      const boldText = match[0];
      
      // Check if it doesn't have proper spacing
      if (boldText !== boldText.replace(/\*\*"/, '** "').replace(/"\*\*/, '" **')) {
        const innerContent = boldText.substring(2, boldText.length - 2); // Remove ** from both ends
        
        issues.push({
          line: lineNumber,
          column: match.index + 1,
          type: 'quote-spacing',
          issue: `Bold text with quotes needs spacing inside markers`,
          context: line.trim().substring(Math.max(0, match.index - 10), match.index + boldText.length + 10),
          suggestion: `Use: ** ${innerContent} ** instead of ${boldText}`,
          fixable: true,
          original: line,
          fix: () => {
            return line.replace(boldText, `** ${innerContent} **`);
          }
        });

        if (autoFix) {
          const fixedLine = line.replace(boldText, `** ${innerContent} **`);
          fixes.push({
            lineIndex,
            originalLine: line,
            fixedLine
          });
          // Update line for subsequent fixes
          lines[lineIndex] = fixedLine;
        }
      }
    }
  });

  // Apply fixes if requested
  if (autoFix && fixes.length > 0) {
    // Use the already modified lines array
    fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
  }

  return { issues, fixesApplied: fixes.length };
}

/**
 * Validate all Chinese blog posts
 */
function validateBlogPosts() {
  console.log('\n📝 Validating Chinese blog posts for bold formatting (source check)...\n');

  const files = getZhBlogFiles();
  console.log(`Found ${files.length} Chinese blog post(s) to validate\n`);

  const results = {
    total: files.length,
    passed: 0,
    failed: 0,
    totalIssues: 0,
    totalFixes: 0,
    fileResults: []
  };

  for (const file of files) {
    const filePath = path.join(ZH_BLOG_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    console.log(`Checking: ${file}`);

    const { issues, fixesApplied } = checkSourceFormatting(content, filePath);

    if (issues.length === 0) {
      console.log('  ✅ PASS - No bold formatting issues detected\n');
      results.passed++;
    } else {
      console.log(`  ❌ FAIL - Found ${issues.length} formatting issue(s):\n`);
      
      issues.forEach((issue, idx) => {
        console.log(`     ${idx + 1}. Line ${issue.line}:${issue.column} [${issue.type}]`);
        console.log(`        ${issue.issue}`);
        if (verbose) {
          console.log(`        Context: ${issue.context}`);
        }
        console.log(`        💡 ${issue.suggestion}`);
        if (autoFix && issue.fixable) {
          console.log(`        ✓ Auto-fixed`);
        }
        console.log();
      });
      
      if (fixesApplied > 0) {
        console.log(`  ✓ Applied ${fixesApplied} automatic fix(es)\n`);
        results.totalFixes += fixesApplied;
      }

      results.failed++;
      results.totalIssues += issues.length;
      results.fileResults.push({
        file,
        issues,
        fixesApplied
      });
    }
  }

  return results;
}

/**
 * Generate summary report
 */
function printSummary(results) {
  console.log('\n' + '='.repeat(70));
  console.log('📊 VALIDATION SUMMARY');
  console.log('='.repeat(70));
  console.log(`Total files checked: ${results.total}`);
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`Total issues found: ${results.totalIssues}`);
  
  if (autoFix) {
    console.log(`✓ Total fixes applied: ${results.totalFixes}`);
  }

  if (results.failed > 0) {
    console.log('\n⚠️  Files with issues:');
    results.fileResults.forEach(({ file, issues, fixesApplied }) => {
      const status = autoFix && fixesApplied > 0 ? `✓ ${fixesApplied} fixed` : `${issues.length} issue(s)`;
      console.log(`  - ${file} (${status})`);
    });
    
    if (!autoFix) {
      console.log('\n💡 Run with --fix flag to automatically fix issues:');
      console.log('   node scripts/validate-zh-bold-formatting-source.js --fix');
    }

    console.log('\n📖 Formatting rules:');
    console.log('  1. Multiple bold on same line: 这与 **term1** 形成对比');
    console.log('     (note the space before the second **)');
    console.log('  2. Bold with quotes: ** "quoted text" ** 是一个属性');
    console.log('     (note spaces inside the bold markers)');
  }
  
  console.log('='.repeat(70) + '\n');
}

/**
 * Main execution
 */
function main() {
  try {
    if (autoFix) {
      console.log('🔧 Auto-fix mode enabled - issues will be automatically corrected\n');
    }

    const results = validateBlogPosts();
    printSummary(results);

    // Exit with appropriate code
    process.exit(results.failed > 0 && !autoFix ? 1 : 0);

  } catch (error) {
    console.error('\n❌ Error during validation:', error.message);
    if (verbose) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { checkSourceFormatting };
