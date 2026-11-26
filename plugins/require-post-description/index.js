const fs = require('node:fs');
const path = require('node:path');
const matter = require('gray-matter');

const CUTOFF = '2026-11-26';
const CONTENT_DIRS = [
  ['en', 'blog'],
  ['zh', 'i18n/zh/docusaurus-plugin-content-blog'],
];

function visitMarkdownFiles(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return entry.name.startsWith('_') ? [] : visitMarkdownFiles(fullPath);
    }
    return /^\.(?:md|mdx)$/.test(path.extname(entry.name)) &&
      !entry.name.startsWith('_') &&
      !/\.(test|spec)\.(?:md|mdx)$/.test(entry.name)
      ? [fullPath]
      : [];
  });
}

function postDate(value) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return typeof value === 'string' ? value.slice(0, 10) : '';
}

function findMissingDescriptions(rootDir) {
  return CONTENT_DIRS.flatMap(([locale, relativeDir]) =>
    visitMarkdownFiles(path.join(rootDir, relativeDir)).flatMap((filePath) => {
      const {data} = matter.read(filePath);
      const date = postDate(data.date);
      const description = data.description;
      return date > CUTOFF && !(typeof description === 'string' && description.trim())
        ? [{locale, filePath: path.relative(rootDir, filePath)}]
        : [];
    }),
  );
}

module.exports = function requirePostDescriptionPlugin() {
  return {
    name: 'require-post-description',
    loadContent() {
      const missing = findMissingDescriptions(process.cwd());
      if (missing.length) {
        throw new Error(
          `Posts dated after ${CUTOFF} must have a non-empty description:\n${missing
            .map(({filePath}) => `- ${filePath}`)
            .join('\n')}`,
        );
      }
    },
  };
};
