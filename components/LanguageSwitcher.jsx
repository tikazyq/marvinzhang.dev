import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const LanguageSwitcher = () => {
  const router = useRouter()
  const [currentLang, setCurrentLang] = useState('zh')
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
    
    // Detect current language from URL path
    const path = router.asPath
    if (path.startsWith('/en/')) {
      setCurrentLang('en')
    } else if (path.startsWith('/zh/')) {
      setCurrentLang('zh')
    } else {
      // For home page, check localStorage
      const savedLang = localStorage.getItem('preferred-language') || 'zh'
      setCurrentLang(savedLang)
    }
  }, [router.asPath])

  if (!mounted) {
    return null
  }

  const switchLanguage = (targetLang) => {
    const currentPath = router.asPath
    
    if (currentPath.startsWith('/zh/') || currentPath.startsWith('/en/')) {
      // Handle post language switching with new structure
      const pathParts = currentPath.split('/')
      const currentLocale = pathParts[1] // 'zh' or 'en'
      const dateDir = pathParts[2] // e.g., '2022-09'
      const postSlug = pathParts[3] // e.g., 'agile-practice'
      
      if (currentLocale !== targetLang) {
        const newPath = `/${targetLang}/${dateDir}/${postSlug}`
        router.push(newPath).catch(() => {
          // If the target language version doesn't exist, show a message
          alert(`Sorry, this post is not available in ${targetLang === 'en' ? 'English' : 'Chinese'}.`)
        })
      }
    } else {
      // For home page, update preference and reload
      setCurrentLang(targetLang)
      localStorage.setItem('preferred-language', targetLang)
      window.location.reload()
    }
  }

  return (
    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
      <button
        onClick={() => switchLanguage('zh')}
        style={{
          padding: '4px 8px',
          border: currentLang === 'zh' ? '1px solid #0070f3' : '1px solid transparent',
          backgroundColor: currentLang === 'zh' ? '#0070f3' : 'transparent',
          color: currentLang === 'zh' ? 'white' : 'inherit',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: currentLang === 'zh' ? 'bold' : 'normal'
        }}
      >
        中文
      </button>
      <span style={{ color: '#ccc' }}>|</span>
      <button
        onClick={() => switchLanguage('en')}
        style={{
          padding: '4px 8px',
          border: currentLang === 'en' ? '1px solid #0070f3' : '1px solid transparent',
          backgroundColor: currentLang === 'en' ? '#0070f3' : 'transparent',
          color: currentLang === 'en' ? 'white' : 'inherit',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: currentLang === 'en' ? 'bold' : 'normal'
        }}
      >
        EN
      </button>
    </div>
  )
}

export default LanguageSwitcher