#!/usr/bin/env node

/**
 * Backup script for blog content before migration
 * Creates a timestamped backup of the blog directories
 */

const fs = require('fs').promises;
const path = require('path');

const ROOT_DIR = process.cwd();
const TIMESTAMP = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const BACKUP_DIR = path.join(ROOT_DIR, 'tmp', `blog-backup-${TIMESTAMP}`);

const DIRS_TO_BACKUP = [
  'blog',
  'i18n/zh/docusaurus-plugin-content-blog'
];

/**
 * Recursively copy directory
 */
async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  
  const entries = await fs.readdir(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

/**
 * Create backup
 */
async function createBackup() {
  console.log('🔄 Creating backup of blog content...');
  console.log(`📁 Backup location: ${BACKUP_DIR}`);
  
  try {
    await fs.mkdir(BACKUP_DIR, { recursive: true });
    
    for (const dir of DIRS_TO_BACKUP) {
      const srcPath = path.join(ROOT_DIR, dir);
      const destPath = path.join(BACKUP_DIR, dir);
      
      try {
        await fs.access(srcPath);
        console.log(`  Backing up ${dir}...`);
        await copyDir(srcPath, destPath);
        console.log(`  ✅ ${dir} backed up successfully`);
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.log(`  ⚠️  ${dir} does not exist, skipping`);
        } else {
          throw error;
        }
      }
    }
    
    // Create a restore script
    const restoreScript = `#!/bin/bash
# Restore script generated on ${new Date().toISOString()}
# This will restore the blog content from the backup

echo "🔄 Restoring blog content from backup..."

# Remove current content
rm -rf blog/
rm -rf i18n/zh/docusaurus-plugin-content-blog/

# Restore from backup
cp -r "${BACKUP_DIR}/blog" ./
cp -r "${BACKUP_DIR}/i18n/zh/docusaurus-plugin-content-blog" i18n/zh/

echo "✅ Blog content restored successfully"
echo "⚠️  Remember to commit or stash any current changes first!"
`;
    
    const restoreScriptPath = path.join(BACKUP_DIR, 'restore.sh');
    await fs.writeFile(restoreScriptPath, restoreScript);
    await fs.chmod(restoreScriptPath, 0o755);
    
    console.log('');
    console.log('✅ Backup completed successfully!');
    console.log('');
    console.log('📋 Backup Information:');
    console.log(`   Location: ${BACKUP_DIR}`);
    console.log(`   Timestamp: ${TIMESTAMP}`);
    console.log('');
    console.log('🔧 To restore from this backup:');
    console.log(`   bash "${restoreScriptPath}"`);
    console.log('');
    console.log('💡 You can now safely run the migration:');
    console.log('   pnpm run migrate:blog');
    
  } catch (error) {
    console.error('❌ Backup failed:', error.message);
    process.exit(1);
  }
}

createBackup();