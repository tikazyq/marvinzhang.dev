import { normalizePages } from 'nextra/normalize-pages'
import { getPageMap } from 'nextra/page-map'
 
export async function getPosts() {
  const list = await getPageMap('/posts');
  const route = '/posts';
  console.log(list);
  const { directories } = normalizePages({
    list,
    route,
  })
  return directories
    .filter(post => post.name !== 'index')
    .sort((a, b) => (b.frontMatter ? new Date(b.frontMatter.date) : 0) - (a.frontMatter ? new Date(a.frontMatter.date) : 0))
}
 
export async function getTags() {
  const posts = await getPosts()
  const tags = posts.flatMap(post => post.frontMatter ? post.frontMatter.tags : []).filter(Boolean)
  return tags
}