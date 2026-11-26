const COMMENT_ONLY_LINE = /^\s*(?:\{\/\*[\s\S]*?\*\/\}|<!--[\s\S]*?-->)\s*$/;
const LEADING_COMMENT = /^\s*(?:\{\/\*[\s\S]*?\*\/\}|<!--[\s\S]*?-->)\s*/;

function removeLeadingComments(content) {
  let result = content;
  let previous;

  do {
    previous = result;
    result = result.replace(LEADING_COMMENT, '');
  } while (result !== previous);

  return result;
}

function firstParagraph(content) {
  const lines = removeLeadingComments(content).split(/\r?\n/);
  const paragraph = [];
  let inCodeFence = false;

  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;
    if (!line.trim()) {
      if (paragraph.length) break;
      continue;
    }
    if (/^\s*(?:import|export)\s/.test(line) || /^\s*#/.test(line)) continue;
    paragraph.push(line.trim());
  }

  return paragraph
    .join(' ')
    .replace(/<!--([\s\S]*?)-->/g, '')
    .replace(/\{\/\*([\s\S]*?)\*\/\}/g, '')
    .replace(/<[^>]*>/g, '')
    .trim();
}

module.exports = function processBlogPosts({blogPosts}) {
  return blogPosts.map((post) => {
    if (post.metadata.frontMatter.description != null) return post;

    const cleanedExcerpt = removeLeadingComments(post.metadata.description ?? '').trim();
    const description = cleanedExcerpt && !COMMENT_ONLY_LINE.test(cleanedExcerpt)
      ? cleanedExcerpt
      : firstParagraph(post.content);

    return {
      ...post,
      metadata: {
        ...post.metadata,
        description,
      },
    };
  });
};
