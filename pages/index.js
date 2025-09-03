import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function BlogIndex({ zhPosts, enPosts }) {
  const router = useRouter()
  const [currentLang, setCurrentLang] = useState('zh')
  const [posts, setPosts] = useState(zhPosts)

  useEffect(() => {
    // Get language preference
    const savedLang = localStorage.getItem('preferred-language') || 'zh'
    setCurrentLang(savedLang)
    setPosts(savedLang === 'en' ? enPosts : zhPosts)
  }, [zhPosts, enPosts])

  return (
    <div>
      <h1>{currentLang === 'en' ? 'Latest Posts' : '最新文章'}</h1>
      <div>
        {posts.map(post => (
          <article key={post.route} style={{ marginBottom: '2rem' }}>
            <h2>
              <a href={post.route} style={{ textDecoration: 'none', color: 'inherit' }}>
                {post.frontMatter?.title || post.name}
              </a>
            </h2>
            {post.frontMatter?.date && (
              <p style={{ color: '#666', fontSize: '0.9rem' }}>
                {post.frontMatter.date}
              </p>
            )}
            {post.frontMatter?.description && (
              <p style={{ color: '#555' }}>
                {post.frontMatter.description}
              </p>
            )}
            <a href={post.route} style={{ color: '#0070f3', textDecoration: 'none' }}>
              {currentLang === 'en' ? 'Read more →' : '阅读更多 →'}
            </a>
          </article>
        ))}
      </div>
    </div>
  )
}

// Helper function to recursively get all MDX files
function getAllMdxFiles(dir, basePath = '') {
  const files = []
  const items = fs.readdirSync(dir)
  
  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)
    
    if (stat.isDirectory()) {
      files.push(...getAllMdxFiles(fullPath, path.join(basePath, item)))
    } else if (item.endsWith('.mdx') || item.endsWith('.md')) {
      const content = fs.readFileSync(fullPath, 'utf8')
      const { data: frontMatter } = matter(content)
      
      files.push({
        route: path.join(basePath, item.replace(/\.(mdx?|md)$/, '')).replace(/\\/g, '/'),
        name: item.replace(/\.(mdx?|md)$/, ''),
        frontMatter
      })
    }
  }
  
  return files
}

export async function getStaticProps() {
  const pagesDir = path.join(process.cwd(), 'pages')
  
  let zhPosts = []
  let enPosts = []
  
  try {
    const zhDir = path.join(pagesDir, 'zh')
    if (fs.existsSync(zhDir)) {
      zhPosts = getAllMdxFiles(zhDir, '/zh')
    }
  } catch (error) {
    console.warn('Could not read zh posts:', error.message)
  }
  
  try {
    const enDir = path.join(pagesDir, 'en')
    if (fs.existsSync(enDir)) {
      enPosts = getAllMdxFiles(enDir, '/en')
    }
  } catch (error) {
    console.warn('Could not read en posts:', error.message)
  }
  
  // Sort posts by date
  const sortedZhPosts = zhPosts
    .filter(post => post.frontMatter?.date)
    .sort((a, b) => new Date(b.frontMatter.date) - new Date(a.frontMatter.date))

  const sortedEnPosts = enPosts
    .filter(post => post.frontMatter?.date)
    .sort((a, b) => new Date(b.frontMatter.date) - new Date(a.frontMatter.date))

  return {
    props: {
      zhPosts: sortedZhPosts,
      enPosts: sortedEnPosts
    }
  }
}