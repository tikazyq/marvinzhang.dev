const {createExcerpt} = require('@docusaurus/utils');

function stripCommentsOutsideCode(content) {
  const lines = content.split(/(?<=\n)/);
  const output = [];
  let outsideCode = '';
  let fence;

  function flushOutsideCode() {
    output.push(outsideCode
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
      .replace(/<!--[\s\S]*?-->/g, ''));
    outsideCode = '';
  }

  for (const line of lines) {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (!fence && marker) {
      flushOutsideCode();
      fence = {character: marker[1][0], length: marker[1].length};
      output.push(line);
    } else if (fence) {
      output.push(line);
      const closing = line.match(/^\s*(`+|~+)\s*$/);
      if (closing && closing[1][0] === fence.character && closing[1].length >= fence.length) {
        fence = undefined;
      }
    } else {
      outsideCode += line;
    }
  }

  flushOutsideCode();
  return output.join('');
}

function processBlogPosts({blogPosts}) {
  return blogPosts.map((post) => {
    if (post.metadata.frontMatter.description != null) return post;

    const description = createExcerpt(stripCommentsOutsideCode(post.content)) ?? '';
    return {
      ...post,
      metadata: {
        ...post.metadata,
        description,
      },
    };
  });
}

module.exports = processBlogPosts;
module.exports.stripCommentsOutsideCode = stripCommentsOutsideCode;
