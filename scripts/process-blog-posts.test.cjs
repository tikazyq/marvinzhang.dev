const test = require('node:test');
const assert = require('node:assert/strict');
const processBlogPosts = require('../plugins/process-blog-posts.cjs');

function post(content, description) {
  return {
    content,
    metadata: {
      description: description ?? '',
      frontMatter: description === undefined ? {} : {description},
    },
  };
}

function describe(content, explicitDescription) {
  return processBlogPosts({blogPosts: [post(content, explicitDescription)]})[0];
}

test('fallback skips multiline MDX comments before extracting the ordinary paragraph', () => {
  assert.equal(
    describe('{/* private editor note\ncontinues */}\nPublic text.').metadata.description,
    'Public text.',
  );
});

test('fallback strips inline MDX comments while preserving surrounding prose', () => {
  assert.equal(
    describe('Public. {/* private note */} More public text.').metadata.description,
    'Public.  More public text.',
  );
});

test('fallback skips multiline HTML comments', () => {
  assert.equal(
    describe('<!-- private editor note\ncontinues -->\nPublic text.').metadata.description,
    'Public text.',
  );
});

test('fallback strips inline HTML comments', () => {
  assert.equal(
    describe('Public. <!-- private note --> More public text.').metadata.description,
    'Public.  More public text.',
  );
});

test('explicit descriptions and normal Markdown excerpts are preserved', () => {
  assert.equal(
    describe('## A heading\n\nA [linked](https://example.com) paragraph.', 'Explicit description.').metadata.description,
    'Explicit description.',
  );
  assert.equal(
    describe('## A heading\n\nA [linked](https://example.com) paragraph.').metadata.description,
    'A linked paragraph.',
  );
});

test('fenced literal comment examples are left intact while the excerpt skips code', () => {
  const content = '```md\n{/* literal example */}\n```\n\nPublic paragraph.';
  const processed = describe(content);
  assert.equal(processed.metadata.description, 'Public paragraph.');
  assert.match(processed.content, /\{\/\* literal example \*\/\}/);
});
